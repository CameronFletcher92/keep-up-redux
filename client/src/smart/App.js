import React, { Component, PropTypes } from 'react'
import { Navbar, Grid, Row } from 'react-bootstrap'
import ClientsList from './ClientsList'
import Counter from './Counter'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar brand='Keep Up' fluid={true} fixedTop={true} inverse={true}/>

        <Grid fluid={true} style={{marginTop: '4em'}}>
          <Row>
            <ClientsList />
          </Row>
          <Row>
            <Counter />
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App
