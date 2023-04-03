import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday)
dayjs.extend(localeData)

function formatToDate(date: Date): string {
    const parsed: dayjs.Dayjs = dayjs(date);
    return `${parsed.format('DD/MM/YYYY')} (${dayjs.weekdays()[parsed.weekday()]})`;
}

function dateToData(date: Date): string {
    const parsed: dayjs.Dayjs = dayjs(date);
    return `${parsed.format('YYYY-MM-DD')}`;
}

function dataToDate(date: string): Date {
    return new Date(`${date} 00:00:00`);
}

export default {
    formatToDate,
    dateToData,
    dataToDate,
};
