import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from 'react-pure-render/function'
import { ListItem, Avatar, Styles, Checkbox} from 'material-ui'

class CheckboxListItem extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { name, checked, toggle, letter } = this.props

    return (
      <ListItem primaryText={name}
                leftAvatar={letter ? <Avatar color={Styles.Colors.pinkA200} backgroundColor={Styles.Colors.transparent}>{letter}</Avatar> : null}
                onClick={toggle} insetChildren={true}
                rightToggle={
                  <Checkbox defaultChecked={checked} onCheck={toggle}/>
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
