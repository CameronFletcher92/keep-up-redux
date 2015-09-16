import React, { Component, PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { add, fetchAsync } from '../ducks/clients'
import Client from '../dumb/Client'

class ClientsList extends Component {
  componentWillMount() {
    // fetch clients if necessary
    const { dispatch, allClients } = this.props
    if (allClients.length == 0) {
      dispatch(fetchAsync())
    }
  }

  renderClients() {
    const { allClients } = this.props
    return allClients.map((client, i) => {
      return (
        <Client key={i} client={client} />
      )
    })
  }

  render() {
    const { dispatch, allClients } = this.props
    return (
      <ListGroup >
        { this.renderClients() }
      </ListGroup>
    )
  }
}

ClientsList.propTypes = {
  allClients: PropTypes.array.isRequired
}

function select(state) {
  return { ...state.clients }
}

export default connect(select)(ClientsList)
