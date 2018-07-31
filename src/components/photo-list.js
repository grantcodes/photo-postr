import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Photo from './photo'
import { reorderPhotos, removePhoto, retryPhotoUpload } from '../actions'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import '../styles/order-grid.css'

class PhotoList extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleMoveUp = this.handleMoveUp.bind(this)
    this.handleMoveDown = this.handleMoveDown.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
    this.handleRetry = this.handleRetry.bind(this)
  }

  handleRemove(id) {
    this.props.actions.removePhoto(id)
  }

  handleMoveUp(i) {
    this.props.actions.reorderPhotos(i, i - 1)
  }

  handleMoveDown(i) {
    this.props.actions.reorderPhotos(i, i + 1)
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.props.actions.reorderPhotos(oldIndex, newIndex)
  }

  handleRetry(photo) {
    this.props.actions.retryPhotoUpload(photo)
  }

  render() {
    const { photos, orderGrid } = this.props

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

      const SortableList = SortableContainer(({ items }) => {
        return (
          <ol className="order-grid">
            {items.map((photo, index) => (
              <SortableItem key={`item-${index}`} index={index} photo={photo} />
            ))}
          </ol>
        )
      })

      return (
        <SortableList axis="xy" items={photos} onSortEnd={this.onSortEnd} />
      )
    } else {
      // Show full vertical list of photos to add data to
      return photos.map((photo, i) => (
        <div className="photo-wrapper" key={`photo-${i}`}>
          <Photo file={photo.file} photo={photo} />
          <div className="photo-actions">
            <button onClick={e => this.handleRemove(photo.id)}>❌</button>
            {photos.length > 1 &&
              i > 0 && <button onClick={e => this.handleMoveUp(i)}>👆</button>}
            {photos.length > 1 &&
              i < photos.length - 1 && (
                <button onClick={e => this.handleMoveDown(i)}>👇</button>
              )}
            {photo.error && (
              <button onClick={e => this.handleRetry(photo)}>
                Retry Upload
              </button>
            )}
          </div>
        </div>
      ))
    }
  }
}

function mapStateToProps(state, props) {
  return {
    photos: state.photos.toJS(),
    orderGrid: state.app.get('orderGridShown'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        reorderPhotos,
        removePhoto,
        retryPhotoUpload,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList)
