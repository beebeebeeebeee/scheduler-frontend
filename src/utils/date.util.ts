import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday)
dayjs.extend(localeData)

function formatToDate(date: Date): string {
    const parsed: dayjs.Dayjs = dayjs(date);
    return `${parsed.format('DD/MM/YYYY')} (${dayjs.weekdays()[parsed.weekday()]})`;
}

export default {formatToDate};