import React, { PropTypes } from 'react'
import { ListItem, Avatar, Checkbox } from 'material-ui'

const CheckboxListItem = (props) => {
  return (
    <ListItem primaryText={props.name}
              leftAvatar={props.letter ? <Avatar>{props.letter}</Avatar> : null}
              onClick={props.toggle} insetChildren={true}
              rightToggle={
                <Checkbox defaultChecked={props.checked} onCheck={props.toggle}/>
              }/>
  )
}

CheckboxListItem.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  letter: PropTypes.string
}

export default CheckboxListItem
