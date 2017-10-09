import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getData} from 'exif-js';
import moment from 'moment';
import MapInput from './map-input';
import {setPhotoProperty, removePhoto} from '../actions';
import {postMedia} from '../modules/rest-api';
import '../styles/photo.css';


const ConvertDMSToDD = function(degrees, minutes, seconds, direction) {   
  var dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);
  if (direction === 'S' || direction === 'W') {
    dd = dd * -1;
  }
  return dd;
}

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      exif: null,
      previewUrl: URL.createObjectURL(this.props.file),
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  
  componentDidMount() {
    // Get exif data
    const self = this;

    if (!this.state.exif) {
      getData(this.props.file, function() {
        if (this.exifdata) {
          // Set date from exif data
          self.setState({exif: this.exifdata});
          if (this.exifdata.DateTimeOriginal) {
            self.props.actions.setPhotoProperty(self.props.photo.id, 'date', moment(this.exifdata.DateTimeOriginal, 'YYYY:MM:DD hh:mm:ss'));
          } else if (this.exifdata.DateTime) {
            self.props.actions.setPhotoProperty(self.props.photo.id, 'date', moment(this.exifdata.DateTime, 'YYYY:MM:DD hh:mm:ss'));
          }
          // Set GPS from exif
          if (
            this.exifdata.GPSLatitude
            && this.exifdata.GPSLatitude.length === 3
            && this.exifdata.GPSLatitudeRef
            && this.exifdata.GPSLongitude
            && this.exifdata.GPSLongitude.length === 3
            && this.exifdata.GPSLongitudeRef
          ) {
            const lat = ConvertDMSToDD(this.exifdata.GPSLatitude[0], this.exifdata.GPSLatitude[1], this.exifdata.GPSLatitude[2], this.exifdata.GPSLatitudeRef);
            const lng = ConvertDMSToDD(this.exifdata.GPSLongitude[0], this.exifdata.GPSLongitude[1], this.exifdata.GPSLongitude[2], this.exifdata.GPSLongitudeRef);
            self.props.actions.setPhotoProperty(self.props.photo.id, 'latitude', lat);
            self.props.actions.setPhotoProperty(self.props.photo.id, 'longitude', lng);
          }
        }
      });
    }

    if (!this.props.photo.photoUrl && !this.state.uploading) {
      this.setState({ uploading: true });
      postMedia(this.props.file, this.props.user)
        .then((res) => {
          this.setState({ uploading: false });
          if (res.url) {
            this.props.actions.setPhotoProperty(this.props.photo.id, 'photoUrl', res.url);
          }
        })
        .catch((err) => {
          this.setState({ uploading: false }); 
          alert(`OH NO! 😱 \n\nSomething went wrong uploading the image "${this.props.file.name}": ${err}`);
        });
    }
  }

  handleLocationChange(latitude, longitude) {
    this.props.actions.setPhotoProperty(this.props.photo.id, 'latitude', latitude);
    this.props.actions.setPhotoProperty(this.props.photo.id, 'longitude', longitude);
  }

  handleRemove(e) {
    e.preventDefault();
    this.props.actions.removePhoto(this.props.photo.id);
  }
  
  render() {
    return (
      <div className={'photo ' + (this.props.dragging ? 'photo--is-dragging' : '')}>
        <div className={!this.props.photo.photoUrl ? 'photo__preview photo__preview--uploading' : 'photo__preview'}>
          <img
            src={this.state.previewUrl}
            alt={'preview of ' + this.props.photo.name}
            className="photo__preview__image"
          />
          {this.props.photo.photoUrl ? <span className="photo__preview__url">{this.props.photo.photoUrl}</span> : null}
        </div>

        <div className="photo__details">

          <div>
            <label htmlFor={'photo__name' + this.props.photo.id} className="photo__label">Name</label>
            <input
              type="text"
              id={'photo__name' + this.props.photo.id}
              className="photo__input photo__name"
              value={this.props.photo.name}
              onKeyDown={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
              onChange={(e) => {this.props.actions.setPhotoProperty(this.props.photo.id, 'name', e.target.value)}}
            />
          </div>

          <div>
            <label htmlFor={'photo__date' + this.props.photo.id} className="photo__label">Date</label>
            <input
              type="datetime-local"
              id={'photo__date' + this.props.photo.id}
              className="photo__input photo__date"
              value={this.props.photo.date.format('YYYY-MM-DDThh:mm:ss')}
              onKeyDown={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
              onChange={(e) => {this.props.actions.setPhotoProperty(this.props.photo.id, 'date', moment(e.target.value))}}
            />
          </div>

          <div>
            <label htmlFor={'photo__content' + this.props.photo.id} className="photo__label">Content</label>
            <textarea
              id={'photo__content' + this.props.photo.id}
              className="photo__input photo__content"
              value={this.props.photo.content}
              onKeyDown={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
              onChange={(e) => {this.props.actions.setPhotoProperty(this.props.photo.id, 'content', e.target.value)}}
            ></textarea>
          </div>

          <div>
            <label htmlFor={'photo__location' + this.props.photo.id} className="photo__label">Location</label>
            {(this.props.photo.latitude !== false && this.props.photo.longitude !== false) ? <input id={'photo__location' + this.props.photo.id} type="text" readOnly={true} className="photo__input photo__location" onMouseDown={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()} value={`${this.props.photo.latitude},${this.props.photo.longitude}`} /> : null}
            <MapInput
              latitude={this.props.photo.latitude}
              longitude={this.props.photo.longitude}
              onChange={this.handleLocationChange}
            />
          </div>

          <button className="photo__remove" onClick={this.handleRemove}>Remove</button>
        </div>
      </div>
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
        setPhotoProperty: setPhotoProperty,
        removePhoto: removePhoto,
      }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
