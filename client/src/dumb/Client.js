import React, { Component, PropTypes } from 'react'
import { ListGroupItem, Button, Glyphicon } from 'react-bootstrap'

class Client extends Component {
  render() {
    const { client, editClicked, deleteClicked } = this.props
    return (
      <ListGroupItem className='clearfix'>
        {client.firstName + ' ' + client.lastName}
        <span className='pull-right'>
          <Button bsStyle='primary' onClick={editClicked}><Glyphicon glyph='edit' /></Button>
          <Button bsStyle='danger' onClick={deleteClicked} style={{marginLeft: '0.5em'}}><Glyphicon glyph='trash' /></Button>
        </span>
      </ListGroupItem>
    )
  }
}

Client.propTypes = {
  client: PropTypes.object.isRequired,
  editClicked: PropTypes.func.isRequired,
  deleteClicked: PropTypes.func.isRequired
}

export default Client
