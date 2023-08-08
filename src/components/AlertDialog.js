import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import globalStyles from '../globals/styles'

const AlertDialog = ({
  isVisible,
  animationType,
  title,
  message,
  children
}) => (
  <View style={modalStyle.centerView}>
    <Modal
      animationType={animationType || 'fade'}
      transparent={true}
      visible={isVisible}
    >
      <View style={modalStyle.centerView}>
        <View style={modalStyle.modalView}>
          <View style={modalStyle.textPadding}>
            <Text style={modalStyle.modalTitle}>{title}</Text>
            <Text style={modalStyle.modalMessage}>{message}</Text>
          </View>
          <View style={modalStyle.modalButtons}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  </View>
);


export const RequiredAlert = ({ isVisible, onExit, onCancel }) => (
  <AlertDialog
    isVisible={isVisible}
    title={'Required step'}
    message={"This step is required and can't be skipped.\n\nDo you want to exit the application?"}
  >
    <Pressable onPress={onExit} style={modalStyle.modalActionBtn}>
      <Text style={modalStyle.modalActionBtnTxt}>Exit application</Text>
    </Pressable>
    <Pressable onPress={onCancel} style={modalStyle.modalActionBtn}>
      <Text style={modalStyle.modalActionBtnTxt}>Cancel</Text>
    </Pressable>
  </AlertDialog>
)

export const ShowDataChargeAlert = ({ isVisible, onTurnWifi, onContinue, onDismiss }) => {
  return (
    <AlertDialog
      isVisible={isVisible}
      title={'Additional data charge'}
      message={"You are about to download data through cellular data, which may result in additional charges"}
    >
      <Pressable onPress={onTurnWifi} style={modalStyle.modalActionBtn}>
        <Text style={modalStyle.modalActionBtnTxt}>Turn wifi on</Text>
      </Pressable>
      <Pressable onPress={onContinue} style={modalStyle.modalActionBtn}>
        <Text style={modalStyle.modalActionBtnTxt}>Continue</Text>
      </Pressable>
      <Pressable onPress={onDismiss} style={modalStyle.modalActionBtn}>
        <Text style={modalStyle.modalActionBtnTxt}>Dismiss</Text>
      </Pressable>
    </AlertDialog>
  )
}




export const ShowNoInternetAlert = ({ isVisible, onTurnWifi, onDismiss }) => {
  return (
    <AlertDialog
      isVisible={isVisible}
      title={'Network connection is required'}
      message={"Network connection is required for this operation"}
    >

      <Pressable onPress={onTurnWifi} style={modalStyle.modalActionBtn}>
        <Text style={modalStyle.modalActionBtnTxt}>Turn wifi on</Text>
      </Pressable>
      <Pressable onPress={onDismiss} style={modalStyle.modalActionBtn}>
        <Text style={modalStyle.modalActionBtnTxt}>Dismiss</Text>
      </Pressable>

    </AlertDialog>
  )
}

const modalStyle = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    ...StyleSheet.absoluteFill,
    margin: 'auto',
  },
  modalView: {
    width: '80%',
    backgroundColor: globalStyles.colorSet.SECONDARY,
    borderRadius: 20,
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
  textPadding: {
    padding: 15
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    marginBottom: 10,
  },
  modalMessage: {
    textAlign: 'center',
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    marginBottom: 20,
  },
  modalActionBtn: {
    alignItems: 'center',
    borderColor: globalStyles.colorSet.PRIMARY,
    borderTopWidth: 0.5,
    minWidth: '100%'
  },
  modalActionBtnTxt: {
    paddingVertical: 8,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontSize: globalStyles.fontSizeSet.fontMedium,
    color: globalStyles.colorSet.PRIMARY,
  },
});

export default AlertDialog;
