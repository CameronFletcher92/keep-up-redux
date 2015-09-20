import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import { ListGroup } from 'react-bootstrap'
import { fetchAsync, navToEdit, deleteAsync } from '../ducks/clients'
import Client from '../dumb/Client'

class ClientsList extends Component {
  componentWillMount() {
    const { allClients, fetchAsync } = this.props

    if (allClients.size == 0) {
      fetchAsync()
    }
  }

  renderClients() {
    const { allClients, syncing, fetchAsync, navToEdit, deleteAsync, isFetching } = this.props

    return allClients.toIndexedSeq().map(client => {
      var id = client.get('_id')
      var disabled = isFetching || syncing.get(id) ? true : false
      return (
        <Client key={id} name={client.get('firstName') + ' ' + client.get('lastName')} disabled={disabled}
                editClicked={() => navToEdit(id)} deleteClicked={() => deleteAsync(id)} />
      )
    })
  }

  render() {
    return (
      <ListGroup style={{marginBottom: '4em'}}>
        { this.renderClients() }
      </ListGroup>
    )
  }
}

ClientsList.propTypes = {
  // allClients is an immutable list of immutable clients
  allClients: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  firstName: PropTypes.string.isRequired,
                  lastName: PropTypes.string.isRequired,
                })
              ),
  syncing: ImmPropTypes.map.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  deleteAsync: PropTypes.func.isRequired,
  navToEdit: PropTypes.func.isRequired,
}

export default connect(
  state => {
    return {
      allClients: state.clients.get('allClients'),
      isFetching: state.clients.get('isFetching'),
      syncing: state.clients.get('syncing')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, navToEdit, deleteAsync}, dispatch)
  }
)(ClientsList)
