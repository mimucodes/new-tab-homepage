export function getFavicon(u: string, size: string = '32') {
  const regex = /^.+?[^\/:](?=[?\/]|$)/
  const baseUrl = u.match(regex)

  if (!chrome.runtime) {
    return `https://www.google.com/s2/favicons?domain=${baseUrl}&sz=${size}`
  }

  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', u)
  url.searchParams.set('size', size)
  return url.toString()
}

export function isFaviconWhite(faviconUrl: string): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        resolve(false)
        return
      }

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        let whitePixels = 0
        let transparentPixels = 0
        const totalPixels = data.length / 4

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const a = data[i + 3]

          // Count transparent pixels
          if (a < 10) {
            transparentPixels++
          }
          // Count pure white
          else if (r === 255 && g === 255 && b === 255) {
            whitePixels++
          }
        }

        // Return true if more than 60% of non-transparent pixels are white
        const nonTransparentPixels = totalPixels - transparentPixels
        const isWhite =
          nonTransparentPixels > 0 && whitePixels / nonTransparentPixels === 1

        resolve(isWhite)
      } catch (error) {
        resolve(false)
      }
    }

    img.onerror = () => {
      resolve(false)
    }

    img.src = faviconUrl
  })
}
