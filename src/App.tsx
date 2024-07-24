import { Bookmarks } from './components/Bookmarks'
import { Focus } from './components/Focus'
import { Gallery } from './components/Gallery'
import { Widget } from './components/Widget'

export default function App() {
  return (
    <div className="grid">
      <Widget />
      <Gallery />
      <Gallery isAnimated />
      <Focus />
      <Bookmarks />
    </div>
  )
}
