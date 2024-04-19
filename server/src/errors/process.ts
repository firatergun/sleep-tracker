import logger from '../utils/logger';
import { AppError, HttpCode } from './app-error';
import { errorHandler } from './error-handler';
import { exitHandler } from './exit-handler';

process.on('unhandledRejection', (reason: Error | any) => {
  logger.info(`Unhandled Rejection: ${reason.message || reason}`);

  throw new AppError({
    statusCode: HttpCode.INTERNAL_SERVER_ERROR,
    message: reason.message || reason,
  });
});

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught Exception: ${error.message}`);

  errorHandler.handleError(error);
});

process.on('SIGTERM', async () => {
  console.log(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
  await exitHandler.handleExit(0);
});

process.on('SIGINT', async () => {
  console.log(`Process ${process.pid} received SIGINT: Exiting with code 0`);
  await exitHandler.handleExit(0);
});