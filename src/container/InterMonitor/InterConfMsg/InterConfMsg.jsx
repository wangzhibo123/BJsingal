import React, { Component } from 'react'
import { Upload, message, Modal } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CloseOutlined } from '@ant-design/icons'
import './InterConfMsg.scss'

import BaseMessage from './BaseMessage/BaseMessage'
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

import ModalPage from './ModalPage/ModalPage'
import ChannelModal from './ModalPage/channelModal/ChannelModal'
import RelationModal from './ModalPage/relationModal/relationModal'
import SingalModal from './ModalPage/singalModal/singalModal'
import LampModal from './ModalPage/lampModal/lampModal'

import axiosInstance from '../../utils/getInterfaceData'
import { getDevicePiclist, getEditDeviceInfo } from '../../../reduxs/action/interConfig'

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
      editDeviceMsg: false,
      interDeviceList: null,
      currentDeviceList: null,
    }
    this.globalImgurl = localStorage.getItem('ImgUrl')
    this.baseConfList = [
      { confName: '渠化信息', id: 'canalization', num: '0', compos: null },
      { confName: '车道信息', id: 'channel', num: '6', compos: ChannelTable, modalCompos: ChannelModal },
      { confName: '路口关系', id: 'inter', num: '7', compos: InterRelation, modalCompos: RelationModal },
      { confName: '信号机', id: 'singal', num: '1', compos: SingalMsg, modalCompos: SingalModal },
      { confName: '灯组', id: 'lightGroup', num: '10', compos: LightGroup, modalCompos: LampModal },
      { confName: '检测器', id: 'detector', num: '3', compos: Detector },
      { confName: '视频', id: 'video', num: '9', compos: VideoMsg },
    ]
    this.singalParams = [
      { confName: '相位信息', id: 'phasemsg', compos: PhaseMsg },
      { confName: '阶段信息', id: 'stagemsg', compos: StageMsg },
      { confName: '配时方案', id: 'timeplan', compos: TimePlan },
      { confName: '日计划', id: 'dayplan', compos: DayPlan },
      { confName: '调度方案', id: 'dispathplan', compos: DispathPlan },
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
    const { primitiveInfo } = this.props.data
    this.getPicDeviceInfo(primitiveInfo)
    this.props.getDevicePiclist()
  }
  componentDidUpdate = (prevState) => {
    const { devicePiclist, primitiveInfo } = this.props.data
    if (prevState.data.devicePiclist !== devicePiclist) {
      this.getInterDeviceList(devicePiclist)
    }
    if (prevState.data.primitiveInfo !== primitiveInfo) {
      this.getPicDeviceInfo(primitiveInfo)
    }
  }
  handleUpdateInterPic = (imgPath) => {
    const savePathParams = { id: this.props.interInfo.id, backgroungImg: imgPath }
    axiosInstance.post(this.updatePic, savePathParams).then((res) => {
      console.log(res)
    })
  }
  // 图元配置信息
  getPicDeviceInfo = (primitiveInfo) => {
    this.primitiveList = primitiveInfo
    this.roadLists = []
    Object.values(primitiveInfo).forEach((item) => {
      this.roadLists = [...this.roadLists, ...item]
    })
    this.setState({ laneLists: this.roadLists })
  }
  //
  getInterDeviceList = (picList) => {
    console.log(picList)
  }
  // 切换配置
  handleBaseItemChange = (currentItem, stateName, listnum) => {
    const { devicePiclist } = this.props.data
    this.setState({ [stateName]: currentItem })
    if (listnum === '0') {

    } else {
      this.setState({ currentDeviceList: devicePiclist[listnum] })
    }
    
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
        this.setState({ interImage: response.data })
        message.info('上传成功')
        this.handleUpdateInterPic(response.data)
      } else {
        message.info(response.message)
      }
    }
  }
  getDefaultEditInfo = (editname) => {
    const { primitiveInfo } = this.props.data
    const { interId } = this.props
    console.log(primitiveInfo)
    const singalInfo = primitiveInfo.SignalConfigInfo.length ? primitiveInfo.SignalConfigInfo[0] :
    {
      signalConfigInfo: { siganlSupplier: '', signalCode: '', signalGateway: '', signalIp: '', signalMask: '', signalModel: '', signalModelValue: '',
        signalPort: '', sysServiceId: '', unitId: interId },
      uiUnitConfig: { isView: 0, pLeft: 0, pTop: 0, rotationAngle: 0, uiHight: 0, uiImageName: '', uiWidth: 0, unitId: interId }
    }
    return editname === 'channel' ? {
      cfgLaneInfo: { direction: 1, directionValue: '', laneno: 0, movement: 11, movementValue: '', unitId: interId, },
      uiUnitConfig: { pLeft: 0, pTop: 0, rotationAngle: 0, uiHight: 40, uiImageName: '', uiWidth: 40, isView: 0, unitId: interId, },
    } : editname === 'inter' ? {
      uiUnitConfig: { isView: 0, pLeft: 0, pTop: 0, rotationAngle: 0, uiImageName: '',uiHight: 0, uiWidth: 0, unitId: interId },
      unitConnector: { connectorUnitDirection: 1, connectorUnitDirectionValue: '', connectorUnitId: '',
        roadDetail: '', roadLength: 0, unitDirection: 1, unitDirectionValue: '', unitId: interId }
    } : editname === 'singal' ? singalInfo : editname === 'lightGroup' ? {
      cfgLampgroup: { direction: 1, directionValue: '', lampgroupno: '', signalId: '', type: 99, typeValue: '', unitId: interId },
      uiUnitConfig: { pLeft: 0, pTop: 0, rotationAngle: 0, uiHight: 40, uiImageName: '', uiWidth: 40, isView: 0, unitId: interId, },
    } : null
  }
  handleDirDragStart = (ev) => {
    this.newConfPic = this.getDefaultEditInfo(this.state.currentItem)
    this.currentDragIndex = null
    const BeforetargetLeft = ev.target.offsetLeft
    this.moveBeforeX = ev.clientX - BeforetargetLeft
    this.moveBeforeY = ev.clientY + 58
    const picname = ev.target.getAttribute('picname')
    const { currentDeviceList } = this.state
    const currentPic = currentDeviceList.find(item => item.id === parseInt(picname))
    this.newConfPic.uiUnitConfig.uiId = Number(picname)
    this.newConfPic.uiUnitConfig.uiImageName = currentPic.uiImageName
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
      const { pLeft, pTop } = this.newConfPic.uiUnitConfig
      const posX = pLeft + (moveAfterX - this.moveBeforeX)
      const posY = pTop + (moveAfterY - this.moveBeforeY)
      this.newConfPic.uiUnitConfig.pLeft = posX
      this.newConfPic.uiUnitConfig.pTop = posY
    } else {
      const posX = moveAfterX - this.moveBeforeX - dropBoxLeft
      const posY = moveAfterY - this.moveBeforeY
      this.newConfPic.uiUnitConfig.pLeft = posX
      this.newConfPic.uiUnitConfig.pTop = posY
      this.roadLists.push(this.newConfPic)
      this.handleShowEditModal()
      this.props.getEditDeviceInfo(this.newConfPic)
    }
    this.setState({ laneLists: this.roadLists })
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
  handleConfpicUp = (ev) => {
    this.currentDragIndex = ev.target.getAttribute('indexs')
    console.log(this.currentDragIndex)
    this.moveBeforeX = ev.clientX
    this.moveBeforeY = ev.clientY
    this.newConfPic = this.roadLists[this.currentDragIndex]
    console.log(this.newConfPic)
    this.handleShowEditModal()
    this.props.getEditDeviceInfo(this.newConfPic)
  }
  handleShowEditModal = () => {
    this.setState({ editDeviceMsg: true })
  }
  handleCloseEditModal = () => {
    this.setState({ editDeviceMsg: false })
  }
  render() {
    const { isUpload, currentItem, configName, currentParams, laneLists, interInfo, interImage, editDeviceMsg, currentDeviceList } = this.state
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
                <div
                  className={`baseItem ${currentItem === item.id ? 'activeItem' : ''}`}
                  key={item.id}
                  onClick={() => this.handleBaseItemChange(item.id, 'currentItem', item.num)}
                >{item.confName}</div>
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
                        <img src={this.globalImgurl + interImage} alt="" width="1200px" height="600px" /> :
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
                          currentDeviceList &&
                          currentDeviceList.map((item, index) => (
                            <div className="devicePicBox" key={index}>
                              <img src={this.globalImgurl + item.uiImageName} alt="" picname={item.id} draggable="true" onDragStart={this.handleDirDragStart} />
                            </div>
                          ))
                        }
                      </div>
                      <div className="picConfig">
                        <div style={{ width: '1200px', height: '600px', position: 'relative' }} onDrop={this.handleDropPic} onDragOver={this.handleDragOver}>
                          <img src={this.globalImgurl + interImage} alt="" width="100%" height="100%" draggable="false" />
                          {
                            laneLists &&
                            laneLists.map((item, index) => {
                              const { pTop, pLeft, rotationAngle, uiImageName } = item.uiUnitConfig
                              return (
                                <img
                                  className="dragImgs"
                                  key={item.id + index}
                                  indexs={index}
                                  src={this.globalImgurl + uiImageName}
                                  alt=""
                                  style={{ top: `${pTop}px`, left: `${pLeft}px`, transform: `rotate(${rotationAngle ? rotationAngle : 0}deg)` }}
                                  draggable="true"
                                  onDragStart={this.handleDragConfPic}
                                  onMouseUp={this.handleConfpicUp}
                                />
                              )}
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <div className="confDetails">
                      <Modal
                        visible={editDeviceMsg}
                        wrapClassName="modalBox"
                        footer={null}
                        closable={false}
                        destroyOnClose={true}
                        maskStyle={{ backgroundColor: 'rgba(0,0,0,.2)' }}
                      >
                        <ModalPage modalName={currentItem} renderComponent={(params) => {
                          const ItemParams = this.baseConfList.find(item => item.id === params)
                          const ItemComponent = ItemParams.modalCompos
                          return <ItemComponent closeEditModal={this.handleCloseEditModal} {...this.props} />
                        }} />
                      </Modal>
                      {
                        currentItem &&
                        <BaseMessage paramsName={currentItem} renderComponent={(prams) => {
                          const ItemParams = this.baseConfList.find(item => item.id === prams)
                          const ItemComponent = ItemParams.compos
                          return <ItemComponent {...this.props} showEditModal={this.handleShowEditModal} />
                        }} />
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

const mapStateToProps = (state) => {
  return {
    data: state.interConfig,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getDevicePiclist: bindActionCreators(getDevicePiclist, dispatch),
    getEditDeviceInfo: bindActionCreators(getEditDeviceInfo, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(InterConfMsg)
