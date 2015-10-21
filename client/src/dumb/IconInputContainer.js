import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from 'react-pure-render/function'
import { Styles, FontIcon } from 'material-ui'
import Flex from './Flex'

class IconInputContainer extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { children, icon } = this.props
    return (
      <Flex direction='row'>
        <div style={{ marginTop: '2em', marginRight: '1em' }}>
          <FontIcon className='material-icons' style={{ fontSize: '200%', color: Styles.Colors.grey700 }}>{icon}</FontIcon>
        </div>
        <Flex direction='row' justifyContent='stretch'>
          {children}
        </Flex>
      </Flex>
    )
  }
}

IconInputContainer.propTypes = {
  icon: PropTypes.string.isRequired
}

export default IconInputContainer
