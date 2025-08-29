// useDragAndDrop.ts
import { useRef, useState } from 'react'
import { SiteBookmark } from './useBookmarks'

export function useDragAndDrop(
  onReorder: (draggedItem: SiteBookmark, targetIndex: number) => void,
) {
  const draggedItemRef = useRef<SiteBookmark | null>(null)
  const draggedIndexRef = useRef<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleDragStart = (
    e: React.DragEvent,
    item: SiteBookmark,
    index: number,
  ) => {
    draggedItemRef.current = item
    draggedIndexRef.current = index

    const target = e.currentTarget as HTMLElement
    const icon = target.querySelector(
      '[data-type="bookmark-icon"]',
    ) as HTMLElement | null

    if (icon) {
      e.dataTransfer.setDragImage(icon, 32, 32)
    }
  }

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    setDragOverIndex(targetIndex)
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()

    const draggedItem = draggedItemRef.current
    const draggedIndex = draggedIndexRef.current

    if (draggedItem && draggedIndex !== null && draggedIndex !== targetIndex) {
      onReorder(draggedItem, targetIndex)
    }

    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    draggedItemRef.current = null
    draggedIndexRef.current = null
    setDragOverIndex(null)
  }

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    draggedIndex: draggedIndexRef.current,
    dragOverIndex,
  }
}
