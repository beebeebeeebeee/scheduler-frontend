import {CalendarType, ApiCalendarType} from "../types";
import axios from 'axios';
import {AppConfig} from "../configs";

const api = axios.create({
    baseURL: `${AppConfig.backend}/api/scheduler`
})

async function getCalendar(signal?: AbortSignal): Promise<Array<CalendarType>> {
    const {data} = await api.get<Array<CalendarType>>('/', {
        signal
    });
    return data;
}

async function createCalendar(model: ApiCalendarType, signal?: AbortSignal) {
    const {data} = await api.post('/', model, {
        signal
    });
    return data;
}

async function updateCalendar(id: number, model: ApiCalendarType, signal?: AbortSignal) {
    const {data} = await api.patch(`/${id}`, model, {
        signal
    });
    return data;
}

async function deleteCalendar(id: number, signal?: AbortSignal) {
    const {data} = await api.delete(`/${id}`, {
        signal
    });
    return data;
}

export default {
    getCalendar,
    createCalendar,
    updateCalendar,
    deleteCalendar,
};