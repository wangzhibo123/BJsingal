import React from 'react'
import echarts from 'echarts'

class GraphCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    console.log(this.props)
    const { delay, speed } = this.props.chartsDatas
    const chartsBox = echarts.init(this.chartsBox)
    this.renderChartsBox(chartsBox, delay, speed, this.props.times)
  }
  renderChartsBox = (chartsBox, delay, speed, times) => {
    const options = {
      color: ['#FBD106', '#2FF4F1'],
      title: {
        show: false,
        text: '折线图堆叠',
        padding: [5, 0, 0, 20],
        textStyle: {
          fontWeight: 'normal',
          color: '#FFFFFF',
        },
      },
      dataZoom: [
        {
          height: 10,
          type: 'slider',
          show: false,
          xAxisIndex: [0],
          start: 0, // 数据窗口范围的起始百分比,表示30%
          end: 40,
          top: 0,
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 0,
          end: 40,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: [
          {
            icon: 'rect',
            name: '速度',
          },
          {
            icon: 'rect',
            name: '延误',
          },
        ],
        right: '3%',
        top: '2%',
        textStyle: {
          color: '#FFF',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '15%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false, // 设为false首个在y轴
        data: times,
        axisLine: {
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        },
        splitLine: { // ---grid 区域中的分隔线
          show: true, // ---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
          lineStyle: {
            color: ['#143058'],
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          rotate: 45, // 旋转角度
          textStyle: {
            color: '#5dbaf7', // 更改坐标轴文字颜色
            fontSize: 12, // 更改坐标轴文字大小
          },
          interval: 0, // 设置X轴数据间隔几个显示一个，为0表示都显示
        },
      },
      yAxis: {
        type: 'value',
        splitLine: { // ---grid 区域中的分隔线
          show: true, // ---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
          lineStyle: {
            color: ['#143058'],
            width: 1,
            type: 'solid',
          },
        },

        axisLabel: {
          show: true,
          textStyle: {
            color: '#5dbaf7', // 更改坐标轴文字颜色
            fontSize: 14, // 更改坐标轴文字大小
          },
        },
        axisLine: {
          // show: true,
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        },

      },
      series: [
        {
          name: '速度',
          type: 'line',
          stack: '总量',
          symbol: 'none', // 设置折线弧度，取值：0-1之间
          smooth: 0.5,
          data: speed,
        },
        {
          name: '延误',
          type: 'line',
          stack: '总量',
          symbol: 'none', // 设置折线弧度，取值：0-1之间
          smooth: 0.5,
          data: delay,
        },
      ],
    }
    chartsBox.setOption(options, true)
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} ref={(input) => { this.chartsBox = input }} />
    )
  }
}

export default GraphCharts
