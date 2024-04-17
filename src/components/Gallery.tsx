import { randoItem } from '../utils'

const artwork = Object.values(
  import.meta.glob('../assets/*.{png,jpg,jpeg}', {
    eager: true,
    as: 'url',
  }),
)

const animated = Object.values(
  import.meta.glob('../assets/*.gif', {
    eager: true,
    as: 'url',
  }),
)

const quotes = [
  'stop chasing things that do <em>nothing</em> for your <em>growth</em>',
  'life is too short to spend it at war with <em>yourself</em>',
  '<em>slow</em> progress beats <em>no</em> progress',
]

type GalleryProps = {
  hasText?: boolean
}

export function Gallery(props: GalleryProps) {
  const markup = { __html: `${randoItem(quotes)}` }

  if (props.hasText) {
    return (
      <section
        id="quote"
        className="container"
        style={{ background: `center / 150% url(${randoItem(animated)})` }}
      >
        <p dangerouslySetInnerHTML={markup} />
      </section>
    )
  }

  return (
    <section
      id="gallery"
      className="container"
      style={{
        background: `center / cover url(${randoItem(artwork)})`,
      }}
    />
  )
}
