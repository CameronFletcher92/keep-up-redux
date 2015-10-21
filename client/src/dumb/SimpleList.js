import React, { Component, PropTypes } from 'react'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { List, Paper } from 'material-ui'
import SimpleListItem from './SimpleListItem'
import CenteredSpinner from './CenteredSpinner'

class SimpleList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  renderItems() {
    const { items, busyItems, onItemClick, getItemLetter, getItemName } = this.props

    let lastLetter = ''
    return items.toOrderedSet().map(item => {
      const id = item.get('_id')
      const name = getItemName(item)

      // if busyItems is true at the id, that item is busy
      const busy = busyItems.get(id) ? true : false

      // determine whether this item should have a left letter icon using the callback
      let letter = getItemLetter(item)
      if (letter && letter !== lastLetter) {
        lastLetter = letter
      } else {
        letter = null
      }

      return (
        <SimpleListItem key={id} name={name} busy={busy}
                        editClicked={() => onItemClick(id)}
                        letter={letter}/>
      )
    })
  }

  render() {
    const { isBusy, title } = this.props

    return (
      <Paper zDepth={2}>
        <List subheader={title} subheaderStyle={{ fontSize: '1em' }}>
          <CenteredSpinner isVisible={isBusy} />
          {this.renderItems()}
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
  getItemName: PropTypes.func.isRequired        // (entity) => name function
}

export default SimpleList
