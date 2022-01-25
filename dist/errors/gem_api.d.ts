export default class GemAPIError extends Error {
    description: string;
    error: string;
    status: number;
    error_map?: {
        [key: string]: string;
    };
    request_id?: string;
    api?: string;
    constructor(error: {
        description: string;
        error: string;
        status: number;
        error_map?: {
            [key: string]: string;
        };
        headers?: object;
        base_url?: string;
    });
}
