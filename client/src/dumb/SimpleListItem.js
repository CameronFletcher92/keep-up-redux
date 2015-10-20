import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from 'react-pure-render/function'
import { RaisedButton } from 'material-ui'

class SimpleListItem extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { name, editClicked, deleteClicked, busy } = this.props

    return (
      <div>
        <span>{name}</span>
        <RaisedButton label='Edit' onClick={editClicked} disabled={busy}/>
        <RaisedButton label='Delete' onClick={deleteClicked} disabled={busy}/>
        {busy ? <span>Loading</span> : null }
      </div>
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
