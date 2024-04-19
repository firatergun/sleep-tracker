import { IExpressMiddleware } from '../utils/types';
import { NotFoundError } from '../errors/app-error';

export const invalidPathHandler: IExpressMiddleware = (request, response, next) => {
  throw NotFoundError();
};
