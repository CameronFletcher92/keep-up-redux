import React, { PropTypes } from 'react'
import { Styles, FontIcon } from 'material-ui'
import Flex from './Flex'

const IconInputContainer = ({ children, icon }) => {
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

IconInputContainer.propTypes = {
  icon: PropTypes.string.isRequired
}

export default IconInputContainer
