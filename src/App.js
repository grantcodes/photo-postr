import React, { Component, Fragment } from 'react'
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import PhotoList from './components/photo-list'
import Uploader from './components/uploader'
import Login from './components/login'
import Toolbar from './components/toolbar'
import Gallery from './components/gallery'
import Logout from './components/logout'

class App extends Component {
  render() {
    const { user } = this.props
    const isLoggedIn =
      user &&
      user.me &&
      user.token &&
      user.micropubEndpoint &&
      user.mediaEndpoint

    return (
      <div className="App">
        {!isLoggedIn && <Login />}
        {isLoggedIn && (
          <Fragment>
            <Uploader />
            <Toolbar />
            <PhotoList />
            <Gallery />
            <Logout />
          </Fragment>
        )}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    photos: state.photos.toJS(),
    user: state.user.toJS(),
  }
}
export default connect(mapStateToProps)(App)
