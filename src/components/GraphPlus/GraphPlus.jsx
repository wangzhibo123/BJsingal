import React, { Component } from 'react'
import echarts from 'echarts'

class GraphPlus extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.xDatas = ['00:00', '04:00', '08:00', '12:00', '14:00']
    this.series = [1, 2, 3, 4, 5]
  }
  componentDidMount = () => {
    const chartsBox = echarts.init(this.chartsBox)
    if (this.props.chartsDatas) {
      const { xData, datas } = this.props.chartsDatas
      this.renderCharts(chartsBox, xData, datas)
    } else {
      this.renderCharts(chartsBox, this.xDatas, this.series)
    }
  }
  renderCharts = (chartsBox, xData, datas) => {
    const { startColor, endColor, lidColor } = this.props.colors
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
                color: startColor,
            }, {
                offset: 1,
                color: endColor,
            }]),
            barBorderRadius: [0, 0, 0, 180],
            borderWidth: 1,
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: startColor,
            }, {
                offset: 1,
                color: endColor,
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
                color: startColor,
            }, {
                offset: 1,
                color: endColor,
            }]),
            barBorderRadius: [0, 0, 180, 0],
            borderWidth: 1,
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: startColor,
            }, {
                offset: 1,
                color: endColor,
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
            color: lidColor,
            borderWidth: 1,
            borderColor: lidColor,
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
