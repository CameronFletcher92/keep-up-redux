import React, { Component, PropTypes } from 'react'
import { ListGroupItem } from 'react-bootstrap'

class Client extends Component {
  render() {
    const { client } = this.props
    return (
      <ListGroupItem header={client.firstName + ' ' + client.lastName}/>
    )
  }
}

Client.propTypes = {
  client: PropTypes.object.isRequired
}

export default Client
