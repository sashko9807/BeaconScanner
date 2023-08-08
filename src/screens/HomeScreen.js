import { View, Text, ScrollView, Pressable } from 'react-native'
import { useEffect, useState } from 'react'


import { useScanForBeacons } from '../hooks/useScanForBeacons'
import { useLocationTurnOn } from '../hooks/useLocationTurnOn'
import { useGetBluetoothState } from '../hooks/useGetBluetoothState'
import { useRequestLocationPermission } from '../hooks/useRequestLocationPermission'
import { useShowInternetAlerts } from '../hooks/useShowInternetAlerts'

import ScanButton from '../components/ScanButton'
import { OutlineButton } from '../components/buttons'
import BeaconCard from '../components/BeaconCard'
import ApiResultModal from '../components/ApiResultModal'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import { ShowDataChargeAlert, ShowNoInternetAlert } from '../components/AlertDialog'

import { FcmForegroundHandler } from '../firebase-cloud/firebase'

import MainLayout from '../container/MainLayout'

import routeNames from '../globals/routeNames'
import globalStyles from '../globals/styles'

import { downloadResumables } from '../filesystem/filesystem'

import { useApiResultReducer, ACTIONS } from '../reducers/apiResultReducer'

import { resumablesAddListener, resumablesRemoveListener } from '../realm/downloadResumables'

const LocationDisabled = ({ onPress }) => {
    return (
        <MainLayout>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: globalStyles.fontSizeSet.fontRegular, textAlign: 'center' }}>Location needs to be enabled in order to scan for beacons</Text>
                </View>
                <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
                    <OutlineButton
                        title="Turn on"
                        onPress={onPress}
                    />
                </View>
            </View>
        </MainLayout>
    )
}
const PermissionNotGranted = ({ onPress }) => {
    return (
        <MainLayout>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: globalStyles.fontSizeSet.fontRegular, textAlign: 'center' }}>Ranging for beacons requires location permission to be granted</Text>
                <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
                    <OutlineButton
                        title="Prompt for permission"
                        onPress={onPress}
                    />
                </View>
            </View>
        </MainLayout>
    )
}

const BluetoothDisabled = ({ onPress }) => {
    return (
        <MainLayout>
            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: globalStyles.fontSizeSet.fontRegular, textAlign: 'center' }}>Bluetooth needs to be enabled in order to scan for beacons</Text>
                <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
                    <OutlineButton
                        title="Turn on"
                        onPress={onPress}
                        width={"100%"} />
                </View>
            </View>
        </MainLayout>
    )
}

const ExistingResumables = ({ onPress }) => (
    <View style={{ flex: 0.15, alignItems: 'center', borderBottomColor: globalStyles.colorSet.darkYellow, borderBottomWidth: 1, backgroundColor: globalStyles.colorSet.lightYellow, }}>
        <View style={{ width: '90%', height: '100%' }}>
            <Text>Some files couldn't be updated properly</Text>
            <Pressable onPress={onPress}><Text style={{ color: 'blue', fontSize: 20 }}>Update Now</Text></Pressable>
        </View>
    </View>
)
const HomeScreen = ({ navigation }) => {

    const [store, dispatch] = useApiResultReducer();
    const [beaconsInRange, scan, { isScanning }] = useScanForBeacons();

    const [enabled, requestResolution] = useLocationTurnOn()
    const [permissionStatus, isGranted, requestPermission] = useRequestLocationPermission();

    const [bluetoothEnabled, requestToEnable] = useGetBluetoothState();
    const [showWarning, setShowWarning] = useState(false)
    const [checkConnectionStatus, resetModalState, alert] = useShowInternetAlerts()

    useEffect(() => {
        const unsubscribe = FcmForegroundHandler();

        const onResumableChange = (resumable, changes) => {
            if (resumable.length > 0) {
                setShowWarning(() => true)
                return;
            }
            console.log(`show warning is ${showWarning}`)
            if (resumable.length === 0) {
                setShowWarning(() => false);
                return;
            }
        }

        try {
            resumablesAddListener(onResumableChange)
        } catch (err) {
            console.log(err)
            resumablesRemoveListener()
        }
        isGranted();
        return () => {
            unsubscribe;
            resumablesRemoveListener()
        };
    }, []);

    useEffect(() => {
        console.log(enabled)
    }, [enabled])
    const updateBeaconData = async (useCellular = false) => {
        const abortDownload = await checkConnectionStatus(useCellular);
        console.log(`should abort download ${JSON.stringify(abortDownload)}`)
        if (abortDownload) {
            console.log(`download aborted`);
            return
        };
        dispatch({ type: ACTIONS.BEGIN_DOWNLOAD })
        try {
            await downloadResumables(useCellular)
            dispatch({ type: ACTIONS.SUCCESS, status: "Success", message: 'Beacon data has been successfully updated' })
        } catch (err) {
            dispatch({ type: ACTIONS.ERROR, status: err.status, message: err.data })
            console.log(err)
        }
    }
    if (!permissionStatus) return <PermissionNotGranted onPress={() => requestPermission()} />
    if (!enabled) return <LocationDisabled onPress={() => requestResolution()} />
    if (!bluetoothEnabled) return <BluetoothDisabled onPress={() => requestToEnable()} />

    return (
        <MainLayout>
            {showWarning && <ExistingResumables onPress={() => updateBeaconData()} />}
            <ScrollView style={{ flex: 1 }}>
                {beaconsInRange.map((beacon) => {
                    return (
                        <View key={beacon._id}>
                            <BeaconCard
                                beaconData={{
                                    beaconName: beacon.name,
                                    distance: beacon.distance
                                }}
                                onPress={() => navigation.navigate(routeNames.SHOW_BEACON_DATA, { dataType: beacon.dataType, data: beacon.data })}
                            />
                        </View>
                    )
                })}
            </ScrollView>
            <ScanButton onPress={() => isScanning()} isScanning={scan} />
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
                onContinue={() => { updateBeaconData(true); }}
                onDismiss={() => { resetModalState() }}
            />
        </MainLayout>
    );
};

export default HomeScreen