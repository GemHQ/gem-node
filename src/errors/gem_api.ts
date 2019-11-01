export default class GemAPIError extends Error {
  description: string;
  code: string;

  constructor(error: { description: string; code: string }) {
    super(error.code);
    // NOTE:  Allow extension of Error class once compiled.
    Object.setPrototypeOf(this, new.target.prototype);
    this.description = error.description;
    this.code = error.code;
  }
}
