import React, { Component, PropTypes } from 'react'
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap'
import { add, fetchAsync } from '../ducks/clients'
import Client from '../dumb/Client'
import { connect } from 'react-redux'

class ClientsList extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchAsync())
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
      <Grid fluid={true}>
        <ListGroup>
          { this.renderClients() }
        </ListGroup>
      </Grid>
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
