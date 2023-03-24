import { View, Text, Pressable, StyleSheet } from 'react-native';
import globalStyles from '../globals/styles'

export const InlineButton = ({ onPress, title = "NO TITLE", width = '80%', height = 0, borderRadius = 0 }) => {
    return (
        <View style={[styles.imgButtonContainer, { width: width, height: height, }]}>
            <Pressable onPress={onPress} style={[styles.buttonInline, { borderRadius: borderRadius }]}>
                <Text style={styles.buttonInlineText}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};

export const OutlineButton = ({ onPress, title = "NO TITLE", width = '80%', height = 0, borderRadius = 0 }) => {
    return (
        <View style={[styles.imgButtonContainer, { width: width, height: height, }]}>
            <Pressable onPress={onPress} style={[styles.buttonOutline, { borderRadius: borderRadius }]}>
                <Text style={styles.buttonOutlineText}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    imgButtonContainer: {
        minHeight: 50,
        maxWidth: 250
    },

    buttonInline: {
        backgroundColor: globalStyles.colorSet.PRIMARY,
        borderColor: globalStyles.colorSet.PRIMARY,
        borderWidth: 2,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonInlineText: {
        fontSize: globalStyles.fontSizeSet.fontMedium,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        fontWeight: 'bold',
        color: globalStyles.colorSet.SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonOutline: {
        minHeight: 50,
        backgroundColor: globalStyles.colorSet.SECONDARY,
        borderColor: globalStyles.colorSet.PRIMARY,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonOutlineText: {
        fontSize: globalStyles.fontSizeSet.fontMedium,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        fontWeight: 'bold',
        color: globalStyles.colorSet.PRIMARY,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
