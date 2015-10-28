import React, { PropTypes } from 'react'

const Flex = (props) => {
  return (
    <div style={{ display: 'flex', flex: '1 1 auto', width: '100%', flexDirection: props.direction, flexGrow: props.grow, flexShrink: props.shrink,
                  justifyContent: props.justifyContent, alignItems: props.alignItems, basis: props.basis,
                  alignSelf: props.alignSelf, minWidth: props.minWidth, maxWidth: props.maxWidth, margin: props.margin }}>
      {props.children}
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
