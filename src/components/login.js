import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import api from '../modules/rest-api'
import { setUserOption } from '../actions'
import '../styles/login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      domain: '',
      loadingMessage: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // Probably a redirect from the auth provider.
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state')
      if (code && state) {
        console.log('Logging in or something')
        api('token', {
          code: code,
          ...this.props.user,
        })
          .then(res => {
            this.props.actions.setUserOption('token', res.token)
            this.props.actions.setUserOption('mediaEndpoint', res.mediaEndpoint)
          })
          .catch(err => console.log(err))
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    let state = this.props.user.state
    if (!state) {
      state = new Date().getTime()
      this.props.actions.setUserOption('state', state)
    }
    this.props.actions.setUserOption('me', this.state.domain)
    api('authurl', { me: this.state.domain, state: state })
      .then(res => {
        if (res.tokenEndpoint) {
          this.props.actions.setUserOption('tokenEndpoint', res.tokenEndpoint)
        }
        if (res.micropubEndpoint) {
          this.props.actions.setUserOption(
            'micropubEndpoint',
            res.micropubEndpoint
          )
        }
        if (res.url) {
          window.location.href = res.url
        }
      })
      .catch(err => console.log(err))
    return false
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login__form">
          <input
            type="url"
            placeholder="Your Domain"
            onChange={e => this.setState({ domain: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
        <div>
          <h3>WTF is this thing?</h3>
          <p>
            This is a <a href="https://indieweb.org/micropub">micropub</a>{' '}
            client for posting photo galleries / albums to your{' '}
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
            Then the gallery request is sent with the collection of photo urls
            as children:
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
}

function mapStateToProps(state, props) {
  return {
    user: state.user.toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setUserOption: setUserOption,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
