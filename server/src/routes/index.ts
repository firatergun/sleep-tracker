import express from 'express';
import { statusRouter } from './status-router';
import { trackerRouter } from './tracker-router';

const routes = express.Router();

//Route base url definitions 
routes.use('/status', statusRouter);
routes.use('/admin', trackerRouter);
routes.use('/', trackerRouter);

export default routes;