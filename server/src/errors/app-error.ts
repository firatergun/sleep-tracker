import { BaseError } from './base-error';

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorArgs {
  statusCode: HttpCode;
  message: string;
  isOperational?: boolean;
  data?: any;
}

export class AppError extends BaseError {
  public readonly statusCode: HttpCode;

  public readonly isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    super(args.message, args.data);

    this.statusCode = args.statusCode;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}

export const NotFoundError = (description = 'NOT FOUND') =>
  new AppError({ statusCode: HttpCode.NOT_FOUND, message: description });

export const BadRequestError = (description = 'BAD REQUEST') =>
  new AppError({ statusCode: HttpCode.BAD_REQUEST, message: description });
