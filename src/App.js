import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PhotoList from './components/photo-list';
import Uploader from './components/uploader';
import Login from './components/login';
import Gallery from './components/gallery';
import Logout from './components/logout';
import './styles/App.css';

class App extends Component {
  render() {
    let uploader = null;
    let login = (<Login />);
    if (this.props.user.me && this.props.user.token && this.props.user.micropubEndpoint && this.props.user.mediaEndpoint) {
      uploader = (<Uploader />);
      login = null;
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>PhotoPostr <span role="img" aria-label="camera emoji">📸</span></h2>
        </div>
        {login}
        {uploader}
        <PhotoList />
        {this.props.user.token ? <Gallery /> : null}
        {this.props.user.token ? <Logout /> : null}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    photos: state.photos.toJS(),
    user: state.user.toJS(),
  };
}
export default connect(mapStateToProps)(App);
