import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { saveAsync, updateForm } from '../ducks/exercises'
import { RaisedButton, TextField, SelectField } from 'material-ui'

class ExerciseForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { form, saveAsync, updateForm } = this.props
    const intensities = [
      { payload: 1, text: '1' },
      { payload: 2, text: '2' },
      { payload: 3, text: '3' },
      { payload: 4, text: '4' },
      { payload: 5, text: '5' }
    ]
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <TextField floatingLabelText='Exercise' value={form.get('name')} onChange={(e) => updateForm('name', e.target.value)} />
        </div>

        <div>
          <TextField floatingLabelText='Description' value={form.get('description')} onChange={(e) => updateForm('description', e.target.value)} />
        </div>

        <div>
          <SelectField floatingLabelText='Intensity' menuItems={intensities} value={form.get('intensity')} onChange={(e) => updateForm('intensity', e.target.value)} />
        </div>

        <RaisedButton label='Save' onClick={() => saveAsync(form.toJS())}/>
      </div>
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
