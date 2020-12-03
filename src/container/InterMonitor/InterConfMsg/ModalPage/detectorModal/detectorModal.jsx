import React, { Component } from 'react'
import { Select, InputNumber, message } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class DetectorModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editInfo: null,
    }
    this.saveUrl = '/control-application-front/basic/info/detector/saveDetector'
  }
  componentDidMount = () => {
    const { editDeviceInfo, primitiveInfo } = this.props.data
    this.editInfo = editDeviceInfo
    if (!this.editInfo.cfgDetectorInfo.detid) {
      this.currentDeviceList = primitiveInfo.Detector
      const lengths = this.currentDeviceList.length
      const editNo = lengths === 0 ? 1 : this.currentDeviceList[lengths - 1].cfgDetectorInfo.detid + 1
      this.editInfo.cfgDetectorInfo.detid = editNo
    }
    this.setState({ editInfo: this.editInfo })
  }
  handleSaveEditInfo = () => {
    axiosInstance.post(this.saveUrl, [this.editInfo]).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.props.getPrimitiveInfo(this.props.interId)
        this.handleCancelModal()
      }
      message.info(res.data.message)
    })
  }
  handleCancelModal = () => {
    this.props.closeEditModal()
  }
  render() {
    const { editInfo } = this.state
    return (
      <div className="editPelMsg">
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">图元位置X：</span>
            <InputNumber
              className="editInput"
              key={editInfo && editInfo.uiUnitConfig.pLeft}
              defaultValue={editInfo && editInfo.uiUnitConfig.pLeft}
              onChange={(val) => { this.handleStyleChange(val, 'pLeft') }}
              onStep={(val, opt) => { this.handleNumStep(val, opt, 'pLeft') }}
            />
          </div>
          <div className="eitems">
            <span className="itemTxt">图元位置Y：</span>
            <InputNumber
              className="editInput"
              key={editInfo && editInfo.uiUnitConfig.pTop}
              defaultValue={editInfo && editInfo.uiUnitConfig.pTop}
              onChange={(val) => { this.handleStyleChange(val, 'pTop') }}
              onStep={(val, opt) => { this.handleNumStep(val, opt, 'pTop') }}
            />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">检测器编号：</span>
            {/* <Select defaultValue="1">
              <Option key="1" value="1">1</Option>
            </Select> */}
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.cfgDetectorInfo.detid} />
          </div>
          <div className="eitems">
            <span className="itemTxt">类型：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.cfgDetectorInfo.dettype} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">统计周期：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.cfgDetectorInfo.detcycle} />
          </div>
          <div className="eitems">
            <span className="itemTxt">所属车道：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.cfgDetectorInfo.lanenolist} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">距停车线距离：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.cfgDetectorInfo.distance} />
          </div>
        </div>
        <div className="editFoot">
          <div className="footBtn" onClick={this.handleCancelModal}>取消</div>
          <div className="footBtn" onClick={this.handleSaveEditInfo}>确定</div>
        </div>
      </div>
    )
  }
}

export default DetectorModal
