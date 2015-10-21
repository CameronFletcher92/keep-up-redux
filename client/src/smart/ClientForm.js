import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { RaisedButton, TextField, Checkbox, DatePicker } from 'material-ui'
import { saveAsync, updateForm, resetForm } from '../ducks/clients'
import IconInputContainer from '../dumb/IconInputContainer'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  text: { width: '100%', marginBottom: '0.5em' },
  datepicker: { width: '100%' },
  checkbox: { width: '100%', marginTop: '2em' },
  button: { flex: 1, alignSelf: 'flex-end', marginTop: '1em' }
}

class ClientForm extends Component {
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
        <IconInputContainer icon='person'>
          <TextField style={styles.text} floatingLabelText='First Name' value={form.get('firstName')} onChange={(ev) => updateForm('firstName', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='person'>
          <TextField style={styles.text} floatingLabelText='Last Name' value={form.get('lastName')} onChange={(ev) => updateForm('lastName', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='event'>
          <DatePicker style={styles.datepicker} textFieldStyle={styles.text} floatingLabelText='Birth Date' value={form.get('birthDate')} onChange={(ev, dt) => updateForm('birthDate', dt)} />
        </IconInputContainer>

        <IconInputContainer icon='place'>
          <TextField style={styles.text} floatingLabelText='Address' value={form.get('address')} onChange={(ev) => updateForm('address', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='description'>
          <TextField style={styles.text} multiLine={true} floatingLabelText='Notes' value={form.get('notes')} onChange={(ev) => updateForm('notes', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='healing'>
          <Checkbox style={styles.checkbox} label='Private Health' defaultChecked={form.get('privateHealth')} onCheck={(ev, ch) => updateForm('privateHealth', ch)}/>
        </IconInputContainer>

        <RaisedButton style={styles.button} label='Save' primary onClick={() => saveAsync(form.toJS())}/>
      </div>
    )
  }
}

ClientForm.propTypes = {
  form: ImmPropTypes.contains({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date).isRequired,
    address: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    privateHealth: PropTypes.bool.isRequired
  }),
  id: PropTypes.string,
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.clients.get('form'),
      id: state.router.params.id
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm, resetForm }, dispatch)
  }
)(ClientForm)
