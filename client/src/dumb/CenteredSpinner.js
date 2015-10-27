import React, { PropTypes } from 'react'
import { CircularProgress } from 'material-ui'
import Flex from './Flex'

const styles = {
  fixed: { position: 'fixed', top: '50%', left: '50%', marginLeft: '-2em' },
  relative: { marginLeft: '-0.5em', marginTop: '2em', marginBottom: '2em' }
}

const CenteredSpinner = ({ isVisible, fixed }) => {
  if (isVisible && fixed) {
    return (
      <CircularProgress mode='indeterminate' style={styles.fixed}/>
    )
  } else if (isVisible && !fixed) {
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
