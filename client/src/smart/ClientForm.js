import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImmPropTypes from 'react-immutable-proptypes'
import { Input, Button } from 'react-bootstrap'
import { saveAsync, updateForm } from '../ducks/clients'

class ClientForm extends Component {
  render() {
    const { form, saveAsync, updateForm } = this.props
    return (
      <form>
        <Input type='text' label='First Name' placeholder='Enter first name'
               value={ form.get('firstName') } onChange={(e) => updateForm('firstName', e.target.value)} />
        <Input type='text' label='Last Name' placeholder='Enter last name'
               value={ form.get('lastName') } onChange={(e) => updateForm('lastName', e.target.value)} />
        <Input type='text' label='Birth Date' placeholder='dd/mm/yyyy'
               value={ form.get('birthDate') } onChange={(e) => updateForm('birthDate', e.target.value)} />
        <Input type='text' label='Address' placeholder='Enter street address'
               value={ form.get('address') } onChange={(e) => updateForm('address', e.target.value)} />
        <Input type='textarea' label='Notes' placeholder='Enter any additional notes' style={{minHeight: '7em'}}
               value={ form.get('notes') } onChange={(e) => updateForm('notes', e.target.value)} />
        <Input type='checkbox' label='Private Health' placeholder='Private health?'
               checked={ form.get('privateHealth') } onChange={(e) => updateForm('privateHealth', e.target.checked)}/>
        <Button className='pull-right' bsStyle='primary' onClick={() => saveAsync(form.toJS())}>Save</Button>
      </form>
    )
  }
}

ClientForm.propTypes = {
  form: ImmPropTypes.contains({
          _id: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          birthDate: PropTypes.string.isRequired,
          address: PropTypes.string.isRequired,
          notes: PropTypes.string.isRequired,
          privateHealth: PropTypes.bool.isRequired,
        }),
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.clients.get('form')
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm }, dispatch)
  }
)(ClientForm)
