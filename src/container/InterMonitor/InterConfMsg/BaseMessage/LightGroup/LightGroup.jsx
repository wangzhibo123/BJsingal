import React, { Component } from 'react'
import { Select, message, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class LightGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lampList: null,
    }
    this.interId = this.props.match.params.id
    this.removeUrl = '/control-application-front/basic/info/lampGroup/removeLampGroup'
  }
  componentDidMount = () => {
    const { primitiveInfo } = this.props.data
    this.getLampList(primitiveInfo)
  }
  componentDidUpdate = (prevState) => {
    const { primitiveInfo } = this.props.data
    if (prevState.data.primitiveInfo !== primitiveInfo) {
      this.getLampList(primitiveInfo)
    }
  }
  getRemoveLamp = (id, configId) => {
    axiosInstance.post(`${this.removeUrl}?id=${id}&configId=${configId}`).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.props.getPrimitiveInfo(this.interId)
      }
      message.info(res.data.message)
    })
  }
  getLampList = (primitiveInfo) => {
    this.lampInfos = primitiveInfo.LampGroup
    this.setState({ lampList: this.lampInfos })
  }
  handleDelete = (id, configId) => {
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除吗？',
      className: 'confirmBox',
      onOk() {
        selfThis.getRemoveLamp(id, configId)
      },
    })
  }
  handleEditInfo = (e) => {
    const indexs = e.currentTarget.getAttribute('indexs')
    const currentInfo = this.lampInfos[indexs]
    console.log(currentInfo)
    this.props.showEditModal()
    this.props.getEditDeviceInfo(currentInfo)
  }
  render() {
    const { lampList } = this.state
    return (
      <>
        <div className="confTable">
          <div className="confThead">
            <div className="confTh">灯组序号</div>
            <div className="confTh">方向</div>
            <div className="confTh">灯组类型</div>
            <div className="confTh">操作</div>
          </div>
          <div className="confTbody">
            {
              lampList &&
              lampList.map((item, index) => {
                const { directionValue, lampgroupno, typeValue } = item.cfgLampgroup
                return (
                  <div className="confTr" key={item.id}>
                    <div className="confTd">{lampgroupno}</div>
                    <div className="confTd">{directionValue}</div>
                    <div className="confTd">{typeValue}</div>
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

export default LightGroup

