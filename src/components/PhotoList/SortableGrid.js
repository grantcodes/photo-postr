import React from 'react'
import { useDispatch } from 'react-redux'
import { reorderPhotos } from '../../actions'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const PhotoList = ({ photos }) => {
  const dispatch = useDispatch()

  // Show a grid view with easy drag and drop to reorder
  const SortableItem = SortableElement(({ photo }) => (
    <li
      className="order-grid__item"
      style={{
        backgroundImage: `url(${URL.createObjectURL(photo.file)})`,
      }}
    />
  ))

  const SortableList = SortableContainer(({ items }) => (
    <ol className="order-grid">
      {items.map((photo, index) => (
        <SortableItem key={`item-${index}`} index={index} photo={photo} />
      ))}
    </ol>
  ))

  return (
    <SortableList
      axis="xy"
      items={photos}
      onSortEnd={({ oldIndex, newIndex }) =>
        dispatch(reorderPhotos(oldIndex, newIndex))
      }
    />
  )
}

export default PhotoList
