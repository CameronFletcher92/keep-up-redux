import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { TextField, SelectField } from 'material-ui'
import { saveAsync, updateForm, resetForm } from '../ducks/exercises'
import IconInputContainer from '../dumb/IconInputContainer'
import FixedActionButton from '../dumb/FixedActionButton'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  text: { width: '100%', marginBottom: '0.5em' }
}

class ExerciseForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const props = this.props
    if (props.id) {
      props.resetForm(props.id)
    } else {
      props.resetForm()
    }
  }

  render() {
    const props = this.props
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
          <TextField style={styles.text} floatingLabelText='Exercise' value={props.form.get('name')}
                     onChange={(ev) => props.updateForm('name', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='description'>
          <TextField style={styles.text} floatingLabelText='Description' multiLine={true}
                     value={props.form.get('description')} onChange={(ev) => props.updateForm('description', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='whatshot'>
          <SelectField style={styles.text} floatingLabelText='Intensity' menuItems={intensities}
                       value={props.form.get('intensity')} onChange={(ev) => props.updateForm('intensity', ev.target.value)} />
        </IconInputContainer>

        <FixedActionButton icon='done' onClick={() => props.saveAsync(props.form.toJS())}/>
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
