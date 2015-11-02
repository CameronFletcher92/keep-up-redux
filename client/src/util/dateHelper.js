export function getNow() {
  const date = new Date()
  date.setSeconds(0)
  return date
}

export function toDateString(date) {
  if (!date) {
    return ''
  }
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}

export function toDateTimeString(date) {
  if (!date) {
    return ''
  }

  return date.toLocaleString('en-AU', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function toTimeString(date) {
  if (!date) {
    return ''
  }

  return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
}
