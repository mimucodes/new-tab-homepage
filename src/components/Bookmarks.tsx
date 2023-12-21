import { Modal } from './Modal'
import { useModal } from '../hooks/use-modal'
import { useLocalStorage } from '../hooks/use-local-storage'
import { getFavicon } from '../helpers/bookmark.helpers'

type SiteBookmark = {
  title: string
  url: string
  uuid: string
}

export function Bookmarks() {
  const [sites, setSites] = useLocalStorage('user-sites', '')
  const { isOpen, toggle } = useModal()
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

    setSites([...sites, { title: title, url: url, uuid: crypto.randomUUID() }])

    toggle()
  }

  const handleDelete = (id: string) => {
    const newList = sites.filter((item: SiteBookmark) => item.uuid !== id)
    setSites(newList)
  }

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    draggedItem = sites[idx]
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', '')

    const icons = Array.from(document.querySelectorAll('.bookmark-icon'))
    e.dataTransfer.setDragImage(icons[idx], 0, 0)
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragEnd = () => {
    draggedItem = null
  }

  const bookmarks =
    sites &&
    sites.map((item: SiteBookmark, idx: number) => (
      <li key={item.uuid} onDragOver={handleDragOver}>
        <a
          href={item.url}
          className="bookmark-item"
          draggable
          onDragStart={e => handleDragStart(e, idx)}
          onDragEnd={handleDragEnd}
          onDrop={e => handleDrop(e, idx)}
        >
          <div
            className="bookmark-icon"
            style={{ backgroundImage: `url(${getFavicon(item.url)})` }}
          />
          <div className="bookmark-title">
            <p className="label ellipsis">{item.title}</p>
          </div>
        </a>
        <div
          className="bookmark-delete"
          onClick={() => handleDelete(item.uuid)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </li>
    ))

  return (
    <section id="bookmarks">
      {sites.length > 0 && <ul>{bookmarks}</ul>}
      <AddButton hide={sites.length > 0} onClick={toggle} />
      <Modal isOpen={isOpen} toggle={toggle}>
        <form onSubmit={handleSubmit}>
          <div className="user-input">
            <input
              type="text"
              placeholder="enter a title"
              name="title"
              id="title"
            />
          </div>
          <div className="user-input">
            <input
              type="url"
              placeholder="type or paste a URL"
              name="url"
              id="url"
              required
            />
          </div>
          <button className="btn" type="submit">
            save
          </button>
        </form>
      </Modal>
    </section>
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
      className={props.hide ? 'btn icon mouse-hover' : 'btn icon'}
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  )
}
