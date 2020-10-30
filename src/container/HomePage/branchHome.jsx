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
    }
    this.trafficTimer = null
    this.sortColors = ['#00BAFF', '#FF8400', '#9600FF', '#00FFD8', '#FF8400', '#00BAFF']
    this.rateColors = ['#FF0000', '#FF7800', '#FFD800', '#0CB424']
    this.congestionUrl = '/engine-unified/index/getCrossGongestion?user_id=2'
    this.singalStatusUrl = '/engine-unified/index/getSignalRealState?user_id=2'
    this.controlCountUrl = '/engine-unified/index/getControlCount?user_id=2'
    this.oprationUrl = '/engine-unified/index/getOperatingEfficiency?user_id=2'
    this.faultUrl = '/engine-unified/index/getFaultStatistics?user_id=2'
    this.staticUrl = '/engine-unified/index/getRealtimeStatistics?user_id=2'
    this.pointLists = '/engine-unified/index/getPointByFault?user_id=2'
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
  addMarker = (points) => {
    if (this.map) {
      const currentThis = this
      this.markers = []
      points.forEach((item, index) => {
        const el = document.createElement('div')
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = 'green'
        el.style.cursor = 'pointer'
        el.addEventListener('click',function(e){
          currentThis.addInfoWindow(item) 
        });
        new window.mapabcgl.Marker(el)
          .setLngLat([item.longitude, item.latitude])
          .addTo(this.map)
      })
    }
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
    }, 5 * 1000)
  }
  // 地图点位
  getMapPoints = () => {
    axiosInstance.post(this.pointLists).then((res) => {
      console.log(res)
      const { code, errline, offline, online, pointlist } = res.data
      if (code === '1') {
        this.pointLists = pointlist
        this.setState({ errline, offline, online, pointlist })
        this.addMarker(this.pointLists)
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
  renderMap = () => {
    mapConfiger.zoom = 11
    this.map = new window.mapabcgl.Map(mapConfiger)
    this.map.addControl(new window.mapabcgl.NavigationControl());
    this.map.on('load', () => {
      this.addTrafficLayer()
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
    const { mainHomePage, congestionList, controlCount, singalStatus, oprationData, faultData, controlStatus } = this.state
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
                          <span className="infoText">房山区</span>
                          <span>信号点位</span>
                        </div>
                        <div className="infoValue">
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
                          <i className="numText">处</i>
                        </div>
                      </div>
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">联网</span>
                          <span>接入点位</span>
                        </div>
                        <div className="infoValue">
                          <span className="infoNum">5</span>
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
                          <i className="numText">处</i>
                        </div>
                      </div>
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">离线</span>
                          <span>运行点位</span>
                        </div>
                        <div className="infoValue">
                          <span className="infoNum">2</span>
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
                          <i className="numText">处</i>
                        </div>
                      </div>
                    </div>
                    <div className="centerMap" onClick={this.handleCutMap} ref={(input) => { this.chartMapBox = input }}></div>
                  </div>
                </div>
              </div>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default branchHome
