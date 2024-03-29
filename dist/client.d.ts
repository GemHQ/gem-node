import { AxiosRequestConfig, AxiosInstance } from 'axios';
declare type ClientConfigType = {
    apiKey?: string;
    secretKey?: string;
    baseUrl?: string;
    environment?: 'sandbox' | 'production';
    options?: AxiosRequestConfig;
    [k: string]: any;
};
export declare class Client {
    IS_NODE: boolean;
    config: ClientConfigType;
    axios: AxiosInstance;
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
