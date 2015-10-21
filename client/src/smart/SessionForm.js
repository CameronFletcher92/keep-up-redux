import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { RaisedButton, TextField, DatePicker } from 'material-ui'
import { saveAsync, updateForm, resetForm } from '../ducks/sessions'
import ClientsCheckList from './ClientsCheckList'
import ExercisesCheckList from './ExercisesCheckList'
import IconInputContainer from '../dumb/IconInputContainer'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  text: { width: '100%', marginBottom: '0.5em' },
  datepicker: { width: '100%' },
  button: { flex: 1, alignSelf: 'flex-end', marginTop: '1em' },
  checkContainer: { flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  checklist: { flex: '1 1 auto', margin: '0.5em' }
}

class SessionForm extends Component {
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
    return (
      <div style={styles.container}>
        <IconInputContainer icon='event'>
          <DatePicker style={styles.datepicker} textFieldStyle={styles.text} floatingLabelText='Session Date' value={form.get('time')} onChange={(ev, dt) => updateForm('time', dt)} />
        </IconInputContainer>
        <IconInputContainer icon='description'>
          <TextField style={styles.text} multiLine={true} floatingLabelText='Additional Notes' value={form.get('notes')} onChange={(ev) => updateForm('notes', ev.target.value)} />
        </IconInputContainer>

        <div style={styles.checkContainer}>
          <div style={styles.checklist}>
            <ClientsCheckList />
          </div>
          <div style={styles.checklist}>
            <ExercisesCheckList />
          </div>
        </div>

        <RaisedButton style={styles.button} primary label='Save' onClick={() => saveAsync(form.toJS())}/>
      </div>
    )
  }
}

SessionForm.propTypes = {
  form: ImmPropTypes.contains({
    _id: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    notes: PropTypes.string.isRequired
  }),
  id: PropTypes.string,
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.sessions.get('form'),
      id: state.router.params.id
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm, resetForm }, dispatch)
  }
)(SessionForm)
