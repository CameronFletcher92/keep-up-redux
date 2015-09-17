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

  editClient(client, dispatch) {
    dispatch(navToEdit(client))
  }

  renderClients() {
    const { allClients, dispatch } = this.props

    return allClients.map((client, i) => {
      var simpleClient = client.toJS()
      return (
        <Client key={i} client={simpleClient}
                editClicked={() => dispatch(navToEdit(simpleClient))} />
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
  allClients: ImmPropTypes.listOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  firstName: PropTypes.string.isRequired,
                  lastName: PropTypes.string.isRequired,
                })
              )
}

function select(state) {
  console.log('state', state)
  return { allClients: state.clients.get('allClients') }
}

export default connect(select)(ClientsList)
