import { useEffect, useState } from 'react'
import { SiteBookmark } from '../../hooks/useBookmarks'
import { Button } from '../Button'

type BookmarkFormProps = {
  bookmark?: SiteBookmark | null
  onSubmit: (title: string, url: string) => void
  onCancel: () => void
}

export function BookmarkForm({
  bookmark,
  onSubmit,
  onCancel,
}: BookmarkFormProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (bookmark) {
      setTitle(bookmark.title)
      setUrl(bookmark.url)
    } else {
      setTitle('')
      setUrl('')
    }
  }, [bookmark])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(title, url)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="header">
        {bookmark ? 'Edit bookmark' : 'Add bookmark'}
      </div>
      <div className="main">
        <fieldset>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="url">Url</label>
          <input
            type="url"
            name="url"
            id="url"
            required
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </fieldset>
      </div>
      <div className="footer">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  )
}
