import React, { Component } from 'react'
import echarts from 'echarts'

class GraphPlus extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    const chartsBox = echarts.init(this.chartsBox)
    console.log(this.props.chartsDatas)
    if (this.props.chartsDatas) {
      const { xData, datas } = this.props.chartsDatas
      this.renderCharts(chartsBox, xData, datas)
    }
  }
  renderCharts = (chartsBox, xData, datas) => {
    const options = {
      xAxis: {
        data: xData,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#5dbaf7', // 更改坐标轴文字颜色
            fontSize: 13, // 更改坐标轴文字大小
          },
        },
        axisLine: {
          // show: true,
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        }
      },
      yAxis: {
        axisLabel: {
          show: true,
          textStyle: {
            color: '#5dbaf7', // 更改坐标轴文字颜色
            fontSize: 13, // 更改坐标轴文字大小
          },
        },
        axisLine: {
          // show: true,
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        },
        splitLine:{
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        }
      },
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
        data: datas
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
        data: datas,
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
        data: datas,
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
