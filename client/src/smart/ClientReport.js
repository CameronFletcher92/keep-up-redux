import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import shouldUpdatePure from '../util/shouldUpdatePure'
import ImmPropTypes from 'react-immutable-proptypes'
import { Avatar, List, ListItem, ListDivider, Paper } from '../themes/muiComponents'
import DoughnutChart from '../dumb/DoughnutChart'
import { fetchReportAsync } from '../ducks/clients'
import { fetchAsync as fetchExercisesAsync } from '../ducks/exercises'
import { fetchAsync as fetchSessionsAsync } from '../ducks/sessions'
import CenteredSpinner from '../dumb/CenteredSpinner'
import chartColors from '../themes/chartColors'
import { toDateTimeString, toDateString } from '../util/dateHelper'

const styles = {
  reportContainer: { padding: '1em', marginTop: '1em', display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  nameContainer: { marginTop: '-1em', marginBottom: '-1em' },
  rangeContainer: { marginTop: '1.5em' },
  listContainer: { flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  list: { flex: '1 1 auto', margin: '1em' }
}

class ClientReport extends Component {
  static shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const props = this.props
    props.fetchReportAsync(props.id, props.startDate, props.endDate)

    if (props.sessions.size === 0) {
      props.fetchSessionsAsync()
    }

    if (props.exercises.size === 0) {
      props.fetchExercisesAsync()
    }
  }

  renderNestedExercises(exercises) {
    const props = this.props
    const sorted = exercises.keySeq().sortBy(exerciseId => props.exercises.getIn([exerciseId, 'name']))

    return sorted.toJS().map(exerciseId => {
      const exercise = props.exercises.get(exerciseId)
      if (!exercise) return null

      return (
        <ListItem key={exerciseId} primaryText={exercise.get('name')}
                  leftAvatar={<Avatar>{exercise.get('name').charAt(0).toUpperCase()}</Avatar>}/>
      )
    })
  }

  renderSessions() {
    const props = this.props
    if (props.sessions.size === 0) {
      return null
    }
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const sorted = props.report.get('sessions').sortBy(sessionId => props.sessions.getIn([sessionId, 'time']).getTime())
    return sorted.map(sessionId => {
      const session = props.sessions.get(sessionId)
      if (!session) return null

      return (
        <ListItem key={sessionId}
                  primaryText={toDateTimeString(session.get('time')) + ' (' + session.get('clients').size + ')'}
                  leftAvatar={<Avatar> {days[session.get('time').getDay()]} </Avatar>}
                  nestedItems={this.renderNestedExercises(session.get('exercises'))} />
      )
    })
  }

  renderExercises() {
    const props = this.props
    if (props.exercises.size === 0) {
      return null
    }
    const sorted = props.report.get('exercises').keySeq().sortBy(exerciseId => props.report.getIn(['exercises', exerciseId])).reverse()
    return sorted.map(exerciseId => {
      return (
        <ListItem key={exerciseId} primaryText={props.exercises.getIn([exerciseId, 'name'])}
                  leftAvatar={<Avatar>{props.report.getIn(['exercises', exerciseId])}</Avatar>}/>
      )
    })
  }

  renderChart() {
    const props = this.props
    if (props.sessionsFetching || props.exercisesFetching
        || props.report.get('exercises').size === 0 || props.report.get('sessions').size === 0) {
      return null
    }

    let count = -1
    const data = props.report.get('exercises').keySeq().toJS().map(exerciseId => {
      count++
      return {
        label: props.exercises.getIn([exerciseId, 'name']),
        value: props.report.getIn(['exercises', exerciseId]),
        color: chartColors[count % chartColors.length]
      }
    })

    return (
      <DoughnutChart data={data} title='Exercise Chart'/>
    )
  }

  render() {
    const props = this.props

    return (
      <Paper zDepth={2}>
        <div style={styles.reportContainer}>
          <CenteredSpinner isVisible={props.isFetching}/>
          {!props.isFetching ?
            <div>
              <div style={styles.nameContainer}>
                <h2>{props.report.get('name')}</h2>
              </div>
              <div style={styles.rangeContainer}>
                {props.startDate ? <span>From <b>{toDateString(props.startDate)}</b></span> : null}
                {props.endDate ? <span> to <b>{toDateString(props.endDate)}</b></span> : null}
              </div>

              <div style={styles.listContainer}>
                <div style={styles.list}>
                  <List>
                    <div>
                      <h3>Sessions: {props.report.get('sessions').size}</h3>
                    </div>
                    <ListDivider />
                    <CenteredSpinner isVisible={props.sessionsFetching} />
                    {!props.sessionsFetching ? this.renderSessions() : null}
                  </List>
                </div>
                <div style={styles.list}>
                  <List>
                    <div>
                      <h3>Exercises: {props.report.get('exercises').size}</h3>
                    </div>
                    <ListDivider />
                    <CenteredSpinner isVisible={props.exercisesFetching} />
                    {!props.exercisesFetching ? this.renderExercises() : null}
                  </List>
                </div>
              </div>

              <div style={styles.chartContainer}>
                {(!props.exercisesFetching && !props.sessionsFetching) ? this.renderChart() : null}
              </div>
            </div>
            : null}
        </div>
      </Paper>
    )
  }
}

ClientReport.propTypes = {
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
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
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
      exercisesFetching: state.exercises.get('isFetching'),
      startDate: state.global.get('startDate'),
      endDate: state.global.get('endDate')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchReportAsync, fetchSessionsAsync, fetchExercisesAsync }, dispatch)
  }
)(ClientReport)
