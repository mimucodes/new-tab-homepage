function convertToCelsius(K: number) {
  return K - 273.15
}

function convertToKPH(M: number) {
  return M * 3.6
}

function getCardinalDirection(D: number) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(D / 45) % 8]
}

export function formatTemperature(temp: number) {
  return Math.round(convertToCelsius(temp)) + '°C'
}

export function formatPressure(pressure: number) {
  return `${pressure} mb`
}

export function formatWind(degree: number, speed: number) {
  return `${getCardinalDirection(degree)} ${Math.round(
    convertToKPH(speed),
  )} km/h`
}

export function formatHumidity(humidity: number) {
  return `${humidity}%`
}

export function isDaytime(now: number, sunrise: number, sunset: number) {
  return now > sunrise && now < sunset
}
