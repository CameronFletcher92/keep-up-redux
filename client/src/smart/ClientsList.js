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
    const { allClients, fetchAsync, navToEdit, deleteAsync, isBusy} = this.props

    return allClients.toIndexedSeq().map(client => {
      return (
        <Client key={client.get('_id')} name={client.get('firstName') + ' ' + client.get('lastName')} disabled={isBusy}
                editClicked={() => navToEdit(client.get('_id'))} deleteClicked={() => deleteAsync(client.get('_id'))} />
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
  fetchAsync: PropTypes.func.isRequired,
  deleteAsync: PropTypes.func.isRequired,
  navToEdit: PropTypes.func.isRequired,
}

export default connect(
  state => {
    return {
      allClients: state.clients.get('allClients'),
      isBusy: state.clients.get('isBusy')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, navToEdit, deleteAsync}, dispatch)
  }
)(ClientsList)
