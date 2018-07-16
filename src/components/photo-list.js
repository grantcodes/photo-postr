import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Photo from './photo'
import { reorderPhotos, removePhoto } from '../actions'

class PhotoList extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleMoveUp = this.handleMoveUp.bind(this)
    this.handleMoveDown = this.handleMoveDown.bind(this)
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

  render() {
    const { photos } = this.props
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
        </div>
      </div>
    ))
  }
}

function mapStateToProps(state, props) {
  return {
    photos: state.photos.toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        reorderPhotos: reorderPhotos,
        removePhoto: removePhoto,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList)
