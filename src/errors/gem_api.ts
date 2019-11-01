export default class GemAPIError extends Error {
  description: string;
  code: string;
  status: number;

  constructor(error: { description: string; code: string; status: number }) {
    super(error.code);
    // NOTE:  Allow extension of Error class once compiled.
    Object.setPrototypeOf(this, new.target.prototype);
    this.description = error.description;
    this.code = error.code;
    this.status = error.status;
  }
}
