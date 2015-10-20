import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { List, Paper } from 'material-ui'
import { fetchAsync, navToEditClient, deleteAsync } from '../ducks/clients'
import SimpleListItem from '../dumb/SimpleListItem'
import CenteredSpinner from '../dumb/CenteredSpinner'

class ClientsList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { entities, fetchAsync } = this.props

    if (entities.size == 0) {
      fetchAsync()
    }
  }

  renderClients() {
    const { entities, syncing, navToEditClient, deleteAsync } = this.props

    let lastLetter = ''
    return entities.toOrderedSet().map(client => {
      const id = client.get('_id')
      const busy = syncing.get(id) ? true : false
      let letter = client.get('lastName').charAt(0).toUpperCase()
      if (letter !== lastLetter) {
        lastLetter = letter
      } else {
        letter = null
      }

      return (
        <SimpleListItem key={id} name={client.get('firstName') + ' ' + client.get('lastName')} busy={busy}
                        editClicked={() => navToEditClient(id)} deleteClicked={() => deleteAsync(id)}
                        letter={letter}/>
      )
    })
  }

  render() {
    const { isFetching } = this.props

    return (
      <Paper zDepth={2}>
        <CenteredSpinner isVisible={isFetching}/>
        <List subheader='Clients' subheaderStyle={{fontSize: '1em'}}>
          { this.renderClients() }
        </List>
      </Paper>
    )
  }
}

ClientsList.propTypes = {
  // entities is an immutable list of immutable clients
  entities: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  firstName: PropTypes.string.isRequired,
                  lastName: PropTypes.string.isRequired,
                })
              ),
  syncing: ImmPropTypes.map.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  deleteAsync: PropTypes.func.isRequired,
  navToEditClient: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default connect(
  state => {
    return {
      entities: state.clients.get('entities'),
      isFetching: state.clients.get('isFetching'),
      syncing: state.clients.get('syncing')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, navToEditClient, deleteAsync}, dispatch)
  }
)(ClientsList)
