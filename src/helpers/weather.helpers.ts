function convertToCelsius(K: number) {
  return K - 273.15
}

export function formatTemperature(temp: number) {
  return Math.round(convertToCelsius(temp)) + '°C'
}

export function formatSunsetTime(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatPrecipitation(pop: number) {
  return `${pop.toLocaleString('en', { style: 'percent' })}`
}

export function isDaytime(now: number, sunrise: number, sunset: number) {
  return now > sunrise && now < sunset
}
