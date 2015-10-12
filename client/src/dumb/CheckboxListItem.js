import React, { Component, PropTypes } from 'react'
import { ListGroupItem, Button, Glyphicon, ProgressBar } from 'react-bootstrap'
import shouldUpdatePure from 'react-pure-render/function'

class CheckboxListItem extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { name, checked, toggle } = this.props
    return (
      <ListGroupItem>
        <div className='clearfix' onClick={toggle}>
          <span className='pull-left'>
            {name}
          </span>
          <span className='pull-right'>
            <Button bsStyle={checked ? 'success' : null}>
              <Glyphicon glyph={checked ? 'ok' : 'remove'} />
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

export default CheckboxListItem
