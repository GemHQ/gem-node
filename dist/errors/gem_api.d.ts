export default class GemAPIError extends Error {
    description: string;
    error: string;
    code: string;
    status: number;
    constructor(error: {
        description: string;
        error: string;
        status: number;
        code: string;
    });
}
