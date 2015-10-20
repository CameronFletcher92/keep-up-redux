import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { saveAsync, updateForm, resetForm } from '../ducks/clients'
import { RaisedButton, TextField, Checkbox, DatePicker } from 'material-ui'

let styles = {
  container: {display: 'flex', flexDirection: 'column', alignItems: 'stretch'},
  text: {width: '100%', flex: '1 1 auto', marginBottom: '1em'},
  button: {flex: 1, alignSelf: 'flex-end'}
}

class ClientForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const { id, resetForm } = this.props
    if(id) {
      resetForm(id)
    } else {
      resetForm()
    }
  }

  render() {
    const { form, saveAsync, updateForm } = this.props
    return (
      <div style={styles.container}>
        <TextField style={styles.text} floatingLabelText='First Name' value={ form.get('firstName') } onChange={(e) => updateForm('firstName', e.target.value)} />
        <TextField style={styles.text} floatingLabelText='Last Name' value={ form.get('lastName') } onChange={(e) => updateForm('lastName', e.target.value)} />
        <DatePicker textFieldStyle={styles.text} floatingLabelText='Birth Date' value={ form.get('birthDate') } onChange={(e, d) => updateForm('birthDate', d)} />
        <TextField style={styles.text} floatingLabelText='Address' value={ form.get('address') } onChange={(e) => updateForm('address', e.target.value)} />
        <Checkbox style={styles.text} label='Private Health' defaultChecked={form.get('privateHealth')} onCheck={(e, c) => updateForm('privateHealth', c)}/>
        <TextField style={styles.text} multiLine={true} floatingLabelText='Notes' value={ form.get('notes') } onChange={(e) => updateForm('notes', e.target.value)} />

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
          privateHealth: PropTypes.bool.isRequired,
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
