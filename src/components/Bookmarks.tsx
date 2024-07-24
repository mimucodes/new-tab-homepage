import { useEffect, useState } from 'react'
import { getFavicon } from '../helpers/bookmark.helpers'
import { useLocalStorage } from '../hooks/use-local-storage'
import { useModal } from '../hooks/use-modal'
import { Modal } from './Modal'
import { useContextMenu } from '../hooks/use-context-menu'

// TODO switch the context menu to an actual menu and add the option to copy a link and open in a new tab

type SiteBookmark = {
  title: string
  url: string
  uuid: string
}

export function Bookmarks() {
  const [sites, setSites] = useLocalStorage('user-sites', '')
  const [targetItem, setTargetItem] = useState<SiteBookmark | null>(null)
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const { isOpen, toggle } = useModal()
  const { isMenuOpen } = useContextMenu()

  let draggedItem: any = null
  let draggedOverItem: any = null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      title: { value: string }
      url: { value: string }
    }

    const title = target.title.value
    const url = target.url.value

    if (targetItem) {
      const idx = sites.findIndex(
        (item: SiteBookmark) => item.uuid === targetItem.uuid,
      )

      const newList = sites.toSpliced(idx, 1, {
        title: title,
        url: url,
        uuid: targetItem.uuid,
      })

      setSites(newList)
      handleModal()
      return
    }

    setSites([...sites, { title: title, url: url, uuid: crypto.randomUUID() }])

    handleModal()
  }

  const handleEdit = (id: string) => {
    const bookmark = sites.filter((item: SiteBookmark) => item.uuid === id)

    for (const [, value] of Object.entries(bookmark)) {
      if (value) {
        const site = value as SiteBookmark
        setTitle(site.title)
        setLink(site.url)
      }
    }

    setTargetItem(bookmark[0])

    toggle()
  }

  const handleDelete = (id: string) => {
    const newList = sites.filter((item: SiteBookmark) => item.uuid !== id)
    setSites(newList)
  }

  const handleTitle = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement

    setTitle(target.value)
  }

  const handleLink = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement

    setLink(target.value)
  }

  const handleModal = () => {
    setTitle('')
    setLink('')
    toggle()
    setTargetItem(null)
  }

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    draggedItem = sites[idx]

    const items = Array.from(
      document.querySelectorAll(
        '.bookmark-item',
      ) as NodeListOf<HTMLAnchorElement>,
    )

    const icons = Array.from(
      document.querySelectorAll('.bookmark-icon') as NodeListOf<HTMLDivElement>,
    )

    e.dataTransfer.setDragImage(icons[idx], 32, 32)

    items[idx].style.opacity = '0.5'
  }

  const handleDrop = (e: React.DragEvent, idx: number) => {
    draggedOverItem = sites[idx]

    if (draggedItem === draggedOverItem || !draggedItem) {
      return
    }

    let newList = sites.filter((item: SiteBookmark) => item !== draggedItem)
    newList.splice(idx, 0, draggedItem)

    setSites(newList)
  }

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()

    const icons = Array.from(
      document.querySelectorAll('.bookmark-icon') as NodeListOf<HTMLDivElement>,
    )

    icons.forEach(el => el.classList.remove('target'))
    icons[idx].classList.add('target')
  }

  const handleDragEnd = () => {
    draggedItem = null

    const items = Array.from(
      document.querySelectorAll(
        '.bookmark-item',
      ) as NodeListOf<HTMLAnchorElement>,
    )

    const icons = Array.from(
      document.querySelectorAll('.bookmark-icon') as NodeListOf<HTMLDivElement>,
    )

    icons.forEach(icon => icon.classList.remove('target'))
    items.forEach(item => (item.style.opacity = '1'))
  }

  const bookmarks =
    sites &&
    sites.map((item: SiteBookmark, idx: number) => (
      <li key={item.uuid} onDragOver={e => handleDragOver(e, idx)}>
        <a
          href={item.url}
          className="bookmark-item"
          draggable
          onDragStart={e => handleDragStart(e, idx)}
          onDragEnd={handleDragEnd}
          onDrop={e => handleDrop(e, idx)}
          onContextMenu={e => e.preventDefault()}
        >
          <div
            className="bookmark-icon"
            style={{ backgroundImage: `url(${getFavicon(item.url)})` }}
          />
          <div className="bookmark-title">
            <p className="label ellipsis">{item.title}</p>
          </div>
        </a>
        {isMenuOpen && (
          <Buttons
            onEdit={() => handleEdit(item.uuid)}
            onDelete={() => handleDelete(item.uuid)}
          />
        )}
      </li>
    ))

  return (
    <section id="bookmarks">
      {sites.length > 0 && <ul>{bookmarks}</ul>}
      <AddButton hide={sites.length > 0} onClick={handleModal} />

      <Modal isOpen={isOpen} toggle={toggle}>
        <form onSubmit={handleSubmit}>
          <div className="header">
            {targetItem ? 'Edit bookmark' : 'Add bookmark'}
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
                onChange={e => handleTitle(e)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="url">Url</label>
              <input
                type="url"
                name="url"
                id="url"
                required
                value={link}
                onChange={e => handleLink(e)}
              />
            </fieldset>
          </div>
          <div className="footer">
            <button type="button" onClick={toggle}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </Modal>
    </section>
  )
}

type ButtonProps = {
  onEdit: () => void
  onDelete: () => void
}

function Buttons(props: ButtonProps) {
  return (
    <div className="bookmark-buttons">
      <div className="btn-icon" onClick={props.onEdit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
          <path d="M13.5 6.5l4 4" />
        </svg>
      </div>
      <div className="btn-icon" onClick={props.onDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </div>
    </div>
  )
}

type AddButtonProps = {
  hide: boolean
  onClick: () => void
}

function AddButton(props: AddButtonProps) {
  return (
    <button
      id="add-site"
      className={props.hide ? 'btn-icon mouse-hover' : 'btn-icon'}
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
    </button>
  )
}
