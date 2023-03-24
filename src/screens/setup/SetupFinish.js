import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import routeNames from '../../globals/routeNames'
import { setupWizardCompleted } from '../../realm/firstBoot'
import globalStyles from '../../globals/styles'
import { InlineButton } from '../../components/buttons'
import { ACTIONS, useApiResultReducer } from '../../reducers/apiResultReducer'
import { retrieveToken } from '../../firebase-cloud/firebase'
import { sendTokenToServer } from '../../api/fcmToken'
import ApiResultModal from '../../components/ApiResultModal'

const SetupFinish = ({ navigation }) => {
    const [store, dispatch] = useApiResultReducer()

    const setupWizardIsCompleted = async () => {
        const fcmToken = await retrieveToken();
        const response = await sendTokenToServer(fcmToken).catch(error => {
            if (error.response) {
                dispatch({ type: ACTIONS.ERROR, status: 'Something happened', message: "Something went wrong" })
            } else if (error.request) {
                dispatch({ type: ACTIONS.ERROR, status: '500', message: `Couldn't connect to server` })
            }
        })
        console.log(response)
        if (response.status === 200) {
            setupWizardCompleted();
            navigation.reset({ index: 0, routes: [{ name: routeNames.HOME }] });
            console.log(`This is reached.`)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.greetingMessage}>
                <Text style={[styles.text, { fontSize: globalStyles.fontSizeSet.fontLarge }]}>Setup finished</Text>
                <Text style={[styles.text, { marginTop: 10, paddingHorizontal: 20 }]}>Before you launch the application, we need to inform you that due to OS restrictions, your LOCATION needs to
                    turned on whenever you want range for BLE beacons.</Text>
                <Text></Text>
            </View>
            <InlineButton
                onPress={() => setupWizardIsCompleted()}
                title={'Launch app'}
                width={'40%'}
            />
            <ApiResultModal
                isVisible={store.showResultModal}
                title={store.title}
                message={store.message}
                onConfirm={() => dispatch({ type: ACTIONS.HIDE_MODAL })}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%'
    },
    greetingMessage: {
        marginVertical: 100,
    },
    text: {
        textAlign: 'center',
        fontSize: globalStyles.fontSizeSet.fontMedium,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        color: globalStyles.colorSet.gray
    },
    btnBegin: {
        justifyContent: 'center',
    }
})

export default SetupFinish