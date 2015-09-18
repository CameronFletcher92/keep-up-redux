import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import { ListGroup } from 'react-bootstrap'
import { fetchAsync, navToEdit } from '../ducks/clients'
import Client from '../dumb/Client'

class ClientsList extends Component {
  componentWillMount() {
    const { allClients, fetchAsync } = this.props

    // fetch clients if necessary
    if (allClients.size == 0) {
      fetchAsync()
    }
  }

  // render the list of clients, and wire up their functionality to actions
  renderClients() {
    const { allClients, fetchAsync, navToEdit} = this.props

    return allClients.map((client, i) => {
      return (
        <Client key={i} name={client.get('firstName') + ' ' + client.get('lastName')}
                editClicked={() => navToEdit(client.get('_id'))} deleteClicked={() => console.log('not implemented')} />
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
  allClients: ImmPropTypes.listOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  firstName: PropTypes.string.isRequired,
                  lastName: PropTypes.string.isRequired,
                })
              ),
  fetchAsync: PropTypes.func.isRequired,
  navToEdit: PropTypes.func.isRequired,
}

export default connect(
  state => {
    return {
      allClients: state.clients.get('allClients')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, navToEdit }, dispatch)
  }
)(ClientsList)
