import React, { Component } from 'react'
import { Select, InputNumber, message } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class DetectorModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editInfo: null,
      detectorList: null,
    }
    this.globalImgurl = localStorage.getItem('ImgUrl')
    this.saveUrl = '/control-application-front/basic/info/detector/saveDetector'
  }
  componentDidMount = () => {
    const { editDeviceInfo, primitiveInfo, devicePiclist } = this.props.data
    this.editInfo = editDeviceInfo
    if (!this.editInfo.cfgDetectorInfo.detid) {
      if (!this.editInfo.cfgDetectorInfo.detid) {
        this.currentDeviceList = primitiveInfo.Detector
        const lengths = this.currentDeviceList.length
        const editNo = lengths === 0 ? 1 : this.currentDeviceList[lengths - 1].cfgDetectorInfo.detid + 1
        this.editInfo.cfgDetectorInfo.detid = editNo
      }
    }
    this.setState({ editInfo: this.editInfo, detectorList: devicePiclist['3'] })
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
  handleStyleChange = (val, pname) => {
    this.editInfo.uiUnitConfig[pname] = val
  }
  handleNumStep = (val, opt, pname) => {
    this.editInfo.uiUnitConfig[pname] = val
    console.log(this.editInfo)
  }
  handleSelectChange = (val, options) => {
    this.editInfo.uiUnitConfig.id = options.key
    this.editInfo.uiUnitConfig.uiImageName = options.imgurl
  }
  handleEditinfoChange = (e) => {
    const pname = e.target.getAttribute('pname')
    this.editInfo.cfgDetectorInfo[pname] = e.target.value
  }
  handleCancelModal = () => {
    this.props.closeEditModal()
  }
  render() {
    const { editInfo, detectorList } = this.state
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
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.cfgDetectorInfo.detid} />
          </div>
          <div className="eitems">
            <span className="itemTxt">类型：</span>
            <Select key={editInfo && editInfo.uiUnitConfig.uiId} defaultValue={editInfo && editInfo.uiUnitConfig.uiId} onChange={this.handleSelectChange}>
              {
                detectorList &&
                detectorList.map((item) => (
                  <Option key={item.id} value={item.id} imgulr={item.uiImageName}><img height="30px" src={this.globalImgurl + item.uiImageName} alt=""/></Option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">统计周期：</span>
            <input type="text" className="editInput pl10" pname="detcycle" defaultValue={editInfo && editInfo.cfgDetectorInfo.detcycle} onChange={this.handleEditinfoChange} />
          </div>
          <div className="eitems">
            <span className="itemTxt">所属车道：</span>
            <input type="text" className="editInput pl10" pname="lanenolist" defaultValue={editInfo && editInfo.cfgDetectorInfo.lanenolist} onChange={this.handleEditinfoChange} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">距停车线距离：</span>
            <input type="text" className="editInput pl10" pname="distance" defaultValue={editInfo && editInfo.cfgDetectorInfo.distance} onChange={this.handleEditinfoChange} />
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
