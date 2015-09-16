import React, { Component, PropTypes } from 'react'
import { Grid, Row, ButtonGroup, Button } from 'react-bootstrap'

class Counter extends Component {
  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, count, label } = this.props
    return (
      <Grid fluid={true}>
        <Row style={{marginBottom: '1em'}}>
          { count }
        </Row>
        <Row>
          <ButtonGroup>
            <Button onClick={() => increment(1)}>+</Button>
            <Button onClick={() => decrement(1)}>-</Button>
            <Button onClick={() => incrementIfOdd()}>Increment if odd</Button>
            <Button onClick={() => incrementAsync()}>Increment async</Button>
          </ButtonGroup>
        </Row>
      </Grid>
    )
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
}

export default Counter
