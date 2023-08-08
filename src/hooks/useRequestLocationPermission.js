import { useState } from 'react';
import { PermissionsAndroid } from 'react-native';

export const useRequestLocationPermission = () => {
  const [permissionStatus, setIsPermissionStatus] = useState(false);

  const isGranted = () => {
    const permission = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then(res => {
      setIsPermissionStatus(() => res)
    });

    return permissionStatus
  }

  const requestPermission = async () => {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Beacon scanning location permission',
        message:
          'Beacon Managment System needs access to your location ' +
          'so it can scan for beacons.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    ).catch((err) => {
      console.warn(err);
    });
    if (permission === PermissionsAndroid.RESULTS.GRANTED) return setIsPermissionStatus(() => true);

    return false;

  };


  return [permissionStatus, isGranted, requestPermission];
};
