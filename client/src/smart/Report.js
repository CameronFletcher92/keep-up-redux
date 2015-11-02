import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import shouldUpdatePure from '../util/shouldUpdatePure'
import ImmPropTypes from 'react-immutable-proptypes'
import { Avatar, List, ListItem, ListDivider, Paper, DatePicker, RaisedButton } from '../themes/muiComponents'
import DoughnutChart from '../dumb/DoughnutChart'
import { fetchReportAsync, updateReportDate } from '../ducks/clients'
import { fetchAsync as fetchExercisesAsync } from '../ducks/exercises'
import { fetchAsync as fetchSessionsAsync } from '../ducks/sessions'
import CenteredSpinner from '../dumb/CenteredSpinner'
import IconInputContainer from '../dumb/IconInputContainer'
import chartColors from '../themes/chartColors'
import { toDateTimeString, toDateString } from '../util/dateHelper'

const styles = {
  reportContainer: { padding: '1em', marginTop: '1em', display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  dateContainer: { padding: '0em', margin: '0em', flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  datepicker: { flex: '1 1 auto', margin: '0em', marginRight: '1em' },
  text: { width: '100%', marginBottom: '0.5em' },
  button: { flex: '0 1 auto', margin: '0em', alignSelf: 'center' },
  nameContainer: { marginTop: '-1em', marginBottom: '-1em' },
  listContainer: { flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  list: { flex: '1 1 auto', margin: '1em' }
}

class Report extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const props = this.props
    props.fetchReportAsync(props.id, props.reportMin, props.reportMax)

    if (props.sessions.size === 0) {
      props.fetchSessionsAsync()
    }

    if (props.exercises.size === 0) {
      props.fetchExercisesAsync()
    }
  }

  renderListHeader() {
    const props = this.props
    return 'Attended Sessions: ' + props.report.get('sessions').size
  }

  renderNestedExercises(exercises) {
    const props = this.props
    return exercises.keySeq().toJS().map(exerciseId => {
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

    return props.report.get('sessions').map(sessionId => {
      const session = props.sessions.get(sessionId)
      if (!session) return null

      return (
        <ListItem key={sessionId} primaryText={toDateTimeString(session.get('time'))}
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
    return props.report.get('exercises').keySeq().map(exerciseId => {
      return (
        <ListItem key={exerciseId} primaryText={props.exercises.getIn([exerciseId, 'name'])}
                  leftAvatar={<Avatar>{props.report.get('exercises').get(exerciseId)}</Avatar>}/>
      )
    })
  }

  renderChart() {
    const props = this.props
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
      <div>
        <div style={styles.dateContainer}>
          <div style={styles.datepicker}>
            <IconInputContainer icon='event'>
              <DatePicker formatDate={toDateString} style={styles.datepicker} textFieldStyle={styles.text} floatingLabelText='Min Date'
                          value={props.reportMin} onChange={(ev, dt) => props.updateReportDate('min', dt)} />
            </IconInputContainer>
          </div>
          <div style={styles.datepicker}>
            <IconInputContainer icon='event'>
              <DatePicker formatDate={toDateString} style={styles.datepicker} textFieldStyle={styles.text} floatingLabelText='Max Date'
                          value={props.reportMax} onChange={(ev, dt) => props.updateReportDate('max', dt)} />
            </IconInputContainer>
          </div>
          <div style={styles.button}>
            <RaisedButton label='Refresh' primary disabled={props.isFetching}
                          onClick={() => props.fetchReportAsync(props.id, props.reportMin, props.reportMax)}/>
          </div>
        </div>
        <Paper zDepth={2}>
          <div style={styles.reportContainer}>
            <CenteredSpinner isVisible={props.isFetching}/>
            {!props.isFetching ?
              <div>
                <div style={styles.nameContainer}>
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

                <div style={styles.chartContainer}>
                  {(!props.exercisesFetching && !props.sessionsFetching) ? this.renderChart() : null}
                </div>
              </div>
              : null}
          </div>
        </Paper>
      </div>
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
  reportMin: PropTypes.instanceOf(Date),
  reportMax: PropTypes.instanceOf(Date),
  updateReportDate: PropTypes.func.isRequired
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
      reportMin: state.clients.get('reportMin'),
      reportMax: state.clients.get('reportMax')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchReportAsync, fetchSessionsAsync, fetchExercisesAsync, updateReportDate }, dispatch)
  }
)(Report)
