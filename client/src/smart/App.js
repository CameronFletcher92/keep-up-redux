import React, { Component, PropTypes } from 'react'
import { Grid, Row } from 'react-bootstrap'
import ClientsList from './ClientsList'
import Counter from './Counter'

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <ClientsList />
        </Row>
        <Row>
          <Counter />
        </Row>
      </Grid>
    )
  }
}

export default App
