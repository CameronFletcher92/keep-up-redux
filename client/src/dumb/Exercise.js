import React, { Component, PropTypes } from 'react'
import { ListGroupItem, Button, Glyphicon } from 'react-bootstrap'

class Exercise extends Component {
  render() {
    const { name, editClicked, deleteClicked, disabled } = this.props
    return (
      <ListGroupItem className='clearfix'>
        {name}
        <span className='pull-right'>
          <Button bsStyle='primary' onClick={editClicked} disabled={disabled}>
            <Glyphicon glyph='edit' />
          </Button>
          <Button bsStyle='danger' onClick={deleteClicked} disabled={disabled} style={{marginLeft: '0.5em'}}>
            <Glyphicon glyph='trash' />
          </Button>
        </span>
      </ListGroupItem>
    )
  }
}

Exercise.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  editClicked: PropTypes.func.isRequired,
  deleteClicked: PropTypes.func.isRequired
}

export default Exercise
