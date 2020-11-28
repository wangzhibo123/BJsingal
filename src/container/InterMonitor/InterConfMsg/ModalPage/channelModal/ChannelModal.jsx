import React, { Component } from 'react'
import { Select, InputNumber } from 'antd'

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
  }
  componentDidMount = () => {
    console.log(this.props)
    const { editDeviceInfo, devicePiclist, primitiveInfo } = this.props.data
    this.editInfo = editDeviceInfo
    this.currentDeviceList = primitiveInfo.CfgLaneInfo
    const lengths = this.currentDeviceList.length
    const editNo = lengths === 0 ? 1 : this.currentDeviceList[lengths - 1].cfgLaneInfo.laneno + 1
    this.editInfo.cfgLaneInfo.laneno = editNo
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
  handleCancelModal = () => {
    this.props.closeEditModal()
  }
  render() {
    const { interDirList, interMoveList, channelIcon, editInfo } = this.state
    console.log(editInfo)
    return (
      <div className="editPelMsg">
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">车道序号：</span>
            <input type="text" className="editInput" defaultValue={editInfo && editInfo.cfgLaneInfo.laneno} /></div>
          <div className="eitems">
            <span className="itemTxt">角度：</span>
            <InputNumber className="editInput" defaultValue={editInfo && Number(editInfo.uiUnitConfig.rotationAngle)} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">水平位置：</span>
            <InputNumber className="editInput" defaultValue={editInfo && editInfo.uiUnitConfig.pLeft} />
          </div>
          <div className="eitems">
            <span className="itemTxt">垂直位置：</span>
            <InputNumber className="editInput" defaultValue={editInfo && editInfo.uiUnitConfig.pTop} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">车道方向：</span>
            <Select defaultValue="1">
              {
                interDirList &&
                interDirList.map((item) => (
                  <Option key={item.id} value={item.id}>{item.codeName}</Option>
                ))
              }
            </Select>
          </div>
          <div className="eitems">
            <span className="itemTxt">车道标识：</span>
            <Select defaultValue="1" className="itemSelect">
              {
                channelIcon &&
                channelIcon.map((item) => (
                  <Option key={item.id} value={item.id}><img src={this.globalImgurl + item.uiImageName} alt="" style={{ maxHeight: '28px' }} /></Option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">车道流向：</span>
            <Select>
              {
                interMoveList &&
                interMoveList.map((item) => (
                  <Option key={item.id} value={item.id}>{item.codeName}</Option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className="editFoot">
          <div className="footBtn" onClick={this.handleCancelModal}>取消</div>
          <div className="footBtn" onClick={this.handleConfirmModal}>确定</div>
        </div>
      </div>
    )
  }
}

export default ChannelModal
