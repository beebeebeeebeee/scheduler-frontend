import axios from 'axios'
import {GovHolidayApiType, GovHolidayApiVeventType} from "../types";
import {AppConfig} from "../configs";

const api = axios.create({
    baseURL: `${AppConfig.backend}/api/holiday`
})

async function getHoliday(signal?: AbortSignal): Promise<GovHolidayApiVeventType[]> {
    return (await api.get<GovHolidayApiType>('/', {
        signal
    })).data.vcalendar[0].vevent
}

export default {getHoliday};