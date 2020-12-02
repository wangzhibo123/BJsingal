import React, { Component } from 'react'
import './SingalMsg.scss'

class SingalMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      singalInfo: null,
    }
  }
  componentDidMount = () => {
    const { primitiveInfo } = this.props.data
    this.getSingalInfo(primitiveInfo)
  }
  componentDidUpdate = (prevState) => {
    const { primitiveInfo } = this.props.data
    if (prevState.data.primitiveInfo !== primitiveInfo) {
      this.getSingalInfo(primitiveInfo)
    }
  }
  getSingalInfo = (primitiveInfo) => {
    this.singalInfos = primitiveInfo.SignalConfigInfo
    this.setState({ singalInfo: primitiveInfo.SignalConfigInfo.length ? primitiveInfo.SignalConfigInfo[0].signalConfigInfo : null })
  }
  handleEditSingal = () => {
    if (this.singalInfos.length) {
      this.props.getEditDeviceInfo(this.singalInfos[0])
      this.props.showEditModal()
    }
  }
  render() {
    const { singalInfo } = this.state
    return (
      <div className="sinalMsgWrapper">
        <ul className="singalMsgList">
          <li className="singalItems">
            <div className="itemsNmae">信号机编号：</div>
            <div className="itemsVal">
              <input className="inputVal" disabled defaultValue={singalInfo && singalInfo.signalCode} type="text"/>
            </div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机IP：</div>
            <div className="itemsVal">
              <input className="inputVal" disabled defaultValue={singalInfo && singalInfo.signalIp} type="text"/>
            </div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机网关：</div>
            <div className="itemsVal">
              <input className="inputVal" disabled defaultValue={singalInfo && singalInfo.signalGateway} type="text"/>
            </div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机子网掩码：</div>
            <div className="itemsVal">
              <input className="inputVal" disabled defaultValue={singalInfo && singalInfo.signalMask} type="text"/>
            </div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机端口：</div>
            <div className="itemsVal">
              <input className="inputVal" disabled defaultValue={singalInfo && singalInfo.signalPort} type="text"/>
            </div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机厂商：</div>
            <div className="itemsVal">
              <input className="inputVal" disabled defaultValue={singalInfo && singalInfo.siganlSupplier} type="text"/>
            </div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机型号：</div>
            <div className="itemsVal">
              <input className="inputVal" disabled defaultValue={singalInfo && singalInfo.signalModelValue} type="text"/>
            </div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机网络类型：</div>
            <div className="itemsVal">
              <input className="inputVal" disabled defaultValue={singalInfo && singalInfo.sysServiceId} type="text"/>
            </div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号接入服务编号：</div>
            <div className="itemsVal">
              <input className="inputVal" disabled defaultValue={singalInfo && singalInfo.signalCode} type="text"/>
            </div>
          </li>
        </ul>
        <div className="actionBtnBox">
          <div className="saveBtn" onClick={this.handleEditSingal}>编辑</div>
        </div>
      </div>
    )
  }
}

export default SingalMsg
