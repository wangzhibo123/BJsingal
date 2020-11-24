import React, { Component } from 'react'
import { Select } from 'antd'
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
    axiosInstance.get(this.channelListUrl).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data) {
        this.setState({ channelList: data })
      }
    })
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
          </div>
          <div className="confTbody">
            {
              channelList &&
              channelList.map((item, index) => {
                return (
                  <div className="confTr" key={item.id}>
                    <div className="confTd">{item.id}</div>
                    <div className="confTd">{item.cfgLaneInfo.laneno}</div>
                    <div className="confTd">{item.cfgLaneInfo.movement}</div>
                    <div className="confTd">
                      <div className="identification">
                        <img src={globalImgurl + item.cfgLaneInfo.uiImageName} alt="" height="100%" />
                      </div>
                    </div>
                  </div>
                )
              })
            }
            {/* <div className="confTr">
              <div className="confTd">3</div>
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd">
              </div>
            </div> */}
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

export default ChannelTable

