import React, { Component, PropTypes } from 'react'
import { FloatingActionButton, FontIcon } from 'material-ui'

class FixedActionButton extends Component {
  render() {
    const { onClick } = this.props
    /* global __DEV__*/
    const rightMargin = __DEV__ ? '20em' : '2em'
    return (
      <FloatingActionButton onClick={onClick} style={{position: 'fixed', right: rightMargin, bottom: '2em', zIndex: '5'}}>
        <FontIcon className='material-icons'>add</FontIcon>
      </FloatingActionButton>
    )
  }
}

FixedActionButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default FixedActionButton
