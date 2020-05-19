export default class GemAPIError extends Error {
    description: string;
    error: string;
    code: string;
    status: number;
    error_map?: {
        [key: string]: string;
    };
    constructor(error: {
        description: string;
        error: string;
        status: number;
        code: string;
        error_map?: {
            [key: string]: string;
        };
    });
}
