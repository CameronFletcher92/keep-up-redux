import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from '../util/shouldUpdatePure'
import ImmPropTypes from 'react-immutable-proptypes'
import { List, Paper } from '../themes/muiComponents'
import SimpleListItem from './SimpleListItem'
import CenteredSpinner from './CenteredSpinner'
import SearchBar from './SearchBar'

class SimpleList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  renderItems(props) {
    return props.items.valueSeq().map((item) => {
      const id = item.get('_id')
      const name = props.getItemName(item)

      if (name.toLowerCase().indexOf(props.search.toLowerCase()) === -1) {
        return null
      }

      // if busyItems is true at the id, that item is busy
      const busy = props.busyItems.get(id) ? true : false

      // determine whether this item should have a left letter icon using the callback
      const letter = props.getItemLetter(item)
      
      return (
        <SimpleListItem key={id} name={name} busy={busy}
                        onItemClick={() => props.onItemClick(id)}
                        letter={letter}/>
      )
    })
  }

  render() {
    const props = this.props
    return (
      <Paper zDepth={2}>
        <List>
          <SearchBar label={props.title} value={props.search} onChange={(val) => props.updateSearch(val)} />
          <CenteredSpinner isVisible={props.isBusy} />
          {this.renderItems(props)}
        </List>
      </Paper>
    )
  }
}

SimpleList.propTypes = {
  title: PropTypes.string.isRequired,
  items: ImmPropTypes.mapOf(                    // items map
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired
                })
              ),
  busyItems: ImmPropTypes.map.isRequired,       // busy map of {id -> true} if the item is busy
  onItemClick: PropTypes.func.isRequired,       // callback for item click
  isBusy: PropTypes.bool.isRequired,            // global isBusy for the whole list
  getItemLetter: PropTypes.func.isRequired,     // (entity) => letter function
  getItemName: PropTypes.func.isRequired,       // (entity) => name function
  search: PropTypes.string.isRequired,          // the currently active search text,
  updateSearch: PropTypes.func.isRequired       // callback for search updating
}

export default SimpleList
