import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { toggleExercise } from '../ducks/sessions'
import { fetchAsync } from '../ducks/exercises'
import { List, Paper } from 'material-ui'
import CheckboxListItem from '../dumb/CheckboxListItem'
import CenteredSpinner from '../dumb/CenteredSpinner'

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

    let lastLetter = ''
    return exercises.toOrderedSet().map(exercise => {
      const id = exercise.get('_id')
      const checked = selectedExercises.get(id) ? true : false
      let letter = exercise.get('name').charAt(0).toUpperCase()
      if (letter !== lastLetter) {
        lastLetter = letter
      } else {
        letter = null
      }

      return (
        <CheckboxListItem key={id} name={exercise.get('name')}
                          checked={checked} toggle={() => toggleExercise(id)} letter={letter}/>
      )
    })
  }

  render() {
    const { isFetching } = this.props

    return (
      <div style={{padding: '0.5em'}}>
        <Paper zDepth={2}>
          <CenteredSpinner isVisible={isFetching}/>
          <List subheader='Exercises' subheaderStyle={{fontSize: '1em'}}>
            { this.renderExercises() }
          </List>
        </Paper>
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
  fetchAsync: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default connect(
  state => {
    return {
      selectedExercises: state.sessions.getIn(['form', 'exercises']),
      exercises: state.exercises.get('entities'),
      isFetching: state.exercises.get('isFetching')
    }
  },
  dispatch => {
    return bindActionCreators({ toggleExercise, fetchAsync }, dispatch)
  }
)(ExercisesCheckList)
