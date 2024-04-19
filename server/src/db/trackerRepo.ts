import { Prisma } from "@prisma/client";
import { db } from "./config";


export const createSleepData = async (data: Prisma.SleepDataUncheckedCreateInput) => { 
    return await db.sleepData.create({
        data,
        include: {
            user: true
        }
        // select: {
        //     user: true,
        //     id: true,
        //     createdAt: true,
        //     updatedAt: true,
        //     duration: true,
        //     date: true
        // }
    });
}

export const getSleepDataForUserByDate =async (userId: number, date: Date) => {
    return db.sleepData.findMany({
        where: {
            date,
            userId
        }
    });
};
export const createUser = async (data: Prisma.UserCreateInput) => {
    return await db.user.create({
        data,
        select: {
            id: true,
            name: true,
            gender: true,
        }
    });
};

export const findUniqueByName = async (name: string) => {
    return await db.user.findUnique({
        where: {
            name
        }
    });
};

export const findUniqueUserById = async (id: number) => {
    return await db.user.findUnique({
        where: {
            id
        }
    });
};

export const findAllUsersWithSleepData = async (where?: Prisma.UserWhereInput) => {
    return await db.user.findMany({
        where,
        select: {
            id: true,
            name: true,
            gender: true,
            sleepData: true
        }
    });
};

export const findTotalSleepDurationsForLastSevenDays = async (userId: number, from: string, to: string) => {
    return await db.sleepData.groupBy({
        by: ['date'],
        where: {
            userId,
            date: {
                    gte: new Date(from),
                    lte: new Date(to)
                },
        },
        _sum: {
            duration: true
        },
        orderBy: {
            date: 'asc'
        }

        
        // select: {
        //     id: true,
        //     name: true,
        //     gender: true,
        //     sleepData: {
        //         where: {
        //             date: {
        //                 gte: new Date(from),
        //                 lte: new Date(to)
        //             },
        //         },
        //         select: {
        //             duration: true,
        //             date: true
        //         }
        //     }
        // }
    });
};
