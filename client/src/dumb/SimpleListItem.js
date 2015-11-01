import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { ListItem, Avatar, LinearProgress } from '../themes/muiComponents'

const styles = {
  container: { padding: '1em' }
}


class SimpleListItem extends Component {
  shouldComponentUpdate = shouldUpdatePure

  renderProgress() {
    return (
      <div style={styles.container}>
        <LinearProgress mode='indeterminate'/>
      </div>
    )
  }

  render() {
    const props = this.props
    return (
      <div>
        <ListItem primaryText={props.name}
                  leftAvatar={props.letter ? <Avatar>{props.letter}</Avatar> : null}
                  onClick={props.onItemClick} disabled={props.busy} insetChildren={true}/>
        {props.busy ? this.renderProgress() : null}
      </div>
    )
  }
}

SimpleListItem.propTypes = {
  name: PropTypes.string.isRequired,
  busy: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired,
  letter: PropTypes.string
}

export default SimpleListItem
