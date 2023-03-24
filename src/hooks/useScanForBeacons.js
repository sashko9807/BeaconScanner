import Beacons from 'react-native-beacons-manager';
import { DeviceEventEmitter } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { findBeaconByIdentifiers } from '../realm/beacon';

export const useScanForBeacons = () => {
  const [scan, setScan] = useState(false);
  const [beaconsInRange, setBeaconsInRange] = useState([]);

  const isFocused = useIsFocused();

  const isScanning = () => {
    setScan(!scan);
  };

  useEffect(() => {
    if (!isFocused || !scan) {
      setScan(false)
      DeviceEventEmitter.removeAllListeners('beaconsDidRange');
      return;
    }

    if (scan && beaconsInRange.length > 0) {
      setBeaconsInRange([])
    }

    scanForBeacons()
  }, [isFocused, scan]);

  const scanForBeacons = async () => {
    await Beacons.detectIBeacons();

    try {
      await Beacons.startRangingBeaconsInRegion('REGION1');
      console.log(`Beacons ranging started succesfully!`);
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`);
    }

    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      data.beacons.forEach((elem) => {
        const beacon = findBeaconByIdentifiers({ uuid: elem.uuid.toString(), major: elem.major.toString(), minor: elem.minor.toString() })
        if (beacon.length > 0) {
          const beaconData = { _id: beacon[0]._id, name: beacon[0].name, distance: elem.distance.toFixed(2), dataType: beacon[0].dataType, data: beacon[0].data }
          setBeaconsInRange((beaconArray) => {
            const atIndex = beaconArray.findIndex((beacons) => beacons.name === beacon[0].name)
            if (atIndex !== -1) {
              return [{ ...beaconArray[atIndex], ...beaconData }]
            }
            return [...beaconArray, beaconData]
          });
        }
      });
    });
  };

  return [beaconsInRange, scan, { isScanning }];
};
