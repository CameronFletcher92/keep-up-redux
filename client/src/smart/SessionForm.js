import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shouldUpdatePure from '../util/shouldUpdatePure'
import ImmPropTypes from 'react-immutable-proptypes'
import { TextField, DatePicker } from '../themes/muiComponents'
import { saveAsync, updateForm, resetForm } from '../ducks/sessions'
import ClientsCheckList from './ClientsCheckList'
import ExercisesCheckList from './ExercisesCheckList'
import IconInputContainer from '../dumb/IconInputContainer'
import FixedActionButton from '../dumb/FixedActionButton'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'stretch' },
  text: { width: '100%', marginBottom: '0.5em' },
  datepicker: { width: '100%' },
  checkContainer: { flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  checklist: { flex: '1 1 auto', margin: '0.5em' }
}

class SessionForm extends Component {
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
        <IconInputContainer icon='event'>
          <DatePicker formatDate={this.formatDate} style={styles.datepicker} textFieldStyle={styles.text}
                      floatingLabelText='Session Date' value={props.form.get('time')} onChange={(ev, dt) => props.updateForm('time', dt)} />
        </IconInputContainer>

        <IconInputContainer icon='description'>
          <TextField style={styles.text} multiLine={true} floatingLabelText='Additional Notes' value={props.form.get('notes')}
                     onChange={(ev) => props.updateForm('notes', ev.target.value)} />
        </IconInputContainer>

        <div style={styles.checkContainer}>
          <div style={styles.checklist}>
            <ClientsCheckList />
          </div>
          <div style={styles.checklist}>
            <ExercisesCheckList />
          </div>
        </div>

        <FixedActionButton icon='done' onClick={() => props.saveAsync(this.props.form.toJS())}/>
      </div>
    )
  }
}

SessionForm.propTypes = {
  form: ImmPropTypes.contains({
    _id: PropTypes.string.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    notes: PropTypes.string.isRequired
  }),
  id: PropTypes.string,
  saveAsync: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
}

export default connect(
  state => {
    return {
      form: state.sessions.get('form'),
      id: state.router.params.id
    }
  },
  dispatch => {
    return bindActionCreators({ saveAsync, updateForm, resetForm }, dispatch)
  }
)(SessionForm)
