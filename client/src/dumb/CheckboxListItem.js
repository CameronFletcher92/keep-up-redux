import React, { PropTypes } from 'react'
import { ListItem, Avatar, Checkbox } from 'material-ui'

const CheckboxListItem = ({ name, checked, toggle, letter }) => {
  return (
    <ListItem primaryText={name}
              leftAvatar={letter ? <Avatar>{letter}</Avatar> : null}
              onClick={toggle} insetChildren={true}
              rightToggle={
                <Checkbox defaultChecked={checked} onCheck={toggle}/>
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
