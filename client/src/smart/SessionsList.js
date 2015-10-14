import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { ListGroup, ProgressBar } from 'react-bootstrap'
import { fetchAsync, navToEditSession, deleteAsync } from '../ducks/sessions'
import SimpleListItem from '../dumb/SimpleListItem'

class SessionsList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { entities, fetchAsync } = this.props

    if (entities.size == 0) {
      fetchAsync()
    }
  }

  renderSessions() {
    const { entities, syncing, navToEditSession, deleteAsync } = this.props

    return entities.toOrderedSet().sortBy(session => session.get('time')).map(session => {
      const id = session.get('_id')
      const busy = syncing.get(id) ? true : false
      const name = session.get('time') + ' [' + session.get('clients').size + ' clients]'
      return (
        <SimpleListItem key={id} name={name} busy={busy}
                editClicked={() => navToEditSession(id)} deleteClicked={() => deleteAsync(id)} />
      )
    })
  }

  render() {
    const { isFetching } = this.props

    return (
      <div>
        { isFetching ? <ProgressBar active bsStyle='success' now={100} style={{marginBottom: '0.7em'}} /> : null }
        <ListGroup>
          { this.renderSessions() }
        </ListGroup>
      </div>
    )
  }
}

SessionsList.propTypes = {
  // entities is an immutable list of immutable sessions
  entities: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  time: PropTypes.string.isRequired,
                })
              ),
  syncing: ImmPropTypes.map.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  deleteAsync: PropTypes.func.isRequired,
  navToEditSession: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default connect(
  state => {
    return {
      entities: state.sessions.get('entities'),
      isFetching: state.sessions.get('isFetching'),
      syncing: state.sessions.get('syncing')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, navToEditSession, deleteAsync}, dispatch)
  }
)(SessionsList)
