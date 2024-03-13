import { useFetch } from '../hooks/use-fetch'
import { useGeolocation } from '../hooks/use-geolocation'
import { formatTemperature, formatWind } from '../helpers/weather.helpers'
import { IRealtimeWeather, IForecastWeather } from '../types/weather.types'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

export function Weather() {
  const { enabled, location } = useGeolocation()
  let realtime: string = ''
  let forecast: string = ''

  if (enabled && location) {
    realtime = `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${apiKey}`
    forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.latitude}&lon=${location?.longitude}&appid=${apiKey}`
  }

  const { status: realtimeStatus, data: realtimeWeather } =
    useFetch<IRealtimeWeather>(realtime)

  const { status: forecastStatus, data: forecastWeather } =
    useFetch<IForecastWeather>(forecast)

  if (realtimeStatus === 'fetching' || forecastStatus == 'fetching') {
    return <p>loading...</p>
  }

  if (realtimeStatus === 'error' || forecastStatus === 'error') {
    return null
  }

  if (realtimeWeather && forecastWeather) {
    return (
      <>
        <div className="temperature">
          <p className="current">
            {formatTemperature(realtimeWeather.main.temp)}
          </p>
          <p>{realtimeWeather.weather[0].description}</p>
        </div>
        <div className="weather">
          <div id="wind">
            <p className="label">wind</p>
            {formatWind(realtimeWeather.wind.deg, realtimeWeather.wind.speed)}
          </div>
          <div id="humidity">
            <p className="label">humidity</p>
            {realtimeWeather.main.humidity}%
          </div>
          <div id="precipitation">
            <p className="label">precipitation </p>
            {forecastWeather.list[0].pop}%
          </div>
        </div>
      </>
    )
  }

  return null
}
