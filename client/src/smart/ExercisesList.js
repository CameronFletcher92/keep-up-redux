import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { fetchAsync, navToEditExercise, deleteAsync } from '../ducks/exercises'
import { List, Paper } from 'material-ui'
import CenteredSpinner from '../dumb/CenteredSpinner'
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

    let lastLetter = ''
    return entities.toOrderedSet().map(exercise => {
      const id = exercise.get('_id')
      const busy = syncing.get(id) ? true : false
      let letter = exercise.get('name').charAt(0).toUpperCase()
      if (letter !== lastLetter) {
        lastLetter = letter
      } else {
        letter = null
      }

      return (
        <SimpleListItem key={id} name={exercise.get('name')} busy={busy}
                        editClicked={() => navToEditExercise(id)} deleteClicked={() => deleteAsync(id)}
                        letter={letter}/>
      )
    })
  }

  render() {
    const { isFetching } = this.props

    return (
      <Paper zDepth={2}>
        <CenteredSpinner isVisible={isFetching}/>
        <List subheader='Exercises' subheaderStyle={{fontSize: '1em'}}>
          { this.renderExercises() }
        </List>
      </Paper>
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
