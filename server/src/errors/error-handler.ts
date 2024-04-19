/* eslint-disable class-methods-use-this */
import { NextFunction, Response } from 'express';
import { AppError, HttpCode } from './app-error';
import { exitHandler } from './exit-handler';
import logger from '../utils/logger';

class ErrorHandler {
  public handleError(error: Error, response?: Response, next?: NextFunction): void {
    logger.error(error);
    if (response && this.isCriticalError(error)) {
      this.handleTrustedError(error, response);
    } else {
      this.handleUntrustedError(error, response);
    }
  }

  isCriticalError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return true;
  }

  handleTrustedError(error: Error, response: Response): void {
    let responseObj: any;
    let status: number;

    console.log('handleTrustedError called!...');
    console.log(error);

    if (error instanceof AppError) {
      status = error.statusCode;
      responseObj = {
        status,
        message: error.message,
      };
    } else {
      const hasStatusCode = 'statusCode' in error;
      status = hasStatusCode
        ? (error.statusCode as number)
        : HttpCode.INTERNAL_SERVER_ERROR;
      responseObj = {
        status,
        message: error.message || 'Internal server error',
      };
    }
    logger.error(`Responding to error with ${JSON.stringify(responseObj)}`);
    response.status(status).send(responseObj);
      // .json({ ...responseObj });
  }

  handleUntrustedError(error: Error | AppError, response?: Response): void {
    if (response) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }

    logger.info('Application encountered an critical error...');
    exitHandler.handleExit(1);
  }
}

export const errorHandler = new ErrorHandler();
