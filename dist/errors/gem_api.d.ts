export default class GemAPIError extends Error {
    description: string;
    error: string;
    status: number;
    error_map?: {
        [key: string]: string;
    };
    constructor(error: {
        description: string;
        error: string;
        status: number;
        error_map?: {
            [key: string]: string;
        };
    });
}
