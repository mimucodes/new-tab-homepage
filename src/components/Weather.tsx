import { useFetch } from '../hooks/use-fetch'
import { useGeolocation } from '../hooks/use-geolocation'
import { formatWind } from '../helpers/weather.helpers'
import { description, IRealtimeWeather } from '../types/weather.types'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

export function Weather() {
  const { enabled, location } = useGeolocation()
  let realtime: string = ''

  if (enabled && location) {
    realtime = `https://api.tomorrow.io/v4/weather/realtime?location=${location?.latitude},${location?.longitude}&apikey=${apiKey}`
  }

  const { status: status, data: realtimeWeather } =
    useFetch<IRealtimeWeather>(realtime)

  if (status === 'fetching') {
    return <p>loading...</p>
  }

  if (status === 'error') {
    return null
  }

  if (realtimeWeather) {
    return (
      <>
        <div className="temperature">
          <p className="current">
            {Math.round(realtimeWeather.data.values.temperature)}°
          </p>
          <p>{description[realtimeWeather.data.values.weatherCode]}</p>
        </div>
        <div className="weather">
          <div id="wind">
            <p className="label">wind</p>
            {formatWind(
              realtimeWeather.data.values.windDirection,
              realtimeWeather.data.values.windSpeed,
            )}
          </div>
          <div id="humidity">
            <p className="label">humidity</p>
            {realtimeWeather.data.values.humidity}%
          </div>
          <div id="precipitation">
            <p className="label">precipitation </p>
            {realtimeWeather.data.values.precipitationProbability}%
          </div>
        </div>
      </>
    )
  }

  return null
}
