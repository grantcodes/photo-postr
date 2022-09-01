import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LoginForm } from '../LoginForm'
import { login, getAuthUrl } from '../../actions'

const Form = () => {
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

  const handleSubmit = (domain) => {
    dispatch(getAuthUrl(domain)).catch(console.error)
  }

  return <LoginForm onSubmit={handleSubmit} loading={loading} />
}

export default Form
