import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from 'react-pure-render/function'

class CheckboxListItem extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { name, checked, toggle } = this.props

    return (
      <div onClick={toggle} style={{padding: '10'}}>
        <span>{name}</span>
        {checked ? <span> CHECKED </span> : null}
      </div>
    )
  }
}

CheckboxListItem.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

export default CheckboxListItem
