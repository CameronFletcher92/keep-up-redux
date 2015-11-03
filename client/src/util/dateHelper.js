import moment from 'moment'
moment.locale('en-AU')

export function getNow() {
  const date = new Date()
  date.setSeconds(0)
  return date
}

export function toDateString(date) {
  if (!date) {
    return ''
  }
  return moment(date).format('l')
}

export function toDateTimeString(date) {
  if (!date) {
    return ''
  }

  return moment(date).format('l LT')
}

export function toTimeString(date) {
  if (!date) {
    return ''
  }

  return moment(date).format('LT')
}
