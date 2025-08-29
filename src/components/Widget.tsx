import { DateTime } from './DateTime'
import { Greeting } from './Greeting'
import { Weather } from './Weather/Weather'

export function Widget() {
  return (
    <section id="widget" className="container">
      <Greeting />
      <DateTime />
      <Weather />
    </section>
  )
}
