import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../modules/rest-api'
import { setUserOption } from '../../actions'

const LoginForm = ({ actions }) => {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user.toJS())
  const dispatch = useDispatch()

  useEffect(() => {
    // Probably a redirect from the auth provider.
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state')
      if (code && state) {
        console.log('Logging in or something')
        setLoading(true)
        api('token', {
          code: code,
          ...user,
        })
          .then((res) => {
            dispatch(setUserOption('token', res.token))
            dispatch(setUserOption('mediaEndpoint', res.mediaEndpoint))
          })
          .catch((err) => {
            setLoading(false)
            console.error('Error finalizing login', err)
          })
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) {
      return
    }
    let state = user.state
    if (!state) {
      state = new Date().getTime()
      dispatch(setUserOption('state', state))
    }
    dispatch(setUserOption('me', domain))
    api('authurl', { me: domain, state: state })
      .then((res) => {
        if (res.tokenEndpoint) {
          dispatch(setUserOption('tokenEndpoint', res.tokenEndpoint))
        }
        if (res.micropubEndpoint) {
          dispatch(setUserOption('micropubEndpoint', res.micropubEndpoint))
        }
        if (res.url) {
          window.location.href = res.url
        }
      })
      .catch((err) => console.error(err))
    return false
  }

  return (
    <form onSubmit={handleSubmit} className="login__form">
      <input
        type="url"
        placeholder="Your Domain"
        onChange={(e) => setDomain(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging In...' : 'Login'}
      </button>
    </form>
  )
}

export default LoginForm
