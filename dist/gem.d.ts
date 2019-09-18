import 'es6-shim';
export declare class Client {
    private config;
    constructor(config: any);
    get(path: string, params?: any, options?: any): Promise<any>;
    post(path: string, body?: any, options?: any): Promise<any>;
    put(path: string, body?: any, options?: any): Promise<any>;
    delete(path: string, body?: any, options?: any): Promise<any>;
    private request;
    private createRequestOptions;
    private getTimeStamp;
    private createSignature;
}
