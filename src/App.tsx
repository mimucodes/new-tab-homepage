import { Widget } from './components/Widget'
import { Focus } from './components/Focus'
import { Bookmarks } from './components/Bookmarks'
import { Greeting } from './components/Greeting'

export default function App() {
  return (
    <div className="container d-grid">
      <Greeting />
      <Focus />
      <Widget />
      <Bookmarks />
    </div>
  )
}
