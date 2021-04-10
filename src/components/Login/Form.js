import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, getAuthUrl } from '../../actions'

const LoginForm = () => {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // Probably a redirect from the auth provider.
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state')
      if (code && state) {
        setLoading(true)
        dispatch(login(code)).finally(() => setLoading(false))
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) {
      return
    }
    dispatch(getAuthUrl(domain)).catch(console.error)
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
