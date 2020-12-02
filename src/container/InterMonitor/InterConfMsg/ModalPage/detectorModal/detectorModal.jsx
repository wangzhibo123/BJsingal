import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select
class DetectorModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {

  }
  render() {
    return (
      <div className="editPelMsg">
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">路口方向：</span>
            <Select defaultValue="1">
              <Option key="1" value="1">1</Option>
            </Select>
          </div>
          <div className="eitems">
            <span className="itemTxt">角度：</span>
            <input style={{ paddingLeft: '10px' }} type="text" className="editInput" />
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
