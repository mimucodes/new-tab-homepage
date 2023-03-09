import { useEffect, useState } from 'react';

type State = {
  enabled: boolean;
  location?: GeolocationPosition;
};

type GeolocationPosition = {
  latitude: number;
  longitude: number;
};

export function useGeolocation(): State {
  const [enabled, setEnabled] = useState(false);
  const [location, setLocation] = useState<GeolocationPosition | undefined>(
    undefined
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setEnabled(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      setEnabled(true);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

    return;
  }, []);

  return { enabled, location };
}
