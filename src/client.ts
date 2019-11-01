import * as crypto from 'crypto';
import { dbg, GEM_BASE_URL } from './shared';
import * as request from 'request';
import * as url from 'url';
import GemAPIError from './errors/gem_api';

/**
 * The base HTTP client class for the Gem API.
 * This client is used by the SDK namespace for easier HTTP request construction.
 */
export class Client {
  constructor(private config: any) {
    if (!config.secretKey) throw new Error('Gem API secret is missing');
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
  private request(
    method: string,
    path: string,
    params: any = {},
    options: any = {}
  ): Promise<any> {
    if (!path) throw 'path required';

    const reqOpts = this.createRequestOptions(method, path, params, options);

    return new Promise((resolve, reject) => {
      request(reqOpts, (err, res) => {
        if (err) throw err;
        else if (res.statusCode >= 200 && res.statusCode < 300)
          resolve(res.body || {});
        else reject(new GemAPIError(res.body || { status: res.statusCode }));
      });
    });
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
    params: any,
    options: any
  ): request.UrlOptions & request.CoreOptions {
    options = options || {};

    const parsedUrl = url.parse(
      url.resolve(this.config.baseUrl || GEM_BASE_URL, path),
      true
    );

    const json =
      !(options.headers || {}).hasOwnProperty('content-type') ||
      !(options.headers || {}).hasOwnProperty('Content-Type') ||
      options.headers['Content-Type'] == 'application/json';

    const reqOpts: request.UrlOptions & request.CoreOptions = {
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
    };

    if (reqOpts.method == 'GET') reqOpts.qs = Object.assign(reqOpts.qs, params);
    else reqOpts.body = params;

    if (!reqOpts.body || !Object.keys(reqOpts.body).length) delete reqOpts.body;

    const ts = this.getTimeStamp();
    reqOpts.headers['X-Gem-Access-Timestamp'] = ts;
    reqOpts.headers['X-Gem-Api-Key'] = this.config.apiKey;
    reqOpts.headers['X-Gem-Signature'] = this.createSignature(ts);

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
