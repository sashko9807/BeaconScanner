import Realm from "realm";

const { UUID } = Realm.BSON
const SCHEMA_NAME = 'downloadResumables'

const downloadSchema = {
    name: SCHEMA_NAME,
    primaryKey: "_id",
    properties: {
        _id: { type: 'uuid' },
        url: { type: "string" },
        fileUri: { type: "string" }
    }
}

const db = {
    path: `${SCHEMA_NAME}.realm`,
    schema: [downloadSchema],
    schemaVersion: 0
}

export const resumablesDB = new Realm(db)

/**
 * Create resumable record to downloadResumables database
 * @param {FileSystem.DownloadPauseState} obj Object containing resumable data to be saved
 */
export const saveNewResumable = (obj) => {
    resumablesDB.write(() => {
        resumablesDB.create(SCHEMA_NAME, { _id: new UUID(), ...obj })
    })
}



/**
 * Find resumable record by its ID.
 * @param {uuid} id ID of the record
 * @returns Realm.Result
 */
const findResumableByID = (id) => {
    return resumablesDB.objects(SCHEMA_NAME).filtered("_id == $0", id)
}

/**
 * Find all records
 * @returns Realm.Result
 */
export const findAllResumables = () => {
    return resumablesDB.objects(SCHEMA_NAME)
}

export const getResumablesLength = () => {
    return resumablesDB.objects(SCHEMA_NAME).length
}

/**
 * Delete resumable record from database
 * @param {uuid} id ID of the record to be deleted
 */
export const deleteResumable = (id) => {
    resumablesDB.write(() => {
        const recordID = findResumableByID(id)
        resumablesDB.delete(recordID)
    })

}


export const resumablesAddListener = (callbackFn) => {
    const resumables = resumablesDB.objects(SCHEMA_NAME)
    resumables.addListener(callbackFn)
}


export const resumablesRemoveListener = () => {
    const resumables = resumablesDB.objects(SCHEMA_NAME)
    resumables.removeAllListeners();
}