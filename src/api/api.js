import axios from "axios";
import { API_URL, CDN_SERVER_URL } from "@env"

export const BASE_URL = API_URL
export const CDN_URL = CDN_SERVER_URL
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