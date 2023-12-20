import { DateTime } from './DateTime'
import { Weather } from './Weather'

export function Widget() {
  return (
    <section id="widget">
      <DateTime />
      <Weather />
    </section>
  )
}
