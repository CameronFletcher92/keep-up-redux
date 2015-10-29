import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { CircularProgress } from '../themes/muiComponents'

const styles = {
  fixed: { position: 'fixed', top: '50%', left: '50%', marginLeft: '-2em' },
  relativeContainer: { display: 'flex', flexDirection: 'row', flex: '1 1 auto', justifyContent: 'center' },
  relativeSpinner: { marginLeft: '-0.5em', marginTop: '2em', marginBottom: '2em' }
}

class CenteredSpinner extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const props = this.props
    if (props.isVisible && props.fixed) {
      return (
        <CircularProgress mode='indeterminate' style={styles.fixed}/>
      )
    } else if (props.isVisible && !props.fixed) {
      return (
        <div>
          <div style={styles.relativeContainer}>
            <CircularProgress mode='indeterminate' style={styles.relativeSpinner}/>
          </div>
        </div>
      )
    } else {
      return (
        <div/>
      )
    }
  }
}

CenteredSpinner.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  fixed: PropTypes.bool
}

export default CenteredSpinner
