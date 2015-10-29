import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { FloatingActionButton, FontIcon } from '../themes/muiComponents'

const styles = {
  button: { position: 'fixed', right: '2em', top: '2.2em', zIndex: '10001' }
}

class FixedActionButton extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const props = this.props
    return (
      <FloatingActionButton onClick={props.onClick} style={styles.button}>
        <FontIcon className='material-icons'>{props.icon}</FontIcon>
      </FloatingActionButton>
    )
  }
}

FixedActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
}

export default FixedActionButton
