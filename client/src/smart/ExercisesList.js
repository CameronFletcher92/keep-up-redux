import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { ListGroup, ProgressBar } from 'react-bootstrap'
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
    const { entities, syncing, navToEditExercise, deleteAsync } = this.props

    return entities.toOrderedSet().sortBy(exercise => exercise.get('name')).map(exercise => {
      var id = exercise.get('_id')
      var disabled = syncing.get(id) ? true : false
      return (
        <SimpleListItem key={id} name={exercise.get('name')} busy={disabled}
                editClicked={() => navToEditExercise(id)} deleteClicked={() => deleteAsync(id)} />
      )
    })
  }

  render() {
    const { isFetching } = this.props

    return (
      <div>
        { isFetching ? <ProgressBar active bsStyle='success' now={100} style={{marginBottom: '0.7em'}} /> : null }
        <ListGroup>
          { this.renderExercises() }
        </ListGroup>
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
  deleteAsync: PropTypes.func.isRequired,
  navToEditExercise: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
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
