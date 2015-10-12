import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { ListGroup } from 'react-bootstrap'
import { fetchAsync, navToEditClient, deleteAsync } from '../ducks/clients'
import Client from '../dumb/Client'

class ClientsList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { entities, fetchAsync } = this.props

    if (entities.size == 0) {
      fetchAsync()
    }
  }

  renderClients() {
    const { entities, syncing, fetchAsync, navToEditClient, deleteAsync, isFetching } = this.props

    return entities.toIndexedSeq().map(client => {
      var id = client.get('_id')
      var disabled = isFetching || syncing.get(id) ? true : false
      return (
        <Client key={id} name={client.get('firstName') + ' ' + client.get('lastName')} disabled={disabled}
                editClicked={() => navToEditClient(id)} deleteClicked={() => deleteAsync(id)} />
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
  // entities is an immutable list of immutable clients
  entities: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  firstName: PropTypes.string.isRequired,
                  lastName: PropTypes.string.isRequired,
                })
              ),
  syncing: ImmPropTypes.map.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  deleteAsync: PropTypes.func.isRequired,
  navToEditClient: PropTypes.func.isRequired,
}

export default connect(
  state => {
    return {
      entities: state.clients.get('entities'),
      isFetching: state.clients.get('isFetching'),
      syncing: state.clients.get('syncing')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, navToEditClient, deleteAsync}, dispatch)
  }
)(ClientsList)
