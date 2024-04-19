export class BaseError<T = unknown> extends Error {
    constructor(message: string, public data?: T) {
      super(message);
      this.name = this.constructor.name;
    }
  }