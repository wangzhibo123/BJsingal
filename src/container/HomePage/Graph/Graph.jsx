import React from 'react'
import echarts from 'echarts'

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.xDatas = ['00:00', '04:00', '08:00', '12:00', '14:00']
    this.series = [1, 2, 3, 4, 5]
  }
  componentDidMount = () => {
    const chartsBox = echarts.init(this.chartsBox)
    const { chartsDatas } = this.props
    if (chartsDatas) {
      const { xData, today, yesterday, lastday } = chartsDatas
      this.renderCharts(chartsBox, xData, today, yesterday, lastday)
    } else {
      this.renderCharts(chartsBox, [])
    }
  }
  renderCharts = (chartsBox, xData, today, yesterday, lastday) => {
    const options = {
      color: ['#3398DB'],
      title: {
        show: false,
        text: '实时信号控制状态',
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
          start: 0,
          end: xData.length > 7 ? 40 : 100,
          top: 0,
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
      legend: {
        show: true,
        left: 'right',
        top: 10,
        data: ['今日', '同比', '环比'],
        textStyle: { // ----图例内容样式
          color: '#FFFFFF', // ---所有图例的字体颜色
          // backgroundColor:'black',  //---所有图例的字体背景色
        },
      },
      grid: {
        // show: false, // ---是否显示直角坐标系网格
        top: '15%', // 等价于 y: '16%'
        left: '3%',
        bottom: '20', // ---相对位置，top\bottom\left\right
        right: '4%',
        containLabel: true, // ---grid 区域是否包含坐标轴的刻度标签
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData, // ['离点断线', '关灯控制', '全红控制', '黄闪控制', '本地多时段', '本地感应', '中心多时段', '勤务控制'],
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
      },
      yAxis: {
        type: 'value',
        splitLine: { // ---grid 区域中的分隔线
          show: true, // ---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
          lineStyle: {
            color: ['#2A4065'],
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#5dbaf7', // 更改坐标轴文字颜色
            fontSize: 13, // 更改坐标轴文字大小
          },
        },
        axisLine: {
          lineStyle: {
            color: '#1C385F', // 轴的颜色
          },
        },
      },
      series: [
        {
          name: '今日',
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: today, // [60, 80, 120, 160, 120, 100, 60, 40],
          itemStyle: {// 柱状图圆角
            color: '#3AFFDC',
          },
          areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#3AFFDC'
                }, {
                    offset: 1,
                    color: '#031334'
                }])
            }
          },
        },
        {
          name: '同比',
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: yesterday, // [60, 80, 120, 160, 120, 100, 60, 40],
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
          name: '环比',
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: lastday, // [60, 80, 120, 160, 120, 100, 60, 40],
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
      ],
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
