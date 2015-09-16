import React, { Component, PropTypes } from 'react'
import { Grid, Row, ButtonGroup, Button } from 'react-bootstrap'
import { increment, decrement, incrementIfOdd, incrementAsync } from '../ducks/counter'
import { connect } from 'react-redux'

class Counter extends Component {
  render() {
    console.log('rendering', this.props)
    const { dispatch, count, label } = this.props
    return (
      <Grid fluid={true}>
        <Row style={{marginBottom: '1em'}}>
          { count }
        </Row>
        <Row>
          <ButtonGroup>
            <Button onClick={() => dispatch(increment(1))}>+</Button>
            <Button onClick={() => dispatch(decrement(1))}>-</Button>
            <Button onClick={() => dispatch(incrementIfOdd())}>Increment if odd</Button>
            <Button onClick={() => dispatch(incrementAsync())}>Increment async</Button>
          </ButtonGroup>
        </Row>
      </Grid>
    )
  }
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
}

function select(state) {
  console.log('selecting', state)
  return {
    count: state.counter.count,
    label: state.counter.label
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Counter)
