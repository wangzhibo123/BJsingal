import React, { Component } from 'react'
import { Upload, message } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './InterConfMsg.scss'

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
import videoIcon from '../../imgs/moni.png'

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

import axiosInstance from '../../utils/getInterfaceData'

class InterConfMsg extends Component {
  constructor(props) {
    super(props)
    this.roadLists = []
    this.state = {
      isUpload: false,
      currentConf: '',
      currentItem: 'canalization',
      currentParams: 'phasemsg',
      configName: null,
      interInfo: null,
      laneLists: this.roadLists,
      interImage: null,
    }
    this.globalImgurl = localStorage.getItem('ImgUrl')
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
      { pic: left, picname: 'left', confname: 'channel' },
      { pic: right, picname: 'right', confname: 'channel' },
      { pic: straight, picname: 'straight', confname: 'channel' },
      { pic: round, picname: 'round', confname: 'channel' },
      { pic: goleft, picname: 'goleft', confname: 'inter' },
      { pic: goright, picname: 'goright', confname: 'inter' },
      { pic: top, picname: 'gotop', confname: 'inter' },
      { pic: bottom, picname: 'gobottom', confname: 'inter' },
      { pic: topleft, picname: 'gotopleft', confname: 'inter' },
      { pic: topright, picname: 'gotopright', confname: 'inter' },
      { pic: bottomleft, picname: 'gobottomleft', confname: 'inter' },
      { pic: bottomright, picname: 'gobottomright', confname: 'inter' },
      { pic: singal, picname: 'light', confname: 'lightGroup' },
      { pic: videoIcon, picname: 'videos', confname: 'video' },
    ]
    this.turnPic = [
      { pic: goleft }, { pic: goright }, { pic: top }, { pic: bottom }, { pic: topleft }, { pic: topright }, { pic: bottomleft }, { pic: bottomright }
    ]
    this.uploadPic = '/control-application-front/file/upload'
    this.updatePic = '/control-application-front/basic/info/unit/background'
  }
  componentDidMount = () => {
    const { configName, interInfo } = this.props
    this.setState({ configName, interInfo })
    if (interInfo.background_img) {
      this.setState({ isUpload: true, interImage: interInfo.background_img })
    }
  }
  handleUpdateInterPic = (imgPath) => {
    const savePathParams = { id: this.props.interInfo.id, backgroungImg: imgPath }
    axiosInstance.post(this.updatePic, savePathParams).then((res) => {
      console.log(res)
    })
  }
  // 切换配置
  handleBaseItemChange = (currentItem, stateName) => {
    this.setState({ [stateName]: currentItem })
  }
  
  handleUploadInterPic = () => {
    this.setState({ isUpload: true })
  }
  beforeUploadInterPic = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请选择jpg或png文件')
    }
    return isJpgOrPng
  }
  handleUploadPicChange = (info) => {
    if (info.file.status === 'uploading') {
      console.log('uploading')
    }
    if (info.file.status === 'done') {
      console.log(info.file)
      const { response } = info.file
      if (response.code === 200) {
        message.info('上传成功')
        this.handleUpdateInterPic(response.data)
      } else {
        message.info(response.message)
      }
    }
  }
  handleDirDragStart = (ev) => {
    this.currentDragIndex = null
    const BeforetargetLeft = ev.target.offsetLeft
    this.moveBeforeX = ev.clientX - BeforetargetLeft
    this.moveBeforeY = ev.clientY + 58
    const picname = ev.target.getAttribute('picname')
    const pic = this.dirPic.find(item => item.picname === picname)
    this.newConfPic = { picname, pic: pic.pic }
  }
  handleDirDragEnd = (ev) => {
    console.log(ev.target, 'end:::')
  }
  handleDropPic = (ev) => {
    ev.preventDefault();
    const dropBoxLeft = ev.currentTarget.offsetLeft
    const moveAfterX = ev.clientX
    const moveAfterY = ev.clientY
    if (this.currentDragIndex) {
      const { posx, posy } = this.newConfPic
      const posX = posx + (moveAfterX - this.moveBeforeX)
      const posY = posy + (moveAfterY - this.moveBeforeY)
      this.newConfPic.posx = posX
      this.newConfPic.posy = posY
    } else {
      const posX = moveAfterX - this.moveBeforeX - dropBoxLeft
      const posY = moveAfterY - this.moveBeforeY
      this.newConfPic.posx = posX
      this.newConfPic.posy = posY
      this.roadLists.push(this.newConfPic)
    }
    this.setState({ laneLists: this.roadLists })
    console.log(this.roadLists)
  }
  handleDragOver = (ev) => {
    ev.preventDefault();
  }
  handleDragConfPic = (ev) => {
    this.currentDragIndex = ev.target.getAttribute('indexs')
    this.moveBeforeX = ev.clientX
    this.moveBeforeY = ev.clientY
    this.newConfPic = this.roadLists[this.currentDragIndex]
  }
  render() {
    const { isUpload, currentItem, configName, currentParams, laneLists, interInfo, interImage } = this.state
    return (
      <div className="interConfMsg">
        <div className="confMsgBox">
          <div className="closeBox" onClick={this.props.closeInterConf}><CloseOutlined className="closeIcon" /></div>
          <div className="confInterName">{interInfo && interInfo.unit_name}</div>
          <div className="interMsg">
            <div className="msgDetails">
              <div className="msgItem">路口编号：{interInfo && interInfo.unit_code}</div>
              <div className="msgItem" style={{ flex: 1.6 }}>原始路口名称：{interInfo && interInfo.unit_name_old}</div>
              <div className="msgItem">路口类型：{interInfo && interInfo.unit_type_code}</div>
              <div className="msgItem">路口位置：{interInfo && interInfo.unit_position}</div>
              <div className="msgItem">所属区域：{interInfo && interInfo.district_id}</div>
              <div className="msgItem" style={{ flex: 1.2 }}>管理单位：{interInfo && interInfo.org_unit}</div>
              <div className="msgItem" style={{ flex: 0.7 }}>经度：{interInfo && interInfo.longitude}</div>
              <div className="msgItem" style={{ flex: 0.7 }}>纬度：{interInfo && interInfo.latitude}</div>
            </div>
            <div className="msgDetails">
              <div className="msgItem" style={{ flex: 1.2 }}>信号控制系统对应路口编号：{interInfo && interInfo.signal_sys_unit_id}</div>
              <div className="msgItem" style={{ flex: 1.5 }}>信号系统路口名称：{interInfo && interInfo.unit_name_signal_sys}</div>
              <div className="msgItem">信号机对应路口编号：{interInfo && interInfo.signal_unit_id}</div>
              <div className="msgItem">信号控制系统：{interInfo && interInfo.signal_system_code}</div>
              <div className="msgItem">是否被带：{interInfo && (interInfo.be_taken === 0 ? '否' : '是')}</div>
              <div className="msgItem">主路口编号：{interInfo && interInfo.main_unit_id}</div>
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
                        <img src={this.globalImgurl + interImage} alt="" height="100%" /> :
                        <span className="pleaseUpload">请上传该路口渠化图</span>
                    }
                    <Upload
                      name="file"
                      className="avatar-uploader"
                      showUploadList={false}
                      action={this.uploadPic}
                      beforeUpload={this.beforeUploadInterPic}
                      onChange={this.handleUploadPicChange}
                    >
                      <div className="uploadPic" onClick={this.handleUploadInterPic}>
                        {isUpload ? <span>重新上传</span> : <span>上传</span>}
                      </div>
                    </Upload>
                    
                  </div> :
                  <div className="interConfDetails">
                    <div className="deviceConf">
                      <div className="deviceList">
                        {
                          (currentItem === 'channel' || currentItem === 'inter' || currentItem === 'lightGroup' || currentItem === 'video') &&
                          this.dirPic.map((item, index) => {
                            if (item.confname === currentItem) {
                              return (
                                <div className="devicePicBox" key={index}>
                                  <img src={item.pic} alt="" height={item.picname !== 'videos' ? '100%' : 'auto'} picname={item.picname} draggable="true" onDragStart={this.handleDirDragStart} />
                                </div>
                              )
                            }
                          })
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
                      </div>
                      <div className="picConfig">
                        <div style={{ width: '760px', height: '585px', position: 'relative' }} onDrop={this.handleDropPic} onDragOver={this.handleDragOver}>
                          <img src={this.globalImgurl + interImage} alt="" height="100%" draggable="false" />
                          {
                            laneLists &&
                            laneLists.map((item, index) => (
                              <img
                                key={item.picname + index}
                                indexs={index} src={item.pic}
                                alt=""
                                style={{ position: 'absolute', top: `${item.posy}px`, left: `${item.posx}px`, height: item.picname !== 'videos' ? '48px' : 'auto' }}
                                draggable="true"
                                onDragStart={this.handleDragConfPic}
                              />
                            ))
                          }
                        </div>
                      </div>
                    </div>
                    <div className="confDetails">
                      {
                        currentItem === 'channel' &&
                        <ChannelTable {...this.props} />
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
