import React, { Component } from 'react'
import echarts from 'echarts'

class GraphPlus extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    const chartsBox = echarts.init(this.chartsBox)
    this.renderCharts(chartsBox)
  }
  renderCharts = (chartsBox) => {
    const options = {
      xAxis: {
        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      yAxis: {},
      series: [{
        type: 'bar',
        barWidth: 8,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(21,55,83,.6)',
            }, {
                offset: 1,
                color: 'rgba(0,207,253,.6)',
            }]),
            barBorderRadius: [0, 0, 0, 180],
            borderWidth: 1,
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(21,55,83)',
            }, {
                offset: 1,
                color: 'rgba(0,207,253)',
            }]),
          }
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      }, {
        name: 'a',
        tooltip: {
          show: false
        },
        type: 'bar',
        barWidth: 8,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(21,55,83,.6)',
            }, {
                offset: 1,
                color: 'rgba(0,207,253,.6)',
            }]),
            barBorderRadius: [0, 0, 180, 0],
            borderWidth: 1,
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(21,55,83)',
            }, {
                offset: 1,
                color: 'rgba(0,207,253)',
            }]),
          }
        },
        data: [220, 182, 191, 234, 290, 330, 310],
        barGap: 0
      }, {
        name: 'b',
        tooltip: {
          show: false
        },
        type: 'pictorialBar',
        itemStyle: {
          normal: {
            color: '#00C5FA',
            borderWidth: 1,
            borderColor: '#00CAF8',
          }
        },
        symbol: 'rect',
        symbolRotate: 45,
        symbolSize: ['11', '11'],
        symbolOffset: ['0', '-6'],
        symbolPosition: 'end',
        data: [220, 182, 191, 234, 290, 330, 310],
        z: 3
      }]
    };
    chartsBox.setOption(options, true)
  }
  render() {
    return (
      <div ref={(input) => { this.chartsBox = input }} style={{ width: '100%', height: '100%' }} />
    )
  }
}

export default GraphPlus
