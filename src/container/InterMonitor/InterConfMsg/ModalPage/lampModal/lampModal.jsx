import React, { Component } from 'react'
import { Select, InputNumber, message } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class LampModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editInfo: null,
      interDirList: null,
      lampTypeList: null,
      lampIconList: null,
    }
    this.globalImgurl = localStorage.getItem('ImgUrl')
    this.dirMoveList = '/control-application-front/basic/info/listCodeByCodeType' // 方向是6， 灯组类型21
    this.saveUrl = '/control-application-front/basic/info/lampGroup/saveLampGroup'
  }
  componentDidMount = () => {
    this.getInterDirMoveList(6)
    this.getInterDirMoveList(21)
    const { editDeviceInfo, primitiveInfo, devicePiclist } = this.props.data
    this.editInfo = editDeviceInfo
    if (!this.editInfo.cfgLampgroup.lampgroupno) {
      this.currentDeviceList = primitiveInfo.LampGroup
      const lengths = this.currentDeviceList.length
      const editNo = lengths === 0 ? 1 : this.currentDeviceList[lengths - 1].cfgLampgroup.lampgroupno + 1
      this.editInfo.cfgLampgroup.lampgroupno = editNo
    }
    this.setState({ editInfo: this.editInfo, lampIconList: devicePiclist['10'] })
  }
  getInterDirMoveList = (type) => {
    axiosInstance.get(`${this.dirMoveList}?codeType=${type}`).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data) {
        const stateName = type === 6 ? 'interDirList' : 'lampTypeList'
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
  handleStyleChange = (val, pname) => {
    this.editInfo.uiUnitConfig[pname] = val
  }
  handleNumStep = (val, opt, pname) => {
    this.editInfo.uiUnitConfig[pname] = val
    console.log(this.editInfo)
  }
  handleSelectChange = (val, options) => {
    if (options.pname === 'uiId') {
      this.editInfo.uiUnitConfig.uiId = val
      this.editInfo.uiUnitConfig.uiImageName = options.imgurl
    } else {
      this.editInfo.cfgLampgroup[options.pname] = val
    }
  }
  handleLaneNoChange = (e) => {
    const { value } = e.target
    this.editInfo.cfgLampgroup.lampgroupno = value
  }
  handleCancelModal = () => {
    this.props.closeEditModal()
  }
  render() {
    const { editInfo, interDirList, lampTypeList, lampIconList } = this.state
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
            <span className="itemTxt pl10">灯组序号：</span>
            <input type="text" className="editInput" defaultValue={editInfo && editInfo.cfgLampgroup.lampgroupno} onChange={this.handleLaneNoChange} />
          </div>
          <div className="eitems">
            <span className="itemTxt">方向：</span>
            <Select key={editInfo && editInfo.cfgLampgroup.direction} defaultValue={editInfo && editInfo.cfgLampgroup.direction} onChange={this.handleSelectChange}>
              {
                interDirList &&
                interDirList.map((item) => (
                  <Option key={item.id} value={item.cCode} pname="direction">{item.codeName}</Option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">灯组类型：</span>
            <Select key={editInfo && editInfo.cfgLampgroup.type} defaultValue={editInfo && editInfo.cfgLampgroup.type} onChange={this.handleSelectChange}>
              {
                lampTypeList &&
                lampTypeList.map((item) => (
                  <Option key={item.id} value={item.cCode} pname="type">{item.codeName}</Option>
                ))
              }
            </Select>
          </div>
          <div className="eitems">
            <span className="itemTxt">信号灯：</span>
            <Select key={editInfo && editInfo.uiUnitConfig.uiId} defaultValue={editInfo && editInfo.uiUnitConfig.uiId} onChange={this.handleSelectChange}>
              {
                lampIconList &&
                lampIconList.map((item) => (
                  <Option key={item.id} value={item.id} pname="uiId" imgurl={item.uiImageName}><img src={this.globalImgurl + item.uiImageName} alt="" style={{ maxHeight: '100%' }} /></Option>
                ))
              }
            </Select>
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

export default LampModal
