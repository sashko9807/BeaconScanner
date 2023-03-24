import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import globalStyles from '../globals/styles'

const ApiResultModal = ({
  isVisible,
  animationType,
  title,
  message,
  onConfirm,
}) => {
  return (
    <View style={modalStyle.centerView}>
      <Modal
        animationType={animationType || 'fade'}
        transparent={true}
        visible={isVisible}
      >
        <View style={modalStyle.centerView}>
          <View style={modalStyle.modalView}>
            <View>
              <View style={modalStyle.modalContainer}>
                <Text style={modalStyle.modalHeaderText}>{title}</Text>
                <View>
                  <Text style={modalStyle.modalBodyText}>{message}</Text>
                </View>
                <View style={modalStyle.btnContainer}>
                  <Pressable onPress={onConfirm} style={modalStyle.btn}>
                    <Text style={modalStyle.btnText}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ApiResultModal;

const modalStyle = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
    margin: 'auto',
  },

  modalView: {
    backgroundColor: globalStyles.colorSet.SECONDARY,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 24,
    minWidth: 370,
    maxWidth: 370
  },
  modalHeaderText: {
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontSize: globalStyles.fontSizeSet.fontMedium,
    color: globalStyles.colorSet.PRIMARY,
  },
  modalBodyText: {
    textAlign: 'center',
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontSize: globalStyles.fontSizeSet.fontRegular,
  },
  btnContainer: {
    //justifyContent: 'flex-end'
  },
  btn: {
    marginTop: 50,
    borderWidth: 1,
    borderColor: globalStyles.colorSet.PRIMARY,
  },
  btnText: {
    paddingVertical: 10,
    paddingHorizontal: 100,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontSize: globalStyles.fontSizeSet.fontRegular,
  }

});
