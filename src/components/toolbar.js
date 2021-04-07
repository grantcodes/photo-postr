import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortByDate, showOrderGrid, hideOrderGrid } from '../actions'
import '../styles/toolbar.css'

const Toolbar = ({ sortByDate, showOrderGrid, hideOrderGrid, orderGrid }) => (
  <div className="toolbar">
    {!orderGrid && <button onClick={sortByDate}>📅 Sort by Date</button>}
    {orderGrid ? (
      <button onClick={hideOrderGrid}>👍 Done Ordering</button>
    ) : (
      <button onClick={showOrderGrid}>👆 Manually Reorder</button>
    )}
  </div>
)

const mapStateToProps = (state, props) => ({
  orderGrid: state.app.get('orderGridShown'),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sortByDate,
      showOrderGrid,
      hideOrderGrid,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
