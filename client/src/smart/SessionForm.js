import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { saveAsync, updateForm } from '../ducks/sessions'
import { RaisedButton, TextField } from 'material-ui'
import ClientsCheckList from './ClientsCheckList'
import ExercisesCheckList from './ExercisesCheckList'

class SessionForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { form, saveAsync, updateForm } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <TextField floatingLabelText='Session Time' value={form.get('time')} onChange={(e) => updateForm('time', e.target.value)} />
        </div>

        <div>
          <TextField floatingLabelText='Additional Notes' value={form.get('notes')} onChange={(e) => updateForm('notes', e.target.value)} />
        </div>

        <div>
          Clients
          <ClientsCheckList />
        </div>

        <div>
          Exercises
          <ExercisesCheckList />
        </div>

        <RaisedButton label='Save' onClick={() => saveAsync(form.toJS())}/>
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
