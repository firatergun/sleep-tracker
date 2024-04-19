import dotenv from "dotenv";
dotenv.config();
import 'reflect-metadata'
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import { invalidPathHandler } from './middleware/invalid-path-handler';
import { errorHandler } from './errors/error-handler';
import { requestLogger } from './middleware/request-logger';

import { db } from "./db/config";
import cookieParser from "cookie-parser";

export const app: Application = express();
async function createServer() {
  await db.$connect();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(requestLogger);
  
  app.use(routes);

  app.use(cookieParser());

  app.use(invalidPathHandler);
  
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res, next);
  });
}
createServer();