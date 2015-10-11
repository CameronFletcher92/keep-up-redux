import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Button } from 'react-bootstrap'
import { saveAsync } from '../ducks/clients'

class ClientForm extends Component {
  // use local state in the form for performance
  constructor(props) {
    super()
    this.state = {...props.client}
  }

  render() {
    const { saveAsync } = this.props
    return (
      <form>
        <Input type='text' label='First Name' placeholder='Enter first name'
               value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})} />
        <Input type='text' label='Last Name' placeholder='Enter last name'
               value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})} />
        <Input type='text' label='Birth Date' placeholder='dd/mm/yyyy'
               value={this.state.birthDate} onChange={(e) => this.setState({birthDate: e.target.value})} />
        <Input type='text' label='Address' placeholder='Enter street address'
               value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} />
        <Input type='textarea' label='Notes' placeholder='Enter any additional notes' style={{minHeight: '7em'}}
               value={this.state.notes} onChange={(e) => this.setState({notes: e.target.value})} />
        <Input type='checkbox' label='Private Health' placeholder='Private health?'
               checked={this.state.privateHealth} onChange={(e) => this.setState({privateHealth: e.target.checked})}/>
        <Button className='pull-right' bsStyle='primary' onClick={() => saveAsync(this.state)}>Save</Button>
      </form>
    )
  }
}

ClientForm.propTypes = {
  client: PropTypes.object.isRequired,
  saveAsync: PropTypes.func.isRequired
}

export default connect(
  state => {
    const id = state.router.params.id
    return {
      client: id ? state.clients.getIn(['allClients', id]).toJS() : {}
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync }, dispatch)
  }
)(ClientForm)
