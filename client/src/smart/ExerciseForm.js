import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { RaisedButton, TextField, SelectField } from 'material-ui'
import { saveAsync, updateForm, resetForm } from '../ducks/exercises'
import IconInputContainer from '../dumb/IconInputContainer'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  text: { width: '100%', marginBottom: '1em' },
  button: { flex: 1, alignSelf: 'flex-end', marginTop: '1em' }
}

class ExerciseForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { id, resetForm } = this.props
    if (id) {
      resetForm(id)
    } else {
      resetForm()
    }
  }

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
      <div style={styles.container}>
        <IconInputContainer icon='directions_run'>
          <TextField style={styles.text} floatingLabelText='Exercise' value={form.get('name')} onChange={(ev) => updateForm('name', ev.target.value)} />
        </IconInputContainer>
        <IconInputContainer icon='description'>
          <TextField style={styles.text} floatingLabelText='Description' multiLine={true} value={form.get('description')} onChange={(ev) => updateForm('description', ev.target.value)} />
        </IconInputContainer>
        <IconInputContainer icon='whatshot'>
          <SelectField style={styles.text} floatingLabelText='Intensity' menuItems={intensities} value={form.get('intensity')} onChange={(ev) => updateForm('intensity', ev.target.value)} />
        </IconInputContainer>

        <RaisedButton style={styles.button} primary label='Save' onClick={() => saveAsync(form.toJS())}/>
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
  id: PropTypes.string,
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.exercises.get('form'),
      id: state.router.params.id
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm, resetForm }, dispatch)
  }
)(ExerciseForm)
