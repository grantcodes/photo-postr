import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortByDate, showOrderGrid, hideOrderGrid } from '../actions'
import '../styles/toolbar.css'

const Toolbar = () => {
  const dispatch = useDispatch()
  const orderGrid = useSelector((state) => state.app.get('orderGridShown'))

  return (
    <div className="toolbar">
      {!orderGrid && (
        <button onClick={() => dispatch(sortByDate())}>📅 Sort by Date</button>
      )}
      {orderGrid ? (
        <button onClick={() => dispatch(hideOrderGrid())}>
          👍 Done Ordering
        </button>
      ) : (
        <button onClick={() => dispatch(showOrderGrid())}>
          👆 Manually Reorder
        </button>
      )}
    </div>
  )
}

export default Toolbar
