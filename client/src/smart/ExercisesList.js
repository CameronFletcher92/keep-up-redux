import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { ListGroup } from 'react-bootstrap'
import { fetchAsync, navToEditExercise, deleteAsync } from '../ducks/exercises'
import SimpleListItem from '../dumb/SimpleListItem'

class ExercisesList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { entities, fetchAsync } = this.props

    if (entities.size == 0) {
      fetchAsync()
    }
  }

  renderExercises() {
    const { entities, syncing, fetchAsync, navToEditExercise, deleteAsync, isFetching } = this.props

    return entities.toIndexedSeq().map(exercise => {
      var id = exercise.get('_id')
      var disabled = isFetching || syncing.get(id) ? true : false
      return (
        <SimpleListItem key={id} name={exercise.get('name')} disabled={disabled}
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
  // entities is an immutable list of immutable exercises
  entities: ImmPropTypes.mapOf(
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
      entities: state.exercises.get('entities'),
      isFetching: state.exercises.get('isFetching'),
      syncing: state.exercises.get('syncing')
    }
  },
  dispatch => {
    return bindActionCreators({ fetchAsync, navToEditExercise, deleteAsync}, dispatch)
  }
)(ExercisesList)
