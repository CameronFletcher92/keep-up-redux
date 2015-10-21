import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from 'react-pure-render/function'

class IconInputContainer extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    return (
      <div> hello </div>
    )
  }
}

IconInputContainer.propTypes = {
  icon: PropTypes.string.isRequired
}

export default IconInputContainer
