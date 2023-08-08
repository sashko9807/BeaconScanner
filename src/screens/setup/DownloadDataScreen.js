import { StyleSheet, Text, View, Linking } from 'react-native'
import { useState } from 'react'

import RNExitApp from 'react-native-exit-app'

import { InlineButton, OutlineButton } from '../../components/buttons'

import { useShowInternetAlerts } from '../../hooks/useShowInternetAlerts'

import { ShowDataChargeAlert, ShowNoInternetAlert } from '../../components/AlertDialog'
import ApiResultModal from '../../components/ApiResultModal'
import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent'

import { addOrUpdateRecord } from '../../realm/beacon'
import { downloadAsset } from '../../filesystem/filesystem'

import { ACTIONS, useApiResultReducer } from '../../reducers/apiResultReducer'

import globalStyles from '../../globals/styles'
import routeNames from '../../globals/routeNames'
import { fetchBeacons } from '../../api/beacons'
import { showBeaconRecords } from '../../realm/beacon'
import { RequiredAlert } from '../../components/AlertDialog'


const DownloadScren = ({ navigation }) => {

    const [store, dispatch] = useApiResultReducer();
    const [checkConnectionStatus, resetModalState, alert] = useShowInternetAlerts()
    const [showRequiredAlert, setShowRequiredAlert] = useState(false)

    const openWifiSettings = () => {
        Linking.sendIntent("android.settings.WIFI_SETTINGS");
        resetModalState();
    }

    const downloadData = async (useCellular = false) => {
        const abortDownload = await checkConnectionStatus(useCellular);
        if (abortDownload) return
        const beaconRecord = showBeaconRecords();
        console.log(`this is passed for some reason`)
        dispatch({ type: ACTIONS.BEGIN_DOWNLOAD })
        try {
            const beacons = await fetchBeacons();
            for (const beacon of beacons.data) {
                addOrUpdateRecord(beacon, beaconRecord.length > 0 && 'all')
                if (beacon.dataType === "image") {
                    await downloadAsset(beacon.data, true)
                }
            }
            dispatch({ type: ACTIONS.SUCCESS, status: beacons.status, message: 'Download has been completed successfully' })
        } catch (err) {
            dispatch({ type: ACTIONS.ERROR, status: err.status, message: err.data })
            console.log(err.data)
        }
    }


    return (
        <>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ minHeight: '40%' }}>
                    {/** INSERT COOL IMAGE HERE*/}
                </View>
                <View>
                    <Text style={[styles.text, { fontSize: globalStyles.fontSizeSet.fontLarge }]}>Data download</Text>
                    <Text style={[styles.text, { marginTop: 10, paddingHorizontal: 15 }]}>This application requires additional data to be downloaded so it can work without active internet connection</Text>
                </View>
                <View style={styles.buttons}>
                    <OutlineButton
                        onPress={() => setShowRequiredAlert(true)}
                        title={'Cancel'}
                        width={"45%"}
                        borderRadius={25} />
                    <InlineButton
                        onPress={() => store.isSuccess ? navigation.navigate(routeNames.SETUP_REQUEST_PERM) : downloadData()}
                        title={store.isSuccess ? 'Continue' : 'Download'}
                        width={"45%"}
                        borderRadius={25} />

                </View>
            </View>
            <ApiResultModal
                isVisible={store.isLoading}
                title={''}
                message={
                    <ActivityIndicatorComponent text="Downloading" />
                }
            />
            <ApiResultModal
                isVisible={store.showResultModal}
                title={store.title}
                message={store.message}
                onConfirm={() => dispatch({ type: ACTIONS.HIDE_MODAL })}
            />
            <ShowNoInternetAlert
                isVisible={alert.showNoInternetAlert}
                onTurnWifi={() => { openWifiSettings(); }}
                onDismiss={() => resetModalState()}
            />
            <ShowDataChargeAlert
                isVisible={alert.showDataChargeAlert}
                onTurnWifi={() => { openWifiSettings(); }}
                onContinue={() => { downloadData(true); }}
                onDismiss={() => { resetModalState() }}
            />
            <RequiredAlert
                isVisible={showRequiredAlert}
                onExit={() => RNExitApp.exitApp()}
                onCancel={() => setShowRequiredAlert(false)} />
        </>
    )
}

export default DownloadScren

const styles = StyleSheet.create({
    modalAction: {
        minWidth: '100%',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: globalStyles.fontSizeSet.fontMedium,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        color: globalStyles.colorSet.gray
    },
    buttons: {
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: '2%',
    },
})