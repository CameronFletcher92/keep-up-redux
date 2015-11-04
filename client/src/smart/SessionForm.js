import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from '../util/shouldUpdatePure'
import ImmPropTypes from 'react-immutable-proptypes'
import { TextField, DatePicker, TimePicker, RaisedButton, Dialog } from '../themes/muiComponents'
import { saveAsync, updateForm, resetForm, toggleClient, toggleExercise } from '../ducks/sessions'
import ClientsCheckList from './ClientsCheckList'
import ClientsTemplatesList from './ClientsTemplatesList'
import ExercisesCheckList from './ExercisesCheckList'
import ExercisesTemplatesList from './ExercisesTemplatesList'
import IconInputContainer from '../dumb/IconInputContainer'
import FixedActionButton from '../dumb/FixedActionButton'
import { toDateString, toTimeString } from '../util/dateHelper'


const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  text: { width: '100%', marginBottom: '0.5em' },
  datesContainer: { flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  dateContainer: { flex: '1 1 auto' },
  timeContainer: { flex: '1 1 auto' },
  buttonContainer: { flex: '1 1 auto', display: 'flex', justifyContent: 'center', marginBottom: '1em' },
  datepicker: { width: '100%' },
  timepicker: { width: '100%' },
  checkContainer: { flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '0.5em' },
  checklist: { flex: '1 1 auto', margin: '0.5em' },
  dialogBody: { padding: '0em' },
  dialogContainer: { height: '25em' }
}

class SessionForm extends Component {
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
        <div style={styles.datesContainer}>
          <div style={styles.dateContainer}>
            <IconInputContainer icon='event'>
                <DatePicker formatDate={toDateString} style={styles.datepicker} textFieldStyle={styles.text}
                            floatingLabelText='Session Date' value={props.form.get('time')}
                            onChange={(ev, dt) => props.updateForm('date', dt)} />
            </IconInputContainer>
          </div>
          <div style={styles.timeContainer}>
            <IconInputContainer icon='access_time'>
              <TimePicker textFieldStyle={styles.text} style={styles.timepicker}
                          floatingLabelText='Session Time' value={toTimeString(props.form.get('time'))}
                          onChange={(ev, dt) => props.updateForm('time', dt)} />
            </IconInputContainer>
          </div>
        </div>


        <IconInputContainer icon='description'>
          <TextField style={styles.text} multiLine={true} floatingLabelText='Additional Notes' value={props.form.get('notes')}
                     onChange={(ev) => props.updateForm('notes', ev.target.value)} />
        </IconInputContainer>
        <div style={styles.checkContainer}>
          <div style={styles.checklist}>
            <div style={styles.buttonContainer}>
              <RaisedButton label='Load Clients Template' onClick={() => this.refs.clientsDialog.show()} />
            </div>
            <Dialog ref='clientsDialog' actions={[{ text: 'Cancel' }]} bodyStyle={styles.dialogBody}
                    autoScrollBodyContent={true}>
              <div style={styles.dialogContainer}>
                <ClientsTemplatesList inDialog={true} closeDialog={() => this.refs.clientsDialog.dismiss()} />
              </div>
            </Dialog>
            <ClientsCheckList toggleClient={props.toggleClient} selectedClients={props.form.get('clients')}/>
          </div>
          <div style={styles.checklist}>
            <div style={styles.buttonContainer}>
              <RaisedButton label='Load Exercises Template' onClick={() => this.refs.exercisesDialog.show()} />
            </div>
            <Dialog ref='exercisesDialog' actions={[{ text: 'Cancel' }]} bodyStyle={styles.dialogBody}
                    autoScrollBodyContent={true}>
              <div style={styles.dialogContainer}>
                <ExercisesTemplatesList inDialog={true} closeDialog={() => this.refs.exercisesDialog.dismiss()}/>
              </div>
            </Dialog>
            <ExercisesCheckList toggleExercise={props.toggleExercise} selectedExercises={props.form.get('exercises')} />
          </div>
        </div>

        <FixedActionButton icon='done' onClick={() => props.saveAsync(this.props.form.toJS())}/>
      </div>
    )
  }
}

SessionForm.propTypes = {
  form: ImmPropTypes.contains({
    _id: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    notes: PropTypes.string.isRequired,
    clients: ImmPropTypes.map.isRequired,
    exercises: ImmPropTypes.map.isRequired
  }),
  id: PropTypes.string,
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  toggleClient: PropTypes.func.isRequired,
  toggleExercise: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.sessions.get('form'),
      id: state.router.params.id
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm, resetForm, toggleClient, toggleExercise }, dispatch)
  }
)(SessionForm)
