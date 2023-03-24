import * as FileSystem from 'expo-file-system';
import * as Network from 'expo-network'

import { BASE_URL } from '../api/api';

import { saveNewResumable, deleteResumable, findAllResumables } from '../realm/downloadResumables';

const assetDir = FileSystem.documentDirectory + 'beacons/'

/**
 * Get uri of file saved in device storage
 * @param {string} fileName Name of the asset 
 * @returns file uri
 */
export const getUri = (fileName) => assetDir + fileName

/**
 * Get URL location of the asset to download
 * @param {string} fileName - Name of the asset to download
 * @returns string 
 */
const assetURL = (fileName) => `${BASE_URL}/uploads/beacons/${fileName}`



/**
 * Check if dir already exists. Create it if it doesn't.
 */
export const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(assetDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(assetDir, { intermediates: true });
    }

    return dirInfo
}

/**
 * Download file and save it to local database.
 * @param {string} fileName - Name of the file to download
 * @param {boolean} useCellular - Boolean indicating whether, the file can be downloaded through cellular data.
 * @returns `void` if file already exists, or resumable is created. `Promise` if file is downloaded successfully
 */
export const downloadAsset = async (fileName, useCellular = false) => {
    await ensureDirExists();

    const fileInfo = await FileSystem.getInfoAsync(getUri(fileName));

    if (fileInfo.exists) {
        console.log(`downloadAsset: asset already exists`);
        return;
    }

    const networkStatus = await Network.getNetworkStateAsync().catch(err => console.log(err));
    if (networkStatus.isInternetReachable && (networkStatus.type !== "CELLULAR" || useCellular)) {
        console.log(`downloadAsset: Downloading asset via WI-FI`)
        return await FileSystem.downloadAsync(assetURL(fileName), getUri(fileName))
    }

    const obj = createResumable(fileName)
    console.log(`downloadAsset: Asset couldn't be downloaded... Saving for a later try `)
    return saveNewResumable(obj)
}

/**
 * 
 * @param {string} fileName Name of the file to download
 * @returns `FileSystem.DownloadPauseState`
 */
export const createResumable = (fileName) => {
    const downloadResumable = FileSystem.createDownloadResumable(
        assetURL(fileName),
        FileSystem.documentDirectory + fileName,
        {},
    );

    return downloadResumable.savable()
}

export const downloadResumables = async (useCellular = false) => {

    const networkStatus = await Network.getNetworkStateAsync().catch(err => console.log(err));
    if (networkStatus.isInternetReachable && (networkStatus.type === 'CELLULAR' && !useCellular)) {
        return
    }
    const resumableRecords = findAllResumables();
    for (const resumable of resumableRecords) {
        const fileInfo = await FileSystem.getInfoAsync(resumable.fileUri);
        if (fileInfo.exists) {
            deleteResumable(resumable._id);
            return;
        }
        try {
            const downloadResumable = await new FileSystem.DownloadResumable(resumable.url, resumable.fileUri).resumeAsync();
            if (downloadResumable.uri) {
                deleteResumable(resumable._id)
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const retrieveSingleFile = (fileUri) => {
    return FileSystem.getInfoAsync(fileUri).then(result => result)
}

export const deleteSingleAsset = async (fileName) => {
    return await FileSystem.deleteAsync(getUri(fileName))
}

export const deleteAllAssets = async () => {
    return await FileSystem.deleteAsync(assetDir)
}