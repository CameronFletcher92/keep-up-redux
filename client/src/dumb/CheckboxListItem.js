import React, { Component, PropTypes } from 'react'
import { ListGroupItem, Button, Glyphicon, ProgressBar } from 'react-bootstrap'

class CheckboxListItem extends Component {
  render() {
    const { name, checked, toggle } = this.props
    return (
      <ListGroupItem>
        <div className='clearfix'>
          <span className='pull-left'>
            {name}
          </span>
          <span className='pull-right'>
            <Button bsStyle={checked ? 'success' : null} onClick={toggle}>
              <Glyphicon glyph='edit' />
            </Button>
          </span>
        </div>
      </ListGroupItem>
    )
  }
}

CheckboxListItem.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

export default SimpleListItem
