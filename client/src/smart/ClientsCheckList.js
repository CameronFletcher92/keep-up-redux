import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { fetchAsync, updateSearch } from '../ducks/clients'
import CheckboxList from '../dumb/CheckboxList'

class ClientsCheckList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const props = this.props

    if (props.clients.size === 0) {
      props.fetchAsync()
    }
  }

  render() {
    const props = this.props
    return (
      <CheckboxList title='Clients' items={props.clients} selectedItems={props.selectedClients} onItemClick={props.toggleClient}
                    isBusy={props.isFetching} search={props.search} updateSearch={props.updateSearch}
                    getItemLetter={(client) => client.get('lastName').charAt(0).toUpperCase()}
                    getItemName={(client) => client.get('firstName') + ' ' + client.get('lastName')} />
    )
  }
}

ClientsCheckList.propTypes = {
  selectedClients: ImmPropTypes.map.isRequired,
  clients: ImmPropTypes.mapOf(
    ImmPropTypes.contains({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    })
  ),
  toggleClient: PropTypes.func.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      clients: state.clients.get('entities'),
      isFetching: state.clients.get('isFetching'),
      search: state.clients.get('search')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, updateSearch }, dispatch)
  }
)(ClientsCheckList)
