import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import routeNames from '../../globals/routeNames'
import globalStyles from '../../globals/styles'

import { OutlineButton, InlineButton } from '../../components/buttons'

import { useRequestLocationPermission } from '../../hooks/useRequestLocationPermission'

const RequestPermScreen = ({ navigation }) => {
    const [permissionStatus, isGranted, requestPermission] = useRequestLocationPermission()
    console.log(isGranted())
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ minHeight: '40%' }}>
                {/*TODO: Show a cool image*/}
            </View>
            <View>
                <Text style={[styles.text, { fontSize: globalStyles.fontSizeSet.fontLarge }]}>Location Permission Request</Text>
                <Text style={[styles.text, { marginTop: 10, paddingHorizontal: 15 }]}>Ranging for beacons requires location permission to be granted </Text>
            </View>
            <View style={styles.buttons}>
                <OutlineButton
                    onPress={() => console.log(`Show warning`)}
                    title={'Cancel'}
                    width={'45%'}
                    borderRadius={25} />
                <InlineButton
                    onPress={() => isGranted() ? navigation.navigate(routeNames.SETUP_FINISHED) : requestPermission()}
                    title={isGranted() ? 'Continue' : 'Prompt'} width={'45%'}
                    borderRadius={25} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalAction: {
        minWidth: '100%',
        justifyContent: 'center',
    },
    modalActionBtn: {
        alignItems: 'center',
        borderColor: globalStyles.colorSet.PRIMARY,
        borderTopWidth: 0.5,
    },
    modalActionBtnTxt: {
        paddingVertical: 8,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        fontSize: globalStyles.fontSizeSet.fontMedium,
        color: globalStyles.colorSet.PRIMARY,
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

export default RequestPermScreen