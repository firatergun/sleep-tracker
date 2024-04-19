import express from 'express';
import { getStatusHandler } from '../handlers/status-handler';

export const statusRouter = express.Router();

statusRouter.get('/', getStatusHandler);