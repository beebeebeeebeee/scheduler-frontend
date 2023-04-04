import {ApiGetCalendarType, UserType} from "../types";
import axios from 'axios';
import {AppConfig} from "../configs";

const api = axios.create({
    baseURL: `${AppConfig.backend}/api/user`
})

async function getUser(signal?: AbortSignal): Promise<Array<UserType>> {
    const {data} = await api.get<Array<UserType>>('/', {
        signal
    });
    return data;
}

async function updateUser(model: UserType, signal?: AbortSignal) {
    const {data} = await api.post('/', model, {
        signal
    });
    return data;
}

export default {
    getUser,
    updateUser,
};