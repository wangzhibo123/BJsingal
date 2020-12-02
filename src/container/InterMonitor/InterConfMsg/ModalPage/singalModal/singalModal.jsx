import React, { Component } from 'react'
import { InputNumber, message } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

class SingalModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editInfo: null,
    }
    this.saveUrl = '/control-application-front/basic/info/signal/saveSignalConfigInfo'
  }
  componentDidMount = () => {
    const { editDeviceInfo } = this.props.data
    this.editInfo = editDeviceInfo
    this.setState({ editInfo: this.editInfo })
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
  }
  handleInputChange = (e) => {
    const pname = e.target.getAttribute('pname')
    const { value } = e.target
    this.editInfo.signalConfigInfo[pname] = value
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
            <span className="itemTxt longTxt">图元位置X：</span>
            <InputNumber
              className="editInput"
              key={editInfo && editInfo.uiUnitConfig.pLeft}
              defaultValue={editInfo && editInfo.uiUnitConfig.pLeft}
              onChange={(val) => { this.handleStyleChange(val, 'pLeft') }}
              onStep={(val, opt) => { this.handleNumStep(val, opt, 'pLeft') }}
            />
          </div>
          <div className="eitems">
            <span className="itemTxt longTxt">图元位置Y：</span>
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
            <span className="itemTxt longTxt">信号机编号：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.signalConfigInfo.signalCode} pname="signalCode" onChange={this.handleInputChange} />
          </div>
          <div className="eitems">
            <span className="itemTxt longTxt">信号机端口：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.signalConfigInfo.signalPort} pname="signalPort" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt longTxt">信号机厂商：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.signalConfigInfo.siganlSupplier} pname="siganlSupplier" onChange={this.handleInputChange} />
          </div>
          <div className="eitems">
            <span className="itemTxt longTxt">信号机型号：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.signalConfigInfo.signalModelValue} pname="signalModelValue" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt longTxt">网络类型：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.signalConfigInfo.sysServiceId} pname="sysServiceId" onChange={this.handleInputChange} />
          </div>
          <div className="eitems">
            <span className="itemTxt longTxt">服务编号：</span>
            <input type="text" className="editInput pl10" defaultValue={editInfo && editInfo.signalConfigInfo.sysServiceId} pname="sysServiceId" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt longTxt">信号机IP：</span>
            <input type="text" className="editInput longInput pl10" defaultValue={editInfo && editInfo.signalConfigInfo.signalIp} pname="signalIp" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt longTxt">信号机网关：</span>
            <input type="text" className="editInput longInput pl10" defaultValue={editInfo && editInfo.signalConfigInfo.signalGateway} pname="signalGateway" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt longTxt">信号机子网掩码：</span>
            <input type="text" className="editInput longInput pl10" defaultValue={editInfo && editInfo.signalConfigInfo.signalMask} pname="signalMask" onChange={this.handleInputChange} />
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

export default SingalModal
