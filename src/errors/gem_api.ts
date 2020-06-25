export default class GemAPIError extends Error {
  description: string;
  error: string;
  status: number;
  error_map?: { [key: string]: string };

  constructor(error: {
    description: string;
    error: string;
    status: number;
    error_map?: { [key: string]: string };
  }) {
    super(error.error);
    // NOTE:  Allow extension of Error class once compiled.
    Object.setPrototypeOf(this, new.target.prototype);
    this.description = error.description;
    this.error = error.error;
    this.status = error.status;
    this.error_map = error.error_map;
  }
}
