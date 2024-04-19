import winston from 'winston';

const level = () => (process.env.NODE_ENV === 'production' ? 'http' : 'debug');

const logger = winston.createLogger({
  level: level(),
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

export default logger;