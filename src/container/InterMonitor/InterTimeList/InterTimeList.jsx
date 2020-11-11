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
    }
    this.timeTableUrl = '/engine-unified/unit/getTimeTableById?unit_id=1'
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
  handleTimeDetails = () => {
    this.setState({ showTimeDetails: true })
  }
  handleCloseDetails = () => {
    this.setState({ showTimeDetails: false })
  }
  render() {
    const { showTimeDetails, timeTableData } = this.state
    return (
      <div className="timeList">
        <div className="titles">时间表</div>
        <div className="listBox">
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
                <div className="listTr" key={item.planno} onClick={this.handleTimeDetails}>
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
            <div className="closeBox" onClick={this.handleCloseDetails}><CloseOutlined /></div>
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
                <div className="detailsTr">
                  <span className="innterBorder" />
                  <div className="detailsTd" style={{ flex: 0.6 }}>00:00</div>
                  <div className="detailsTd" style={{ flex: 0.5 }}>1</div>
                  <div className="detailsTd" style={{ flex: 2 }}>123</div>
                  <div className="detailsTd" style={{ flex: 0.6 }}>125</div>
                  <div className="detailsTd">
                    <Select defaultValue="1">
                      <Option key="1" value="1">东西直行</Option>
                    </Select>
                  </div>
                  <div className="detailsTd"><input className="phaseInput" type="text" defaultValue="12" /></div>
                </div>
                <div className="detailsTr">
                  <span className="innterBorder" />
                  <div className="detailsTd" style={{ flex: 0.6 }}>00:00</div>
                  <div className="detailsTd" style={{ flex: 0.5 }}>1</div>
                  <div className="detailsTd" style={{ flex: 2 }}>123</div>
                  <div className="detailsTd" style={{ flex: 0.6 }}>125</div>
                  <div className="detailsTd">
                    <Select defaultValue="1">
                      <Option key="1" value="1">东西直行</Option>
                    </Select>
                  </div>
                  <div className="detailsTd"><input className="phaseInput" type="text" defaultValue="12" /></div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default InterTimeList

