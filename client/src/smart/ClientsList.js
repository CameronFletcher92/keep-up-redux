import React, { Component, PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchAsync, navToEdit, navToCreate } from '../ducks/clients'
import Client from '../dumb/Client'

class ClientsList extends Component {
  componentWillMount() {
    const { dispatch, allClients } = this.props

    // fetch clients if necessary
    if (allClients.length == 0) {
      dispatch(fetchAsync())
    }
  }

  editClient(client, dispatch) {
    dispatch(navToEdit(client))
  }

  renderClients() {
    const { allClients, dispatch } = this.props

    return allClients.map((client, i) => {
      return (
        <Client key={i} client={client}
                editClicked={() => dispatch(navToEdit(client))} />
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
