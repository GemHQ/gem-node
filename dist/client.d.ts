export declare class Client {
    IS_NODE: boolean;
    config: any;
    constructor(config: any);
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
