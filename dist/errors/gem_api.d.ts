export default class GemAPIError extends Error {
    description: string;
    code: string;
    status: number;
    constructor(error: {
        description: string;
        code: string;
        status: number;
    });
}
