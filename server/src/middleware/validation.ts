import { BadRequestError } from "../errors/app-error";
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        body: req.body,
        query: req.query,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        next(BadRequestError(error.errors[0].message));
      }
      next(error);
    }
  };

export default validateRequest;