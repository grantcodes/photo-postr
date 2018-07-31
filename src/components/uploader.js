import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { UploadField } from '@navjobs/upload'
import {
  addPhoto,
  setPhotoUploading,
  setPhotoUploaded,
  setPhotoProperty,
} from '../actions'
import moment from 'moment'
import { generate as generateId } from 'shortid'
import { postMedia } from '../modules/rest-api'
import '../styles/uploader.css'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullscreen: false,
    }
    this.handleFiles = this.handleFiles.bind(this)
  }

  componentDidMount() {
    // Add listener for drag events and make the drop zone cover the whole screen
    window.addEventListener('dragenter', e =>
      this.setState({ fullscreen: true })
    )
    // window.addEventListener('dragleave', e =>
    //   this.setState({ fullscreen: false })
    // )
    window.addEventListener('dragend', e =>
      this.setState({ fullscreen: false })
    )
    // dragstart	The user starts dragging an element or text selection.
    // drag	An element or text selection is being dragged (Fired continuously every 350ms).
    // dragend	A drag operation is being ended (by releasing a mouse button or hitting the escape key).
    // dragenter	A dragged element or text selection enters a valid drop target.
    // dragover	An element or text selection is being dragged over a valid drop target. (Fired continuously every 350ms.)
    // dragleave	A dragged element or text selection leaves a valid drop target.
    // drop	An element is dropped on a valid drop target.
  }

  componentWillReceiveProps(newProps) {
    const {
      setPhotoUploading,
      setPhotoUploaded,
      setPhotoProperty,
    } = this.props.actions
    const uploadLimit = 5
    if (
      newProps.uploading.uploading.length < uploadLimit &&
      newProps.uploading.waiting.length > 0
    ) {
      const photoId = newProps.uploading.waiting[0]
      const photo = newProps.photos.find(photo => photo.id === photoId)
      if (photo) {
        setPhotoUploading(photo.id)
        postMedia(photo.file, this.props.user)
          .then(res => {
            setPhotoUploaded(photo.id)
            if (res.url) {
              setPhotoProperty(photo.id, 'photoUrl', res.url)
            }
          })
          .catch(err => {
            setPhotoUploaded(photo.id)
            alert(
              `OH NO! 😱 \n\nSomething went wrong uploading the image "${
                photo.file.name
              }": ${err}`
            )
          })
      }
    }
  }

  handleFiles(files) {
    const { addPhoto } = this.props.actions
    this.setState({ fullscreen: false })
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      addPhoto({
        id: generateId(),
        name: file.name,
        file: file,
        date: moment(),
        latitude: false,
        longitude: false,
        content: '',
      })
    }
  }

  render() {
    const { fullscreen } = this.state
    const uploadProps = {
      multiple: true,
      accept: '.jpg,.jpeg,.png,.gif,',
    }

    return (
      <Fragment>
        {/* Uses a hidden upload field that appears over the entire site and a regular button too */}
        <div
          className={
            fullscreen
              ? 'fullscreen-uploader'
              : 'fullscreen-uploader fullscreen-uploader--hidden'
          }
          onMouseLeave={() => this.setState({ fullscreen: false })}
          onDragEnd={() => this.setState({ fullscreen: false })}
          onDragLeave={() => this.setState({ fullscreen: false })}
        >
          <UploadField
            onFiles={this.handleFiles}
            containerProps={{ className: 'fullscreen-uploader__dropzone' }}
            uploadProps={uploadProps}
          >
            <span className="button">
              Drop your photos to add them to the gallery
            </span>
          </UploadField>
        </div>
        <UploadField onFiles={this.handleFiles} uploadProps={uploadProps}>
          <div className="uploader">
            <button className="button">
              Drag your photos here or click to select
            </button>
          </div>
        </UploadField>
      </Fragment>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.toJS(),
    uploading: state.uploading.toJS(),
    photos: state.photos.toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addPhoto: addPhoto,
        setPhotoUploading: setPhotoUploading,
        setPhotoUploaded: setPhotoUploaded,
        setPhotoProperty: setPhotoProperty,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)
