import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { pushState } from 'redux-router'
import { Avatar, List, ListItem, ListDivider, Paper } from 'material-ui'
import { fetchReportAsync } from '../ducks/clients'
import { fetchAsync as fetchExercisesAsync } from '../ducks/exercises'
import { fetchAsync as fetchSessionsAsync } from '../ducks/sessions'
import CenteredSpinner from '../dumb/CenteredSpinner'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', margin: '1em' },
  listContainer: { flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  list: { flex: '1 1 auto', margin: '0.5em' }
}

class Report extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { id, fetchReportAsync, sessions, exercises, fetchSessionsAsync, fetchExercisesAsync } = this.props
    fetchReportAsync(id)

    if (sessions.size === 0) {
      fetchSessionsAsync()
    }

    if (exercises.size === 0) {
      fetchExercisesAsync()
    }
  }

  renderSessions(sessionIds, sessions, pushState) {
    if (sessions.size === 0) {
      return null
    }
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    return sessionIds.map(sessionId => {
      return (
        <ListItem key={sessionId} primaryText={sessions.getIn([sessionId, 'time']).toLocaleString('en-AU')}
                  leftAvatar={<Avatar> {days[sessions.getIn([sessionId, 'time']).getDay()]} </Avatar>}
                  onClick={() => pushState({ title: 'Edit Exercise' }, '/sessions/' + sessionId)}/>
      )
    })
  }

  renderExercises(exerciseCounts, exercises, pushState) {
    if (exercises.size === 0) {
      return null
    }
    return exerciseCounts.keySeq().map(exerciseId => {
      return (
        <ListItem key={exerciseId} primaryText={exercises.getIn([exerciseId, 'name'])}
                  leftAvatar={<Avatar>{exerciseCounts.get(exerciseId)}</Avatar>}
                  onClick={() => pushState({ title: 'Edit Exercise' }, '/exercises/' + exerciseId)}/>
      )
    })
  }

  render() {
    const { report, isFetching, exercises, sessions, sessionsFetching, exercisesFetching, pushState } = this.props

    return (
      <Paper zDepth={2}>
        <div style={styles.container}>
          <CenteredSpinner isVisible={isFetching}/>
          {!isFetching ?
            <div>
              <div style={{ marginTop: '-1em', marginBottom: '-1em' }}>
                <h2>{report.get('name')}</h2>
              </div>

              <div style={styles.listContainer}>
                <div style={styles.list}>
                  <List>
                    <div>
                      <h3>Sessions: {report.get('sessions').size}</h3>
                    </div>
                    <ListDivider />
                    <CenteredSpinner isVisible={sessionsFetching} />
                    {this.renderSessions(report.get('sessions'), sessions, pushState)}
                  </List>
                </div>
                <div style={styles.list}>
                  <List>
                    <div>
                      <h3>Exercises: {report.get('exercises').size}</h3>
                    </div>
                    <ListDivider />
                    <CenteredSpinner isVisible={exercisesFetching} />
                    {this.renderExercises(report.get('exercises'), exercises, pushState)}
                  </List>
                </div>
              </div>
            </div>
            : null}
        </div>
      </Paper>
    )
  }
}

Report.propTypes = {
  fetchSessionsAsync: PropTypes.func.isRequired,
  fetchExercisesAsync: PropTypes.func.isRequired,
  report: ImmPropTypes.contains({
    name: PropTypes.string.isRequired,
    sessions: ImmPropTypes.listOf(
      PropTypes.string.isRequired
    ).isRequired,
    exercises: ImmPropTypes.map.isRequired
  }),
  sessions: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  time: PropTypes.instanceOf(Date).isRequired
                })
              ),
  exercises: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  name: PropTypes.string.isRequired
                })
              ),
  id: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  sessionsFetching: PropTypes.bool.isRequired,
  exercisesFetching: PropTypes.bool.isRequired,
  pushState: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      report: state.clients.get('report'),
      isFetching: state.clients.get('isFetching'),
      id: state.router.params.id,
      sessions: state.sessions.get('entities'),
      exercises: state.exercises.get('entities'),
      sessionsFetching: state.sessions.get('isFetching'),
      exercisesFetching: state.exercises.get('isFetching')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchReportAsync, fetchSessionsAsync, fetchExercisesAsync, pushState }, dispatch)
  }
)(Report)
