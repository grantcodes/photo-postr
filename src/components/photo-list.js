import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Photo from './photo'
import { reorderPhotos, removePhoto, retryPhotoUpload } from '../actions'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import '../styles/order-grid.css'

const PhotoList = ({ photos, orderGrid, actions }) => {
  if (orderGrid) {
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
          actions.reorderPhotos(oldIndex, newIndex)
        }
      />
    )
  } else {
    // Show full vertical list of photos to add data to
    return photos.map((photo, i) => (
      <div className="photo-wrapper" key={`photo-${i}`}>
        <Photo file={photo.file} photo={photo} />
        <div className="photo-actions">
          <button onClick={(e) => actions.removePhoto(photo.id)}>❌</button>
          {photos.length > 1 && i > 0 && (
            <button onClick={(e) => actions.reorderPhotos(i, i - 1)}>👆</button>
          )}
          {photos.length > 1 && i < photos.length - 1 && (
            <button onClick={(e) => actions.reorderPhotos(i, i + 1)}>👇</button>
          )}
          {photo.error && (
            <button onClick={(e) => actions.retryPhotoUpload(photo)}>
              Retry Upload
            </button>
          )}
        </div>
      </div>
    ))
  }
}

const mapStateToProps = (state, props) => ({
  photos: state.photos.toJS(),
  orderGrid: state.app.get('orderGridShown'),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      reorderPhotos,
      removePhoto,
      retryPhotoUpload,
    },
    dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)
