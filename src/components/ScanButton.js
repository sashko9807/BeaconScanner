import { View, Text, Pressable, StyleSheet } from 'react-native';
import globalStyles from '../globals/styles'

const ScanButton = ({ onPress, isScanning }) => {
  return (
    <View style={styles.buttonContainer} >
      <Pressable onPress={onPress}>
        <Text style={styles.buttonText}>{isScanning ? "Stop" : "Start"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '20%',
    maxWidth: 200,
    aspectRatio: 16 / 9,
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: globalStyles.colorSet.PRIMARY,
    borderColor: globalStyles.colorSet.SECONDARY,
    maxWidth: 100,
    maxHeight: 80
  },
  buttonText: {
    color: globalStyles.colorSet.SECONDARY,
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
  }
})

export default ScanButton;
