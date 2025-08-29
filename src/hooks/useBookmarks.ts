import { useEffect } from 'react'
import { useChromeStorage } from './useChromeStorage'

export type SiteBookmark = {
  title: string
  url: string
  uuid: string
}

export function useBookmarks() {
  const [sites, setSites, sitesLoading] = useChromeStorage<SiteBookmark[]>(
    'user-sites',
    [],
  )
  const [topSites, setTopSites, topSitesLoading] = useChromeStorage(
    'top-sites-loaded',
    false,
  )

  useEffect(() => {
    if (sitesLoading || topSitesLoading) return

    if (sites.length === 0 && !topSites && chrome.topSites) {
      chrome.topSites.get(data => {
        const topFive = data.slice(0, 5).map(site => ({
          title: site.title,
          url: site.url,
          uuid: crypto.randomUUID(),
        }))
        setSites(topFive)
        setTopSites(true)
      })
    }
  }, [sites, topSites, setSites, setTopSites, sitesLoading, topSitesLoading])

  const addBookmark = (title: string, url: string) => {
    setSites([...sites, { title, url, uuid: crypto.randomUUID() }])
  }

  const updateBookmark = (uuid: string, title: string, url: string) => {
    const idx = sites.findIndex(item => item.uuid === uuid)
    if (idx !== -1) {
      const newList = sites.toSpliced(idx, 1, { title, url, uuid })
      setSites(newList)
    }
  }

  const deleteBookmark = (uuid: string) => {
    const newList = sites.filter(item => item.uuid !== uuid)
    setSites(newList)
  }

  const reorderBookmarks = (draggedItem: SiteBookmark, targetIndex: number) => {
    const newList = sites.filter(item => item !== draggedItem)
    newList.splice(targetIndex, 0, draggedItem)
    setSites(newList)
  }

  return {
    sites,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    reorderBookmarks,
  }
}
