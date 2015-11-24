import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { pushState } from 'redux-router'
import { fetchAsync, updateSearch } from '../ducks/clients'
import { updateDate } from '../ducks/global'
import SimpleList from '../dumb/SimpleList'
import DateRangePicker from '../dumb/DateRangePicker'

class ClientReportsList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const props = this.props

    if (props.entities.size === 0) {
      props.fetchAsync()
    }
  }

  render() {
    const props = this.props
    return (
      <div>
        <DateRangePicker startDate={props.startDate} endDate={props.endDate}
                         startDateChanged={(dt) => props.updateDate('start', dt)}
                         endDateChanged={(dt) => props.updateDate('end', dt)}/>
        <SimpleList title='Client Reports' items={props.entities} busyItems={props.syncing}
                    onItemClick={(id) => props.pushState({ title: 'Client Report' }, '/reports/clients/' + id)}
                    isBusy={props.isFetching} updateSearch={props.updateSearch} search={props.search}
                    getItemLetter={(client) => client.get('lastName').charAt(0).toUpperCase()}
                    getItemName={(client) => client.get('firstName') + ' ' + client.get('lastName')} />
      </div>
    )
  }
}

ClientReportsList.propTypes = {
  // entities is an immutable list of immutable clients
  entities: ImmPropTypes.mapOf(
    ImmPropTypes.contains({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    })
  ),
  syncing: ImmPropTypes.map.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  updateDate: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      entities: state.clients.get('entities'),
      isFetching: state.clients.get('isFetching'),
      syncing: state.clients.get('syncing'),
      search: state.clients.get('search'),
      startDate: state.global.get('startDate'),
      endDate: state.global.get('endDate')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, pushState, updateSearch, updateDate }, dispatch)
  }
)(ClientReportsList)
