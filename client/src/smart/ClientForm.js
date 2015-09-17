import React, { Component, PropTypes } from 'react'
import { Grid, Row, Input, Button } from 'react-bootstrap'
import { saveAsync } from '../ducks/clients'
import { connect } from 'react-redux'

class ClientForm extends Component {
  // use local state in the form for performance
  constructor(props) {
    super()
    this.state = props.client
    this.saveClient = this.saveClient.bind(this)
  }

  saveClient() {
    const { dispatch } = this.props
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
  client: PropTypes.object.isRequired
}

// select the client out of the state matching the router id
function select(state) {
  const paramId = state.router.params.id
  const client = paramId ? (state.clients.get('allClients').filter(c => c.get('_id') === paramId)).get(0).toJS()
                         : {}
  return {
    client
  }
}

export default connect(select)(ClientForm)
