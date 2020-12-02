import React, { Component } from 'react'
import { Select } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import axiosInstance from '../../utils/getInterfaceData'
import './InterTimeList.scss'

const { Option } = Select
class InterTimeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTimeDetails: false,
      timeTableData: null,
      timePlanDetails: null,
    }
    this.globalImgurl = localStorage.getItem('ImgUrl')
    this.interId = this.props.match.params.id
    this.timeTableUrl = `/control-application-front/unitMontitor/getTimeTableById?unit_id=${this.interId}`
    this.planStageUrl = `/control-application-front/unitMontitor/getPlanStage`
  }
  componentDidMount = () => {
    this.getTimeTableDatas()
  }
  // 时间表信息
  getTimeTableDatas = () => {
    axiosInstance.post(this.timeTableUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ timeTableData: list })
      }
    })
  }
  // 时间表方案详情
  handleTimeDetails = (planno) => {
    axiosInstance.post(`${this.planStageUrl}?unit_id=${this.interId}&planno=''`).then((res) => {
      console.log(res)
      const { code, list } = res.data
      if (code === '1') {
        this.setState({
          timePlanDetails: list,
          showTimeDetails: true,
        })
      }
    })
    
  }
  handleCloseDetails = () => {
    this.setState({ showTimeDetails: false })
  }
  render() {
    const { showTimeDetails, timeTableData, timePlanDetails } = this.state
    return (
      <div className="timeList">
        <div className="timeTitle">时间表</div>
        <div className="listBox" onClick={this.handleTimeDetails}>
          <div className="listTh">
            <span className="innterBorder" />
            <div className="listTd">时间</div>
            <div className="listTd">方案说明</div>
            <div className="listTd">周期</div>
          </div>
          <div className="listTbody">
            {
              timeTableData &&
              timeTableData.map((item) => (
                <div className="listTr" key={item.planno + item.starttime}>
                  <span className="innterBorder" />
                  <div className="listTd">{item.starttime}</div>
                  <div className="listTd">{item.planname}</div>
                  <div className="listTd">{item.cyclelen}</div>
                </div>
              ))
            }
          </div>
        </div>
        {
          showTimeDetails &&
          <div className="timeDetails">
            <div className="detailsMsg">
            <div className="closeBox" onClick={this.handleCloseDetails}><CloseOutlined className="closeIcon" /></div>
              <div className="detailsHead">
                <span className="innterBorder" />
                <div className="detailsTh" style={{ flex: 0.6 }}>时段</div>
                <div className="detailsTh" style={{ flex: 0.5 }}>方案号</div>
                <div className="detailsTh" style={{ flex: 2 }}>阶段链</div>
                <div className="detailsTh" style={{ flex: 0.6 }}>周期(秒)</div>
                <div className="detailsTh">协调相位</div>
                <div className="detailsTh">绝对相位差(秒)</div>
              </div>
              <div className="detailsTbody">
                {
                  timePlanDetails &&
                  timePlanDetails.map((item, index) => {
                    const stageList = item.stage_image.split(',')
                    return (
                      <div className="detailsTr" key={item.planno + index}>
                        <span className="innterBorder" />
                        <div className="detailsTd" style={{ flex: 0.6 }}>{item.starttime}</div>
                        <div className="detailsTd" style={{ flex: 0.5 }}>{item.planno}</div>
                        <div className="detailsTd" style={{ flex: 2 }}>
                          {
                            stageList.length &&
                            stageList.map((stage) => {
                              return (
                                <img src={this.globalImgurl + stage} width="36px" height="36px" alt=""/>
                              )
                            })
                          }
                        </div>
                        <div className="detailsTd" style={{ flex: 0.6 }}>{item.cyclelen}</div>
                        <div className="detailsTd">{item.phasename}</div>
                        <div className="detailsTd">{item.offset}</div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default InterTimeList

