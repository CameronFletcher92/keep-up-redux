import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { toggleExercise } from '../ducks/sessions'
import { fetchAsync, updateSearch } from '../ducks/exercises'
import CheckboxList from '../dumb/CheckboxList'

class ExercisesCheckList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { exercises, fetchAsync } = this.props

    if (exercises.size === 0) {
      fetchAsync()
    }
  }

  render() {
    const { exercises, selectedExercises, toggleExercise, isFetching, search, updateSearch } = this.props
    return (
      <CheckboxList title='Exercises' items={exercises} selectedItems={selectedExercises} onItemClick={toggleExercise}
                    isBusy={isFetching} search={search} updateSearch={updateSearch}
                    getItemLetter={(exercise) => exercise.get('name').charAt(0).toUpperCase()}
                    getItemName={(exercise) => exercise.get('name')} />
    )
  }
}

ExercisesCheckList.propTypes = {
  selectedExercises: ImmPropTypes.map.isRequired,
  exercises: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  name: PropTypes.string.isRequired
                })
              ),
  toggleExercise: PropTypes.func.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      selectedExercises: state.sessions.getIn(['form', 'exercises']),
      exercises: state.exercises.get('entities'),
      isFetching: state.exercises.get('isFetching'),
      search: state.exercises.get('search')
    }
  },
  dispatch => {
    return bindActionCreators({ toggleExercise, fetchAsync, updateSearch }, dispatch)
  }
)(ExercisesCheckList)
