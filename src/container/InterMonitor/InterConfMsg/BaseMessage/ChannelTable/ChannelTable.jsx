import React, { Component } from 'react'
import { Select, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './ChannelTable.scss'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class ChannelTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelList: null,
    }
    this.interId = this.props.match.params.id
    this.removeUrl = '/control-application-front/basic/info/lane/removeCfgLaneInfo'
  }
  componentDidMount = () => {
    const { primitiveInfo } = this.props.data
    this.getUnitConnector(primitiveInfo)
  }
  componentDidUpdate = (prevState) => {
    const { primitiveInfo } = this.props.data
    if (prevState.data.primitiveInfo !== primitiveInfo) {
      this.getUnitConnector(primitiveInfo)
    }
  }
  getRemoveChannel = (id, configId) => {
    axiosInstance.post(`${this.removeUrl}?id=${id}&configId=${configId}`).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.props.getPrimitiveInfo(this.interId)
      }
      message.info(res.data.message)
    })
  }
  getUnitConnector = (primitiveInfo) => {
    this.channelInfos = primitiveInfo.CfgLaneInfo
    this.setState({ channelList: this.channelInfos })
  }
  handleDelete = (id, configId) => {
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除吗？',
      className: 'confirmBox',
      onOk() {
        selfThis.getRemoveChannel(id, configId)
      },
    })
  }
  handleEditInfo = (e) => {
    const indexs = e.currentTarget.getAttribute('indexs')
    const currentInfo = this.channelInfos[indexs]
    this.props.showEditModal()
    this.props.getEditDeviceInfo(currentInfo)
  }
  render() {
    const globalImgurl = localStorage.getItem('ImgUrl')
    const { channelList } = this.state
    return (
      <>
        <div className="confTable">
          <div className="confThead">
            <div className="confTh">车道序号</div>
            <div className="confTh">车道方向</div>
            <div className="confTh">车道流向</div>
            <div className="confTh">车道标识</div>
            <div className="confTh">操作</div>
          </div>
          <div className="confTbody">
            {
              channelList &&
              channelList.map((item, index) => {
                return (
                  <div className="confTr" key={item.id}>
                    <div className="confTd">{item.cfgLaneInfo.laneno}</div>
                    <div className="confTd">{item.cfgLaneInfo.directionValue}</div>
                    <div className="confTd">{item.cfgLaneInfo.movementValue}</div>
                    <div className="confTd">
                      <div className="identification">
                        <img src={globalImgurl + item.uiUnitConfig.uiImageName} alt="" />
                      </div>
                    </div>
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

export default ChannelTable

