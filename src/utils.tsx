export function randoItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
