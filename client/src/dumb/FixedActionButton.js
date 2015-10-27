import React, { PropTypes } from 'react'
import { FloatingActionButton, FontIcon } from 'material-ui'

const FixedActionButton = ({ icon, onClick }) => {
  return (
    <FloatingActionButton onClick={onClick} style={{ position: 'fixed', right: '2em', top: '2.2em', zIndex: '10001' }}>
      <FontIcon className='material-icons'>{icon}</FontIcon>
    </FloatingActionButton>
  )
}

FixedActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
}

export default FixedActionButton
