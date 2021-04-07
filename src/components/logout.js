import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUserOption } from '../actions'
import '../styles/logout.css'

const Logout = ({ user, actions }) => {
  const handleLogout = (e) => {
    e.preventDefault()
    Object.keys(user).forEach((key) => {
      actions.setUserOption(key, false)
    })
    return false
  }

  return (
    <div className="logout">
      <span className="logout__user">Logged in as {user.me}</span>
      <button className="button" onClick={handleLogout}>
        Log Out
      </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
