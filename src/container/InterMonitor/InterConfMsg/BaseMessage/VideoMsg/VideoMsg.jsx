import React, { Component } from 'react'
import { Select, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class VideoMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DeviceList: null,
    }
    this.interId = this.props.match.params.id
    this.removeUrl = '/control-application-front/basic/info/device/removeDevice'
  }
  componentDidMount = () => {
    const { primitiveInfo } = this.props.data
    this.getVideoDeviceList(primitiveInfo)
  }
  componentDidUpdate = (prevState) => {
    const { primitiveInfo } = this.props.data
    if (prevState.data.primitiveInfo !== primitiveInfo) {
      this.getVideoDeviceList(primitiveInfo)
    }
  }
  getVideoDeviceList = (primitiveInfo) => {
    this.deviceInfos = primitiveInfo.Device
    this.setState({ DeviceList: this.deviceInfos })
  }
  getRemoveDevice = (id, configId) => {
    axiosInstance.post(`${this.removeUrl}?id=${id}&configId=${configId}`).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.props.getPrimitiveInfo(this.interId)
      }
      message.info(res.data.message)
    })
  }
  handleDelete = (id, configId) => {
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除吗？',
      className: 'confirmBox',
      onOk() {
        selfThis.getRemoveDevice(id, configId)
      },
    })
  }
  handleEditInfo = (e) => {
    const indexs = e.currentTarget.getAttribute('indexs')
    const currentInfo = this.deviceInfos[indexs]
    this.props.showEditModal()
    this.props.getEditDeviceInfo(currentInfo)
  }
  render() {
    const { DeviceList } = this.state
    return (
      <>
        <div className="confTable">
          <div className="confThead">
            <div className="confTh">相机编号</div>
            <div className="confTh">安装方向</div>
            <div className="confTh">检测方向</div>
            <div className="confTh">操作</div>
          </div>
          <div className="confTbody">
            {
              DeviceList &&
              DeviceList.map((item, index) => {
                const { deviceCode, deviceStateValue, installLocationValue } = item.deviceInfo
                return (
                  <div className="confTr">
                    <div className="confTd">{deviceCode}</div>
                    <div className="confTd">{deviceStateValue}</div>
                    <div className="confTd">{installLocationValue}</div>
                    <div className="confTd">
                      <EditOutlined className="activeIcon" indexs={index} onClick={this.handleEditInfo} />
                      <DeleteOutlined className="activeIcon" onClick={() => { this.handleDelete(item.id, item.uiUnitConfig.uiId) }} />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </>
    )
  }
}

export default VideoMsg

