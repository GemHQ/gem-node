import { AxiosRequestConfig } from 'axios';
declare type ClientConfigType = {
    apiKey?: string;
    secretKey?: string;
    baseUrl?: string;
    options?: AxiosRequestConfig;
    [k: string]: any;
};
export declare class Client {
    IS_NODE: boolean;
    config: ClientConfigType;
    constructor(config: ClientConfigType);
    checkForNodeProcess: () => boolean;
    get(path: string, params?: any, options?: any): Promise<any>;
    post(path: string, body?: any, options?: any): Promise<any>;
    put(path: string, body?: any, options?: any): Promise<any>;
    patch(path: string, body?: any, options?: any): Promise<any>;
    delete(path: string, body?: any, options?: any): Promise<any>;
    private request;
    private createRequestOptions;
    private getTimeStamp;
    private createSignature;
}
export {};
