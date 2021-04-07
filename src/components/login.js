import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import api from '../modules/rest-api'
import { setUserOption } from '../actions'
import '../styles/login.css'

const Login = ({ actions, user }) => {
  const [domain, setDomain] = useState('')
  const [loadingMessage, setLoadingMessage] = useState(false)

  useEffect(() => {
    // Probably a redirect from the auth provider.
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state')
      if (code && state) {
        console.log('Logging in or something')
        api('token', {
          code: code,
          ...user,
        })
          .then((res) => {
            actions.setUserOption('token', res.token)
            actions.setUserOption('mediaEndpoint', res.mediaEndpoint)
          })
          .catch((err) => console.log(err))
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let state = user.state
    if (!state) {
      state = new Date().getTime()
      actions.setUserOption('state', state)
    }
    actions.setUserOption('me', domain)
    api('authurl', { me: domain, state: state })
      .then((res) => {
        if (res.tokenEndpoint) {
          actions.setUserOption('tokenEndpoint', res.tokenEndpoint)
        }
        if (res.micropubEndpoint) {
          actions.setUserOption('micropubEndpoint', res.micropubEndpoint)
        }
        if (res.url) {
          window.location.href = res.url
        }
      })
      .catch((err) => console.err(err))
    return false
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          type="url"
          placeholder="Your Domain"
          onChange={(e) => setDomain(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <h3>WTF is this thing?</h3>
        <p>
          This is a <a href="https://indieweb.org/micropub">micropub</a> client
          for posting photo galleries / albums to your{' '}
          <a href="https://indieweb.org">indieweb</a> website
        </p>
        <h4>Nerdy Stuff</h4>
        <p>For this to work on your site you need to support a few things:</p>
        <ul>
          <li>A micropub endpoint that supports json posts</li>
          <li>A media endpoint</li>
          <li>
            <a href="https://indieweb.org/collection">Collection</a> support
          </li>
          <li>Visibility=unlisted support</li>
        </ul>
        <p>Each photo is sent individually:</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `<pre style="margin: 0; line-height: 125%">{
  <span style="color: #007700">&quot;type&quot;</span>: [<span style="background-color: #fff0f0">&quot;h-entry&quot;</span>],
  <span style="color: #007700">&quot;properties&quot;</span>: {
    <span style="color: #007700">&quot;category&quot;</span>: [<span style="background-color: #fff0f0">&quot;gallery-photo&quot;</span>],
    <span style="color: #007700">&quot;visibility&quot;</span>: [<span style="background-color: #fff0f0">&quot;unlisted&quot;</span>],
    <span style="color: #007700">&quot;name&quot;</span>: [<span style="background-color: #fff0f0">&quot;Photo title&quot;</span>],
    <span style="color: #007700">&quot;photo&quot;</span>: [<span style="background-color: #fff0f0">&quot;https://yoursite.com/media/photo.jpg&quot;</span>],
  }
}
</pre>`,
          }}
        />
        <p>
          Then the gallery request is sent with the collection of photo urls as
          children:
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: `<pre style="margin: 0; line-height: 125%">{
  <span style="color: #007700">&quot;type&quot;</span>: [<span style="background-color: #fff0f0">&quot;h-entry&quot;</span>],
  <span style="color: #007700">&quot;properties&quot;</span>: {
    <span style="color: #007700">&quot;category&quot;</span>: [<span style="background-color: #fff0f0">&quot;gallery&quot;</span>],
  },
  <span style="color: #007700">&quot;children&quot;</span>: [<span style="background-color: #fff0f0">&quot;https://yoursite.com/photopost1&quot;</span>, <span style="background-color: #fff0f0">&quot;https://yoursite.com/photopost2&quot;</span>]
}
  </pre>`,
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  user: state.user.toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      setUserOption: setUserOption,
    },
    dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
