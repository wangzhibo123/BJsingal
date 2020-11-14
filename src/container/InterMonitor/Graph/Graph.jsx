import React from 'react'
import echarts from 'echarts'
import { speed } from 'jquery'

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.xDatas = ['00:00', '04:00', '08:00', '12:00', '14:00']
    this.series = [1, 2, 3, 4, 5]
  }
  componentDidMount = () => {
    const chartsBox = echarts.init(this.chartsBox)
    const { jamdurArr, speedArr, timeArr } = this.props.chartsDatas
    this.testRenderCharts(chartsBox, timeArr, jamdurArr, speedArr)
  }
  testRenderCharts = (chartsBox, times, jamdur, speed) => {
    const options = {
      title: {
        text: '近24小时路况趋势',
        textStyle: {
          color: '#6B9BF5',
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      grid: {
        // show: false, // ---是否显示直角坐标系网格
        top: '15%', // 等价于 y: '16%'
        left: '3%',
        bottom: '10', // ---相对位置，top\bottom\left\right
        right: '4%',
        containLabel: true, // ---grid 区域是否包含坐标轴的刻度标签
      },
      legend: {
        data: ['拥堵状态', '平均时速'],
        textStyle: { // ----图例内容样式
          color: '#FFFFFF', // ---所有图例的字体颜色
          // backgroundColor:'black',  //---所有图例的字体背景色
        },
      },
      xAxis: [
        {
          type: 'category',
          data: times,
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#5dbaf7', // 更改坐标轴文字颜色
              fontSize: 12, // 更改坐标轴文字大小
            },
            interval: 0,
            formatter(value) {
              let ret = ''
              const maxLength = 10 // 每项显示文字个数
              const valLength = value.length // X轴类目项的文字个数
              const rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
              if (rowN > 1) { // 如果类目项的文字大于3
                for (let i = 0; i < rowN; i++) {
                  let temp = '' // 每次截取的字符串
                  const start = i * maxLength // 开始截取的位置
                  const end = start + maxLength // 结束截取的位置
                  temp = `${value.substring(start, end)}\n`
                  ret += temp // 凭借最终的字符串
                }
                return ret
              }
              return value
            },
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            // show: true,
            lineStyle: {
              color: '#1C385F', // 轴的颜色
            },
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '',
          min: 0,
          max: 20,
          interval: 2,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#5dbaf7', // 更改坐标轴文字颜色
              fontSize: 13, // 更改坐标轴文字大小
            },
            formatter: '{value}'
          },
          splitLine: { // ---grid 区域中的分隔线
            show: true, // ---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
            lineStyle: {
              color: ['#2A4065'],
              width: 1,
              type: 'solid',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#1C385F', // 轴的颜色
            },
          },
        },
        {
          type: 'value',
          name: '',
          min: 0,
          max: 100,
          interval: 10,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#5dbaf7', // 更改坐标轴文字颜色
              fontSize: 13, // 更改坐标轴文字大小
            },
            formatter: '{value}'
          },
          splitLine: { // ---grid 区域中的分隔线
            show: true, // ---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
            lineStyle: {
              color: ['#2A4065'],
              width: 1,
              type: 'solid',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#1C385F', // 轴的颜色
            },
          },
        }
      ],
      series: [
        {
          name: '拥堵状态',
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: jamdur,
          itemStyle: {
            color: '#9257AE',
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#9257AE'
              }, {
                offset: 1,
                color: '#031334'
              }])
            }
          },
        },
        {
          name: '平均时速',
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: speed,
          yAxisIndex: 1,
          itemStyle: {
            color: '#FFAE5E',
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FFAE5E'
              }, {
                offset: 1,
                color: '#031334'
              }])
            }
          },
        },
      ]
    }
    chartsBox.setOption(options, true)
  }
  render() {
    return (
      <div style={{ width: '99%', height: '99%', overflow: 'hidden' }} ref={(input) => { this.chartsBox = input }} />
    )

  }
}

export default Graph
