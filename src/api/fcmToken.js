import api from "./api";

export const sendTokenToServer = async (fcmToken) => {
    const response = await api.post('/fcmToken', { token: fcmToken })
    return response;
}