import React, { Component, PropTypes } from 'react'
import { ListGroupItem, Button, Glyphicon, ProgressBar } from 'react-bootstrap'
import shouldUpdatePure from 'react-pure-render/function'

class SimpleListItem extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { name, editClicked, deleteClicked, busy } = this.props
    return (
      <ListGroupItem>
        <div className='clearfix'>
          <span className='pull-left'>
            {name}
          </span>
          <span className='pull-right'>
            <Button bsStyle='primary' onClick={editClicked} disabled={busy}>
              <Glyphicon glyph='edit' />
            </Button>
            <Button bsStyle='danger' onClick={deleteClicked} disabled={busy} style={{marginLeft: '0.5em'}}>
              <Glyphicon glyph='trash' />
            </Button>
          </span>
        </div>
        { busy ? <ProgressBar active bsStyle='success' now={100} style={{marginTop: '1em', marginBottom: '0em'}} /> : null }
      </ListGroupItem>
    )
  }
}

SimpleListItem.propTypes = {
  name: PropTypes.string.isRequired,
  busy: PropTypes.bool.isRequired,
  editClicked: PropTypes.func.isRequired,
  deleteClicked: PropTypes.func.isRequired
}

export default SimpleListItem
