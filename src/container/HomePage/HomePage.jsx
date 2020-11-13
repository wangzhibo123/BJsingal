import React, { Component } from 'react'
import { Checkbox, Select } from 'antd'
import echarts from 'echarts'
import $ from 'jquery'
import './HomePage.scss'

import Histogram from './Histogram/Histogram'
import Graph from './Graph/Graph'
import mapConfiger from '../utils/minemapConf'
import axiosInstance from '../utils/getInterfaceData'

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
    }
    this.mapLegend = { condition: true, minitor: true }
    this.interMarkers = []
    this.trafficTimer = null
    this.mapPopup = null
    this.sortColors = ['#00BAFF', '#FF8400', '#9600FF', '#00FFD8', '#FF8400', '#00BAFF']
    this.rateColors = ['#FF0000', '#FF7800', '#FFD800', '#0CB424']
    this.congestionUrl = '/control-application-front/index/getCongestionRanking?user_id=1'
    this.repairRateUrl = '/control-application-front/index/getFailureRepairRate?user_id=1'
    this.staticUrl = '/control-application-front/index/getRealtimeStatistics?user_id=1'
    this.cloudUrl = '/control-application-front/index/getCloudResourceUtilization?user_id=1'
    this.oprationUrl = '/control-application-front/index/getOperatingEfficiency?user_id=1'
    this.faultUrl = '/control-application-front/index/getFaultStatistics?user_id=1'
    this.areaList = '/control-application-front/index/getRealTimeMonitoring?user_id=1'
    this.pointLists = '/control-application-front/index/getPointByFault?user_id=1'
    this.controlMode = ['时间表控制', '感应控制', '平台优化控制', '中心手动控制', '路口手动控制']
    this.singalType = ['西门子', '海信', '易华录', '千方', '中兴']
  }
  componentDidMount = () => {
    // this.renderChartsMap()
    this.getAreaMsgLists()
    this.getCongestionList()
    this.getFaulRepairRate()
    this.getSingalStatus()
    this.getCloudSource()
    this.getOprationEfficiency()
    this.getFaultStatistics()
    this.getMapPoints()
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
    }, 10 * 1000)
  }
  // 地图点位
  getMapPoints = () => {
    axiosInstance.post(this.pointLists).then((res) => {
      console.log(res)
      const { code, errline, offline, online, pointlist } = res.data
      if (code === '1') {
        this.pointLists = pointlist
        this.setState({
          errline,
          offline: ('000' + offline).slice(-4).split(''),
          online: ('000' + online).slice(-4).split(''),
          allNum: ('000' + (errline + offline + online)).slice(-4).split(''),
          pointlist
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
  getSingalStatus = () => {
    axiosInstance.post(this.staticUrl).then((res) => {
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
          <div class="message">信号系统：${interMsg.signal_system_code}</div>
          <div class="message">信号机IP：${interMsg.signal_ip}</div>
          <div class="message">设备状态：${interMsg.alarm_state}</div>
          <div class="message">运行阶段：${interMsg.stage_code}</div>
        </div>
        <div class="interDetails"><div class="monitorBtn">路口检测</div></div>
      </div>
    `
  }
  addMarker = (points, zoomVal = 8) => {
    this.removeMarkers()
    if (this.map) {
      const currentThis = this
      this.markers = []
      const interList = zoomVal < 13 ? points.filter(item => item.unit_grade <= 4) : points
      console.log(interList)
      interList.forEach((item, index) => {
        const el = document.createElement('div')
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = 'green'
        el.style.cursor = 'pointer'
        el.id = 'marker' + item.unit_code
        el.addEventListener('click',function(e){
          currentThis.addInfoWindow(item)
        });
        if (isNaN(item.longitude) || isNaN(item.latitude)) {
          console.log(index)
        }
        const marker = new window.mapabcgl.Marker(el)
          .setLngLat([item.longitude, item.latitude])
        .addTo(this.map)
        this.interMarkers.push(marker)
      })
    }
  }
  removeMarkers = () => {
    if (this.interMarkers.length) {
      this.interMarkers.forEach((item) => {
        item.remove()
      })
      this.interMarkers = []
    }
  }
  addInfoWindow = (marker) => {
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
    // $('.mapabcgl-popup')[0].style.maxWidth = '1000px'
  }
  renderChartsMap = () => {
    const geoJson = require('./beijing.json')
    echarts.registerMap('beijing', geoJson);
    const optionMap = {
      // backgroundColor: '#FFFFFF',  
      title: {  
          text: '',  
          subtext: '',  
          x:'center'  
      },  
      tooltip : {  
          trigger: 'item'  
      },
      // 左侧小导航图标
      visualMap: {  
        show : false,
        x: 'left',
        y: 'center',
        splitList: [
            {start: 500, end:600},{start: 400, end: 500},
            {start: 300, end: 400},{start: 200, end: 300},
            {start: 100, end: 200},{start: 0, end: 100},
        ],
        color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']
      },
      // 配置属性
      series: [{
        name: '数据',
        type: 'map',
        mapType: 'beijing',
        roam: true,
        label: {
          normal: {
              show: true  //省份名称
          },
          emphasis: {
              show: false
          }
        },
        data:[]  //数据
      }]  
    }
    const myChart = echarts.init(this.chartMapBox)
    myChart.setOption(optionMap)
  }
  renderMap = () => {
    mapConfiger.zoom = 11
    this.map = new window.mapabcgl.Map(mapConfiger)
    this.map.addControl(new window.mapabcgl.NavigationControl());
    this.map.on('load', () => {
      this.addTrafficLayer()
      this.addMarker(this.pointLists)
    })
    this.map.on('zoom', () => {
      if (this.zoomTimer) {
        clearTimeout(this.zoomTimer)
        this.zoomTimer = null
      }
      this.zoomTimer = setTimeout(() => {
        const zoomLev = Math.round(this.map.getZoom())
        this.addMarker(this.pointLists, zoomLev)
      }, 700)
    })
  }
  randomData = () => {  
    return Math.round(Math.random()*500);  
  }
  handleCutMap = () => {
    this.setState({ mainHomePage: false }, () => {
      this.renderMap()
    })
  }
  // 路口搜索
  handleInterSearch = (value, options) => {
    console.log(value, options)
    const { key, lng, lat } = options
    this.map.panTo([lng, lat])
    $('#marker' + key).trigger('click')
  }
  handleToggleLegend = (e) => {
    const legend = e.currentTarget.getAttribute('legendname')
    if (legend === 'coverage') {
      this.setState({ coverage: !this.state.coverage })
    } else {
      this.mapLegend[legend] = !this.mapLegend[legend]
      if (this.mapLegend.condition) {
        this.addTrafficLayer()
      } else {
        if (this.trafficTimer) {
          clearTimeout(this.trafficTimer)
          this.trafficTimer = null
        }
        this.map.trafficLayer(false)
      }
      if (this.mapLegend.minitor) {
        console.log('显示视频点位')
      } else {
        console.log('隐藏视频点位')
      }
    }
    
  }
  render() {
    const {
      mainHomePage, congestionList, repairRateList, singalStatus, cloudSource, oprationData, faultData, areaMsgList,
      allNum, errline, offline, online, pointlist, coverage
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
                          <div className="present">{(item.fault_number / 10) * 100}%</div>
                          <div className="faultValue">
                            <div className="progress" style={{ width: `${(item.fault_number / 10) * 100}%` }} />
                            <div className="value">{item.fault_number}</div>
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
                  <div className="statusEach"><span className="each">区域</span><span className="each">品牌</span></div>
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
                              <div className="nomals" style={{ width: `${onLineRate}%` }}><span>{onLineRate}%</span></div>
                              <div className="faults" style={{ width: `${outLineRate}%` }}><span>{outLineRate}%</span></div>
                              <div className="outlines" style={{ width: `${faultRate}%` }}><span>{faultRate}%</span></div>
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
                    <div className="centerMap" onClick={this.handleCutMap} ref={(input) => { this.chartMapBox = input }}></div>
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
                  onChange={this.handleInterSearch}
                  dropdownClassName="searchList"
                >
                  {
                    pointlist &&
                    pointlist.map((item) => (
                      <Option key={item.unit_code} value={item.unit_name} lng={item.longitude} lat={item.latitude}>{item.unit_name}</Option>
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
                  <div className="legendItem" legendname="condition" onClick={this.handleToggleLegend}><span className="legenIcon condition"></span> 路况</div>
                  <div className="legendItem" legendname="minitor" onClick={this.handleToggleLegend}><span className="legenIcon minitor"></span> 监控</div>
                </div>
                {
                  coverage &&
                  <div className="singalModeBox">
                    <div className="checkMsg"><Checkbox>控制模式</Checkbox></div>
                    <ul style={{ paddingLeft: '20px' }}>
                      {
                        this.controlMode.map((item) => (<li key={item} className="checkMsg"><Checkbox>{item}</Checkbox></li>))
                      }
                      <li className="checkMsg"><Checkbox>其他</Checkbox></li>
                    </ul>
                    <div className="checkMsg"><Checkbox>型号类型</Checkbox></div>
                    <ul style={{ paddingLeft: '20px' }}>
                      {
                        this.singalType.map((item) => (<li key={item} className="checkMsg"><Checkbox>{item}</Checkbox></li>))
                      }
                      <li className="checkMsg"><Checkbox>其他</Checkbox></li>
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
