import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { toggleClient } from '../ducks/sessions'
import { fetchAsync } from '../ducks/clients'
import CheckboxListItem from '../dumb/CheckboxListItem'

class ClientsCheckList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { clients, fetchAsync } = this.props
    if (clients.size === 0) {
      fetchAsync()
    }
  }

  renderClients() {
    const { toggleClient, clients, selectedClients } = this.props

    return clients.toOrderedSet().map(client => {
      const id = client.get('_id')
      const checked = selectedClients.get(id) ? true : false
      return (
        <CheckboxListItem key={id} name={client.get('firstName') + ' ' + client.get('lastName')}
                          checked={checked} toggle={() => toggleClient(id)} />
      )
    })
  }

  render() {
    const { clients } = this.props
    return (
      <div>
        { clients.size === 0 ? <span>Loading</span> : null }
        <div>
          {this.renderClients()}
        </div>
      </div>
    )
  }
}

ClientsCheckList.propTypes = {
  selectedClients: ImmPropTypes.map.isRequired,
  clients: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  firstName: PropTypes.string.isRequired,
                  lastName: PropTypes.string.isRequired,
                })
              ),
  toggleClient: PropTypes.func.isRequired,
  fetchAsync: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      selectedClients: state.sessions.getIn(['form', 'clients']),
      clients: state.clients.get('entities'),
    }
  },
  dispatch => {
    return bindActionCreators({ toggleClient, fetchAsync }, dispatch)
  }
)(ClientsCheckList)
