import { useEffect, useCallback, useState } from 'react'

export const useContextMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      setIsMenuOpen(true)
    },
    [setIsMenuOpen],
  )

  const handleClick = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMenuOpen])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', handleContextMenu)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  })

  return { isMenuOpen }
}
