import React, { Component, PropTypes } from 'react'
import ImmPropTypes from 'react-immutable-proptypes'
import { ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchAsync, navToEdit, navToCreate } from '../ducks/clients'
import Client from '../dumb/Client'

class ClientsList extends Component {
  componentWillMount() {
    const { dispatch, allClients } = this.props

    // fetch clients if necessary
    if (allClients.size == 0) {
      dispatch(fetchAsync())
    }
  }

  // render the list of clients, and wire up their functionality to actions
  renderClients() {
    const { allClients, dispatch } = this.props

    return allClients.map((client, i) => {
      return (
        <Client key={i} name={client.get('firstName') + ' ' + client.get('lastName')}
                editClicked={() => dispatch(navToEdit(client.get('_id')))} />
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

// allClients is an immutable list of immutable clients
ClientsList.propTypes = {
  allClients: ImmPropTypes.listOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  firstName: PropTypes.string.isRequired,
                  lastName: PropTypes.string.isRequired,
                })
              )
}

function select(state) {
  return { allClients: state.clients.get('allClients') }
}

export default connect(select)(ClientsList)
