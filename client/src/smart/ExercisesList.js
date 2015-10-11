import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import { ListGroup } from 'react-bootstrap'
import { fetchAsync, navToEditExercise, deleteAsync } from '../ducks/exercises'
import Exercise from '../dumb/Exercise'

class ExercisesList extends Component {
  componentWillMount() {
    const { allExercises, fetchAsync } = this.props

    if (allExercises.size == 0) {
      fetchAsync()
    }
  }

  renderExercises() {
    const { allExercises, syncing, fetchAsync, navToEditExercise, deleteAsync, isFetching } = this.props

    return allExercises.toIndexedSeq().map(exercise => {
      var id = exercise.get('_id')
      var disabled = isFetching || syncing.get(id) ? true : false
      return (
        <Exercise key={id} name={exercise.get('name')} disabled={disabled}
                editClicked={() => navToEditExercise(id)} deleteClicked={() => deleteAsync(id)} />
      )
    })
  }

  render() {
    return (
      <ListGroup style={{marginBottom: '4em'}}>
        { this.renderExercises() }
      </ListGroup>
    )
  }
}

ExercisesList.propTypes = {
  // allExercises is an immutable list of immutable exercises
  allExercises: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  name: PropTypes.string.isRequired
                })
              ),
  syncing: ImmPropTypes.map.isRequired,
  fetchAsync: PropTypes.func.isRequired,
  deleteAsync: PropTypes.func.isRequired,
  navToEditExercise: PropTypes.func.isRequired,
}

export default connect(
  state => {
    return {
      allExercises: state.exercises.get('allExercises'),
      isFetching: state.exercises.get('isFetching'),
      syncing: state.exercises.get('syncing')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, navToEditExercise, deleteAsync}, dispatch)
  }
)(ExercisesList)
