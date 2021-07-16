import * as crypto from 'crypto';
import {
  dbg,
  GEM_BASE_URL,
  GEM_CSRF_COOKIE_NAME,
  GEM_CSRF_HEADER_NAME,
} from './shared';
import * as url from 'url';
import GemAPIError from './errors/gem_api';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import * as qs from 'qs';

type ClientConfigType = {
  apiKey?: string;
  secretKey?: string;
  baseUrl?: string;
  options?: AxiosRequestConfig;
  [k: string]: any;
};

/**
 * The base HTTP client class for the Gem API.
 * This client is used by the SDK namespace for easier HTTP request construction.
 */
export class Client {
  IS_NODE = true;
  config: ClientConfigType = {};
  axios: AxiosInstance;

  constructor(config: ClientConfigType) {
    if (!config.apiKey) throw new Error('Gem SDK API key is missing');
    this.axios = axios.create();
    this.config = config;
    this.IS_NODE = this.checkForNodeProcess();
    this.config.options = this.config.options || {};

    // Runtime environment checks
    if (this.IS_NODE) {
      if (!config.secretKey) {
        throw new Error('Gem SDK API secret is missing');
      }
    }
  }

  checkForNodeProcess = () => {
    try {
      return typeof process !== 'undefined' && process.release.name === 'node';
    } catch (e) {
      return false;
    }
  };

  public get(path: string, params?: any, options?: any): Promise<any> {
    return this.request('GET', path, params, options);
  }

  public post(path: string, body?: any, options?: any): Promise<any> {
    return this.request('POST', path, body, options);
  }

  public put(path: string, body?: any, options?: any): Promise<any> {
    return this.request('PUT', path, body, options);
  }

  public patch(path: string, body?: any, options?: any): Promise<any> {
    return this.request('PATCH', path, body, options);
  }

  public delete(path: string, body?: any, options?: any): Promise<any> {
    return this.request('DELETE', path, body, options);
  }

  /**
   * A base request factory.
   * @param method The HTTP method of the request.
   * @param path The Path for the request.
   * @param params Any request parameters.
   * @param options Options passed down from the high level request.
   */
  private async request(
    method: string,
    path: string,
    params: any = {},
    options: any = {}
  ): Promise<any> {
    if (!path) throw 'path required';

    const reqOpts = this.createRequestOptions(method, path, params, options);

    try {
      const { data, status }: AxiosResponse = await this.axios.request(reqOpts);
      if (status >= 200 && status < 300) {
        return data || {};
      } else {
        throw new GemAPIError({ ...data, status });
      }
    } catch (e) {
      const res = e.response;
      if (res) {
        const { data, status } = res;
        throw new GemAPIError({ ...data, status });
      } else {
        // Non axios exception
        throw e;
      }
    }
  }

  /**
   * Construct request options for a new request.
   * @param method The HTTP method of the request.
   * @param path The Path for the request.
   * @param params Any request parameters.
   * @param options Options passed down from the high level request.
   */
  private createRequestOptions(
    method: string,
    path: string,
    params: any = {},
    options: any = {}
  ): any {
    const { isPCI = false } = options;
    let providedURL = this.config.baseUrl || GEM_BASE_URL;
    providedURL = isPCI
      ? providedURL.replace(/:\/\/api\./g, '://api-pci.')
      : providedURL;
    const parsedUrl = url.parse(url.resolve(providedURL, path), true);

    const reqOpts: AxiosRequestConfig & { qs: object } = {
      // NOTE: these will be overridden by config.options and options if available.
      ...(!this.IS_NODE && {
        xsrfCookieName: GEM_CSRF_COOKIE_NAME,
        xsrfHeaderName: GEM_CSRF_HEADER_NAME,
      }),
      ...this.config.options,
      ...options,
      url: parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname, // no querystring here!
      method: method,
      headers: {
        ...this.axios.defaults.headers.common,
        ...this.config.options.headers,
        ...options.headers,
      },
      qs: {
        ...this.config.qs,
        ...options.qs,
      },
      data: params,
    };

    if (reqOpts.method == 'GET') reqOpts.qs = Object.assign(reqOpts.qs, params);

    if (['GET', 'DELETE'].includes(reqOpts.method)) delete reqOpts.data;

    reqOpts.headers['X-Gem-Api-Key'] = this.config.apiKey;

    if (this.IS_NODE && !reqOpts.headers['Authorization']) {
      const ts = this.getTimeStamp();
      reqOpts.headers['X-Gem-Access-Timestamp'] = ts;
      reqOpts.headers['X-Gem-Signature'] = this.createSignature(ts);
    }

    reqOpts.url = (
      Object.keys(reqOpts.qs).length > 0
        ? reqOpts.url + '?' + qs.stringify(reqOpts.qs)
        : reqOpts.url
    ).replace(/\?$/, '');

    dbg('Request Options:', reqOpts);
    return reqOpts;
  }

  /**
   * Get the current unix timestamp (seconds)
   * for signing API requests.
   */
  private getTimeStamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * SERVER HELPERS
   */
  /**
   * Sign a request to Gem's API.
   * @param timeStamp Unix timestamp in seconds.
   */
  private createSignature(timeStamp: number): string {
    dbg('Timestamp:', timeStamp);
    const { secretKey, apiKey } = this.config;
    const data = `${apiKey}:${timeStamp}`;
    return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
  }
}
