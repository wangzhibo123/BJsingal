import React, { Component } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import './InterConfMsg.scss'

import interPic from '../../imgs/interPic.png'
import left from '../../imgs/left.png'
import right from '../../imgs/right.png'
import straight from '../../imgs/straight.png'
import round from '../../imgs/round.png'
import goleft from '../../imgs/goleft.png'
import goright from '../../imgs/goright.png'
import top from '../../imgs/top.png'
import bottom from '../../imgs/bottom.png'
import topleft from '../../imgs/topleft.png'
import topright from '../../imgs/topright.png'
import bottomleft from '../../imgs/bottomleft.png'
import bottomright from '../../imgs/bottomright.png'
import singal from '../../imgs/singal.png'
import videoIcon from '../../imgs/videoicon.png'

import ChannelTable from './BaseMessage/ChannelTable/ChannelTable'
import InterRelation from './BaseMessage/InterRelation/InterRelation'
import SingalMsg from './BaseMessage/SingalMsg/SingalMsg'
import LightGroup from './BaseMessage/LightGroup/LightGroup'
import Detector from './BaseMessage/Detector/Detector'
import VideoMsg from './BaseMessage/VideoMsg/VideoMsg'

import SingalParams from './SingalParams/SIngalParams'
import PhaseMsg from './SingalParams/PhaseMsg/PhaseMsg'
import StageMsg from './SingalParams/StageMsg/StageMsg'
import TimePlan from './SingalParams/TimePlan/TimePlan'
import DispathPlan from './SingalParams/DetectorPlan/DetectorPlan'
import DayPlan from './SingalParams/DayPlan/DayPlan'

class InterConfMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUpload: false,
      currentConf: '',
      currentItem: 'canalization',
      currentParams: 'phasemsg',
      configName: null,
    }
    this.baseConfList = [
      { confName: '渠化信息', id: 'canalization', compos: null },
      { confName: '车道信息', id: 'channel', compos: ChannelTable },
      { confName: '路口关系', id: 'inter', compos: InterRelation },
      { confName: '信号机', id: 'singal', compos: SingalMsg },
      { confName: '灯组', id: 'lightGroup', compos: LightGroup },
      { confName: '检测器', id: 'detector', compos: Detector },
      { confName: '视频', id: 'video', compos: VideoMsg },
    ]
    this.singalParams = [
      { confName: '相位信息', id: 'phasemsg', compos: PhaseMsg },
      { confName: '阶段信息', id: 'stagemsg', compos: StageMsg },
      { confName: '配时方案', id: 'timeplan', compos: TimePlan },
      { confName: '日计划', id: 'dayplan', compos: DayPlan },
      { confName: '调度方案', id: 'dispathplan', compos: DispathPlan },
    ]
    this.dirPic = [
      { pic: left }, { pic: right }, { pic: straight }, { pic: round }
    ]
    this.turnPic = [
      { pic: goleft }, { pic: goright }, { pic: top }, { pic: bottom }, { pic: topleft }, { pic: topright }, { pic: bottomleft }, { pic: bottomright }
    ]
  }
  componentDidMount = () => {
    const { configName } = this.props
    this.setState({ configName })
  }
  componentDidUpdate = (prevState) => {
    const { configName } = this.props
    if (prevState.configName !== configName) {
      this.setState({ configName })
    }
  }
  handleBaseItemChange = (currentItem, stateName) => {
    this.setState({ [stateName]: currentItem })
  }
  handleUploadInterPic = () => {
    this.setState({ isUpload: true })
  }
  render() {
    const { isUpload, currentItem, configName, currentParams } = this.state
    return (
      <div className="interConfMsg">
        <div className="confMsgBox">
          <div className="closeBox" onClick={this.props.closeInterConf}><CloseOutlined className="closeIcon" /></div>
          <div className="confInterName">南线阁街与枣林前街</div>
          <div className="interMsg">
            <div className="msgDetails">
              <div className="msgItem">路口编号：100267</div>
              <div className="msgItem">原始路口名称：无</div>
              <div className="msgItem">路口类型：平面十字</div>
              <div className="msgItem">路口位置：三环内</div>
              <div className="msgItem">所属区域：海淀区</div>
              <div className="msgItem" style={{ flex: 1.5 }}>管理单位：海淀区交通支队</div>
              <div className="msgItem">经度：100267</div>
              <div className="msgItem">纬度：100267</div>
            </div>
            <div className="msgDetails">
              <div className="msgItem" style={{ flex: 1.2 }}>信号控制系统对应路口编号：100267</div>
              <div className="msgItem" style={{ flex: 1.5 }}>信号系统路口名称：枣林前街路口</div>
              <div className="msgItem">信号机对应路口编号：100267</div>
              <div className="msgItem">信号控制系统：scats</div>
              <div className="msgItem">是否被带：否</div>
              <div className="msgItem">主路口编号：否</div>
            </div>
          </div>
          <div className="interConflist">
            {
              configName === 'interBase' &&
              this.baseConfList.map((item) => (
                <div className={`baseItem ${currentItem === item.id ? 'activeItem' : ''}`} key={item.id} onClick={() => this.handleBaseItemChange(item.id, 'currentItem')}>{item.confName}</div>
              ))
            }
            {
              configName === 'singalParams' &&
              this.singalParams.map((item) => (
                <div className={`baseItem ${currentParams === item.id ? 'activeItem' : ''}`} key={item.id} onClick={() => this.handleBaseItemChange(item.id, 'currentParams')}>{item.confName}</div>
              ))
            }
          </div>
          {
            configName === 'interBase' &&
            <div className="confContent">
              {
                currentItem === 'canalization' ?
                  <div className="interPicBox">
                    {
                      isUpload ?
                        <img src={interPic} alt="" height="100%" /> :
                        <span className="pleaseUpload">请上传该路口渠化图</span>
                    }
                    <div className="uploadPic" onClick={this.handleUploadInterPic}>{isUpload ? <span>重新上传</span> : <span>上传</span>}</div>
                  </div> :
                  <div className="interConfDetails">
                    <div className="deviceConf">
                      <div className="deviceList">
                        {
                          currentItem === 'channel' &&
                          this.dirPic.map((item) => (
                            <div className="devicePicBox" key={item}>
                              <img src={item.pic} alt="" height="100%" />
                            </div>
                          ))
                        }
                        {
                          currentItem === 'inter' &&
                          this.turnPic.map((item) => (
                            <div className="devicePicBox" key={item}>
                              <img src={item.pic} alt="" height="100%" />
                            </div>
                          ))
                        }
                        {
                          currentItem === 'singal' &&
                          <>
                            <div className="devicePicBox">海信</div>
                            <div className="devicePicBox">西门子</div>
                          </>
                        }
                        {
                          currentItem === 'detector' &&
                          <>
                            <div className="devicePicBox">地磁</div>
                            <div className="devicePicBox">线圈</div>
                          </>
                        }
                        {
                          currentItem === 'lightGroup' &&
                          <div className="devicePicBox">
                            <img src={singal} alt="" height="100%" />
                          </div>
                        }
                        {
                          currentItem === 'video' &&
                          <div className="devicePicBox">
                            <img src={videoIcon} alt="" width="80%" />
                          </div>
                        }
                      </div>
                      <div className="picConfig">
                        <img src={interPic} alt="" height="100%" />
                      </div>
                    </div>
                    <div className="confDetails">
                      {
                        currentItem === 'channel' &&
                        <ChannelTable />
                      }
                      {
                        currentItem === 'inter' &&
                        <InterRelation />
                      }
                      {
                        currentItem === 'singal' &&
                        <SingalMsg />
                      }
                      {
                        currentItem === 'lightGroup' &&
                        <LightGroup />
                      }
                      {
                        currentItem === 'detector' &&
                        <Detector />
                      }
                      {
                        currentItem === 'video' &&
                        <VideoMsg />
                      }
                    </div>
                  </div>
              }
            </div>
          }
          {
            configName === 'singalParams' &&
            <SingalParams paramsName={currentParams} renderComponent={(prams) => {
              const ItemParams = this.singalParams.find(item => item.id === prams)
              const ItemComponent = ItemParams.compos
              return <ItemComponent />
            }} />
          }
        </div>
      </div>
    )
  }
}

export default InterConfMsg