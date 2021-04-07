import React, { Fragment } from 'react'
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import PhotoList from './components/photo-list'
import Uploader from './components/uploader'
import Login from './components/login'
import Toolbar from './components/toolbar'
import Gallery from './components/gallery'
import Logout from './components/logout'

const App = ({ user = null }) => {
  const isLoggedIn =
    user && user.me && user.token && user.micropubEndpoint && user.mediaEndpoint

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

const mapStateToProps = (state, props) => ({
  user: state.user.toJS(),
})

export default connect(mapStateToProps)(App)
