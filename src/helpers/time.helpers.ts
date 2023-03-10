export const now: Date = new Date();
export const unixtime = now.getTime() / 1000;

const hours = now.getHours();
export const isNight = false;
const isMorning = !isNight && hours < 12;
const isAfternoon = !isNight && hours > 12;

export function getDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function getTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(date)
}

// TODO replace hardcoded username

export function greeting() {
  let timeOfDay = "day";
  let username = 'moni'

  if (isMorning) {
    timeOfDay = "morning"
  }
  if (isAfternoon) {
    timeOfDay = "afternoon"
  }

  if (isNight) {
    timeOfDay = "night"
  }

  return `good ${timeOfDay} ${username}
  it's currently`
}