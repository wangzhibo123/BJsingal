import React, { Component } from 'react'
import './branchHome.scss'

// import Histogram from './Histogram/Histogram'
// import Graph from './Graph/Graph'
import mapConfiger from '../utils/minemapConf'
import Graph from './Graph/Graph'
import GraphPlus from '../../components/GraphPlus/GraphPlus'
import axiosInstance from '../utils/getInterfaceData'

class branchHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      congestionList: null,
      controlCount: null,
      singalStatus: null,
      oprationData: null,
      faultData: null,
      controlStatus: null,
      nodeSimulation: [0, 0, 0, 0],
      interNum: [0, 0, 0, 0],
      simulationPlanNum: [0, 0, 0, 0],
      branchName: null,
    }
    this.interMarkers = []
    this.showMode = []
    this.showSingal = []
    this.trafficTimer = null
    this.sortColors = ['#00BAFF', '#FF8400', '#9600FF', '#00FFD8', '#FF8400', '#00BAFF']
    this.rateColors = ['#FF0000', '#FF7800', '#FFD800', '#0CB424']
    this.congestionUrl = '/control-application-front/index/getCrossGongestion?user_id=2'
    this.singalStatusUrl = '/control-application-front/index/getSignalRealState?user_id=2'
    this.controlCountUrl = '/control-application-front/index/getControlCount?user_id=2'
    this.oprationUrl = '/control-application-front/index/getOperatingEfficiency?user_id=2'
    this.faultUrl = '/control-application-front/index/getFaultStatistics?user_id=2'
    this.staticUrl = '/control-application-front/index/getRealtimeStatistics?user_id=2'
    this.pointLists = '/control-application-front/index/getPointByFault?user_id=2'
  }
  componentDidMount = () => {
    this.renderMap()
    this.getMapPoints()
    this.getCongestionList()
    this.getControlCounts()
    this.getSingalStatus()
    this.getOprationEfficiency()
    this.getFaultStatistics()
    this.getSingalControl()
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
  // 添加实时路况
  addTrafficLayer = () => {
    if (this.trafficTimer) {
      clearTimeout(this.trafficTimer)
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
      console.log(res)
      const { code, errline, offline, online, pointlist } = res.data
      if (code === '1') {
        this.pointLists = pointlist
        this.setState({ errline, offline, online, pointlist, branchName: pointlist[0].district_name })
        // this.addMarker(this.pointLists)
        let num = 0
        let numTwo = 0
        let numThree = 0
        this.timeOne = setInterval(() => {
          if (num >= online) { clearInterval(this.timeOne) }
          const nodeSimulation = ('000' + num).slice(-4).split('')
          this.setState({ nodeSimulation }, () => {
            num += online
          })
        }, 0)
        this.timeTwo = setInterval(() => {
          if (numTwo >= (errline + offline + online)) { clearInterval(this.timeTwo) }
          const interNum = ('000' + numTwo).slice(-4).split('')
          this.setState({ interNum }, () => {
            numTwo += (errline + offline + online)
          })
        }, 0)
        this.timeThree = setInterval(() => {
          if (numThree >= offline) { clearInterval(this.timeThree) }
          const simulationPlanNum = ('000' + numThree).slice(-4).split('')
          this.setState({ simulationPlanNum }, () => {
            numThree += offline
          })
        }, 0)
      }
    })
  }
  // 手动控制次数
  getControlCounts = () => {
    axiosInstance.post(this.controlCountUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ controlCount: list })
      } else {
        this.setState({ controlCount: [] })
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
  // 信号实时控制状态状态
  getSingalControl = () => {
    axiosInstance.post(this.singalStatusUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        const xData = []
        const datas = []
        list.forEach((item) => {
          xData.push(item.code_name)
          datas.push(item.num)
        })
        this.setState({ controlStatus: { xData, datas } })
      } else {
        this.setState({ controlStatus: null })
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
  // 信号机实时状态统计
  getSingalStatus = (type = 2) => {
    axiosInstance.post(`${this.staticUrl}&type=${type}`).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ singalStatus: list })
      } else {
        this.setState({ singalStatus: [] })
      }
    })
  }
  renderMap = () => {
    mapConfiger.zoom = 11
    this.map = new window.mapabcgl.Map(mapConfiger)
    this.map.addControl(new window.mapabcgl.NavigationControl());
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
        const zoomLev = Math.round(this.map.getZoom())
        this.zoomLev = zoomLev
        if (this.pointLists.length) {
          this.addMarker(this.pointLists, zoomLev)
        }
      }, 700)
    })
  }
  randomData = () => {
    return Math.round(Math.random() * 500);
  }
  handleCutMap = () => {
    this.setState({ mainHomePage: false }, () => {
      this.renderMap()
    })
  }
  render() {
    const {
      mainHomePage, congestionList, controlCount, singalStatus, oprationData, faultData, controlStatus,
      nodeSimulation, interNum, simulationPlanNum, branchName, statusType
    } = this.state
    return (
      <div className="branchHomeWrapper">
        <div className="container">
          <div className="asideLeft">
            <div className="asideItem">
              <div className="title">实时拥堵排名</div>
              <div className="itemContent">
                <div className="runRate">
                  <ul className="jammedSort">
                    {
                      congestionList &&
                      congestionList.map((item, index) => {
                        return (
                          <li className="jammedLi" key={item.unit_name}>
                            <div className="areaSort"><span className="sortNo">No.{index + 1}</span> {item.unit_name}</div>
                            <div className="sortValue">
                              <span className="progressVal" style={{ width: `${(item.occupancy / 10) * 100}%`, backgroundColor: this.sortColors[index] }} />
                              <span className="value">{item.occupancy}</span>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
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
              <div className="title">实时信号控制状态</div>
              <div className="itemContent">
                <div className="holdRate">
                  {/* <Histogram /> */}
                  {
                    controlStatus &&
                    <GraphPlus chartsDatas={controlStatus} colors={{startColor: 'rgba(21,55,83,.6)', endColor: 'rgba(0,207,253,.6)', lidColor: '#00C5FA'}} />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="asideRight">
            <div className="asideItem">
              <div className="title">手动控制次数</div>
              <div className="itemContent">
                <div className="faultRate">
                  {
                    controlCount &&
                    controlCount.map((item, index) => (
                      <div className="faultDetails" key={item.unit_name}>
                        <div className="faultNo" style={{ backgroundColor: this.rateColors[index] }}>{index + 1}</div>
                        <div className="faultArea">{item.unit_name}</div>
                        <div className="times">{item.time}</div>
                        <div className="faultValue">
                          <div className="progress" style={{ width: `${(item.num / 10) * 100}%` }} />
                          <div className="value">{item.num}</div>
                        </div>
                      </div>
                    ))
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

            </div>
          }
          {
            !mainHomePage &&
            <div className="contentCenter">
              <div className="title">实时监控</div>
              <div className="centerMain">
                <div className="centerBox">
                  <div className="center">
                    <div className="topInfo">
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">{branchName}</span>
                          <span>信号点位</span>
                        </div>
                        <div className="infoValue">
                          {interNum.map((item, index) => <span className="infoNum" key={'trar' + item + index}>{item}</span>)}
                          <i className="numText">处</i>
                        </div>
                      </div>
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">联网</span>
                          <span>接入点位</span>
                        </div>
                        <div className="infoValue">
                          {nodeSimulation.map((item, index) => <span className="infoNum" key={'trar' + item + index}>{item}</span>)}
                          <i className="numText">处</i>
                        </div>
                      </div>
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">离线</span>
                          <span>运行点位</span>
                        </div>
                        <div className="infoValue">
                          {simulationPlanNum.map((item, index) => <span className="infoNum" key={'trar' + item + index}>{item}</span>)}
                          <i className="numText">处</i>
                        </div>
                      </div>
                    </div>
                    <div className="centerMap" onClick={this.handleCutMap} ref={(input) => { this.chartMapBox = input }}></div>
                  </div>
                </div>
              </div>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
              <div className="mapLegend">
                <div className="pointStatus">
                  <div className="statusItem"><span className="pointIcon onlineColor"></span> 在线</div>
                  <div className="statusItem"><span className="pointIcon offlineColor"></span> 离线</div>
                  <div className="statusItem"><span className="pointIcon faultColor"></span> 故障</div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default branchHome
