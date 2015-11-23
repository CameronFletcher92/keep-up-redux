import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { TextField, ListDivider } from '../themes/muiComponents'
import IconInputContainer from './IconInputContainer'

const styles = {
  container: { marginTop: '-2em', paddingLeft: '1.5em', paddingRight: '2.5em', paddingTop: '0.5em' },
  text: { width: '100%' }
}

class SearchBar extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const props = this.props
    return (
      <div style={styles.container}>
        <IconInputContainer icon='search'>
          <TextField style={styles.text} floatingLabelText={props.label} value={props.value} onChange={(ev) => props.onChange(ev.target.value)} />
        </IconInputContainer>
        <ListDivider />
      </div>
    )
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default SearchBar
