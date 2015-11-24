import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { pushState } from 'redux-router'
import { fetchAsync, updateSearch } from '../ducks/sessions'
import { updateDateAsync } from '../ducks/global'
import { toDateTimeString } from '../util/dateHelper'
import SimpleList from '../dumb/SimpleList'
import FixedActionButton from '../dumb/FixedActionButton'
import DateRangePicker from '../dumb/DateRangePicker'

class SessionsList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const props = this.props

    if (props.entities.size === 0) {
      props.fetchAsync(props.startDate, props.endDate)
    }
  }

  render() {
    const props = this.props
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    return (
      <div>
        <DateRangePicker startDate={props.startDate} endDate={props.endDate}
                         startDateChanged={(dt) => props.updateDateAsync('start', dt)}
                         endDateChanged={(dt) => props.updateDateAsync('end', dt)}/>
        <SimpleList title='Sessions' items={props.entities} busyItems={props.syncing}
                    onItemClick={(id) => props.pushState({ title: 'Edit Session' }, '/sessions/' + id)}
                    isBusy={props.isFetching} search={props.search} updateSearch={props.updateSearch}
                    getItemLetter={(session) => days[session.get('time').getDay()]}
                    getItemName={(session) => toDateTimeString(session.get('time')) + ' (' + session.get('clients').size + ')'} />
        <FixedActionButton icon='add' onClick={() => props.pushState({ title: 'New Session' }, '/sessions/new')}/>
      </div>
    )
  }
}

SessionsList.propTypes = {
  // entities is an immutable list of immutable sessions
  entities: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  time: PropTypes.instanceOf(Date).isRequired
                })
              ),
  syncing: ImmPropTypes.map.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  updateDateAsync: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
}

export default connect(
  state => {
    return {
      entities: state.sessions.get('entities'),
      isFetching: state.sessions.get('isFetching'),
      syncing: state.sessions.get('syncing'),
      search: state.sessions.get('search'),
      startDate: state.global.get('startDate'),
      endDate: state.global.get('endDate')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, pushState, updateSearch, updateDateAsync }, dispatch)
  }
)(SessionsList)
