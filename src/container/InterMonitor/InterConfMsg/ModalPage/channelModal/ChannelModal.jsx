import React, { Component } from 'react'
import { Select, InputNumber, message } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class ChannelModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editInfo: null,
      interDirList: null,
      interMoveList: null,
      channelIcon: null,
    }
    this.globalImgurl = localStorage.getItem('ImgUrl')
    this.dirMoveList = '/control-application-front/basic/info/listCodeByCodeType' // 方向是6， 流向是16
    this.saveUrl = '/control-application-front/basic/info/lane/saveCfgLaneInfo'
  }
  componentDidMount = () => {
    const { editDeviceInfo, devicePiclist, primitiveInfo } = this.props.data
    this.editInfo = editDeviceInfo
    if (!this.editInfo.cfgLaneInfo.laneno) {
      this.currentDeviceList = primitiveInfo.CfgLaneInfo
      const lengths = this.currentDeviceList.length
      const editNo = lengths === 0 ? 1 : this.currentDeviceList[lengths - 1].cfgLaneInfo.laneno + 1
      this.editInfo.cfgLaneInfo.laneno = editNo
    }
    this.setState({ editInfo: this.editInfo, channelIcon: devicePiclist['6'] })
    this.getInterDirMoveList(6)
    this.getInterDirMoveList(16)
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
      const { code } = res.data
      if (code === 200) {
        this.props.getPrimitiveInfo(this.props.interId)
        this.handleCancelModal()
      }
      message.info(res.data.message)
    })
  }
  handleLaneNoChange = (e) => {
    const { value } = e.target
    this.editInfo.cfgLaneInfo.laneno = value
  }
  handleStyleChange = (val, pname) => {
    this.editInfo.uiUnitConfig[pname] = val
  }
  handleNumStep = (val, opt, pname) => {
    this.editInfo.uiUnitConfig[pname] = val
  }
  handleSelectChange = (val, options) => {
    console.log(options)
    if (options.pname === 'uiId') {
      this.editInfo.uiUnitConfig.uiId = val
      this.editInfo.uiUnitConfig.uiImageName = options.uiimg
      console.log(this.editInfo)
    } else {
      this.editInfo.cfgLaneInfo[options.pname] = val
    }
  }
  handleCancelModal = () => {
    this.props.closeEditModal()
  }
  render() {
    const { interDirList, interMoveList, channelIcon, editInfo } = this.state
    return (
      <div className="editPelMsg">
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">车道序号：</span>
            <input style={{ paddingLeft: '10px' }} type="text" className="editInput" defaultValue={editInfo && editInfo.cfgLaneInfo.laneno} onChange={this.handleLaneNoChange} />
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
            <span className="itemTxt">X：</span>
            <InputNumber
              className="editInput"
              key={editInfo && editInfo.uiUnitConfig.pLeft}
              defaultValue={editInfo && editInfo.uiUnitConfig.pLeft}
              onChange={(val) => { this.handleStyleChange(val, 'pLeft') }}
              onStep={(val, opt) => { this.handleNumStep(val, opt, 'pLeft') }}
            />
          </div>
          <div className="eitems">
            <span className="itemTxt">Y：</span>
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
            <span className="itemTxt">车道方向：</span>
            <Select key={editInfo && editInfo.cfgLaneInfo.direction} defaultValue={editInfo && editInfo.cfgLaneInfo.direction} onChange={this.handleSelectChange}>
              {
                interDirList &&
                interDirList.map((item) => (
                  <Option key={item.id} value={item.cCode} pname="direction">{item.codeName}</Option>
                ))
              }
            </Select>
          </div>
          <div className="eitems">
            <span className="itemTxt">车道标识：</span>
            <Select key={editInfo && editInfo.uiUnitConfig.uiId} defaultValue={editInfo && editInfo.uiUnitConfig.uiId} className="itemSelect" onChange={this.handleSelectChange}>
              {
                channelIcon &&
                channelIcon.map((item) => (
                  <Option key={item.id} value={item.id} pname="uiId" uiimg={item.uiImageName}><img src={this.globalImgurl + item.uiImageName} alt="" style={{ maxHeight: '28px' }} /></Option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">车道流向：</span>
            <Select key={editInfo && editInfo.cfgLaneInfo.movement} defaultValue={editInfo && editInfo.cfgLaneInfo.movement} onChange={this.handleSelectChange}>
              {
                interMoveList &&
                interMoveList.map((item) => (
                  <Option key={item.id} value={item.cCode} pname="movement">{item.codeName}</Option>
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

export default ChannelModal
