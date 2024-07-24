import { randoItem } from '../utils'

const artwork = Object.values(
  import.meta.glob('../assets/*.{png,jpg,jpeg}', {
    eager: true,
    as: 'url',
  }),
)

const animated = Object.values(
  import.meta.glob('../assets/*.{gif,webp}', {
    eager: true,
    as: 'url',
  }),
)

type GalleryProps = {
  isAnimated?: boolean
}

export function Gallery(props: GalleryProps) {
  const image = props.isAnimated ? randoItem(animated) : randoItem(artwork)
  const re = new RegExp(/@[a-z]*/)
  const artist = image.match(re)

  return (
    <section
      id="gallery"
      className="container"
      style={{
        background: `center / cover url(${image})`,
      }}
    >
      {artist && <span>{artist}</span>}
    </section>
  )
}
