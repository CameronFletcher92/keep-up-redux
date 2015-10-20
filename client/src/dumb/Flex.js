import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from 'react-pure-render/function'

class Flex extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { direction, justifyContent, alignItems, grow, shrink, basis, alignSelf, width, children, minWidth, maxWidth, padding, margin } = this.props
    console.log('flex direction: ', direction)
    return (
      <div style={{display: 'flex', flex: '1 1 auto', flexDirection: direction, flexGrow: {grow}, flexShrink: {shrink},
                  justifyContent, alignItems, basis, alignSelf, width, minWidth, maxWidth, padding, margin}}>
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
  width: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string
}

export default Flex
