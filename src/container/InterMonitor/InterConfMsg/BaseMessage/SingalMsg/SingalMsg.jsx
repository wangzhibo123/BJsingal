import React, { Component } from 'react'
import './SingalMsg.scss'

class SingalMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    return (
      <div className="sinalMsgWrapper">
        <ul className="singalMsgList">
          <li className="singalItems">
            <div className="itemsNmae">信号机编号：</div>
            <div className="itemsVal"><input className="inputVal" defaultValue="1000001" type="text"/></div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机IP：</div>
            <div className="itemsVal"><input className="inputVal" defaultValue="192.168.10.1" type="text"/></div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机网关：</div>
            <div className="itemsVal"><input className="inputVal" defaultValue="192.168.1.130" type="text"/></div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机子网掩码：</div>
            <div className="itemsVal"><input className="inputVal" defaultValue="255.255.255.0" type="text"/></div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机端口：</div>
            <div className="itemsVal"><input className="inputVal" defaultValue="161" type="text"/></div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机厂商：</div>
            <div className="itemsVal"><input className="inputVal" defaultValue="西门子" type="text"/></div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机型号：</div>
            <div className="itemsVal"><input className="inputVal" defaultValue="x110" type="text"/></div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号机网络类型：</div>
            <div className="itemsVal"><input className="inputVal" defaultValue="ipv4" type="text"/></div>
          </li>
          <li className="singalItems">
            <div className="itemsNmae">信号接入服务编号：</div>
            <div className="itemsVal"><input className="inputVal" defaultValue="113308" type="text"/></div>
          </li>
        </ul>
        <div className="actionBtnBox">
          <div className="saveBtn">编辑</div>
        </div>
      </div>
    )
  }
}

export default SingalMsg
