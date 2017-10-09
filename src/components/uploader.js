import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UploadField } from '@navjobs/upload';
import { addPhoto } from '../actions';
import moment from 'moment';
import { generate as generateId } from 'shortid';
import '../styles/uploader.css';

class MyUploader extends Component {
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators({
        addPhoto: addPhoto,
      }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyUploader);
