import express from 'express';
import { getSysDateHandler, setSysDateToOneDayAfterHandler, setSysDateToOneDayBeforeHandler } from '../handlers/properties-handler';

export const propertiesRouter = express.Router();

// For Administrative purposes only
propertiesRouter.get('/', getSysDateHandler);
propertiesRouter.post('/next', setSysDateToOneDayAfterHandler);
propertiesRouter.post('/back', setSysDateToOneDayBeforeHandler);
