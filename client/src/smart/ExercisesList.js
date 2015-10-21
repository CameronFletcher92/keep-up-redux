import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImmPropTypes from 'react-immutable-proptypes'
import shouldUpdatePure from 'react-pure-render/function'
import { pushState } from 'redux-router'
import { fetchAsync } from '../ducks/exercises'
import SimpleList from '../dumb/SimpleList'
import FixedActionButton from '../dumb/FixedActionButton'

class ExercisesList extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { entities, fetchAsync } = this.props

    if (entities.size === 0) {
      fetchAsync()
    }
  }

  render() {
    const { entities, syncing, pushState, isFetching } = this.props
    return (
      <div>
        <SimpleList title='Exercises' items={entities} busyItems={syncing} onItemClick={(id) => pushState(null, '/exercises/' + id)}
                    isBusy={isFetching}
                    getItemLetter={(exercise) => exercise.get('name').charAt(0).toUpperCase()}
                    getItemName={(exercise) => exercise.get('name')} />
        <FixedActionButton onClick={() => pushState(null, '/exercises/new')}/>
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
    return bindActionCreators({ fetchAsync, pushState}, dispatch)
  }
)(ExercisesList)
