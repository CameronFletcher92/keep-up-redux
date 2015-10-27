import React, { PropTypes } from 'react'
import { ListItem, Avatar, LinearProgress } from 'material-ui'

function renderProgress() {
  return (
    <div style={{ padding: '1em' }}>
      <LinearProgress mode='indeterminate'/>
    </div>
  )
}

const SimpleListItem = ({ name, editClicked, busy, letter }) => {
  return (
    <div>
      <ListItem primaryText={name}
                leftAvatar={letter ? <Avatar>{letter}</Avatar> : null}
                onClick={editClicked} disabled={busy} insetChildren={true}/>
      {busy ? renderProgress() : null}
    </div>
  )
}

SimpleListItem.propTypes = {
  name: PropTypes.string.isRequired,
  busy: PropTypes.bool.isRequired,
  editClicked: PropTypes.func.isRequired,
  letter: PropTypes.string
}

export default SimpleListItem
