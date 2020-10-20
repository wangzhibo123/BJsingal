import React from 'react'
import echarts from 'echarts'

class LineCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.keyNum = Math.random()
    this.legend = ['东进口左转', '东进口直行', '东南进口左转', '东南进口直行', '西南进口左转', '西南进口直行', '西北进口左转', '西北进口直行', '西北进口左转1', '西北进口直行1']
    this.time = ['10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50']
    this.series = [
      {
        name: '东进口左转',
        type: 'line',
        data: [2.0, 4.9, 1.0, 33.2, 25.6, 75.7, 25.6, 162.2, 32.6, 20.0, 6.4, 3.3, 33],
      },
      {
        name: '东进口直行',
        type: 'line',
        data: [2.0, 4.9, 10, 33.2, 25.6, 70, 25.6, 162.2, 32.6, 20.0, 6.4, 30, 23],
      },
    ]
  }
  componentDidMount = () => {
    this.getPropsChartsData()
  }
  componentDidUpdate = (prevState) => {
    if (prevState.chartsDatas !== this.props.chartsDatas) {
      this.getPropsChartsData()
    }
    if (prevState.isShowTree !== this.props.isShowTree) {
      setTimeout(() => {
        const chartsBox = echarts.init(this.chartsBox)
        chartsBox.resize()
      }, 400)
    }
  }
  getPropsChartsData = () => {
    if (this.props.chartsDatas) {
      const { time, legend, series } = this.props.chartsDatas
      const chartsBox = echarts.init(this.chartsBox)
      console.log(time.length)
      if (time.length > 0) {
        this.renderCharts(chartsBox, legend, time, series)
      }
    }
  }
  renderCharts = (menuChart2, legend = this.legend, time = this.time, series = this.series) => {
    // 绘制图表
    const options = {
      title: {
        // subtext: '单位：次/车',
        textStyle: {
          fontSize: 16,
          color: '#fff',
        },
      },
      dataZoom: [
        {
          height: 10,
          type: 'slider',
          show: false,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          bottom: 5,
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 50,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      toolbox: {
        show: true,
        top: 25,
        right: 5,
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
        },
        iconStyle: {
          normal: {
            color: 'white', // 设置颜色
          },
        },
      },
      grid: {
        left: '5px',
        right: '5px',
        bottom: '5%',
        top: '15%',
        containLabel: true,
      },
      legend: {
        // data: ['东进口左转', '东进口直行', '东南进口左转', '东南进口直行', '西南进口左转', '西南进口直行', '西北进口左转', '西北进口直行', '西北进口左转1', '西北进口直行1'],
        type: 'scroll',
        pageTextStyle: {
          color: '#fff',
        },
        pageIconColor: '#0673B6',
        pageIconInactiveColor: '#2f4554',
        data: legend,
        top: 0,
        textStyle: {
          color: '#fff',
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          // data: ['10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50'],
          data: time,
          axisLabel: { // X轴文字
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#f1f1fb',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: { // Y轴刻度值
            formatter: '{value}',
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
          },
        },
      ],
      // series: [
      //   {
      //     name: '东进口左转',
      //     type: 'line',
      //     data: [2.0, 4.9, 1.0, 33.2, 25.6, 75.7, 25.6, 162.2, 32.6, 20.0, 6.4, 3.3, 33],
      //   },
      //   {
      //     name: '东进口直行',
      //     type: 'line',
      //     data: [2.0, 4.9, 10, 33.2, 25.6, 70, 25.6, 162.2, 32.6, 20.0, 6.4, 30, 23],
      //   },
      // ],
      series,
    }
    menuChart2.setOption(options, true)
  }
  render() {
    return (
      <div ref={(input) => { this.chartsBox = input }} style={{ height: '300px', width: '100%' }} key={this.keyNum + this.state.nodata} />
    )
  }
}

export default LineCharts
