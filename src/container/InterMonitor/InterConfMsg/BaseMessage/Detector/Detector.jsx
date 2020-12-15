import React, { Component } from 'react'
import { Select, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class Detector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detectorList: null,
    }
    this.interId = this.props.interId
    this.globalImgurl = localStorage.getItem('ImgUrl')
    this.removeUrl = '/control-application-front/basic/info/detector/removeDetector'
  }
  componentDidMount = () => {
    console.log(this.props)
    const { primitiveInfo } = this.props.data
    this.getDetectorList(primitiveInfo)
  }
  componentDidUpdate = (prevState) => {
    const { primitiveInfo } = this.props.data
    if (prevState.data.primitiveInfo !== primitiveInfo) {
      this.getDetectorList(primitiveInfo)
    }
  }
  getDetectorList = (primitiveInfo) => {
    this.detectorInfos = primitiveInfo.Detector
    this.setState({ detectorList: this.detectorInfos })
  }
  getRemoveDetector = (id, configId) => {
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
        selfThis.getRemoveDetector(id, configId)
      },
    })
  }
  handleEditInfo = (e) => {
    const indexs = e.currentTarget.getAttribute('indexs')
    const currentInfo = this.detectorInfos[indexs]
    const uiUnitConfig = { pLeft: 0, pTop: 0, rotationAngle: 0, uiHight: 40, uiImageName: '', uiWidth: 40, isView: 0, unitId: this.interId }
    if (!currentInfo.uiUnitConfig.uiId) {
      currentInfo.uiUnitConfig = uiUnitConfig
    }
    this.props.showEditModal()
    this.props.getEditDeviceInfo(currentInfo)
  }
  render() {
    const { detectorList } = this.state
    return (
      <>
        <div className="confTable">
          <div className="confThead">
            <div className="confTh">检测器编号</div>
            <div className="confTh">距停车线距离</div>
            <div className="confTh">统计周期</div>
            <div className="confTh" style={{ flex: 0.5 }}>类型</div>
            <div className="confTh">所属车道</div>
            <div className="confTh">操作</div>
          </div>
          <div className="confTbody">
            {
              detectorList &&
              detectorList.map((item, index) => {
                const { detcycle, detid, distance, lanenolist } = item.cfgDetectorInfo
                return (
                  <div className="confTr" key={item.id}>
                    <div className="confTd">{detid}</div>
                    <div className="confTd">{distance}米</div>
                    <div className="confTd">{detcycle}分钟</div>
                    <div className="confTd" style={{ flex: 0.5 }}> <img height="30px" src={this.globalImgurl + item.uiUnitConfig.uiImageName} alt=""/> </div>
                    <div className="confTd">{lanenolist}</div>
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

export default Detector

