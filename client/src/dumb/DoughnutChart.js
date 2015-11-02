import React, { Component, PropTypes } from 'react'
import shouldUpdatePure from '../util/shouldUpdatePure'
import { Doughnut } from 'react-chartjs'
import { ListDivider } from '../themes/muiComponents'
import { palette } from '../themes/muiTheme'

const styles = {
  titleContainer: { marginLeft: '1em' },
  dividerContainer: { marginLeft: '1em', marginRight: '1em' },
  chartContainer: { flex: '1 1 auto', display: 'flex', flexDirection: 'row', marginLeft: '1.5em', marginTop: '1em',
                    justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }
}

class DoughnutChart extends Component {
  shouldComponentUpdate = shouldUpdatePure
  renderLegend() {
    const props = this.props

    return (
      <ul>
        {props.data.map((item, index) => {
          return (
            <li style={{ color: item.color, fontSize: '1.3em' }} key={index}>
              <span style={{ color: palette.textColor, fontSize: '0.75em' }}>{item.label}</span>
            </li>
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
          <h3>{props.title}</h3>
        </div>
        <div style={styles.dividerContainer}>
          <ListDivider/>
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
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default DoughnutChart
