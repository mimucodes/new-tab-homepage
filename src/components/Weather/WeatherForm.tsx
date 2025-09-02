import { useState } from 'react'
import { Banner } from '../Banner'
import { Button } from '../Button'

export type Location = { latitude: number; longitude: number }

type WeatherFormProps = {
  onComplete: (apiKey: string, location: Location) => void
  onCancel: () => void
  initialApiKey?: string
}

type UiError = {
  text: string
  details?: string
}

export function WeatherForm({
  onComplete,
  onCancel,
  initialApiKey = '',
}: WeatherFormProps) {
  const [apiKey, setApiKey] = useState(initialApiKey)
  const [error, setError] = useState<UiError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function validateApiKey(key: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`,
      )

      if (!response.ok) {
        switch (response.status) {
          case 401:
            throw {
              text: 'Invalid API key',
              details: 'New keys may take up to 2 hours to activate.',
            }
          case 429:
            throw {
              text: 'API rate limit exceeded',
              details: 'Try again later.',
            }
          case 500:
          case 502:
          case 503:
          case 504:
            throw {
              text: 'OpenWeather server error',
              details: 'Try again later.',
            }
          default:
            throw {
              text: 'Unexpected API error',
              details: `status ${response.status}`,
            }
        }
      }
    } catch (error: any) {
      if (error?.text) throw error
      throw {
        text: 'Could not reach OpenWeather',
        details: 'Check your connection or try again later.',
      }
    }

    return true
  }

  function getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject({ text: 'Geolocation is not supported by this browser' })
        return
      }

      navigator.geolocation.getCurrentPosition(
        position =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        err => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              reject({
                text: 'Location access denied',
                details: 'Please enable location permissions in your browser.',
              })
              break
            case err.POSITION_UNAVAILABLE:
              reject({ text: 'Location information unavailable.' })
              break
            case err.TIMEOUT:
              reject({ text: 'Location request timed out.' })
              break
            default:
              reject({ text: 'Failed to get location.' })
          }
        },
        { timeout: 10000, enableHighAccuracy: false },
      )
    })
  }

  async function handleSubmit() {
    const trimmedApiKey = apiKey.trim()

    if (!trimmedApiKey) {
      setError({
        text: 'Please enter your API key',
      })
      return
    }

    setIsLoading(true)

    try {
      await validateApiKey(trimmedApiKey)
      const location = await getCurrentLocation()
      onComplete(trimmedApiKey, location)
      setError(null)
    } catch (err: any) {
      if (err?.text) setError(err)
      else setError({ text: 'Setup failed' })
    } finally {
      setIsLoading(false)
    }
  }

  function getStatusBanner() {
    if (error) {
      return (
        <Banner variant="error" onDismiss={() => setError(null)}>
          <p>{error.text}</p>
          {error.details && (
            <p>
              <small>{error.details}</small>
            </p>
          )}
        </Banner>
      )
    }

    return null
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="header">Weather setup</div>
      <div className="main">
        <div className="explanation">
          To show you the local weather, this extension needs:
          <ul>
            <li>
              A free API key from{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://home.openweathermap.org/api_keys"
              >
                openweathermap.org
              </a>
            </li>
            <li>Access to you location</li>
          </ul>
        </div>

        <fieldset>
          <label htmlFor="apikey">OpenWeather API Key:</label>
          <input
            id="apikey"
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="Paste your key here"
            disabled={isLoading}
          />
        </fieldset>
        {getStatusBanner()}
      </div>
      <div className="footer">
        <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
          Use my location
        </Button>
      </div>
    </form>
  )
}
