import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { toggleClient } from '../ducks/sessions'
import { fetchAsync } from '../ducks/clients'
import { List, Paper } from 'material-ui'
import CheckboxListItem from '../dumb/CheckboxListItem'
import CenteredSpinner from '../dumb/CenteredSpinner'

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

    let lastLetter = ''
    return clients.toOrderedSet().map(client => {
      const id = client.get('_id')
      const checked = selectedClients.get(id) ? true : false
      let letter = client.get('lastName').charAt(0).toUpperCase()
      if (letter !== lastLetter) {
        lastLetter = letter
      } else {
        letter = null
      }

      return (
        <CheckboxListItem key={id} name={client.get('firstName') + ' ' + client.get('lastName')}
                          checked={checked} toggle={() => toggleClient(id)} letter={letter}/>
      )
    })
  }

  render() {
    const { isFetching } = this.props

    return (
      <div style={{padding: '0.5em'}}>
        <Paper zDepth={2}>
          <CenteredSpinner isVisible={isFetching}/>
          <List subheader='Clients' subheaderStyle={{fontSize: '1em'}}>
            { this.renderClients() }
          </List>
        </Paper>
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
  fetchAsync: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default connect(
  state => {
    return {
      selectedClients: state.sessions.getIn(['form', 'clients']),
      clients: state.clients.get('entities'),
      isFetching: state.clients.get('isFetching')
    }
  },
  dispatch => {
    return bindActionCreators({ toggleClient, fetchAsync }, dispatch)
  }
)(ClientsCheckList)
