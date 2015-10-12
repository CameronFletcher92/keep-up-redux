import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { Input, Button, Grid, Col } from 'react-bootstrap'
import { saveAsync, updateForm } from '../ducks/sessions'
import ClientsCheckList from './ClientsCheckList'
import ExercisesCheckList from './ExercisesCheckList'

class SessionForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { form, saveAsync, updateForm } = this.props
    return (
      <form>
        <Input type='text' label='Session Time' placeholder='Enter session time'
               value={form.get('time')} onChange={(e) => updateForm('time', e.target.value)} />
        <Input type='textarea' label='Additional Notes' placeholder='Enter any additional notes'
               value={form.get('notes')} onChange={(e) => updateForm('notes', e.target.value)} />

        <Grid fluid style={{padding: '0em'}}>
          <Col xs={12} sm={5} style={{padding: '0em'}}>
            <div style={{paddingBottom: '0.4em'}}>
              Clients
            </div>
            <ClientsCheckList />
          </Col>

          <Col xs={0} sm={2} style={{padding: '0em'}} />

          <Col xs={12} sm={5} style={{padding: '0em'}}>
            <div style={{paddingBottom: '0.4em'}}>
              Exercises
            </div>
            <ExercisesCheckList />
          </Col>
        </Grid>

        <Button className='pull-right' bsStyle='primary' onClick={() => saveAsync(form.toJS())}>Save</Button>
      </form>
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
