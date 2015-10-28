import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from 'react-pure-render/function'
import ImmPropTypes from 'react-immutable-proptypes'
import { TextField, Checkbox, DatePicker } from '../themes/muiComponents'
import { saveAsync, updateForm, resetForm } from '../ducks/clients'
import IconInputContainer from '../dumb/IconInputContainer'
import FixedActionButton from '../dumb/FixedActionButton'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  text: { width: '100%', marginBottom: '0.5em' },
  datepicker: { width: '100%' },
  checkbox: { width: '100%', marginTop: '2em' }
}

class ClientForm extends Component {
  shouldComponentUpdate = shouldUpdatePure

  componentWillMount() {
    const props = this.props
    if (props.id) {
      props.resetForm(props.id)
    } else {
      props.resetForm()
    }
  }

  formatDate(date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  }

  render() {
    const props = this.props
    return (
      <div style={styles.container}>
        <IconInputContainer icon='person'>
          <TextField style={styles.text} floatingLabelText='First Name' value={props.form.get('firstName')}
                     onChange={(ev) => props.updateForm('firstName', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='person'>
          <TextField style={styles.text} floatingLabelText='Last Name' value={props.form.get('lastName')}
                     onChange={(ev) => props.updateForm('lastName', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='event'>
          <DatePicker formatDate={this.formatDate} style={styles.datepicker} textFieldStyle={styles.text} floatingLabelText='Birth Date'
                      value={props.form.get('birthDate')} onChange={(ev, dt) => props.updateForm('birthDate', dt)} />
        </IconInputContainer>

        <IconInputContainer icon='place'>
          <TextField style={styles.text} floatingLabelText='Address' value={props.form.get('address')}
                     onChange={(ev) => props.updateForm('address', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='description'>
          <TextField style={styles.text} multiLine={true} floatingLabelText='Notes' value={props.form.get('notes')}
                     onChange={(ev) => props.updateForm('notes', ev.target.value)} />
        </IconInputContainer>

        <IconInputContainer icon='healing'>
          <Checkbox style={styles.checkbox} label='Private Health' defaultChecked={props.form.get('privateHealth')}
                    onCheck={(ev, ch) => props.updateForm('privateHealth', ch)}/>
        </IconInputContainer>

        <FixedActionButton icon='done' onClick={() => props.saveAsync(props.form.toJS())}/>
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
