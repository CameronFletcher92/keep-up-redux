import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import { increment, decrement, incrementIfOdd, incrementAsync } from '../ducks/counter'
import { connect } from 'react-redux'

class Counter extends Component {
  render() {
    const { dispatch, count, label } = this.props
    return (
      <Grid fluid={true}>
        <Row>
          <Col sm={1}>
            { count }
          </Col>
          <Col sm={11}>
            <ButtonGroup>
              <Button onClick={() => dispatch(increment())}>+</Button>
              <Button onClick={() => dispatch(decrement())}>-</Button>
              <Button onClick={() => dispatch(incrementIfOdd())}>Increment if odd</Button>
              <Button onClick={() => dispatch(incrementAsync())}>Increment async</Button>
            </ButtonGroup>
          </Col>
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
  return { ...state.counter }
}

export default connect(select)(Counter)
