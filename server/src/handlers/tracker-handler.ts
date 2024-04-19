import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../errors/app-error';
import { getUserChartDataService, getUsersDataService, submitService } from '../services/tracker-service';
import { SubmitDataInput, UserIdParams } from '../schema/tracker-schema';
import logger from '../utils/logger';

export const submitHandler = async (req: Request<{}, {}, SubmitDataInput['body']>, res: Response, next: NextFunction) => {
    try {
        logger.info("Submit handler called");
        const body = req.body;
        const resp = await submitService({...body});
        res.status(HttpCode.CREATED).json(resp);    
    } catch (e) {
        next(e);
    }
};

export const getAllUsersHandler =async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    try {
        const data = await getUsersDataService();
        res.status(HttpCode.OK).json(data);
    } catch (e) {
        next(e);
    }
}

export const getUserChartHandler = async (req: Request<UserIdParams['params']>, res: Response, next: NextFunction) => {
    try {
        logger.info("getUserChartHandler called...")
        const { userId } = req.params;
        const data = await getUserChartDataService(parseInt(userId))
        res.status(HttpCode.OK).json(data);
    } catch (e) {
        next(e);
    }
}