import React, { Component, PropTypes } from 'react'
import { CircularProgress } from 'material-ui'

class CenteredSpinner extends Component {
  render() {
    return (
      this.props.isVisible ?
      <CircularProgress style={{position: 'fixed', top: '50%', left: '50%',
                                marginLeft: '-2em', zIndex: '10'}}/> : null
    )
  }
}

CenteredSpinner.propTypes = {
  isVisible: PropTypes.bool.isRequired
}

export default CenteredSpinner
