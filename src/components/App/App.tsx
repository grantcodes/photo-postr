import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@grantcodes/ui'
import PhotoList from '../PhotoList'
import Uploader from '../Uploader'
import Login from '../Login'
import Toolbar from '../Toolbar'
import Gallery from '../Gallery'
import Logout from '../Logout'
import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'
import './App.css'

const App = () => {
  // @ts-ignore
  const user = useSelector(state => state.user.toJS())
  const isLoggedIn =
    user && user.me && user.token && user.micropubEndpoint && user.mediaEndpoint

  return (
    <>
      <AppHeader />
      <Container align='wide' asChild>
        <main className='app-main'>
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
        </main>
      </Container>
      <AppFooter />
    </>
  )
}

export { App }
