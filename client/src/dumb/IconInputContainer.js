import React, { PropTypes } from 'react'
import { FontIcon } from 'material-ui'
import Flex from './Flex'
import { palette } from '../themes/muiTheme'

const IconInputContainer = ({ children, icon }) => {
  return (
    <Flex direction='row'>
      <div style={{ marginTop: '2em', marginRight: '1em' }}>
        <FontIcon className='material-icons' style={{ fontSize: '200%', color: palette.accent3Color }}>{icon}</FontIcon>
      </div>
      <Flex direction='row' justifyContent='stretch'>
        {children}
      </Flex>
    </Flex>
  )
}

IconInputContainer.propTypes = {
  icon: PropTypes.string.isRequired
}

export default IconInputContainer
