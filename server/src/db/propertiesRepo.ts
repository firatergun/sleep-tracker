import { Prisma } from "@prisma/client";
import { db } from "./config";

export const createProperty =async (data: Prisma.PropertiesCreateInput) => {
    return await db.properties.create({
        data
    });
}
export const getPropertyByName = async (name: string) => {
    return await db.properties.findUnique({
        where: {
            name
        },
        select: {
            name: true,
            value: true
        }
    })
};

export const updatePropertyByName =async (data: Prisma.PropertiesUpdateInput, name: string) => {
    return await db.properties.update({
        where: {
            name
        },
        data,
    })
}