import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Button } from 'react-bootstrap'
import { saveAsync } from '../ducks/exercises'

class ExerciseForm extends Component {
  // use local state in the form for performance
  constructor(props) {
    super()
    this.state = {...props.exercise}
  }

  render() {
    const { saveAsync } = this.props
    return (
      <form>
        <Input type='text' label='Exercise' placeholder='Enter exercise name'
               value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
        <Input type='textarea' label='Description' placeholder='Enter a description of the exercise' style={{minHeight: '7em'}}
               value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
        <Input type='select' value={this.state.intensity} label='Intensity' placeholder='Select an intensity'
               onChange={(e) => this.setState({intensity: e.target.value})}>
             <option value={1}>1</option>
             <option value={2}>2</option>
             <option value={3}>3</option>
             <option value={4}>4</option>
             <option value={5}>5</option>
        </Input>
        <Button className='pull-right' bsStyle='primary' onClick={() => saveAsync(this.state)}>Save</Button>
      </form>
    )
  }
}

ExerciseForm.propTypes = {
  exercise: PropTypes.object.isRequired,
  saveAsync: PropTypes.func.isRequired
}

export default connect(
  state => {
    const id = state.router.params.id
    return {
      exercise: id ? state.exercises.getIn(['allExercises', id]).toJS() : {}
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync }, dispatch)
  }
)(ExerciseForm)
