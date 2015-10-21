import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { toggleClient } from '../ducks/sessions'
import { fetchAsync } from '../ducks/clients'
import CheckboxList from '../dumb/CheckboxList'

class ClientsCheckList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { clients, fetchAsync } = this.props

    if (clients.size === 0) {
      fetchAsync()
    }
  }

  render() {
    const { clients, selectedClients, toggleClient, isFetching } = this.props
    return (
      <CheckboxList title='Clients' items={clients} selectedItems={selectedClients} onItemClick={toggleClient}
                    isBusy={isFetching}
                    getItemLetter={(client) => client.get('lastName').charAt(0).toUpperCase()}
                    getItemName={(client) => client.get('firstName') + ' ' + client.get('lastName')} />
    )
  }
}

ClientsCheckList.propTypes = {
  selectedClients: ImmPropTypes.map.isRequired,
  clients: ImmPropTypes.mapOf(
    ImmPropTypes.contains({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    })
  ),
  toggleClient: PropTypes.func.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default connect(
  state => {
    return {
      selectedClients: state.sessions.getIn(['form', 'clients']),
      clients: state.clients.get('entities'),
      isFetching: state.clients.get('isFetching')
    }
  },
  dispatch => {
    return bindActionCreators({ toggleClient, fetchAsync }, dispatch)
  }
)(ClientsCheckList)
