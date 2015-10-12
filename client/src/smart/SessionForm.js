import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { Input, Button } from 'react-bootstrap'
import { saveAsync, updateForm, toggleClient, toggleExercise } from '../ducks/sessions'

class SessionForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { form, saveAsync, updateForm, toggleClient, toggleExercise } = this.props
    return (
      <form>
        <Input type='text' label='Session Time' placeholder='Enter session time'
               value={form.get('time')} onChange={(e) => updateForm('time', e.target.value)} />

        <Button className='pull-right' bsStyle='primary' onClick={() => saveAsync(form.toJS())}>Save</Button>
      </form>
    )
  }
}

SessionForm.propTypes = {
  form: ImmPropTypes.contains({
          _id: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
        }),
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  toggleClient: PropTypes.func.isRequired,
  toggleExercise: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.sessions.get('form')
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm, toggleClient, toggleExercise }, dispatch)
  }
)(SessionForm)
