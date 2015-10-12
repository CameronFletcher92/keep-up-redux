import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { Input, Button } from 'react-bootstrap'
import { saveAsync, updateForm } from '../ducks/exercises'

class ExerciseForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { form, saveAsync, updateForm } = this.props
    return (
      <form>
        <Input type='text' label='Exercise' placeholder='Enter exercise name'
               value={form.get('name')} onChange={(e) => updateForm('name', e.target.value)} />
        <Input type='textarea' label='Description' placeholder='Enter a description of the exercise' style={{minHeight: '7em'}}
               value={form.get('description')} onChange={(e) => updateForm('description', e.target.value)} />
        <Input type='select' label='Intensity' placeholder='Select an intensity'
               value={form.get('intensity')} onChange={(e) => updateForm('intensity', parseInt(e.target.value))}>
             <option value={1}>1</option>
             <option value={2}>2</option>
             <option value={3}>3</option>
             <option value={4}>4</option>
             <option value={5}>5</option>
        </Input>

        <Button className='pull-right' bsStyle='primary' onClick={() => saveAsync(form.toJS())}>Save</Button>
      </form>
    )
  }
}

ExerciseForm.propTypes = {
  form: ImmPropTypes.contains({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          intensity: PropTypes.number.isRequired
        }),
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.exercises.get('form')
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm }, dispatch)
  }
)(ExerciseForm)
