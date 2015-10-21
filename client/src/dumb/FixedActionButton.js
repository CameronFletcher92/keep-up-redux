import React, { Component, PropTypes } from 'react'
import { FloatingActionButton, FontIcon } from 'material-ui'

class FixedActionButton extends Component {
  render() {
    /* global __DEV__*/
    const rightMargin = __DEV__ ? '20em' : '2em'

    const { onClick, icon } = this.props
    return (
      <FloatingActionButton onClick={onClick} style={{ position: 'fixed', right: rightMargin, bottom: '2em', zIndex: '5' }}>
        <FontIcon className='material-icons'>{icon}</FontIcon>
      </FloatingActionButton>
    )
  }
}

FixedActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
}

export default FixedActionButton
