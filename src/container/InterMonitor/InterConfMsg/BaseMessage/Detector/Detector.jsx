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
    this.interId = this.props.match.params.id
    this.removeUrl = '/control-application-front/basic/info/detector/removeDetector'
  }
  componentDidMount = () => {
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
    this.setState({ detectorList: primitiveInfo.Detector })
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
              detectorList.map((item) => {
                const { detcycle, detid, dettype, distance } = item.cfgDetectorInfo
                return (
                  <div className="confTr" key={item.id}>
                    <div className="confTd">{detid}</div>
                    <div className="confTd">{distance}</div>
                    <div className="confTd">{detcycle}</div>
                    <div className="confTd">{dettype}</div>
                    <div className="confTd">1</div>
                    <div className="confTd">
                      <EditOutlined className="activeIcon" />
                      <DeleteOutlined className="activeIcon" onClick={() => { this.handleDelete(item.id, item.uiUnitConfig.uiId) }} />
                    </div>
                  </div>
                )
              })
            }
            <div className="confTr">
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
            </div>
          </div>
        </div>
        <div className="actionBtnBox">
          <div className="saveBtn">取消</div>
          <div className="saveBtn">保存</div>
        </div>
      </>
    )
  }
}

export default Detector

