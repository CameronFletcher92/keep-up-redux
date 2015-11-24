import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { CircularProgress } from '../themes/muiComponents'
import { toDateString } from '../util/dateHelper'
import { DatePicker } from '../themes/muiComponents'
import IconInputContainer from './IconInputContainer'

const styles = {
  container: { padding: '0em', margin: '0em', flex: '1 1 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  datepicker: { flex: '1 1 auto', margin: '0em', marginRight: '1em' },
  text: { width: '100%', marginBottom: '0.5em' }
}

class DateRangePicker extends Component {
  shouldComponentUpdate = shouldUpdatePure

  render() {
    const props = this.props
    return (
      <div style={styles.container}>
        <div style={styles.datepicker}>
          <IconInputContainer icon='event'>
            <DatePicker formatDate={toDateString} style={styles.datepicker} textFieldStyle={styles.text} floatingLabelText='Min Date'
                        value={props.startDate} onChange={(ev, dt) => props.startDateChanged(dt)} />
          </IconInputContainer>
        </div>
        <div style={styles.datepicker}>
          <IconInputContainer icon='event'>
            <DatePicker formatDate={toDateString} style={styles.datepicker} textFieldStyle={styles.text} floatingLabelText='Max Date'
                        value={props.endDate} onChange={(ev, dt) => props.endDateChanged(dt)} />
          </IconInputContainer>
        </div>
      </div>
    )
  }
}

DateRangePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  startDateChanged: PropTypes.func.isRequired,
  endDateChanged: PropTypes.func.isRequired
}

export default DateRangePicker
