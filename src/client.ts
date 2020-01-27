import * as crypto from 'crypto';
import { dbg, GEM_BASE_URL } from './shared';
import * as url from 'url';
import GemAPIError from './errors/gem_api';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as qs from 'qs';

/**
 * The base HTTP client class for the Gem API.
 * This client is used by the SDK namespace for easier HTTP request construction.
 */
export class Client {
  IS_NODE = true;

  constructor(private config: any) {
    this.IS_NODE = Boolean(globalThis['v8']);

    if (!config.secretKey && this.IS_NODE)
      throw new Error('Gem API secret is missing');
    if (!config.apiKey) throw new Error('Gem API key is missing');
    this.config.options = this.config.options || {};
  }

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
      const { data, status }: AxiosResponse = await axios.request(reqOpts);
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
    const parsedUrl = url.parse(
      url.resolve(this.config.baseUrl || GEM_BASE_URL, path),
      true
    );

    const json =
      !(options.headers || {}).hasOwnProperty('content-type') ||
      !(options.headers || {}).hasOwnProperty('Content-Type') ||
      options.headers['Content-Type'] == 'application/json';

    const reqOpts: AxiosRequestConfig & { qs: object } = {
      ...this.config.options,
      ...options,
      url: parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname, // no querystring here!
      method: method,
      headers: {
        ...this.config.options.headers,
        ...options.headers,
      },
      qs: {
        ...this.config.qs,
        ...options.qs,
      },
      json: json,
      data: params,
    };

    reqOpts.url = Object.keys(reqOpts.qs).length
      ? reqOpts.url + '?' + qs.stringify(reqOpts.qs)
      : reqOpts.url;

    if (reqOpts.method == 'GET') reqOpts.qs = Object.assign(reqOpts.qs, params);
    else reqOpts.data = params;

    if (!reqOpts.data || !Object.keys(reqOpts.data).length) delete reqOpts.data;

    reqOpts.headers['X-Gem-Api-Key'] = this.config.apiKey;

    if (this.IS_NODE) {
      const ts = this.getTimeStamp();
      reqOpts.headers['X-Gem-Access-Timestamp'] = ts;
      reqOpts.headers['X-Gem-Signature'] = this.createSignature(ts);
    }

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
    return crypto
      .createHmac('sha256', secretKey)
      .update(data)
      .digest('hex');
  }
}
