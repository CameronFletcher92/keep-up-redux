import { format } from 'fecha'

export function getNow() {
  const date = new Date()
  date.setSeconds(0)
  return date
}

export function toDateString(date) {
  if (!date) {
    return ''
  }

  return format(date, 'D/M/YYYY')
}

export function toDateTimeString(date) {
  if (!date) {
    return ''
  }

  return format(date, 'D/M/YYYY h:mm a')
}

export function toTimeString(date) {
  if (!date) {
    return ''
  }

  return format(date, 'h:mm a')
}
