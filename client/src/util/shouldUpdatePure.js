function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  // Test for A's keys different from B.
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB)
  for (let index = 0; index < keysA.length; index++) {
    if (bHasOwnProperty(keysA[index])) {
      // ignore functions in the comparison
      if (typeof objA[keysA[index]] === 'function' && typeof objB[keysA[index]] === 'function') {
        continue
      }

      // shallow check if they are equal (works on immutables and primatives)
      if (objA[keysA[index]] !== objB[keysA[index]]) {
        return false
      }
    }
  }

  return true
}

export default function shouldUpdatePure(nextProps) {
  const res = !shallowEqual(this.props, nextProps)
  if (res) {
    console.log('render ' + this.constructor.displayName)
  }
  return res
}
