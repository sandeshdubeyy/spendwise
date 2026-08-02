import Holidays from "date-holidays";

const hd = new Holidays("IN");

export const getIndianHolidays = (year: number): { date: string; name: string }[] => {
    const holidays = hd.getHolidays(year);

    return holidays
        .filter((holiday) => holiday.type === "public")
        .map((holiday) => ({
            date: holiday.date.slice(0, 10), // "YYYY-MM-DD"
            name: holiday.name,
        }));
};