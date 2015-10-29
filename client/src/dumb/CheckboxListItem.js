import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { ListItem, Avatar, Checkbox } from '../themes/muiComponents'

class CheckboxListItem extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const props = this.props
    return (
      <ListItem primaryText={props.name}
                leftAvatar={props.letter ? <Avatar>{props.letter}</Avatar> : null}
                onClick={props.toggle} insetChildren={true}
                rightToggle={
                  <Checkbox defaultChecked={props.checked} onCheck={props.toggle}/>
                }/>
    )
  }
}

CheckboxListItem.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  letter: PropTypes.string
}

export default CheckboxListItem
