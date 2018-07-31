import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortByDate } from '../actions'
import '../styles/toolbar.css'

const Toolbar = ({ sortByDate }) => (
  <div className="toolbar">
    <button onClick={sortByDate}>📅 Sort by Date</button>
    {/* <button>👆 Manually Reorder</button> */}
  </div>
)

function mapStateToProps(state, props) {
  return {
    // user: state.user.toJS(),
    // uploading: state.uploading.toJS(),
    // photos: state.photos.toJS(),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sortByDate,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
