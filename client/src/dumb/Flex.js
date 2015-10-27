import React, { PropTypes } from 'react'

const Flex = ({ direction, justifyContent, alignItems, grow, shrink, basis, alignSelf, children, minWidth, maxWidth, margin }) => {
  return (
    <div style={{ display: 'flex', flex: '1 1 auto', width: '100%', flexDirection: direction, flexGrow: grow, flexShrink: shrink,
                justifyContent, alignItems, basis, alignSelf, minWidth, maxWidth, margin }}>
      {children}
    </div>
  )
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
