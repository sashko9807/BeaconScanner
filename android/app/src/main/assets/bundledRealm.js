import Realm from "realm";

const firstBootSchema = {
    name: 'first-boot',
    primaryKey: "_id",
    properties: {
        _id: { type: 'int', default: 1 },
        isFirstBoot: { type: 'bool', default: true },
    }
}

const db = {
    path: 'first-boot.realm',
    schema: [firstBootSchema],
    schemaVersion: 0
}


const realm = new Realm(db)

realm.write(() => {
    realm.create('first-boot', {})
})