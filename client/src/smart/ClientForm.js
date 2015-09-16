import React, { Component, PropTypes } from 'react'
import { Grid, Row, Input, Button } from 'react-bootstrap'
import { saveAsync } from '../ducks/clients'
import { connect } from 'react-redux'

class ClientForm extends Component {
  constructor() {
    super()
    this.saveClient = this.saveClient.bind(this)
  }

  saveClient() {
    const { dispatch } = this.props

    var client = {
      firstName: this.refs.fName.getValue(),
      lastName: this.refs.lName.getValue()
    }

    console.log('dispatching save async', client)
    dispatch(saveAsync(client))
  }

  render() {
    const { dispatch, client } = this.props
    return (
      <form>
        <Input type='text' ref='fName' label='First Name' placeholder='Enter first name'/>
        <Input type='text' ref='lName' label='Last Name' placeholder='Enter last name'/>
        <Button onClick={this.saveClient}>Save</Button>
      </form>
    )
  }
}

ClientForm.propTypes = {
  isSaving: PropTypes.bool.isRequired
}

function select(state) {
  return { isSaving: state.clients.isSaving }
}

export default connect(select)(ClientForm)
