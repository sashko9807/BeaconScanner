import Realm from "realm";

const SCHEMA_NAME = 'setupwizard'

const firstBootSchema = {
    name: SCHEMA_NAME,
    primaryKey: "_id",
    properties: {
        _id: { type: 'int', default: 1 },
        showSetup: { type: 'bool', default: false }
    }
}

const db = {
    path: `${SCHEMA_NAME}.realm`,
    schema: [firstBootSchema],
    onFirstOpen: (realm) => {
        realm.create(SCHEMA_NAME, { _id: 1, showSetup: true })
    },
    schemaVersion: 0
}

const realm = new Realm(db)


/**
 * Check whether the setupwizard should be shown to user or not.
 * @returns 
 */
export const showSetupWizard = () => {
    return realm.objects(SCHEMA_NAME)[0].showSetup
}


/**
 * Mark the setup wizard as completed, so it wont be shown again.
 */
export const setupWizardCompleted = () => {
    realm.write(() => {
        realm.create(SCHEMA_NAME, { showSetup: false }, 'modified')
    })
}