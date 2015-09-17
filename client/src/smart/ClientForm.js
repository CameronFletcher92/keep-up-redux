import React, { Component, PropTypes } from 'react'
import { Grid, Row, Input, Button } from 'react-bootstrap'
import { saveAsync } from '../ducks/clients'
import { connect } from 'react-redux'

class ClientForm extends Component {
  constructor(props) {
    super()
    this.state = props.client
    this.saveClient = this.saveClient.bind(this)
  }

  saveClient() {
    const { dispatch } = this.props
    console.log('saving client', this.state)
    dispatch(saveAsync(this.state))
  }

  render() {
    const { dispatch } = this.props
    return (
      <form>
        <Input type='text' label='First Name' placeholder='Enter first name'
               value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})} />
        <Input type='text' label='Last Name' placeholder='Enter last name'
               value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})} />
        <Button onClick={this.saveClient}>Save</Button>
      </form>
    )
  }
}

ClientForm.propTypes = {
  isSaving: PropTypes.bool.isRequired
}

function select(state) {
  const paramId = state.router.params.id
  var client = {}

  // inject the data of the selected client if editing
  if (paramId) {
    client = state.clients.allClients.filter(c => c._id == state.router.params.id)[0]
    console.log('editing client', client)
  }

  return {
    client: client ? client : {},
    isSaving: state.clients.isSaving
  }
}

export default connect(select)(ClientForm)
