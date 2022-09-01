import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ButtonGroup, Button } from '@grantcodes/ui'
import { sortByDate, showOrderGrid, hideOrderGrid } from '../actions'
import '../styles/toolbar.css'

const Toolbar = () => {
  const dispatch = useDispatch()
  const orderGrid = useSelector((state) => state.app.get('orderGridShown'))

  return (
    <ButtonGroup className="toolbar">
      {!orderGrid && (
        <Button onClick={() => dispatch(sortByDate())}>📅 Sort by Date</Button>
      )}
      {orderGrid ? (
        <Button onClick={() => dispatch(hideOrderGrid())}>
          👍 Done Ordering
        </Button>
      ) : (
        <Button onClick={() => dispatch(showOrderGrid())}>
          👆 Manually Reorder
        </Button>
      )}
    </ButtonGroup>
  )
}

export default Toolbar
