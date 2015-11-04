import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { pushState } from 'redux-router'
import { fetchAsync, updateSearch } from '../ducks/exercisesTemplates'
import SimpleList from '../dumb/SimpleList'
import FixedActionButton from '../dumb/FixedActionButton'

class ExercisesTemplatesList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const props = this.props

    if (props.entities.size === 0) {
      props.fetchAsync()
    }
  }

  render() {
    const props = this.props
    return (
      <div>
        <SimpleList title='Exercises Templates' items={props.entities} busyItems={props.syncing}
                    onItemClick={(id) => props.pushState({ title: 'Edit Exercises Template' }, '/templates/exercises/' + id)}
                    isBusy={props.isFetching} updateSearch={props.updateSearch} search={props.search}
                    getItemLetter={(template) => template.get('name').charAt(0).toUpperCase()}
                    getItemName={(template) => template.get('name')} />
        <FixedActionButton icon='add' onClick={() => props.pushState({ title: 'New Exercises Template' }, '/templates/exercises/new')}/>
      </div>
    )
  }
}

ExercisesTemplatesList.propTypes = {
  // entities is an immutable list of immutable exercises
  entities: ImmPropTypes.mapOf(
    ImmPropTypes.contains({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  syncing: ImmPropTypes.map.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired
}

export default connect(
  state => {
    return {
      entities: state.exercisesTemplates.get('entities'),
      isFetching: state.exercisesTemplates.get('isFetching'),
      syncing: state.exercisesTemplates.get('syncing'),
      search: state.exercisesTemplates.get('search')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, pushState, updateSearch }, dispatch)
  }
)(ExercisesTemplatesList)
