import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import validateRequest from '../../../middleware/validation';
import { BadRequestError } from '../../../errors/app-error';
import { submitDataSchema, userIdParamsSchema } from '../../../schema/tracker-schema';

describe('Validate request middleware', () => {
  let mRequest: Partial<Request> = {};
  const mResponse: Partial<Response> = {};
  const nextFunction: NextFunction = jest.fn();

  it('Should validate submit request and call next function', () => {
    mRequest = {
      body: {
        name: 'jane',
        gender: 'female',
        duration: '6',
      },
    };
    validateRequest(submitDataSchema)(
      mRequest as Request,
      mResponse as Response,
      nextFunction,
    );
    expect(nextFunction).toBeCalled();
  });

  it('Should validate submit request body and call next function with BadRequestError', () => {
    mRequest = {
      body: {
        name: 'jane',
        gender: 'ele', //incorrect value
        duration: '6',
      },
    };
    validateRequest(submitDataSchema)(
      mRequest as Request,
      mResponse as Response,
      nextFunction,
    );
    expect(nextFunction).toBeCalled();
    expect(nextFunction).toBeCalledWith(BadRequestError('Gender can only be male or female'));
  });

  it('Should validate userId request params and call next function with BadRequestError', () => {
    mRequest = {
      params: { userId: "a" }
    };
    validateRequest(userIdParamsSchema)(
      mRequest as Request,
      mResponse as Response,
      nextFunction,
    );
    expect(nextFunction).toBeCalled();
    expect(nextFunction).toBeCalledWith(BadRequestError('User Id has to be numeric value'));
  });

  it('Should validate userId request params and call next function', () => {
    mRequest = {
      params: { userId: '56' }
    };
    validateRequest(userIdParamsSchema)(
      mRequest as Request,
      mResponse as Response,
      nextFunction,
    );
    expect(nextFunction).toBeCalled();
  });
});
