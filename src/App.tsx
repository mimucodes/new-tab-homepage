import { Bookmarks } from './components/Bookmarks/Bookmarks'
import { Focus } from './components/Focus'
import { Quote } from './components/Quote'
import { FunFact } from './components/FunFact'
import { Widget } from './components/Widget'

export default function App() {
  return (
    <div className="grid">
      <Widget />
      <Quote />
      <FunFact />
      <Focus />
      <Bookmarks />
    </div>
  )
}
