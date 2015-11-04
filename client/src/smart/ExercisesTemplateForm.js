import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from '../util/shouldUpdatePure'
import ImmPropTypes from 'react-immutable-proptypes'
import { TextField } from '../themes/muiComponents'
import { saveAsync, updateForm, resetForm, toggleExercise } from '../ducks/exercisesTemplates'
import IconInputContainer from '../dumb/IconInputContainer'
import FixedActionButton from '../dumb/FixedActionButton'
import ExercisesCheckList from './ExercisesCheckList'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  text: { width: '100%', marginBottom: '0.5em' }
}

class ExercisesTemplateForm extends Component {
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
    return (
      <div style={styles.container}>
        <IconInputContainer icon='description'>
          <TextField style={styles.text} floatingLabelText='Template Name' value={props.form.get('name')}
                     onChange={(ev) => props.updateForm('name', ev.target.value)} />
        </IconInputContainer>

        <ExercisesCheckList toggleExercise={props.toggleExercise} selectedExercises={props.form.get('exercises')}/>
        <FixedActionButton icon='done' onClick={() => props.saveAsync(this.props.form.toJS())}/>
      </div>
    )
  }
}

ExercisesTemplateForm.propTypes = {
  form: ImmPropTypes.contains({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    exercises: ImmPropTypes.map.isRequired
  }),
  id: PropTypes.string,
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  toggleExercise: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.exercisesTemplates.get('form'),
      id: state.router.params.id
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm, resetForm, toggleExercise }, dispatch)
  }
)(ExercisesTemplateForm)
