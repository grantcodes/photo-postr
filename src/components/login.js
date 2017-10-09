import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from '../modules/rest-api';
import { setUserOption } from '../actions';
import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: '',
      loadingMessage: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Probably a redirect from the auth provider.
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const me = urlParams.get('me');
      const state = urlParams.get('state');
      if (code && me && state) {
        this.props.actions.setUserOption('me', me);
        api('token', {
          code: code,
          ...this.props.user,
        })
          .then(res => {
            this.props.actions.setUserOption('token', res.token);
            this.props.actions.setUserOption('mediaEndpoint', res.mediaEndpoint);
          })
          .catch(err => console.log(err));
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let state = this.props.user.state;
    if (!state) {
      state = new Date().getTime();
      this.props.actions.setUserOption('state', state);
    }
    api('authurl', {me: this.state.domain, state: state})
      .then((res) => {
          if (res.tokenEndpoint) {
            this.props.actions.setUserOption('tokenEndpoint', res.tokenEndpoint);
          }
          if (res.micropubEndpoint) {
            this.props.actions.setUserOption('micropubEndpoint', res.micropubEndpoint);
          }
          if (res.url) {
            window.location.href = res.url;
          }
      })
      .catch(err => console.log(err));
    return false;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login__form">
          <input type="url" placeholder="Your Domain" onChange={(e) => this.setState({domain: e.target.value})} />
          <button type="submit">Login</button>
        </form>
        <div style={{ maxWidth: '40em', padding: '1em', margin: 'auto', textAlign: 'left' }}>
          <h3>WTF is this thing?</h3>
          <p>This is a <a href="https://indieweb.org/micropub">micropub</a> client for posting photo galleries / albums to your <a href="https://indieweb.org">indieweb</a> website</p>
          <h4>Nerdy Stuff</h4>
          <p>For this to work on your site you need to support a few things:</p>
          <ul>
            <li>A micropub endpoint that supports json posts</li>
            <li>A media endpoint</li>
            <li><a href="https://indieweb.org/collection">Collection</a> support</li>
          </ul>
          <p>Since at the moment this is a very new thing to micropub the gallery request is sent with the collection of photo urls both as a collection property and as children:</p>
          <div dangerouslySetInnerHTML={{__html: `<div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">{
      <span style="color: #007700">&quot;type&quot;</span>: [<span style="background-color: #fff0f0">&quot;h-entry&quot;</span>],
      <span style="color: #007700">&quot;properties&quot;</span>: {
          <span style="color: #007700">&quot;category&quot;</span>: [<span style="background-color: #fff0f0">&quot;gallery&quot;</span>],
          <span style="color: #007700">&quot;collection&quot;</span>: [<span style="background-color: #fff0f0">&quot;https://yoursite.com/photopost1&quot;</span>, <span style="background-color: #fff0f0">&quot;https://yoursite.com/photopost2&quot;</span>]
      },
      <span style="color: #007700">&quot;children&quot;</span>: [<span style="background-color: #fff0f0">&quot;https://yoursite.com/photopost1&quot;</span>, <span style="background-color: #fff0f0">&quot;https://yoursite.com/photopost2&quot;</span>]
  }
  </pre></div>`}}></div>

          <p>There is also no set way to hide the individual photo posts from your main feed, so the category <code>gallery-photo</code> is added to the photo posts and you may hide them if you wish.</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators({
        setUserOption: setUserOption,
      }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
