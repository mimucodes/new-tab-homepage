import { unixtime } from '../helpers/time.helpers'
import {
  isDaytime,
  formatTemperature,
  formatPressure,
  formatWind,
  formatHumidity,
} from '../helpers/weather.helpers'
import { useFetch } from '../hooks/use-fetch'
import { useGeolocation } from '../hooks/use-geolocation'
import { WeatherInfo } from '../types/weather.types'
import { Greeting } from './Greeting'
import { WeatherIcon } from './WeatherIcons'

export function Weather() {
  const { enabled, location } = useGeolocation()
  let current: string = ''
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  if (enabled && location) {
    current = `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${apiKey}`
  }

  const { status: currentStatus, data: currentWeather } =
    useFetch<WeatherInfo>(current)

  if (currentStatus === 'fetching') {
    return <p>loading...</p>
  }

  if (currentWeather) {
    const daytime = isDaytime(
      unixtime,
      currentWeather.sys.sunrise,
      currentWeather.sys.sunset
    )

    return (
      <>
        <Greeting />
        <div className="weather d-grid">
          <div className="d-grid main">
            <div className="icon">
              <WeatherIcon
                condition={currentWeather.weather[0].main}
                isDaytime={daytime}
              />
            </div>
            <div className="info">
              <p className="temperature">
                {formatTemperature(currentWeather.main.temp)}
              </p>
              <p>{currentWeather.weather[0].description}</p>
            </div>
          </div>
          <div className="pressure">
            <p className="label">pressure</p>
            {formatPressure(currentWeather.main.pressure)}
          </div>
          <div className="wind">
            <p className="label">wind</p>
            {formatWind(currentWeather.wind.deg, currentWeather.wind.speed)}
          </div>
          <div className="humidity">
            <p className="label">humidity</p>
            {formatHumidity(currentWeather.main.humidity)}
          </div>
        </div>
      </>
    )
  }

  return null
}
