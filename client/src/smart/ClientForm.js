import React, { Component, PropTypes } from 'react'
import { Grid, Row, Input } from 'react-bootstrap'
import { connect } from 'react-redux'
import { activeChanged } from '../ducks/clients'

class ClientForm extends Component {
  changed() {
    const { dispatch } = this.props
    var client = {
      firstName: this.refs.fname.getValue(),
      lastName: this.refs.lname.getValue()
    }
    dispatch(activeChanged(client))
  }

  render() {
    const { dispatch, client } = this.props
    return (
      <form>
        <Input type='text' ref='fname' label='First Name' placeholder='Enter first name'
               value={client.firstName} onChange={() => this.changed()} />
        <Input type='text' ref='lname' label='Last Name' placeholder='Enter last name'
               value={client.lastName} onChange={() => this.changed()} />
      </form>
    )
  }
}

ClientForm.propTypes = {
  client: PropTypes.object.isRequired
}

function select(state) {
  return { client: state.clients.activeClient }
}

export default connect(select)(ClientForm)
