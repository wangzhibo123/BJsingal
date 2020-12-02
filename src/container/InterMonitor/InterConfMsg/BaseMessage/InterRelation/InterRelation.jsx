import React, { Component } from 'react'
import { Select, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './InterRelation.scss'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class InterRelation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      relationList: null,
    }
    this.interId = this.props.match.params.id
    this.removeUrl = '/control-application-front/basic/info/connector/removeUnitConnector'
  }
  componentDidMount = () => {
    const { primitiveInfo } = this.props.data
    this.getInterRelationList(primitiveInfo)
  }
  componentDidUpdate = (prevState) => {
    const { primitiveInfo } = this.props.data
    if (prevState.data.primitiveInfo !== primitiveInfo) {
      this.getInterRelationList(primitiveInfo)
    }
  }
  getRemoveRelation = (id, configId) => {
    axiosInstance.post(`${this.removeUrl}?id=${id}&configId=${configId}`).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.props.getPrimitiveInfo(this.interId)
      }
      message.info(res.data.message)
    })
  }
  getInterRelationList = (primitiveInfo) => {
    this.relationInfos = primitiveInfo.UnitConnector
    this.setState({ relationList: primitiveInfo.UnitConnector })
  }
  handleDelete = (id, configId) => {
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除吗？',
      className: 'confirmBox',
      onOk() {
        selfThis.getRemoveRelation(id, configId)
      },
    })
  }
  handleEditInfo = (e) => {
    const indexs = e.currentTarget.getAttribute('indexs')
    const currentInfo = this.relationInfos[indexs]
    this.props.showEditModal()
    this.props.getEditDeviceInfo(currentInfo)
  }
  render() {
    const { relationList } = this.state
    return (
      <>
        <div className="confTable">
          <div className="confThead">
            <div className="confTh">路口方向</div>
            <div className="confTh">流向id</div>
            <div className="confTh">流向方向</div>
            <div className="confTh">道路长度</div>
            <div className="confTh" style={{ flex: 1.3 }}>道路描述</div>
            <div className="confTh">操作</div>
          </div>
          <div className="confTbody">
            {
              relationList &&
              relationList.map((item, index) => {
                const { roadDetail, unitDirectionValue, roadLength, connectorUnitId, connectorUnitDirectionValue } = item.unitConnector
                return (
                  <div className="confTr" key={item.id}>
                    <div className="confTd">{unitDirectionValue}</div>
                    <div className="confTd">{connectorUnitId}</div>
                    <div className="confTd">{connectorUnitDirectionValue}</div>
                    <div className="confTd">{roadLength}</div>
                    <div className="confTd" style={{ flex: 1.3 }}>{roadDetail}</div>
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

export default InterRelation

