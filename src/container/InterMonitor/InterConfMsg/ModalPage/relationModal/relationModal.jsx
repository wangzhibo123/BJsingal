import React, { Component } from 'react'
import { Select, InputNumber, message } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class RelationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interDirList: null,
      interMoveList: null,
    }
    this.dirMoveList = '/control-application-front/basic/info/listCodeByCodeType' // 方向是6， 流向是16
    this.saveUrl = '/control-application-front/basic/info/connector/saveUnitConnector'
  }
  componentDidMount = () => {
    this.getInterDirMoveList(6)
    const { editDeviceInfo } = this.props.data
    this.editInfo = editDeviceInfo
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
  handleInputChange = (e) => {
    const pname = e.target.getAttribute('pname')
    const { value } = e.target
    this.editInfo.unitConnector[pname] = value
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
    } else {
      this.editInfo.unitConnector[options.pname] = val
    }
  }
  handleCancelModal = () => {
    this.props.closeEditModal()
  }
  render() {
    const { interDirList, editInfo } = this.state
    return (
      <div className="editPelMsg">
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
            <span className="itemTxt">路口方向：</span>
            <Select key={editInfo && editInfo.unitConnector.unitDirection} defaultValue={editInfo && editInfo.unitConnector.unitDirection} onChange={this.handleSelectChange}>
              {
                interDirList &&
                interDirList.map((item) => (
                  <Option key={item.id} value={item.cCode} pname="unitDirection">{item.codeName}</Option>
                ))
              }
            </Select>
          </div>
          <div className="eitems">
            <span className="itemTxt">流向方向：</span>
            <Select key={editInfo && editInfo.unitConnector.connectorUnitDirection} defaultValue={editInfo && editInfo.unitConnector.connectorUnitDirection} onChange={this.handleSelectChange}>
              {
                interDirList &&
                interDirList.map((item) => (
                  <Option key={item.id} value={item.cCode} pname="connectorUnitDirection">{item.codeName}</Option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">路口流向Id：</span>
            <input
              type="text"
              className="editInput pl10"
              pname="connectorUnitId"
              defaultValue={editInfo && editInfo.unitConnector.connectorUnitId}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="eitems">
            <span className="itemTxt">道路长度：</span>
            <input
              type="text"
              className="editInput pl10"
              pname="roadLength"
              defaultValue={editInfo && editInfo.unitConnector.roadLength}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">道路描述：</span>
            <input
              type="text"
              className="editInput pl10"
              pname="roadDetail"
              defaultValue={editInfo && editInfo.unitConnector.roadDetail}
              onChange={this.handleInputChange}
            />
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
        <div className="editFoot">
          <div className="footBtn" onClick={this.handleCancelModal}>取消</div>
          <div className="footBtn" onClick={this.handleSaveEditInfo}>确定</div>
        </div>
      </div>
    )
  }
}

export default RelationModal
