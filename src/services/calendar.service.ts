import {CalendarType, ApiCalendarType, ApiGetCalendarType} from "../types";
import axios from 'axios';
import {AppConfig} from "../configs";

const api = axios.create({
    baseURL: `${AppConfig.backend}/api/scheduler`
})

async function getCalendar(signal?: AbortSignal): Promise<Array<ApiGetCalendarType>> {
    const {data} = await api.get<Array<ApiGetCalendarType>>('/', {
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