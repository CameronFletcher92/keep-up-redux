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
    const props = this.props

    if (props.exercises.size === 0) {
      props.fetchAsync()
    }
  }

  render() {
    const props = this.props
    return (
      <CheckboxList title='Exercises' items={props.exercises} selectedItems={props.selectedExercises} onItemClick={props.toggleExercise}
                    isBusy={props.isFetching} search={props.search} updateSearch={props.updateSearch}
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
