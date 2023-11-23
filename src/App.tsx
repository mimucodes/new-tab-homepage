import { DateTime } from './components/DateTime'
import { Favorites } from './components/Favorites'
import { Focus } from './components/Focus'
import { Weather } from './components/Weather'

export default function App() {
  return (
    <div className="container d-grid">
      <DateTime />
      <Weather />
      <Focus />
      <Favorites />
    </div>
  )
}
