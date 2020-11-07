import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select
class Detector extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    return (
      <>
        <div className="confTable">
          <div className="confThead">
            <div className="confTh">检测器编号</div>
            <div className="confTh">距停车线距离</div>
            <div className="confTh" style={{ flex: 1.2 }}>检测器统计周期</div>
            <div className="confTh">检测器类型</div>
            <div className="confTh">所属车道</div>
          </div>
          <div className="confTbody">
            <div className="confTr">
              <div className="confTd">130308</div>
              <div className="confTd">30米</div>
              <div className="confTd">5分钟</div>
              <div className="confTd">地磁</div>
              <div className="confTd">1</div>
            </div>
            <div className="confTr">
              <div className="confTd">130308</div>
              <div className="confTd">30米</div>
              <div className="confTd">5分钟</div>
              <div className="confTd">地磁</div>
              <div className="confTd">1</div>
            </div>
            <div className="confTr">
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
            </div>
          </div>
        </div>
        <div className="actionBtnBox">
          <div className="saveBtn">取消</div>
          <div className="saveBtn">保存</div>
        </div>
      </>
    )
  }
}

export default Detector

