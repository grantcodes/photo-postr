import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import PhotoList from './components/PhotoList'
import Uploader from './components/Uploader'
import Login from './components/Login'
import Toolbar from './components/Toolbar'
import Gallery from './components/Gallery'
import Logout from './components/Logout'

const App = () => {
  const user = useSelector((state) => state.user.toJS())
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

export default App
