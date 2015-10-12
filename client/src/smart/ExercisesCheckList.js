import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { toggleExercise } from '../ducks/sessions'
import { fetchAsync } from '../ducks/exercises'
import CheckboxListItem from '../dumb/CheckboxListItem'
import { ListGroup, ProgressBar } from 'react-bootstrap'

class ExercisesCheckList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { exercises, fetchAsync } = this.props
    if (exercises.size === 0) {
      fetchAsync()
    }
  }

  renderExercises() {
    const { toggleExercise, exercises, selectedExercises } = this.props

    return exercises.toIndexedSeq().map(exercise => {
      const id = exercise.get('_id')
      const checked = selectedExercises.get(id) ? true : false
      return (
        <CheckboxListItem key={id} name={exercise.get('name')}
                          checked={checked} toggle={() => toggleExercise(id)} />
      )
    })
  }

  render() {
    const { exercises } = this.props
    return (
      <div>
        { exercises.size === 0 ? <ProgressBar active bsStyle='success' style={{margin: '1em'}} now={100} /> : null }
        <ListGroup>
          {this.renderExercises()}
        </ListGroup>
      </div>
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
  fetchAsync: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      selectedExercises: state.sessions.getIn(['form', 'exercises']),
      exercises: state.exercises.get('entities'),
    }
  },
  dispatch => {
    return bindActionCreators({ toggleExercise, fetchAsync }, dispatch)
  }
)(ExercisesCheckList)
