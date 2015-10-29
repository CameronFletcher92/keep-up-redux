import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { pushState } from 'redux-router'
import { fetchAsync, updateSearch } from '../ducks/exercises'
import SimpleList from '../dumb/SimpleList'
import FixedActionButton from '../dumb/FixedActionButton'

class ExercisesList extends Component {
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
        <SimpleList title='Exercises' items={props.entities} busyItems={props.syncing}
                    onItemClick={(id) => props.pushState({ title: 'Edit Exercise' }, '/exercises/' + id)}
                    isBusy={props.isFetching} updateSearch={props.updateSearch} search={props.search}
                    getItemLetter={(exercise) => exercise.get('name').charAt(0).toUpperCase()}
                    getItemName={(exercise) => exercise.get('name')} />
        <FixedActionButton icon='add' onClick={() => props.pushState({ title: 'New Exercise' }, '/exercises/new')}/>
      </div>
    )
  }
}

ExercisesList.propTypes = {
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
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      entities: state.exercises.get('entities'),
      isFetching: state.exercises.get('isFetching'),
      syncing: state.exercises.get('syncing'),
      search: state.exercises.get('search')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, pushState, updateSearch }, dispatch)
  }
)(ExercisesList)
