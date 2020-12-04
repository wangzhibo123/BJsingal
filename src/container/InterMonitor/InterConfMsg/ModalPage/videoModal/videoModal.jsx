import React, { Component } from 'react'
import { Select, message } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class VideoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.saveUrl = '/control-application-front/basic/info/device/saveDevice'
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
  handleCancelModal = () => {
    this.props.closeEditModal()
  }
  render() {
    return (
      <div className="editPelMsg">
        <div className="editItem">
          <div className="eitems">
            <span className="itemTxt">相机编号：</span>
            <input style={{ paddingLeft: '10px' }} type="text" className="editInput" />
          </div>
          <div className="eitems">
            <span className="itemTxt">安装方向：</span>
            <Select defaultValue="1">
              <Option key="1" value="1">1</Option>
            </Select>
          </div>
          <div className="eitems">
            <span className="itemTxt">检测方向：</span>
            <Select defaultValue="1">
              <Option key="1" value="1">1</Option>
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

export default VideoModal
