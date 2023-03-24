import { useState, useEffect } from 'react';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

export const useGetBluetoothState = () => {
  const [bluetoothEnabled, setBluetothEnabled] = useState(false);

  useEffect(() => {
    BluetoothStateManager.getState().then((bluetoothState) => {
      if (bluetoothState === "PoweredOn") {
        setBluetothEnabled(() => true)
      }
    });
  }, []);



  const requestToEnable = () => {
    BluetoothStateManager.requestToEnable()
      .then(response => setBluetothEnabled(response))
      .catch(() => setBluetothEnabled(() => false))
    return bluetoothEnabled
  };

  return [bluetoothEnabled, requestToEnable];
};
