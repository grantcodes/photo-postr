import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@grantcodes/ui'
import { setUserOption } from '../actions'
import '../styles/logout.css'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.toJS())

  const handleLogout = (e) => {
    e.preventDefault()
    Object.keys(user).forEach((key) => {
      dispatch(setUserOption(key, false))
    })
    return false
  }

  return (
    <div className="logout">
      <span className="logout__user">Logged in as {user.me}</span>
      <Button className="button" onClick={handleLogout} variant="secondary">
        Log Out
      </Button>
    </div>
  )
}

export default Logout
