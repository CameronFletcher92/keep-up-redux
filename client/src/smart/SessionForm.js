import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { Input, Button, ListGroup, Grid, Col } from 'react-bootstrap'
import { saveAsync, updateForm, toggleClient, toggleExercise } from '../ducks/sessions'
import CheckboxListItem from '../dumb/CheckboxListItem'

class SessionForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  renderClients() {
    const { form, toggleClient, clients } = this.props

    return clients.toIndexedSeq().map(client => {
      const id = client.get('_id')
      const checked = form.getIn(['clients', id]) ? true : false
      return (
        <CheckboxListItem key={id} name={client.get('firstName') + ' ' + client.get('lastName')}
                          checked={checked} toggle={() => toggleClient(id)} />
      )
    })
  }

  renderExercises() {
    const { form, toggleExercise, exercises } = this.props

    return exercises.toIndexedSeq().map(exercise => {
      const id = exercise.get('_id')
      const checked = form.getIn(['exercises', id]) ? true : false
      return (
        <CheckboxListItem key={id} name={exercise.get('name')}
                          checked={checked} toggle={() => toggleExercise(id)} />
      )
    })
  }

  render() {
    const { form, saveAsync, updateForm } = this.props
    return (
      <form>
        <Input type='text' label='Session Time' placeholder='Enter session time'
               value={form.get('time')} onChange={(e) => updateForm('time', e.target.value)} />
        <Input type='textarea' label='Additional Notes' placeholder='Enter any additional notes'
               value={form.get('notes')} onChange={(e) => updateForm('notes', e.target.value)} />

        <Grid fluid style={{padding: '0em'}}>
          <Col xs={12} sm={6} style={{padding: '0em', paddingRight: '1em'}}>
            <div style={{paddingBottom: '0.4em'}}>
              Clients
            </div>
            <ListGroup>
              {this.renderClients()}
            </ListGroup>
          </Col>

          <Col xs={12} sm={6} style={{padding: '0em', paddingLeft: '1em'}}>
            <div style={{paddingBottom: '0.4em'}}>
              Exercises
            </div>
            <ListGroup>
              {this.renderExercises()}
            </ListGroup>
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
        }),
  exercises: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  name: PropTypes.string.isRequired
                })
              ),
  clients: ImmPropTypes.mapOf(
                ImmPropTypes.contains({
                  _id: PropTypes.string.isRequired,
                  firstName: PropTypes.string.isRequired,
                  lastName: PropTypes.string.isRequired,
                })
              ),
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  toggleClient: PropTypes.func.isRequired,
  toggleExercise: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.sessions.get('form'),
      clients: state.clients.get('entities'),
      exercises: state.exercises.get('entities')
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm, toggleClient, toggleExercise }, dispatch)
  }
)(SessionForm)
