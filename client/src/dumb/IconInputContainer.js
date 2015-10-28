import React, { PropTypes } from 'react'
import { FontIcon } from '../themes/muiComponents'
import { palette } from '../themes/muiTheme'

const styles = {
  container: { display: 'flex', flexDirection: 'row' },
  iconContainer: { marginTop: '2em', marginRight: '1em' },
  icon: { fontSize: '200%', color: palette.accent3Color },
  inputContainer: { display: 'flex', flex: '1 1 auto', flexDirection: 'row', justifyContent: 'stretch' }
}

const IconInputContainer = (props) => {
  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        <FontIcon className='material-icons' style={styles.icon}>{props.icon}</FontIcon>
      </div>
      <div style={styles.inputContainer}>
        {props.children}
      </div>
    </div>
  )
}

IconInputContainer.propTypes = {
  icon: PropTypes.string.isRequired
}

export default IconInputContainer
