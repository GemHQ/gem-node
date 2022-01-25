export default class GemAPIError extends Error {
  description: string;
  error: string;
  status: number;
  error_map?: { [key: string]: string };
  requestId?: string;
  api?: string;

  constructor(error: {
    description: string;
    error: string;
    status: number;
    error_map?: { [key: string]: string };
    headers?: object;
    baseUrl?: string;
  }) {
    super(error.error);
    // NOTE:  Allow extension of Error class once compiled.
    Object.setPrototypeOf(this, new.target.prototype);
    this.description = error.description;
    this.error = error.error;
    this.status = error.status;
    this.error_map = error.error_map;
    this.requestId = error?.headers['x-request-id'];
    this.api = error.baseUrl;
  }
}
