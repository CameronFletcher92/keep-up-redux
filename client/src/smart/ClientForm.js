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
        <Button onClick={() => saveAsync(this.state)}>Save</Button>
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
    return {
      client: state.router.params.id ? state.clients.get('allClients').filter(c => c.get('_id')).get(0).toJS() : {}
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync }, dispatch)
  }
)(ClientForm)
