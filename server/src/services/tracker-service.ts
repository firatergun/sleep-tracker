import { getPropertyByName } from "../db/propertiesRepo";
import { createUser, findAllUsersWithSleepData, findTotalSleepDurationsForLastSevenDays, findUniqueByName, findUniqueUserById } from "../db/trackerRepo";
import { SubmitDataInput } from "../schema/tracker-schema"
import { SYS_DATE } from "../utils/const";
import { formatDate, getDatesBetween, getNDaysBefore } from "../utils/utils";
import logger from "../utils/logger";
import { createSleepData, getSleepDataForUserByDate } from "../db/trackerRepo";
import { BadRequestError, NotFoundError } from "../errors/app-error";
import { isEqual } from "date-fns";
import { Properties } from "@prisma/client";

export const submitService = async (input: SubmitDataInput['body']) => {
    logger.info("submitService called");
    const { name, gender, duration } = input;

    const user = await findUniqueByName(name);
    // Get SYS_DATE
    const { value: sysDate } = await getPropertyByName(SYS_DATE) as Properties;
    
    if (!user) {
        //User not Found
        logger.info("User not found, creating user with log");
        logger.info(input);
        return await createUserWithSleepData(name, gender, duration, sysDate);
    }    
    // Get total logged sleep time for date
    const loggedInData = await getSleepDataForUserByDate(user.id, new Date(sysDate));
    const totalSleepDuration = loggedInData.reduce((sum, data) => {
        return sum += data.duration;
    }, 0);
    // Check total logged Sleep time to not extend 24 hours
    if ((totalSleepDuration + parseInt(duration)) > 24) {
        throw BadRequestError("Cannot log more then 24 hour per day");
    }
    // Log new sleep time
    return await createSleepData(sleepDataInput(parseInt(duration), user.id, sysDate));
}

export const sleepDataInput = (duration: number, userId: number, date: string) => { 
    return { duration, date: new Date(date), userId }
}

export const createUserWithSleepData = async (name: string, gender: string, duration: string, sysDate: string) => {
    // TODO: Move to Tracker-repo as db transaction
    const user = await createUser({ name, gender });
    return await createSleepData(sleepDataInput(parseInt(duration), user.id, sysDate));
}

export const getUsersDataService = async () => {
    const allUsers = await findAllUsersWithSleepData();

    const allLoggedData = allUsers.map(data => {
        return {
            ...data,
            sleepData: data.sleepData.length
        }
    });

    return allLoggedData;
}

export const getUserChartDataService = async (userId : number) => {
    // Get SYS_DATE
    logger.info("getUserChartDataService called...")
    const { value: sysDate } = await getPropertyByName(SYS_DATE) as {name: string, value: string};

    const user = await findUniqueUserById(userId);
    if (!user) {
        throw NotFoundError('Not Found');
    }
    // Get date on 7 before
    const sevenDaysBeforeDate = getNDaysBefore(sysDate, 7);

    // Get dates for last 7 days
    const datesBetween = getDatesBetween(sevenDaysBeforeDate, sysDate, true);

    // Query sleepdata for users last 7 days
    const lastSeven = await findTotalSleepDurationsForLastSevenDays(userId, sevenDaysBeforeDate, sysDate);
   
    // Map over sleepData and sum total per day
    const durations = datesBetween.map((date) => {
        const value = lastSeven?.find((s) => isEqual(date, s.date));
        if (!value) { //User may not have sleep log for that date
            return 0;
        }
        return value!._sum.duration;
    });
    return {
        name: user.name,
        gender: user.gender,
        dates: datesBetween.map(date => formatDate(date)),
        durations
    };
}