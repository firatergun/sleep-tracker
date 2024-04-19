import morgan from 'morgan';
import logger from '../utils/logger';

export const requestLogger = morgan(
  (tokens, req, res) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res) || ''),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(tokens['response-time'](req, res) || '0'),
    });
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        logger.http(`incoming-request`, data);
      },
    },
  },
);
