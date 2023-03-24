import messaging from '@react-native-firebase/messaging'
import { findBeaconByID, deleteBeaconRecord, addOrUpdateRecord } from '../realm/beacon'
import { downloadAsset, deleteSingleAsset } from '../filesystem/filesystem'

/**
 * Retrieve FCM generated token
 * @returns FCM token if Promise is successfull
 */
export const retrieveToken = async () => {
    return await messaging().getToken()
}

/**
 * Set of commands responsible for updating local database on received push notifications.
 * @param data Payload data of received push notification
 */

export const onReceivedPushCommandSet = async (data) => {

    if (data.dataType === "image") {
        await downloadAsset(data.data)
    }

    if (data.operation === "remove") {
        const beacon = findBeaconByID(data._id)
        console.log(`Delete command received`)
        if (beacon.dataType === 'image') {
            console.log(`Beacon is deleted. Deleting asset...`)
            await deleteSingleAsset(beacon.data).catch(err => err)
        }
        deleteBeaconRecord(data.beaconID)
        return

    }

    if (data.operation === "update") {
        console.log(`Update command received`)
        console.log(data._id)
        const beacon = findBeaconByID(data._id)
        console.log(beacon)
        if (beacon.dataType === "image" && data.data !== beacon.data) {
            console.log(`Beacon transmitted data has changed. Delete asset..`)
            await deleteSingleAsset(beacon.data).catch(err => err)
        }

        addOrUpdateRecord(data, "all")
        return
    }

    if (data.operation === "add") {
        addOrUpdateRecord(data)
        return
    }
}

/**
 * Look for received push notifications when application is in foreground state
 */
export const FcmForegroundHandler = () => {
    messaging().onMessage(async remoteMessage => {
        await onReceivedPushCommandSet(remoteMessage.data)
    });
}


/**
 * Look for received push notifications when application is in background state
 */
export const FcmBackgroundHandler = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        await onReceivedPushCommandSet(remoteMessage.data)
    });
}