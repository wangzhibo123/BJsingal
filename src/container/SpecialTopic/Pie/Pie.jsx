import React from 'react'
import echarts from 'echarts'

class Pie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.xDatas = ['00:00', '04:00', '08:00', '12:00', '14:00']
    this.series = [1, 2, 3, 4, 5]
  }
  componentDidMount = () => {
    
    const chartsBox = echarts.init(this.chartsBox)
    const { chartsDatas } = this.props
    this.renderCharts(chartsBox)
    this.animationFun(chartsBox)
    setTimeout(() => { this.animationFun(chartsBox) }, 2000);
    
  }
  animationFun = (myChart) => {
    let index = 0;
    var timer = setInterval(function() {
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: index
    });
    // 取消高亮指定的数据图形
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: index == 0 ? 2 : index - 1
    });
     myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index
    });
    index++;
    if (index > 2) {
        index = 0;
    }
},3000)
}
  renderCharts = (chartsBox, xData, seriesData) => {
    const colorList = ['#6DCFF6', '#0E6EE9', '#00AF6C']
    const options = {
      title: {
        text: '控制总数',
        x: '52%',
        y: '50%',
        textStyle: {
          fontSize: 20,
          color: '#ffffff',
        }
      },
      tooltip: {
        trigger: 'item',
        
      },
      legend: {
        orient: 'vertical',
        left: '0',
        align: 'left',
        top: '36%',
        textStyle: {
          color: '#ffffff',
        },
        itemWidth: 5,
        itemHeight: 30,
        height: 150,
      },
      series: [{
        type: 'pie',
        center: ['66%', '55%'],
        position:'outside',
        radius: ['50%', '66%'],
        width:'100%',
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 15,
        itemStyle: {
          normal: {
            color: function (params) {
              return colorList[params.dataIndex]
            }
          },
        },
        label: {
          normal: {
            show: false,
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          'name': '优先控制',
          'value': 5
        }, {
          'name': '系统控制',
          'value': 8
        }, {
          'name': '申请设备通讯故障',
          'value': 16
        }
        ],
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

export default Pie
