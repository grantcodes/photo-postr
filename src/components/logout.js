import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUserOption } from '../actions'
import '../styles/logout.css'

class Logout extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(e) {
    e.preventDefault()
    Object.keys(this.props.user).forEach(key => {
      this.props.actions.setUserOption(key, false)
    })
    return false
  }

  render() {
    return (
      <div className="logout">
        <span className="logout__user">Logged in as {this.props.user.me}</span>
        <button className="button logout__button" onClick={this.handleLogout}>
          Log Out
        </button>
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
)(Logout)
