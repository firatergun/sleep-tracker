import express from 'express';
import { getAllUsersHandler, getUserChartHandler, submitHandler } from '../handlers/tracker-handler';
import validateRequest from '../middleware/validation';
import { submitDataSchema, userIdParamsSchema } from '../schema/tracker-schema';

export const trackerRouter = express.Router();

trackerRouter.post('/submit', validateRequest(submitDataSchema),submitHandler);
trackerRouter.get('/users', getAllUsersHandler);
trackerRouter.get('/users/:userId', validateRequest(userIdParamsSchema), getUserChartHandler);