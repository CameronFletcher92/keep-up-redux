import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { Doughnut } from 'react-chartjs'

const styles = {
  titleContainer: { marginLeft: '1em' },
  chartContainer: { flex: '1 1 auto', display: 'flex', flexDirection: 'row', marginLeft: '1em',
                    justifyContent: 'flex-start', flexWrap: 'wrap' }
}

class DoughnutChart extends Component {
  shouldComponentUpdate = shouldUpdatePure
  renderLegend() {
    const props = this.props

    return (
      <ul>
        {props.data.map(item => {
          return (
            <li style={{ color: item.color }} key={item.label}><span style={{ color: item.color }}>{item.label}</span></li>
          )
        })}
      </ul>
    )
  }

  render() {
    const props = this.props
    return (
      <div>
        <div style={styles.titleContainer}>
          <h3>Title</h3>
        </div>
        <div style={styles.chartContainer}>
          <Doughnut ref='chart' height={300} data={props.data} />
          {this.renderLegend()}
        </div>
      </div>
    )
  }
}

DoughnutChart.propTypes = {
  data: PropTypes.array.isRequired
}

export default DoughnutChart
