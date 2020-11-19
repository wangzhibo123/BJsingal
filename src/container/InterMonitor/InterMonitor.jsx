import React, { Component } from 'react'
import { Select } from 'antd'
import {
  SearchOutlined, DoubleLeftOutlined, DoubleRightOutlined, CaretUpOutlined, CaretDownOutlined, LeftCircleOutlined,
  RightCircleOutlined, UpCircleOutlined, DownCircleOutlined, CloseOutlined, EnvironmentOutlined,
} from '@ant-design/icons'
import mapConfiger from '../utils/minemapConf'
import './InterMonitor.scss'

import axiosInstance from '../utils/getInterfaceData'
import cneter from '../imgs/iconM.png'
import hand from '../imgs/iconH.png'
import allred from '../imgs/iconR.png'
import yellow from '../imgs/IconY.png'
// import phasePic from '../imgs/01.png'
// import phasePic2 from '../imgs/03.png'
// import phasePic3 from '../imgs/11.png'
// import phasePic4 from '../imgs/04.png'
// import phasePic5 from '../imgs/10.png'
// import phasePic6 from '../imgs/02.png'
import test1 from '../imgs/interBg.png'
import singalIcon from '../imgs/singalIcon.png'

import InterTimeList from './InterTimeList/InterTimeList'
import Graph from './Graph/Graph'
import InterConfMsg from './InterConfMsg/InterConfMsg'

const { Option } = Select
class InterMonitor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModify: false,
      confListLeft: 0,
      modifyStage: false,
      modeIndex: null,
      moveLeft: null,
      moveRight: null,
      moveUp: null,
      moveDown: null,
      trafficInfoList: null,
      interConfigMsg: null,
      trendChartsData: null,
      interInfo: null,
      statusControlData: null,
      stageList: null,
      showInterMap: false,
    }
    this.confItems = [
      { confname: '基础信息', id: 'interBase' }, { confname: '信号参数', id: 'singalParams' },
      { confname: '一口一档', id: null }, { confname: '交通指标', id: null }, { confname: '时间表控制', id: null }
    ]
    this.controlItems = [
      { text: '全红控制', img: allred, },
      { text: '闪黄控制', img: yellow },
      { text: '中心控制', img: cneter },
      { text: '中心手控', img: hand },
    ]
    this.defaultMarkers = [
      [116.32346, 39.95645],
      [116.32815, 39.95668],
      [116.33536, 39.95711],
      [116.33615, 39.95176],
      [116.34108, 39.94728],
      [116.34310, 39.93679],
      [116.37923, 39.95809],
    ]
    this.interId = this.props.match.params.id
    this.modeUrl = `/control-application-front/unitMontitor/getControlModeById?unit_id=${this.interId}`
    this.trafficUrl = `/control-application-front/unitMontitor/getRealtimeTrafficById?unit_id=${this.interId}`
    this.trendUrl = `/control-application-front/unitMontitor/getRoadTrendById?unit_id=${this.interId}`
    this.messageUrl = `/control-application-front/unitMontitor/getUnitInfoById?unit_id=${this.interId}`
  }
  componentDidMount = () => {
    this.getControlMode()
    this.getTrafficInfo()
    this.getRoadTrend()
    this.getInterInfo()
  }
  // 路口信息
  getInterInfo = () => {
    axiosInstance.post(this.messageUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ interInfo: list })
      } else {
        this.setState({ interIndo: null })
      }
    })
  }
  // 获取实时状态控制模式
  getControlMode = () => {
    axiosInstance.post(this.modeUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        const stageIds = list.stage_id.split(',')
        this.defaultStageList = []
        this.modifyStageList = []
        if (stageIds.length) {
          const stageTimes = list.stage_time.split(',')
          const imgs = list.stage_image.split(',')
          stageIds.forEach((item, index) => {
            const obj = { stageId: item, stageTime: stageTimes[index], stageImg: imgs[index] }
            this.defaultStageList.push(obj)
            this.modifyStageList.push(obj)
          })
        }
        
        this.setState({ statusControlData: list, stageList: this.defaultStageList })
      }
    })
  }
  // 获取实时路况
  getTrafficInfo = () => {
    axiosInstance.post(this.trafficUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ trafficInfoList: list })
      } else {
        this.setState({ trafficInfoList: null })
      }
    })
  }
  // 24小时路况趋势
  getRoadTrend = () => {
    axiosInstance.post(this.trendUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1' && list.length) {
        const jamdurArr = list.map(item => item.jamdur)
        const speedArr = list.map(item => item.speed)
        const timeArr = list.map(item => item.time)
        const trendCharts = { jamdurArr, speedArr, timeArr }
        this.setState({ trendChartsData: trendCharts })
      } else {
        this.setState({ trendChartsData: null })
      }
    })
  }
  handleModifyConf = () => {
    this.setState({
      isModify: true,
      modifyStage: true,
      modeIndex: 0,
    })
  }
  handleCancelModify = () => {
    this.setState({
      isModify: false,
      modifyStage: false,
      modeIndex: null,
    })
  }
  handleshowConfList = () => {
    const { confListLeft } = this.state
    this.setState({ confListLeft: confListLeft === 0 ? '-260px' : 0 })
  }
  handleControlMode = (indexs) => {
    this.setState({ modeIndex: indexs })
  }
  handleToggleInter = (e) => {
    const dir = e.currentTarget.getAttribute('dir')
    this.setState({ [dir]: true }, () => {
      setTimeout(() => {
        this.setState({ [dir]: false })
      }, 600)
    })
  }
  handleShowInterConf = (confName) => {
    this.setState({ interConfigMsg: confName })
  }
  hanldleCloseInterConf = () => {
    this.setState({ interConfigMsg: null })
  }
  handleShowSingalInfo = () => {
    this.setState({ showSingalInfo: true })
  }
  handleHideSingalInfo = () => {
    this.setState({ showSingalInfo: false })
  }
  renderInterMap = () => {
    mapConfiger.zoom = 11
    this.map = new window.mapabcgl.Map(mapConfiger)
    this.map.addControl(new window.mapabcgl.NavigationControl());
    const { longitude, latitude } = this.state.interInfo
    this.map.setCenter([longitude, latitude])
    this.addMarker(longitude, latitude)
  }
  handleShowIntermap = () => {
    this.setState({ showInterMap: true }, () => {
      this.renderInterMap()
    })
  }
  handleHideInterMap = () => {
    this.setState({ showInterMap: false })
  }
  getMarkerEl = () => {
    var el = document.createElement('div')
    el.style.backgroundImage = 'url(http://map.mapabc.com:35001/mapdemo/apidemos/sourceLinks/img/marker-icon.png)';
    //宽度和高度要和图片宽高相同，否则点的位置会有偏差
    el.style.width = '25px'; 
    el.style.height = '41px'; 
    return el
  }
  addMarker = (lng, lat) => {
      new window.mapabcgl.Marker(this.getMarkerEl())
      .setLngLat([lng, lat])
      .addTo(this.map);
  }
  render() {
    const {
      confListLeft, modeIndex, moveLeft, moveRight, moveUp, moveDown, trafficInfoList, interConfigMsg, trendChartsData, interInfo, showSingalInfo,
      phaseTime, statusControlData, stageList, showInterMap
    } = this.state
    return (
      <div className="interMonitorBox">
        <div className="interMessage">
          <span className="slideLeft slideIcon" dir="moveLeft" onClick={this.handleToggleInter}><LeftCircleOutlined /></span>
          <span className="slideUp slideIcon" dir="moveUp" onClick={this.handleToggleInter}><UpCircleOutlined /></span>
          <span className="slideDown slideIcon" dir="moveDown" onClick={this.handleToggleInter}><DownCircleOutlined /></span>
          <div className="interPic">
            <img className={`${moveLeft ? 'slideInLeft' : moveRight ? 'slideInRight' : moveUp ? 'slideInUp' : moveDown ? 'slideInDown' : ''}`} src={test1} alt="" />
            <div className="interPhaseTime">
              <em><i>{phaseTime}s</i></em>
            </div>
          </div>
          {
            !!interConfigMsg &&
            <InterConfMsg closeInterConf={this.hanldleCloseInterConf} configName={interConfigMsg} interId={this.interId} interInfo={interInfo} />
          }
          <div className="titles">
            当前路口-{interInfo && interInfo.unit_name}
            <span className="interMapIcon" onClick={this.handleShowIntermap}><EnvironmentOutlined /></span>
          </div>
          {
            showInterMap &&
            <div className="interMapWrapper">
              <div className="interMapZoom" id="mapContainer" />
              <CloseOutlined className="closeInterMap" onClick={this.handleHideInterMap} />
            </div>
          }
          
          
          <div className="monitorDetails">
            <InterTimeList {...this.props} />
            <div className="roadTrends">
              {
                trendChartsData &&
                <Graph chartsDatas={trendChartsData} />
              }
            </div>
            <div className="singalIconBox" onClick={this.handleShowSingalInfo}>
              <img src={singalIcon} alt="" />
            </div>
            {
              showSingalInfo &&
              <div className="singalInfoBox">
                <div className="singalTitle">设备名称：27787827<CloseOutlined className="closeIcon" onClick={this.handleHideSingalInfo} /></div>
                <div className="infoItem">
                  <div className="item">关联编号：10101</div>
                  <div className="item">关联编号：10101</div>
                </div>
                <div className="infoItem">
                  <div className="item">维护单位：指挥中心</div>
                  <div className="item">维护电话：110</div>
                </div>
                <div className="infoItem">
                  <div className="item">管理单位：指挥中心</div>
                  <div className="item">设备状态：正常</div>
                </div>
              </div>
            }
            <div className="conditionList">
              <div className="titles">各路口实时路况</div>
              <div className="listBox">
                <div className="listTh">
                  <span className="innterBorder" />
                  <div className="listTd" />
                  <div className="listTd">拥堵状态</div>
                  <div className="listTd">平均车速</div>
                  <div className="listTd">饱和度</div>
                </div>
                <div className="listBody">
                  {
                    trafficInfoList &&
                    trafficInfoList.map((item) => (
                      <div className="listTr" key={item.distriction}>
                        <span className="innterBorder" />
                        <div className="listTd">{item.distriction}路</div>
                        <div className="listTd">{item.jam_dur}</div>
                        <div className="listTd">{item.speed}km/h</div>
                        <div className="listTd">{item.saturation}</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="confList" style={{ left: confListLeft }}>
              <div className="showConf" onClick={this.handleshowConfList}>
                {
                  confListLeft === 0 ?
                    <DoubleLeftOutlined className="showIcon" /> : <DoubleRightOutlined className="showIcon" />
                }
              </div>
              <div className="interSearch">
                <Select defaultValue="1">
                  <Option key="1" value="1">北京市</Option>
                </Select>
                <span className="searchInput">
                  <input type="text" className="inputBox" placeholder="查询..." />
                  <SearchOutlined className="searchIcon" />
                </span>
              </div>
              <ul className="confUl">
                {
                  this.confItems.map(item => (
                    <li className="confLi" key={item.confname} onClick={() => this.handleShowInterConf(item.id)}>{item.confname}<span className="innterBorder" /></li>
                  ))
                }
              </ul>
            </div>
            <div className="controlExecute">
              <div className="controlMsg">
                <span className="controlItems">网络状态：<span className="itemsVal">在线</span></span>
                <span className="controlItems">控制模式：<span className="itemsVal">{statusControlData && statusControlData.control_state_txt}</span></span>
                <span className="controlItems">是否锁定：<span className="itemsVal">未锁</span></span>
                <span className="controlItems">方案号：<span className="itemsVal">{statusControlData && statusControlData.planno}</span></span>
                <span className="controlItems">周期：<span className="itemsVal">{statusControlData && statusControlData.cyclelen}</span></span>
              </div>
              <div className="modifyBox">
                <div className="modifyBtn modify">运行</div>
                <div className="modifyBtn modify">复位</div>
              </div>
              <div className="controlMode">
                <div className="modeItems">
                  {
                    this.controlItems.map((item, index) => {
                      return (
                        <div className={`controlItem ${modeIndex === index && 'itemHover'}`} key={item.text} onClick={() => this.handleControlMode(index)}>
                          <div className="icon"><img src={item.img} alt="" /></div>
                          <div className="text">{item.text}</div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="controlDetails">
                  {
                    stageList &&
                    stageList.map((item, index) => {
                      return (
                        <div className="phaseTime" key={item.stageId}>
                          <div className="phaseinner"><img src={item.stageImg} alt="" /></div>
                          <div className="phaseinner times">
                            <span>{item.stageTime}</span>
                            <div className="caculate">
                              <CaretUpOutlined className="add" onClick={this.handleModifyStageTime} />
                              <CaretDownOutlined className="subtract" onClick={this.handleModifyStageTime} />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InterMonitor
