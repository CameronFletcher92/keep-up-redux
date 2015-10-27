import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { pushState } from 'redux-router'
import { fetchAsync, updateSearch } from '../ducks/sessions'
import SimpleList from '../dumb/SimpleList'
import FixedActionButton from '../dumb/FixedActionButton'

class SessionsList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { entities, fetchAsync } = this.props

    if (entities.size === 0) {
      fetchAsync()
    }
  }

  render() {
    const { entities, syncing, pushState, isFetching, search, updateSearch } = this.props
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    return (
      <div>
        <SimpleList title='Sessions' items={entities} busyItems={syncing} onItemClick={(id) => pushState({ title: 'Edit Session' }, '/sessions/' + id)}
                    isBusy={isFetching} search={search} updateSearch={updateSearch}
                    getItemLetter={(session) => days[session.get('time').getDay()]}
                    getItemName={(session) => session.get('time').toLocaleString('en-AU')} />
        <FixedActionButton icon='add' onClick={() => pushState({ title: 'New Session' }, '/sessions/new')}/>
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
  isFetching: PropTypes.bool.isRequired
}

export default connect(
  state => {
    return {
      entities: state.sessions.get('entities'),
      isFetching: state.sessions.get('isFetching'),
      syncing: state.sessions.get('syncing'),
      search: state.sessions.get('search')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, pushState, updateSearch }, dispatch)
  }
)(SessionsList)
