import api, { AbortSignalTimeout } from "./api";

export const fetchBeacons = async () => {
    return await api.get('/beacons/fetchAll', { signal: AbortSignalTimeout() }).catch(err => {
        if (err.message === "canceled") {
            const status = "Connection timeout"
            const data = "Connection to server could not be made in the specified time"
            return Promise.reject({ status, data })
        }
    })
}