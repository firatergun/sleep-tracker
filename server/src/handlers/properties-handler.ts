import { db } from "db/config";
import { getPropertyByName, updatePropertyByName } from "db/propertiesRepo";
import { HttpCode } from "errors/app-error";
import { Request, Response, NextFunction } from "express";
import { SYS_DATE } from "utils/const";
import { getNDaysAfter, getNDaysBefore } from "utils/utils";

export const getSysDateHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prop = await getPropertyByName(SYS_DATE);
        res.status(HttpCode.OK).json(prop);
    } catch (e) {
        next(e)
    }
};

export const setSysDateToOneDayAfterHandler =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingDate = await getPropertyByName(SYS_DATE);
        const newSysDate = getNDaysAfter(existingDate?.value!, 1);
        const prop = await updatePropertyByName({ value: newSysDate }, SYS_DATE);
        return res.status(HttpCode.CREATED).json(prop);    
    } catch (e) {
        next(e)
    }
}

export const setSysDateToOneDayBeforeHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingDate = await getPropertyByName(SYS_DATE);
        const newSysDate = getNDaysBefore(existingDate?.value!, 1);
        const prop = await updatePropertyByName({ value: newSysDate }, SYS_DATE);
        return res.status(HttpCode.CREATED).json(prop);
    } catch (e) {
        next(e)
    }
}