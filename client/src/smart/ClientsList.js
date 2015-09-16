import React, { Component, PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchAsync, navToEdit, navToCreate } from '../ducks/clients'
import Client from '../dumb/Client'

class ClientsList extends Component {
  componentWillMount() {
    // fetch clients if necessary
    const { dispatch, allClients } = this.props
    if (allClients.length == 0) {
      dispatch(fetchAsync())
    }
  }

  editClient(client, dispatch) {
    dispatch(navToEdit(client))
  }

  renderClients() {
    const { allClients, dispatch } = this.props
    console.log('rendering clients', allClients)
    return allClients.map((client, i) => {
      return (
        <Client key={i} client={client}
                editClicked={() => this.editClient(client, dispatch)} />
      )
    })
  }

  render() {
    const { dispatch, allClients } = this.props
    return (
      <ListGroup style={{marginBottom: '4em'}}>
        { this.renderClients() }
      </ListGroup>
    )
  }
}

ClientsList.propTypes = {
  allClients: PropTypes.array.isRequired
}

function select(state) {
  return { allClients: state.clients.allClients }
}

export default connect(select)(ClientsList)
