import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { fetchReportAsync } from '../ducks/clients'

class Report extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { id, fetchReportAsync } = this.props
    fetchReportAsync(id)
  }

  render() {
    const { report } = this.props

    return (
      <div>
        <div>Name: {report.get('name')}</div>
        <div>Sessions: {report.get('sessions').size}</div>
        <div>Exercises: {report.get('exercises').size}</div>
      </div>
    )
  }
}

Report.propTypes = {
  report: ImmPropTypes.contains({
    name: PropTypes.string.isRequired,
    sessions: ImmPropTypes.listOf(
      PropTypes.string.isRequired
    ).isRequired,
    exercises: ImmPropTypes.map.isRequired
  }),
  id: PropTypes.string.isRequired
}

export default connect(
  state => {
    return {
      report: state.clients.get('report'),
      id: state.router.params.id
    }
  },
  dispatch => {
    return bindActionCreators({ fetchReportAsync }, dispatch)
  }
)(Report)
