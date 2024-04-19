import { Request, Response, NextFunction } from 'express';

export type IExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;