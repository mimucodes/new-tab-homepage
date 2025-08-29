import { useState } from 'react'
import { Banner } from '../Banner'
import { Button } from '../Button'

type WeatherFormProps = {
  onComplete: (
    apiKey: string,
    location: { latitude: number; longitude: number },
  ) => void
  onCancel: () => void
  initialApiKey?: string
}

type ValidationStep = 'idle' | 'validating-api' | 'getting-location' | 'success'

export function WeatherForm({
  onComplete,
  onCancel,
  initialApiKey = '',
}: WeatherFormProps) {
  const [apiKey, setApiKey] = useState(initialApiKey)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<ValidationStep>('idle')

  async function validateApiKey(key: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`,
      )

      if (response.status === 401) {
        throw new Error('Invalid API key')
      }

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      return true
    } catch (err) {
      if (err instanceof Error) {
        throw err
      }
      throw new Error('Failed to validate API key')
    }
  }

  function getCurrentLocation(): Promise<{
    latitude: number
    longitude: number
  }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        err => {
          let message = 'Failed to get location'
          switch (err.code) {
            case err.PERMISSION_DENIED:
              message =
                'Location access denied. Please enable location permissions.'
              break
            case err.POSITION_UNAVAILABLE:
              message = 'Location information unavailable.'
              break
            case err.TIMEOUT:
              message = 'Location request timed out.'
              break
          }
          reject(new Error(message))
        },
        {
          timeout: 10000, // 10 second timeout
          enableHighAccuracy: false,
        },
      )
    })
  }

  async function handleSubmit() {
    const trimmedApiKey = apiKey.trim()

    if (!trimmedApiKey) {
      setError('Please enter your API key')
      return
    }

    setError(null)

    try {
      setStep('validating-api')
      await validateApiKey(trimmedApiKey)

      setStep('getting-location')
      const location = await getCurrentLocation()

      setStep('success')
      onComplete(trimmedApiKey, location)
    } catch (err) {
      setStep('idle')
      setError(err instanceof Error ? err.message : 'Setup failed')
    }
  }

  function getButtonText(): string {
    if (isLoading) {
      return 'Setting up...'
    }
    return 'Use my location'
  }

  function getStatusBanner() {
    if (error) {
      return (
        <Banner variant="error" onDismiss={() => setError(null)}>
          {error}
        </Banner>
      )
    }

    return (
      <Banner variant="warning">
        <p>I'll need your location to show local weather data</p>
      </Banner>
    )
  }

  const isLoading = step !== 'idle'

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="header">Weather setup</div>
      <div className="main">
        <fieldset>
          <label htmlFor="apikey">OpenWeather API Key:</label>
          <input
            id="apikey"
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            disabled={isLoading}
          />
        </fieldset>

        {getStatusBanner()}
      </div>
      <div className="footer">
        <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {getButtonText()}
        </Button>
      </div>
    </form>
  )
}
