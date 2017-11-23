import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UploadField } from '@navjobs/upload';
import { addPhoto, setPhotoUploading, setPhotoUploaded, setPhotoProperty } from '../actions';
import moment from 'moment';
import { generate as generateId } from 'shortid';
import { postMedia } from '../modules/rest-api';
import '../styles/uploader.css';

class Uploader extends Component {

  componentWillReceiveProps(newProps) {
    const uploadLimit = 5;
    if (newProps.uploading.uploading.length < uploadLimit && newProps.uploading.waiting.length > 0) {
      const photoId = newProps.uploading.waiting[0];
      const photo = newProps.photos.find((photo) => photo.id === photoId);
      if (photo) {
        this.props.actions.setPhotoUploading(photo.id);
        postMedia(photo.file, this.props.user)
          .then((res) => {
            this.props.actions.setPhotoUploaded(photo.id);
            if (res.url) {
              this.props.actions.setPhotoProperty(photo.id, 'photoUrl', res.url);
            }
          })
          .catch((err) => {
            this.props.actions.setPhotoUploaded(photo.id);
            alert(`OH NO! 😱 \n\nSomething went wrong uploading the image "${photo.file.name}": ${err}`);
          });
      }
    }
  }

  render() {
    return (
      <UploadField
        onFiles={(files) => {
          for (var i = 0; i < files.length; i++) {
            const file = files[i];
            this.props.actions.addPhoto({
              id: generateId(),
              name: file.name,
              file: file,
              date: moment(),
              latitude: false,
              longitude: false,
              content: '',
            });
          }
        }}
        containerProps={{
          className: 'resume_import'
        }}
        uploadProps={{
          multiple: true,
          accept: '.jpg,.jpeg,.png,.gif,',
        }}
      >
        <div className="uploader">
          <button className="uploader__button">Drag your photos here or click to select</button>
        </div>
      </UploadField>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.toJS(),
    uploading: state.uploading.toJS(),
    photos: state.photos.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators({
        addPhoto: addPhoto,
        setPhotoUploading: setPhotoUploading,
        setPhotoUploaded: setPhotoUploaded,
        setPhotoProperty: setPhotoProperty,
      }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
