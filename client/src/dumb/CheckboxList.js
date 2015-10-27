import React, { PropTypes } from 'react'
import ImmPropTypes from 'react-immutable-proptypes'
import { List, Paper, ListDivider } from 'material-ui'
import CheckboxListItem from './CheckboxListItem'
import CenteredSpinner from './CenteredSpinner'

function renderItems(items, selectedItems, getItemLetter, getItemName, onItemClick) {
  let lastLetter = ''
  return items.toOrderedSet().map(item => {
    const id = item.get('_id')
    const name = getItemName(item)

    // if busyItems is true at the id, that item is busy
    const selected = selectedItems.get(id) ? true : false

    // determine whether this item should have a left letter icon using the callback
    let letter = getItemLetter(item)
    if (letter && letter !== lastLetter) {
      lastLetter = letter
    } else {
      letter = null
    }

    return (
      <CheckboxListItem key={id} name={name}
                        checked={selected} toggle={() => onItemClick(id)} letter={letter}/>
    )
  })
}

const SimpleList = ({ isBusy, title, items, selectedItems, getItemLetter, getItemName, onItemClick }) => {
  return (
    <Paper zDepth={2}>
      <List subheader={title} subheaderStyle={{ fontSize: '1em' }}>
        <ListDivider />
        <CenteredSpinner isVisible={isBusy} />
        {renderItems(items, selectedItems, getItemLetter, getItemName, onItemClick)}
      </List>
    </Paper>
  )
}

SimpleList.propTypes = {
  title: PropTypes.string.isRequired,
  items: ImmPropTypes.mapOf(                    // items map
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired
                })
              ),
  selectedItems: ImmPropTypes.map.isRequired,
  onItemClick: PropTypes.func.isRequired,       // callback for item click
  isBusy: PropTypes.bool.isRequired,            // global isBusy for the whole list
  getItemLetter: PropTypes.func.isRequired,     // (entity) => letter function
  getItemName: PropTypes.func.isRequired        // (entity) => name function
}

export default SimpleList
