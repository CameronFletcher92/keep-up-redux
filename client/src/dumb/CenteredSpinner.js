import React, { Component, PropTypes } from 'react'
import { CircularProgress } from 'material-ui'
import Flex from './Flex'

const styles = {
  fixed: { position: 'fixed', top: '50%', left: '50%', marginLeft: '-2em', zIndex: '10' },
  relative: { marginLeft: '-2em', zIndex: '10' }
}

class CenteredSpinner extends Component {
  render() {
    const { isVisible, fixed } = this.props

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
    }

    return null
  }
}

CenteredSpinner.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  fixed: PropTypes.bool
}

export default CenteredSpinner
