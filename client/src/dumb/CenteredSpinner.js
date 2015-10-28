import React, { PropTypes } from 'react'
import { CircularProgress } from '../themes/muiComponents'
import Flex from './Flex'

const styles = {
  fixed: { position: 'fixed', top: '50%', left: '50%', marginLeft: '-2em' },
  relative: { marginLeft: '-0.5em', marginTop: '2em', marginBottom: '2em' }
}

const CenteredSpinner = (props) => {
  if (props.isVisible && props.fixed) {
    return (
      <CircularProgress mode='indeterminate' style={styles.fixed}/>
    )
  } else if (props.isVisible && !props.fixed) {
    return (
      <Flex justifyContent='center'>
        <CircularProgress mode='indeterminate' style={styles.relative}/>
      </Flex>
    )
  } else {
    return (
      <div/>
    )
  }
}

CenteredSpinner.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  fixed: PropTypes.bool
}

export default CenteredSpinner
