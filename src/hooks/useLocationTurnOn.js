import LocationEnabler from 'react-native-location-enabler';
import { useState, useEffect } from 'react'

export const useLocationTurnOn = () => {
  const [locationStatus, setLocationStatus] = useState(true);
  const {
    PRIORITIES: { HIGH_ACCURACY },
    useLocationSettings,
  } = LocationEnabler;

  const [enabled, requestResolution] = useLocationSettings({
    priority: HIGH_ACCURACY,
  });

  useEffect(() => {
    if (enabled !== undefined) {
      setLocationStatus(() => enabled)
    }
  }, [enabled])


  return [locationStatus, requestResolution]
};
