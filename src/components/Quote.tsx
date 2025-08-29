import { randoItem } from '../utils'

const quotes = Object.values(
  import.meta.glob('../assets/quote*.{png,jpg,jpeg}', {
    eager: true,
    import: 'default',
  }),
)

const randomImage = randoItem(quotes)

export function Quote() {
  return (
    <section
      id="quote"
      className="container"
      style={{
        background: `center / cover url(${randomImage})`,
      }}
    ></section>
  )
}
