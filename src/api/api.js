import axios from "axios";

export const BASE_URL = 'http://192.168.0.109:3001'
const CONN_TIMEOUT_MS = 10000

export const AbortSignalTimeout = (timeout = CONN_TIMEOUT_MS) => {
    const abortController = new AbortController();
    setTimeout(() => {
        abortController.abort()
    }, timeout)

    return abortController.signal;
}

export default axios.create({
    baseURL: BASE_URL,
})