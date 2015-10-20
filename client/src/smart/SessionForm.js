import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { saveAsync, updateForm } from '../ducks/sessions'
import { RaisedButton, TextField } from 'material-ui'
import ClientsCheckList from './ClientsCheckList'
import ExercisesCheckList from './ExercisesCheckList'

let styles = {
  container: {display: 'flex', flexDirection: 'column', alignItems: 'stretch'},
  text: {width: '100%', marginBottom: '1em'},
  button: {flex: 1, alignSelf: 'flex-end'},
  checkContainer: {flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'},
  checklist: {flex: '1 1 auto'}
}

class SessionForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { form, saveAsync, updateForm } = this.props
    return (
      <div style={styles.container}>
        <TextField style={styles.text} floatingLabelText='Session Time' value={form.get('time')} onChange={(e) => updateForm('time', e.target.value)} />
        <TextField style={styles.text} floatingLabelText='Additional Notes' value={form.get('notes')} onChange={(e) => updateForm('notes', e.target.value)} />

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
          time: PropTypes.string.isRequired,
          notes: PropTypes.string.isRequired,
        }),
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.sessions.get('form')
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm }, dispatch)
  }
)(SessionForm)
