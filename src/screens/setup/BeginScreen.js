import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

import routeNames from '../../globals/routeNames'

import { InlineButton } from '../../components/buttons'

import globalStyles from '../../globals/styles'

const BeginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontSize: globalStyles.fontSizeSet.fontLarge }]}>Hello</Text>
            <Text style={[styles.text]}>Before we continue we need to get you through a quick setup</Text>
            <View style={styles.btnBegin}>
                <InlineButton
                    onPress={() => navigation.replace(routeNames.SETUP_DOWNOAD_DATA)}
                    title={'Begin setup'}
                    width={'50%'}
                />
            </View>
        </View >
    )
}

export default BeginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: globalStyles.fontSizeSet.fontMedium,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        color: globalStyles.colorSet.gray
    },
    btnBegin: {
        marginTop: 50,
        alignItems: 'center',
    }
})