import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { pushState } from 'redux-router'
import { Avatar, List, ListItem, ListDivider, Paper } from '../themes/muiComponents'
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
    const props = this.props
    props.fetchReportAsync(props.id)

    if (props.sessions.size === 0) {
      props.fetchSessionsAsync()
    }

    if (props.exercises.size === 0) {
      props.fetchExercisesAsync()
    }
  }

  renderSessions() {
    const props = this.props
    if (props.sessions.size === 0) {
      return null
    }
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    return props.report.get('sessions').map(sessionId => {
      return (
        <ListItem key={sessionId} primaryText={props.sessions.getIn([sessionId, 'time']).toLocaleString('en-AU')}
                  leftAvatar={<Avatar> {days[props.sessions.getIn([sessionId, 'time']).getDay()]} </Avatar>}
                  onClick={() => props.pushState({ title: 'Edit Exercise' }, '/sessions/' + sessionId)}/>
      )
    })
  }

  renderExercises() {
    const props = this.props
    if (props.exercises.size === 0) {
      return null
    }
    return props.report.get('exercises').keySeq().map(exerciseId => {
      return (
        <ListItem key={exerciseId} primaryText={props.exercises.getIn([exerciseId, 'name'])}
                  leftAvatar={<Avatar>{props.report.get('exercises').get(exerciseId)}</Avatar>}
                  onClick={() => props.pushState({ title: 'Edit Exercise' }, '/exercises/' + exerciseId)}/>
      )
    })
  }

  render() {
    const props = this.props

    return (
      <Paper zDepth={2}>
        <div style={styles.container}>
          <CenteredSpinner isVisible={props.isFetching}/>
          {!props.isFetching ?
            <div>
              <div style={{ marginTop: '-1em', marginBottom: '-1em' }}>
                <h2>{props.report.get('name')}</h2>
              </div>

              <div style={styles.listContainer}>
                <div style={styles.list}>
                  <List>
                    <div>
                      <h3>Sessions: {props.report.get('sessions').size}</h3>
                    </div>
                    <ListDivider />
                    <CenteredSpinner isVisible={props.sessionsFetching} />
                    {this.renderSessions()}
                  </List>
                </div>
                <div style={styles.list}>
                  <List>
                    <div>
                      <h3>Exercises: {props.report.get('exercises').size}</h3>
                    </div>
                    <ListDivider />
                    <CenteredSpinner isVisible={props.exercisesFetching} />
                    {this.renderExercises()}
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
