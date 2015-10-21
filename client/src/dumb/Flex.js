import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from 'react-pure-render/function'

class Flex extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { direction, justifyContent, alignItems, grow, shrink, basis, alignSelf, children, minWidth, maxWidth, margin } = this.props
    return (
      <div style={{ display: 'flex', flex: '1 1 auto', width: '100%', flexDirection: direction, flexGrow: grow, flexShrink: shrink,
                  justifyContent, alignItems, basis, alignSelf, minWidth, maxWidth, margin }}>
        {children}
      </div>
    )
  }
}

Flex.propTypes = {
  direction: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  grow: PropTypes.string,
  shrink: PropTypes.string,
  basis: PropTypes.string,
  alignSelf: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  margin: PropTypes.string
}

export default Flex
