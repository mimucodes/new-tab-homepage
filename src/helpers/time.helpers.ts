export const now: Date = new Date()
export const unixtime = now.getTime() / 1000
// const locale = Intl.DateTimeFormat().resolvedOptions().locale

export function getDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function getTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
