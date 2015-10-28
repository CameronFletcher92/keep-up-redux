import React, { PropTypes } from 'react'
import { ListItem, Avatar, LinearProgress } from '../themes/muiComponents'

const styles = {
  container: { padding: '1em' }
}

function renderProgress() {
  return (
    <div style={styles.container}>
      <LinearProgress mode='indeterminate'/>
    </div>
  )
}

const SimpleListItem = (props) => {
  return (
    <div>
      <ListItem primaryText={props.name}
                leftAvatar={props.letter ? <Avatar>{props.letter}</Avatar> : null}
                onClick={props.editClicked} disabled={props.busy} insetChildren={true}/>
      {props.busy ? renderProgress() : null}
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
