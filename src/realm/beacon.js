import Realm from "realm";

const { ObjectID } = Realm.BSON

const SCHEMA_NAME = 'beacons'

const beaconDataSchema = {
    name: "beaconData",
    embedded: true,
    properties: {
        UUID: 'string',
        major: 'string',
        minor: 'string'
    }
}

const beaconSchema = {
    name: SCHEMA_NAME,
    primaryKey: "_id",
    properties: {
        _id: "objectId",
        beaconData: "beaconData",
        name: 'string',
        dataType: "string",
        data: "string",
    },
};

const db = {
    path: `${SCHEMA_NAME}.realm`,
    schema: [beaconSchema, beaconDataSchema]
}

export const realm = new Realm(db)

/**
* Add new `record ` or `update` existing record to the beacons schema
* @param data Array of objects containing the beacons data to be saved
* @param updateMode  Optional update mode. It can be one of the following values:
*
*`'never'` - Objects are only created. If an existing object exists, an exception is thrown. 
*
*`'modified'` - If an existing object exists, only properties where the value has actually changed will be updated.
*
*`'all'` - If an existing object is found, all properties provided will be updated, any other properties will remain unchanged.
*
*/

export const addOrUpdateRecord = (data, updateMode = Realm.UpdateMode.Never) => {
    realm.write(() => {
        realm.create(SCHEMA_NAME, {
            _id: ObjectID(data._id),
            beaconData: data.beaconData,
            name: data.name,
            dataType: data.dataType,
            data: data.data
        }, updateMode)
    })
}

export const showBeaconRecords = () => {
    return realm.objects(SCHEMA_NAME)
}

/**
 * Find beacon by  its id property
 * 
 * @param  recordID - ID of the beacon schema record
 */

export const findBeaconByID = (recordID) => {
    return realm.objects(SCHEMA_NAME).filtered("_id == $0", ObjectID(recordID))[0]
}

/**
 * Deletes a single record from beacons database
 * 
 * @param  recordID - Unique id of a realm record to be deleted from beacon schema
 */
export const deleteBeaconRecord = (recordID) => {
    realm.write(() => {
        const beacon = findBeaconByID(recordID)
        realm.delete(beacon)
    })
}


export const findBeaconByIdentifiers = (beaconData) => {
    const beacon = realm
        .objects(SCHEMA_NAME)
        .filtered("beaconData.major == $0 && beaconData.minor == $1 && beaconData.UUID == $2",
            beaconData.major, beaconData.minor, beaconData.uuid)
    return beacon;
} 
