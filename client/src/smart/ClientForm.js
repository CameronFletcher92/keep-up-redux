import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { saveAsync, updateForm } from '../ducks/clients'
import { RaisedButton, TextField, Checkbox } from 'material-ui'

class ClientForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const { form, saveAsync, updateForm } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <TextField floatingLabelText='First Name' value={ form.get('firstName') } onChange={(e) => updateForm('firstName', e.target.value)} />
        </div>

        <div>
          <TextField floatingLabelText='Last Name' value={ form.get('lastName') } onChange={(e) => updateForm('lastName', e.target.value)} />
        </div>

        <div>
          <TextField floatingLabelText='Birth Date' value={ form.get('birthDate') } onChange={(e) => updateForm('birthDate', e.target.value)} />
        </div>

        <div>
          <TextField floatingLabelText='Address' value={ form.get('address') } onChange={(e) => updateForm('address', e.target.value)} />
        </div>

        <div>
          <TextField floatingLabelText='Notes' value={ form.get('notes') } onChange={(e) => updateForm('notes', e.target.value)} />
        </div>

        <div>
          <Checkbox label='Private Health' defaultChecked={form.get('privateHealth')} onCheck={(e, c) => updateForm('privateHealth', c)}/>
        </div>

        <RaisedButton label='Save' onClick={() => saveAsync(form.toJS())}/>
      </div>
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
