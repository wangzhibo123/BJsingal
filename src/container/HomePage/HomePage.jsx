import React, { Component } from 'react'
import { Checkbox, Select } from 'antd'
import echarts from 'echarts'
import $ from 'jquery'
import './HomePage.scss'

import Histogram from './Histogram/Histogram'
import Graph from './Graph/Graph'
import mapConfiger from '../utils/minemapConf'
import axiosInstance from '../utils/getInterfaceData'
import { seriesMapData } from './chartsMap/seriesMapdata'

const { Option } = Select
class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: true,
      congestionList: null,
      repairRateList: null,
      singalStatus: null,
      cloudSource: null,
      oprationData: null,
      faultData: null,
      areaMsgList: null,
      coverage: false,
      errline: [0, 0, 0, 0],
      offline: [0, 0, 0, 0],
      online: [0, 0, 0, 0],
      allNum: [0, 0, 0, 0],
      pointlist: null,
      nodeSimulation: [0, 0, 0, 0],
      interNum: [0, 0, 0, 0],
      simulationPlanNum: [0, 0, 0, 0],
      controlModes: null,
      singalTypes: null,
      allControlMode: true,
      allSingalType: true,
      legendMinitor: null,
      legendCondition: null,
      statusType: '1',
      interSingal: null,
      interControlMode: null,
    }
    this.showMode = []
    this.showSingal = []
    this.mapLegend = { condition: true, minitor: true }
    this.interMarkers = []
    this.trafficTimer = null
    this.mapPopup = null
    this.sortColors = ['#00a0e9', '#ff8400', '#9600ff', '#00ffd8', '#8a8000', '#ae5da1', '#920783', '#fff45c', '#e60012',
    '#00ff00', '#7ecef4', '#8f82bc', '#a84200', '#002e73', '#440062', '#81511c', '#00561f', '#facd89']
    this.rateColors = ['#FF0000', '#FF7800', '#FFD800', '#0CB424']
    this.congestionUrl = '/control-application-front/index/getCongestionRanking?user_id=1'
    this.repairRateUrl = '/control-application-front/index/getFailureRepairRate?user_id=1'
    this.staticUrl = '/control-application-front/index/getRealtimeStatistics?user_id=1'
    this.cloudUrl = '/control-application-front/index/getCloudResourceUtilization?user_id=1'
    this.oprationUrl = '/control-application-front/index/getOperatingEfficiency?user_id=1'
    this.faultUrl = '/control-application-front/index/getFaultStatistics?user_id=1'
    this.areaList = '/control-application-front/index/getRealTimeMonitoring?user_id=1'
    this.pointLists = '/control-application-front/index/getPointByFault?user_id=1'
    this.dirMoveList = '/control-application-front/basic/info/listCodeByCodeType' // 方向是6， 灯组类型21
  }
  componentDidMount = () => {
    this.getInterDirMoveList(1)
    this.getInterDirMoveList(13)
    this.getMapPoints()
    this.getAreaMsgLists()
    this.getCongestionList()
    this.getFaulRepairRate()
    this.getSingalStatus()
    this.getCloudSource()
    this.getOprationEfficiency()
    this.getFaultStatistics()
  }
  // 字典查询，控制模式，信号机
  getInterDirMoveList = (type) => {
    axiosInstance.get(`${this.dirMoveList}?codeType=${type}`).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data) {
        if (type === 1) {
          this.controlMode = data.map(item => Object.assign(item, { isShow: true }))
          this.setState({ controlModes: this.controlMode })
        } else {
          this.singalType = data.map(item => Object.assign(item, { isShow: true }))
          this.setState({ singalTypes: this.singalType })
        }
        
      }
    })
  }
  // 添加实时路况
  addTrafficLayer = () => {
    if (this.trafficTimer) {
      clearTimeout(this.trafficTimer)
      this.trafficTimer = null
    }
    this.map.trafficLayer(false)
    this.map.trafficLayer(true)
    this.trafficTimer = setTimeout(() => {
      this.addTrafficLayer()
    }, 30 * 1000)
  }
  // 地图点位
  getMapPoints = () => {
    axiosInstance.post(this.pointLists).then((res) => {
      const { code, errline, offline, online, pointlist } = res.data
      if (code === '1') {
        this.pointLists = pointlist
        this.setState({
          errline,
          offline: ('000' + offline).slice(-4).split(''),
          online: ('000' + online).slice(-4).split(''),
          allNum: ('000' + (errline + offline + online)).slice(-4).split(''),
          pointlist,
        })
      }
    })
  }
  // 区域信息列表
  getAreaMsgLists = () => {
    axiosInstance.post(this.areaList).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ areaMsgList: list })
      } else {
        this.setState({ areaMsgList: null })
      }
      this.renderChartsMap()
    })
  }
  // 实时拥堵排名
  getCongestionList = () => {
    axiosInstance.post(this.congestionUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ congestionList: list })
      } else {
        this.setState({ congestionList: [] })
      }
    })
  }
  // 故障报修率
  getFaulRepairRate = () => {
    axiosInstance.post(this.repairRateUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ repairRateList: list })
      } else {
        this.setState({ repairRateList: [], })
      }
    })
  }
  // 信号机实时状态统计
  getSingalStatus = (type = 1) => {
    axiosInstance.post(`${this.staticUrl}&type=${type}`).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ singalStatus: list })
      } else {
        this.setState({ singalStatus: [] })
      }
    })
  }
  // 云资源占用率
  getCloudSource = () => {
    axiosInstance.post(this.cloudUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        const areaList = []
        const cpus = []
        const harddisks = []
        const memeries = []
        list.forEach((item) => {
          areaList.push(item.district_name)
          cpus.push(item.cpu)
          harddisks.push(item.harddisk)
          memeries.push(item.memory)
        })
        this.setState({ cloudSource: { xData: areaList, cpus, harddisks, memeries } })
      } else {
        this.setState({ cloudSource: null })
      }
    })
  }
  // 运行效率
  getOprationEfficiency = () => {
    axiosInstance.post(this.oprationUrl).then((res) => {
      const { code, lastlist, nowlist, yesterlist } = res.data
      if (code === '1') {
        const xData = lastlist.map(item => item.time)
        const today = nowlist.map(item => item.opt)
        const yesterday = yesterlist.map(item => item.opt)
        const lastday = lastlist.map(item => item.opt)
        this.setState({ oprationData: { xData, today, yesterday, lastday } })
      } else {
        this.setState({ oprationData: null, })
      }
    })
  }
  // 故障统计
  getFaultStatistics = () => {
    axiosInstance.post(this.faultUrl).then((res) => {
      const { code, lastlist, nowlist, yesterlist } = res.data
      if (code === '1') {
        const xData = lastlist.map(item => item.time)
        const today = nowlist.map(item => item.opt)
        const yesterday = yesterlist.map(item => item.opt)
        const lastday = lastlist.map(item => item.opt)
        this.setState({ faultData: { xData, today, yesterday, lastday } })
      } else {
        this.setState({ faultData: null, })
      }
    })
  }
  getInfoWindowHtml = (interMsg) => {
    return `
      <div class="infoWindow">
        <div class="infotitle">${interMsg.unit_name}</div>
        <div class="interMessage">
          <div class="message">设备类型：信号灯</div>
          <div class="message">所属城区：${interMsg.district_name}</div>
          <div class="message">控制状态：${interMsg.control_state}</div>
          <div class="message">信号系统：${interMsg.signal_system_code || ''}</div>
          <div class="message">信号机IP：${interMsg.signal_ip || ''}</div>
          <div class="message">设备状态：${interMsg.alarm_state}</div>
          <div class="message">运行阶段：${interMsg.stage_code || ''}</div>
        </div>
        <div class="interDetails"><div class="monitorBtn"><a style="color:#fff" href="#/interMonitor/${interMsg.id}">路口检测</a></div></div>
      </div>
    `
  }
  addMarker = (points, zoomVal = 8) => {
    this.removeMarkers()
    if (this.map) {
      this.interMarkers = []
      const currentThis = this
      const interList = (zoomVal < 13 && zoomVal > 12) ? points.filter(item => item.unit_imports >= 3) :
                        zoomVal <= 12 ? points.filter(item => item.unit_imports >= 4) : points
      interList.forEach((item, index) => {
        const hasMode = this.showMode.indexOf(item.control_state) < 0
        const hasSingal = this.showSingal.indexOf(item.signal_system_codes) < 0
        const innerBgcolor = item.alarm_state === 1 ? '#08c208' : item.alarm_state === 2 ? '#D7C19C' : '#FF0200'
        const bgColor = item.alarm_state === 1 ? 'rgba(8,194,8,.3)' : item.alarm_state === 2 ? 'rgba(215,193,156,.3)' : 'rgba(255,2,0,.3)'
        if (hasMode && hasSingal) {
          const el = document.createElement('div')
          el.style.width = '20px'
          el.style.height = '20px'
          el.style.borderRadius = '50%'
          el.style.backgroundColor = bgColor
          el.style.display = 'flex'
          el.style.justifyContent = 'center'
          el.style.alignItems = 'center'
          el.style.cursor = 'pointer'
          el.id = 'marker' + item.unit_code
          const childEl = document.createElement('div')
          childEl.style.width = '10px'
          childEl.style.height = '10px'
          childEl.style.borderRadius = '50%'
          childEl.style.backgroundColor = innerBgcolor
          el.appendChild(childEl)
          el.addEventListener('click',function(e){
            currentThis.addInfoWindow(item)
          });
          const marker = new window.mapabcgl.Marker(el)
            .setLngLat([item.longitude, item.latitude])
          .addTo(this.map)
          this.interMarkers.push(marker)
        }
      })
    }
  }
  removeMarkers = () => {
    if (this.interMarkers.length) {
      this.interMarkers.forEach((item) => {
        item.remove()
      })
    }
  }
  addInfoWindow = (marker) => {
    console.log(marker.longitude, marker.latitude)
    if (this.mapPopup) {
      this.mapPopup.remove()
    }
    this.map.addControl(new window.mapabcgl.NavigationControl())
    const popupOption = {
      closeOnClick: false,
      closeButton: true,
      maxWidth: '1000px',
      offset: [0,0]
    }
    this.mapPopup = new window.mapabcgl.Popup(popupOption)
      .setLngLat( new window.mapabcgl.LngLat(marker.longitude, marker.latitude))
      .setHTML(this.getInfoWindowHtml(marker))
      .addTo(this.map)
  }
  renderChartsMap = () => {
    const geoJson = require('./chartsMap/beijing.json')
    echarts.registerMap('beijing', geoJson)
    const optionMap = {
      title: {
          text: '',
          subtext: '',
          x:'center',
      },  
      tooltip : {
          show: false,
          trigger: 'item',
          color: 'auto',
      },
      // 配置属性
      series: [{
        name: '数据',
        type: 'map',
        mapType: 'beijing',
        roam: false,
        zoom: 1.16,
        label: {
          show: false,  //省份名称
        },
        itemStyle: {
          borderColor: '#FDAD3B',
          borderWidth: 1.5,
        },
        color: '#ff0000',
        data: seriesMapData,  //数据
      }]
    }
    const myChart = echarts.init(this.chartMapBox)
    myChart.setOption(optionMap)
    myChart.on('click', (params) => {
      const { name } = params.data
      const { areaMsgList } = this.state
      const currentArea = areaMsgList.find(item => item.district_name === name)
      const { center_longitude, center_latitude } = currentArea
      this.handleCutMap(center_longitude, center_latitude)
    })
  }
  renderMap = (lng, lat) => {
    mapConfiger.zoom = 11
    this.map = new window.mapabcgl.Map(mapConfiger)
    this.map.addControl(new window.mapabcgl.NavigationControl());
    this.map.setCenter([lng, lat])
    this.map.on('load', () => {
      this.addTrafficLayer()
      setTimeout(() => {
        this.addMarker(this.pointLists)
      }, 500)
    })
    this.map.on('zoom', () => {
      if (this.zoomTimer) {
        clearTimeout(this.zoomTimer)
        this.zoomTimer = null
      }
      this.zoomTimer = setTimeout(() => {
        const zoomLev = this.map.getZoom()
        this.zoomLev = zoomLev
        if (this.pointLists.length) {
          this.addMarker(this.pointLists, zoomLev)
        }
      }, 700)
    })
  }
  // 切换地图显示
  handleCutMap = (lng, lat) => {
    this.setState({ mainHomePage: false }, () => {
      this.renderMap(lng, lat)
    })
  }
  // 路口搜索
  handleInterSelect = (value, options) => {
    const { key, lng, lat } = options
    this.map.setCenter([lng, lat])
    this.map.setZoom(15)
    $('#marker' + key).trigger('click',)
  }
  // 地图图例切换
  handleToggleLegend = (e) => {
    const legend = e.currentTarget.getAttribute('legendname')
    if (legend === 'coverage') {
      this.setState({ coverage: !this.state.coverage })
      return
    }
    this.mapLegend[legend] = !this.mapLegend[legend]
    if (legend === 'condition') {
      if (this.mapLegend.condition) {
        this.addTrafficLayer()
        this.setState({ legendCondition: null })
      } else {
        this.setState({ legendCondition: legend })
        if (this.trafficTimer) {
          clearTimeout(this.trafficTimer)
          this.trafficTimer = null
        }
        this.map.trafficLayer(false)
      }
    } else {
      if (this.mapLegend.minitor) {
        console.log('显示视频点位')
        this.setState({ legendMinitor: null })
      } else {
        console.log('隐藏视频点位')
        this.setState({ legendMinitor: legend })
      }
    }
  }
  // 图层控制
  handleControlChange = (e) => {
    const { checked, indexs, mode, all, checkId } = e.target
    const checkList = all === 'allSingalType' ? this.singalType : this.controlMode
    checkList[indexs].isShow = checked
    const isAllCheck = checkList.filter(item => item.isShow === false)
    this.setState({
      [mode]: checkList,
      [all]: isAllCheck.length ? false : true,
    })
    const showArr = all === 'allSingalType' ? this.showSingal : this.showMode
    if (!checked) {
      showArr.push(checkId)
    } else {
      const indexs = showArr.indexOf(checkId)
      showArr.splice(indexs, 1)
    }
    if (this.pointLists.length) {
      this.addMarker(this.pointLists, this.zoomLev)
    }
  }
  // 图层控制全选
  handleAllCheckChange = (e) => {
    const { checked, mode, all } = e.target
    const checkList = all === 'allSingalType' ? this.singalType : this.controlMode
    checkList.forEach(item => item.isShow = checked)
    this.setState({
      [all]: e.target.checked,
      [mode]: checkList,
    })
    const { controlModes, singalTypes } = this.state
    if (all === 'allSingalType') {
      this.showSingal = checked ? [] : singalTypes.map(item => item.cCode)
    } else {
      this.showMode = checked ? [] : controlModes.map(item => item.cCode)
    }
    if (this.pointLists.length) {
      this.addMarker(this.pointLists, this.zoomLev)
    }
  }
  handleToggleSingalStatus = (e) => {
    const types = e.target.getAttribute('statustype')
    this.getSingalStatus(types)
    this.setState({ statusType: types })
  }
  render() {
    const {
      mainHomePage, congestionList, repairRateList, singalStatus, cloudSource, oprationData, faultData, areaMsgList,
      allNum, errline, offline, online, pointlist, coverage, controlModes, singalTypes, allControlMode, allSingalType,
      legendMinitor, legendCondition, statusType
    } = this.state
    return (
      <div className="homepageWrapper">
        <div className="container">
          <div className="asideLeft">
            <div className="asideItem">
              <div className="title">实时拥堵排名</div>
              <div className="itemContent">
                <ul className="jammedSort">
                  {
                    congestionList &&
                    congestionList.map((item, index) => {
                      return (
                        <li className="jammedLi" key={item.district_name}>
                          <div className="areaSort"><span className="sortNo">No.{index + 1}</span> {item.district_name}</div>
                          <div className="sortValue">
                            <span className="progressVal" style={{ width: `${(item.congestion_delay / 10) * 100}%`, backgroundColor: this.sortColors[index] }} />
                            <span className="value">{item.congestion_delay}</span>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className="asideItem">
              <div className="title">运行效率</div>
              <div className="itemContent">
                <div className="runRate">
                  {
                    oprationData &&
                    <Graph chartsDatas={oprationData} />
                  }
                </div>
              </div>
            </div>
            <div className="asideItem">
              <div className="title">云资源占用率</div>
              <div className="itemContent">
                <div className="holdRate">
                  {
                    cloudSource &&
                    <Histogram chartsDatas={cloudSource} />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="asideRight">
            <div className="asideItem">
              <div className="title">故障报修率</div>
              <div className="itemContent">
                <div className="faultRate">
                  {
                    repairRateList &&
                    repairRateList.map((item, index) => {
                      return (
                        <div className="faultDetails" key={item.district_name}>
                          <div className="faultNo" style={{ backgroundColor: index < 4 ? this.rateColors[index] : '#0CB424' }}>{index + 1}</div>
                          <div className="faultArea">{item.district_name}</div>
                          <div className="present">{item.fault_number}%</div>
                          <div className="faultValue">
                            <div className="progress" style={{ width: `${item.fault_number}%` }} />
                            <div className="value">{item.numbers}</div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="asideItem">
              <div className="title">故障统计曲线图</div>
              <div className="itemContent">
                <div className="runRate">
                  {
                    faultData &&
                    <Graph chartsDatas={faultData} />
                  }
                </div>
              </div>
            </div>
            <div className="asideItem">
              <div className="title">信号机实时状态统计</div>
              <div className="itemContent">
                <div className="singalStatus">
                  <div className="statusEach" onClick={this.handleToggleSingalStatus}>
                    <span className={`each ${statusType === '1' ? 'eachActive' : ''}`} statustype="1">区域</span>
                    <span className={`each ${statusType === '2' ? 'eachActive' : ''}`} statustype="2">品牌</span>
                  </div>
                  <div className="statusDetails">
                    {
                      singalStatus &&
                      singalStatus.map((item) => {
                        const onLineRate = (item.online_number / item.input_number) * 100
                        const outLineRate = (item.offline_number / item.input_number) * 100
                        const faultRate = (item.fault_number / item.input_number) * 100
                        return (
                          <div className="singalMsg" key={item.code_name}>
                            <div className="singalName">{item.code_name}</div>
                            <div className="presents">
                              <div className="nomals" style={{ width: `${onLineRate}%` }}><span>{parseInt(onLineRate)}%</span></div>
                              <div className="faults" style={{ width: `${outLineRate}%` }}><span>{parseInt(outLineRate)}%</span></div>
                              <div className="outlines" style={{ width: `${faultRate}%` }}><span>{parseInt(faultRate)}%</span></div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="statusInfo">
                    <div className="legendInfo"><span className="statusLegend nomal" /><span>正常</span></div>
                    <div className="legendInfo"><span className="statusLegend fault" /><span>故障</span></div>
                    <div className="legendInfo"><span className="statusLegend outline" /><span>离线</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            mainHomePage &&
            <div className="contentCenter">
              <div className="title">实时监控</div>
              <div className="centerMain">
                <div className="centerBox">
                  <div className="ceterLeft">
                    {
                      areaMsgList &&
                      areaMsgList.map((item, index) => {
                        if (index < 9) {
                          return (
                            <div className="areaDetails" key={item.district_name}>
                              <div className="areaName">{item.district_name}</div>
                              <div className="details">
                                <div className="msg">
                                  <span className="online">接入：<span className="nomalVal">{item.input_number}</span></span>
                                  <span className="online">在线：<span className="nomalVal">{item.online_number}</span></span>
                                </div>
                                <div className="msg">
                                  <span className="outline">离线：<span className="outlineVal">{item.offline_number}</span></span>
                                  <span className="outline">故障：<span className="faultVal">{item.fault_number}</span></span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                  <div className="center">
                    <div className="topInfo">
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">全市</span>
                          <span>信号点位</span>
                        </div>
                        <div className="infoValue">
                          {/* {interNum.map((item, index) => <span className="infoNum" key={'trar' + item + index}>{item}</span>)} */}
                          {
                            allNum.map((item, index) => <span className="infoNum" key={index}>{item}</span>)
                          }
                        </div>
                      </div>
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">联网</span>
                          <span>接入点位</span>
                        </div>
                        <div className="infoValue">
                          {
                            online.map((item, index) => <span className="infoNum" key={index}>{item}</span>)
                          }
                        </div>
                      </div>
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">离线</span>
                          <span>运行点位</span>
                        </div>
                        <div className="infoValue">
                          {
                            offline.map((item, index) => <span className="infoNum" key={index}>{item}</span>)
                          }
                        </div>
                      </div>
                    </div>
                    <div className="centerMap" ref={(input) => { this.chartMapBox = input }}></div>
                  </div>
                  <div className="centerRight">
                  {
                    areaMsgList &&
                    areaMsgList.map((item, index) => {
                      if (index >= 9) {
                        return (
                          <div className="areaDetails" key={item.district_name}>
                            <div className="areaName">{item.district_name}</div>
                            <div className="details">
                              <div className="msg">
                                <span className="online">接入：<span className="nomalVal">{item.input_number}</span></span>
                                <span className="online">在线：<span className="nomalVal">{item.online_number}</span></span>
                              </div>
                              <div className="msg">
                                <span className="outline">离线：<span className="outlineVal">{item.offline_number}</span></span>
                                <span className="outline">故障：<span className="faultVal">{item.fault_number}</span></span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    })
                  }
                  </div>
                </div>
              </div>
            </div>
          }
          {
            !mainHomePage &&
            <div className="contentCenter">
              <div className="title">实时监控</div>
              <div className="interSearchBox">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="路口查询"
                  autoClearSearchValue
                  dropdownClassName="searchList"
                  filterOption={(input, options) => {
                    const hasVal = options.value.indexOf(input) >= 0
                    const hasSpell = options.spell.indexOf(input.toLowerCase()) >= 0
                    const hasId = String(options.id).indexOf(input) >= 0
                    return (hasVal || hasSpell || hasId)
                  }}
                  onSelect={this.handleInterSelect}
                >
                  {
                    pointlist &&
                    pointlist.map((item) => (
                      <Option key={item.unit_code} value={item.unit_name} lng={item.longitude} lat={item.latitude} spell={item.name_pinyin} id={item.id}>{item.unit_name}</Option>
                    ))
                  }
                </Select>
              </div>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
              <div className="mapLegend">
                <div className="pointStatus">
                  <div className="statusItem"><span className="pointIcon onlineColor"></span> 在线</div>
                  <div className="statusItem"><span className="pointIcon offlineColor"></span> 离线</div>
                  <div className="statusItem"><span className="pointIcon faultColor"></span> 故障</div>
                </div>
              </div>
              <div className="mapLegend" style={{ top: '20px' }}>
                <div className="legendBox">
                  <div className="legendItem" legendname="coverage" onClick={this.handleToggleLegend}><span className="legenIcon coverage"></span> 图层</div>
                  <div className={`legendItem ${legendCondition === 'condition' ? 'legendActive' : ''}`} legendname="condition" onClick={this.handleToggleLegend}><span className="legenIcon condition"></span> 路况</div>
                  <div className={`legendItem ${legendMinitor === 'minitor' ? 'legendActive' : ''}`} legendname="minitor" onClick={this.handleToggleLegend}><span className="legenIcon minitor"></span> 监控</div>
                </div>
                {
                  coverage &&
                  <div className="singalModeBox">
                    <div className="checkMsg">
                      <Checkbox
                        checked={allControlMode}
                        mode="controlModes"
                        all="allControlMode"
                        onChange={this.handleAllCheckChange}>控制模式</Checkbox>
                    </div>
                    <ul style={{ paddingLeft: '20px' }}>
                      {
                        controlModes &&
                        controlModes.map((item, index) => (
                          <li key={item.codeName} className="checkMsg">
                            <Checkbox
                              checked={item.isShow}
                              indexs={index}
                              mode="controlModes"
                              all="allControlMode"
                              checkId={item.cCode}
                              onChange={this.handleControlChange}
                            >{item.codeName}</Checkbox>
                          </li>
                        ))
                      }
                    </ul>
                    <div className="checkMsg">
                      <Checkbox
                        checked={allSingalType}
                        mode="singalTypes"
                        all="allSingalType"
                        onChange={this.handleAllCheckChange}
                      >信号类型</Checkbox>
                    </div>
                    <ul style={{ paddingLeft: '20px' }}>
                      {
                        singalTypes &&
                        singalTypes.map((item, index) => (
                          <li key={item.codeName} className="checkMsg">
                            <Checkbox
                              checked={item.isShow}
                              indexs={index}
                              mode="singalTypes"
                              all="allSingalType"
                              checkId={item.cCode}
                              onChange={this.handleControlChange}
                            >{item.codeName}</Checkbox></li>
                        ))
                      }
                    </ul>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Homepage
