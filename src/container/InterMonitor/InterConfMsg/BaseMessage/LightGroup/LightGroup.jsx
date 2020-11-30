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
    this.setState({ lampList: primitiveInfo.LampGroup })
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
              lampList.map((item) => {
                const { directionValue, lampgroupno, type } = item.cfgLampgroup
                return (
                  <div className="confTr" key={item.id}>
                    <div className="confTd">{directionValue}</div>
                    <div className="confTd">{lampgroupno}</div>
                    <div className="confTd">{type}</div>
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
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default LightGroup

