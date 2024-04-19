import { addDays, format, subDays } from "date-fns";
import { SYS_DATE_FORMAT } from "./const";

export const getDatesBetween = (start: string, end: string, includeEndDate=false) => {
    const dates = [];
    const date = new Date(start);
    while ((includeEndDate ? (date <= new Date(end)) : (date < new Date(end)))) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

export const getNDaysBefore = (from: string, n: number) => {
    return formatDate(subDays(new Date(from), n));
}

export const getNDaysAfter = (from: string, n: number) => {
    return formatDate(addDays(new Date(from), n));
}

export const formatDate = (date: Date) => {
    return format(date, SYS_DATE_FORMAT);
}