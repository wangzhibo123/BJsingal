import React, { Component } from 'react'
import { Select } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './ChannelTable.scss'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class ChannelTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelList: null,
      interDirList: null,
      interMoveList: null,
    }
    this.interId = this.props.match.params.id
    this.channelListUrl = `/control-application-front/basic/info/lane/getCfgLaneInfo?id=${this.interId}`
    this.dirMoveList = '/control-application-front/basic/info/listCodeByCodeType' // 方向是6， 流向是16
    this.channelMsg = {
      cfgLaneInfo: {
        attribute: 0,
        detail: '',
        direction: 0,
        feature: 0,
        id: 0,
        laneno: 0,
        movement: 0,
        unitId: 0
      },
      id: 0,
      uiUnitConfig: {
        configCode: 0,
        detail: '',
        deviceId: 0,
        id: 0,
        isView: 0,
        pleft: 0,
        ptop: 0,
        rotationAngle: 0,
        uiHight: 0,
        uiId: 0,
        uiWidth: 0,
        unitId: 0
      }
    }
  }
  componentDidMount = () => {
    this.getUnitConnector()
    this.getInterDirMoveList(6)
    this.getInterDirMoveList(16)
  }
  getUnitConnector = () => {
    const { primitiveInfo } = this.props.data
    this.setState({ channelList: primitiveInfo.CfgLaneInfo })
  }
  getInterDirMoveList = (type) => {
    axiosInstance.get(`${this.dirMoveList}?codeType=${type}`).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data) {
        const stateName = type === 6 ? 'interDirList' : 'interMoveList'
        this.setState({ [stateName]: data })
      }
    })
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
                    <div className="confTd">{item.id}</div>
                    <div className="confTd">{item.cfgLaneInfo.directionValue}</div>
                    <div className="confTd">{item.cfgLaneInfo.movementValue}</div>
                    <div className="confTd">
                      <div className="identification">
                        <img src={globalImgurl + item.uiUnitConfig.uiImageName} alt="" height="100%" />
                      </div>
                    </div>
                    <div className="confTd">
                      <EditOutlined className="activeIcon" />
                      <DeleteOutlined className="activeIcon" />
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

