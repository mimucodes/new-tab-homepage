import { useEffect, useState } from 'react'

type State = {
  enabled: boolean
  location?: GeolocationPosition
  error?: string
}

type GeolocationPosition = {
  latitude: number
  longitude: number
}

export function useGeolocation(enabled: boolean): State {
  const [location, setLocation] = useState<GeolocationPosition | undefined>(
    undefined,
  )
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!enabled) {
      setLocation(undefined)
      setError(undefined)
      return
    }

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setError(undefined)
      },
      () => {
        setError('Unable to retrieve your location.')
      },
    )
  }, [enabled])

  return { enabled, location, error }
}
