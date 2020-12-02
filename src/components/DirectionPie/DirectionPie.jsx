import React from 'react'
import echarts from 'echarts'

class DirectionPie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    const chartsBox = echarts.init(this.chartsBox)
    const { seriseData, totleDevice } = this.props.chartsDatas
    this.renderCharts(chartsBox, seriseData, totleDevice)
  }
  renderCharts = (chartsBox, serise, totle) => {
    const color = ['#8477E9', '#229BFD', '#36C2E9', '#A1E6B9', '#FEDB5B', '#FF9F7F', '#FC7293','#E8BDF3']
    const options = {
      color: color,
      backgroundColor: '#0A173B',
      title: {
          text: '南丁格尔',
          left: 'center',
          top: '50%',
          show: false,
          textStyle: {
              fontSize: 22,
              color: '#fff',
              fontWeight: 'normal'
          }
      },
      tooltip: {
          trigger: 'item'
      },
      legend: {
          show: false,
          orient: 'vertical',
          right: 20,
          top: 20
      },
      series: [{
          type: 'pie',
          roseType: 'radius',
          radius: ['15%', '45%'],
          top:-45,
          data: [{
                  value: 20,
                  name: '西向东直行'
              }, {
                  value: 10,
                  name: '东向西直行'
              },
              {
                  value: 19,
                  name: '北向南直行'
              }, {
                  value: 12,
                  name: '南向北直行'
              },
              {
                  value: 18,
                  name: '东西向东直行'
              }, {
                  value: 13,
                  name: '东西向西直行'
              },
              {
                  value: 11,
                  name: '北南向北直行'
              }, {
                  value: 18,
                  name: '北南向南直行'
              }
          ],
          label: {
              normal: {
                  formatter: '{font|{b}}\n{hr|}\n百分比：{font|{d}%}',
                  rich: {
                      font: {
                          fontSize: 12,
                          padding: [5, 0],
                          color: '#fff'
                      },
                      hr: {
                          height: 0,
                          borderWidth: 1,
                          width: '100%',
                          borderColor: '#fff'
                      }
                  }
              },
          },
          labelLine: {
              lineStyle: {
                  color: '#fff',                  
              },
              length:10,
              length2:8
          },
          emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0,0,0,0.5)'
              }
          }
      }]
  }
    chartsBox.setOption(options, true)
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} ref={(input) => { this.chartsBox = input }} />
    )
  }
}

export default DirectionPie
