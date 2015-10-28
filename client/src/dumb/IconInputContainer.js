import React, { PropTypes } from 'react'
import { FontIcon } from '../themes/muiComponents'
import Flex from './Flex'
import { palette } from '../themes/muiTheme'

const IconInputContainer = (props) => {
  return (
    <Flex direction='row'>
      <div style={{ marginTop: '2em', marginRight: '1em' }}>
        <FontIcon className='material-icons' style={{ fontSize: '200%', color: palette.accent3Color }}>{props.icon}</FontIcon>
      </div>
      <Flex direction='row' justifyContent='stretch'>
        {props.children}
      </Flex>
    </Flex>
  )
}

IconInputContainer.propTypes = {
  icon: PropTypes.string.isRequired
}

export default IconInputContainer
