export default class GemAPIError extends Error {
  description: string;
  error: string;
  // NOTE: code has been deprecated in favor of error
  // but left for backwards compatibility.
  code: string;
  status: number;
  error_map?: { [key: string]: string };

  constructor(error: {
    description: string;
    error: string;
    status: number;
    code: string;
    error_map?: { [key: string]: string };
  }) {
    super(error.error || error.code);
    // NOTE:  Allow extension of Error class once compiled.
    Object.setPrototypeOf(this, new.target.prototype);
    this.description = error.description;
    this.error = error.error;
    this.code = error.code;
    this.status = error.status;
    this.error_map = error.error_map;
  }
}
