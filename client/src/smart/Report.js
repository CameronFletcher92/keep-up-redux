import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { fetchReportAsync } from '../ducks/clients'
import CenteredSpinner from '../dumb/CenteredSpinner'

class Report extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { id, fetchReportAsync } = this.props
    fetchReportAsync(id)
  }

  render() {
    const { report, isFetching } = this.props

    return (
      <div>
        <CenteredSpinner isVisible={isFetching}/>
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
  id: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default connect(
  state => {
    return {
      report: state.clients.get('report'),
      isFetching: state.clients.get('isFetching'),
      id: state.router.params.id
    }
  },
  dispatch => {
    return bindActionCreators({ fetchReportAsync }, dispatch)
  }
)(Report)
