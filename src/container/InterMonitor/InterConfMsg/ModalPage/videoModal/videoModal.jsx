import React, { Component } from 'react'
import { Select, message, InputNumber } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class VideoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interDirList: null,
      interMoveList: null,
      editInfo: null,
    }
    this.saveUrl = '/control-application-front/basic/info/device/saveDevice'
    this.dirMoveList = '/control-application-front/basic/info/listCodeByCodeType' // 方向是6， 流向是16
    this.saveUrl = '/control-application-front/basic/info/device/saveDevice'
  }
  componentDidMount = () => {
    this.getInterDirMoveList(6)
    this.getInterDirMoveList(16)
    const { editDeviceInfo, primitiveInfo } = this.props.data
    this.editInfo = editDeviceInfo
    if (!this.editInfo.deviceInfo.deviceCode) {
      this.currentDeviceList = primitiveInfo.Device
      const lengths = this.currentDeviceList.length
      const editNo = lengths === 0 ? 1 : this.currentDeviceList[lengths - 1].deviceInfo.deviceCode + 1
      this.editInfo.deviceInfo.deviceCode = editNo
    }
    this.setState({ editInfo: this.editInfo })
  }
  getInterDirMoveList = (type) => {
    axiosInstance.get(`${this.dirMoveList}?codeType=${type}`).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data) {
        const stateName = type === 6 ? 'interDirList' : 'interMoveList'
        this.setState({ [stateName]: data })
      }
    })
  }
  handleSaveEditInfo = () => {
    axiosInstance.post(this.saveUrl, [this.editInfo]).then((res) => {
      console.log(res)
      const { code } = res.data
      if (code === 200) {
        this.props.getPrimitiveInfo(this.props.interId)
        this.handleCancelModal()
      }
      message.info(res.data.message)
    })
  }
  handleSelectChange = (val, options) => {
    this.editInfo.videoDeviceConfig[options.pname] = val
  }
  handleChangeDeviceId = (e) => {
    this.editInfo.videoDeviceConfig.deviceId = e.target.value
  }
  handleCancelModal = () => {
    this.props.closeEditModal()
  }
  render() {
    const { interDirList, interMoveList, editInfo } = this.state
    return (
      <div className="editPelMsg">
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">相机编号：</span>
            <input type="text pl10" className="editInput" defaultValue={editInfo && editInfo.deviceInfo.deviceCode} onChange={this.handleChangeDeviceId} />
          </div>
          <div className="eitems">
            <span className="itemTxt">安装方向：</span>
            <Select
              key={editInfo && editInfo.videoDeviceConfig.installationDirection}
              defaultValue={editInfo && editInfo.videoDeviceConfig.installationDirection}
              onChange={this.handleSelectChange}
            >
              {
                interDirList &&
                interDirList.map((item) => (
                  <Option key={item.cCode} value={item.cCode} pname="installationDirection">{item.codeName}</Option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">检测方向：</span>
            <Select
              key={editInfo && editInfo.videoDeviceConfig.installationDirection}
              defaultValue={editInfo && editInfo.videoDeviceConfig.monitorDirection}
              onChange={this.handleSelectChange}
            >
              {
                interMoveList &&
                interMoveList.map((item) => (
                  <Option key={item.cCode} value={item.cCode} pname="monitorDirection">{item.codeName}</Option>
                ))
              }
            </Select>
          </div>
          <div className="eitems">
            <span className="itemTxt">角度：</span>
            <InputNumber
              className="editInput"
              key={editInfo && editInfo.uiUnitConfig.rotationAngle}
              defaultValue={editInfo && Number(editInfo.uiUnitConfig.rotationAngle)}
              onChange={(val) => { this.handleStyleChange(val, 'rotationAngle') }}
              onStep={(val, opt) => { this.handleNumStep(val, opt, 'rotationAngle') }}
            />
          </div>
        </div>
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
        <div className="editFoot">
          <div className="footBtn" onClick={this.handleCancelModal}>取消</div>
          <div className="footBtn" onClick={this.handleSaveEditInfo}>确定</div>
        </div>
      </div>
    )
  }
}

export default VideoModal
