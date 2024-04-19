import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/app-error';
import { invalidPathHandler } from '../../../middleware/invalid-path-handler';
import { errorHandler } from '../../../errors/error-handler';
import logger from '../../../utils/logger';

describe('Invalid Path middleware', () => {
  const mRequest: Partial<Request> = {};
  const mResponse: Partial<Response> = {};
  const nextFunction: NextFunction = jest.fn();

  const errorHandlerSpy = jest.spyOn(errorHandler, 'handleError');
  const isCriticalErrorSpy = jest.spyOn(errorHandler, 'isCriticalError');
  const trustedErrorHandlerSpy = jest.spyOn(errorHandler, 'handleTrustedError');

  beforeEach(() => {
    jest.spyOn(logger, 'error').mockImplementation(jest.fn());
    jest.spyOn(logger, 'info').mockImplementation(jest.fn());
    jest.spyOn(logger, 'http').mockImplementation(jest.fn());
  });

  it('Should throw Not Found Error', () => {
    try {
      invalidPathHandler(mRequest as Request, mResponse as Response, nextFunction);
      expect(errorHandlerSpy).toBeCalled();
      expect(isCriticalErrorSpy).toBeCalled();
      expect(trustedErrorHandlerSpy).toBeCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
