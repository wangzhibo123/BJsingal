import React from 'react'
import echarts from 'echarts'

class ClockCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        tooltip: {
          // position: 'left',
          // formatter: `{a} <br/>{b} : {c}${123}`,
        },
        series: [{
          name: '',
          textStyle: {
            fontSize: '10px',
            color: '#fff',
          },
          type: 'gauge',
          // 仪表盘详情，用于显示数据
          // 刻度
          splitNumber: 10,
          min: 10,
          max: 100,
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [0.2, '#6F962B'],
                [0.4, '#A1EC20'],
                [0.6, '#EDED36'],
                [0.8, '#F1CD16'],
                [1.0, '#F13F16'],
              ],
              width: 4,
            },
          },
          axisLabel: { // 刻度标签。
            show: false, // 是否显示标签,默认 true。
          },
          axisTick: { // 坐标轴小标记
            show: false, // 属性show控制显示与否，默认不显示
            splitNumber: 5, // 每份split细分多少段
            length: 12, // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
              color: 'red',
              width: 1,
              type: 'solid',
            },
          },
          splitLine: { // 分隔线
            length: 7, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              color: '#F1EC2F',
            },
          },
          title: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontSize: 12,
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          pointer: {
            // width: 5
          },
          detail: {
            show: false, // 隐藏仪表盘内容
            textStyle: {
              fontSize: 12,
              color: '#E7D21D',
            },
            // formatter: `{value}${13246}`,
          },
          data: [{
            value: 200,
            name: '速度',
          }],
        }],

      },
    }
  }
  componentDidMount = () => {
    const myChart = echarts.init(this.brokens)
    myChart.setOption(this.state.options)
  }
  componentDidUpdate = (nextProps) => {
    
  }
  render() {
    return (
      <div ref={(input) => { this.brokens = input }} style={{ width: '100%', height: '100%' }} />
    )
  }
}

export default ClockCharts
