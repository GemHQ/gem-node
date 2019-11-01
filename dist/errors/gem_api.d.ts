export default class GemAPIError extends Error {
    description: string;
    code: string;
    constructor(error: {
        description: string;
        code: string;
    });
}
