import React, { Component } from 'react'
import echarts from 'echarts'
import './HomePage.scss'

import Histogram from './Histogram/Histogram'
import Graph from './Graph/Graph'
import mapConfiger from '../utils/minemapConf'
import axiosInstance from '../utils/getInterfaceData'

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
      errline: '0',
      offline: '0',
      online: '0',
      pointlist: null,
    }
    this.sortColors = ['#00BAFF', '#FF8400', '#9600FF', '#00FFD8', '#FF8400', '#00BAFF']
    this.rateColors = ['#FF0000', '#FF7800', '#FFD800', '#0CB424']
    this.congestionUrl = '/engine-unified/index/getCongestionRanking?user_id=1'
    this.repairRateUrl = '/engine-unified/index/getFailureRepairRate?user_id=1'
    this.staticUrl = '/engine-unified/index/getRealtimeStatistics?user_id=1'
    this.cloudUrl = '/engine-unified/index/getCloudResourceUtilization?user_id=1'
    this.oprationUrl = '/engine-unified/index/getOperatingEfficiency?user_id=1'
    this.faultUrl = '/engine-unified/index/getFaultStatistics?user_id=1'
    this.areaList = '/engine-unified/index/getRealTimeMonitoring?user_id=1'
    this.pointLists = '/engine-unified/index/getPointByFault?user_id=1'
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
  // 地图点位
  getMapPoints = () => {
    axiosInstance.post(this.pointLists).then((res) => {
      console.log(res)
      const { code, errline, offline, online, pointlist } = res.data
      if (code === '1') {
        this.pointLists = pointlist
        this.setState({ errline, offline, online, pointlist })
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
  addMarker = (points) => {
    if (this.map) {
      
      this.markers = []
      points.forEach((item, index) => {
        const el = document.createElement('div')
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = 'green'
        const marker = new window.mapabcgl.Marker(el)
              .setLngLat([item.longitude, item.latitude])
              .addTo(this.map);
      })
    }
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
      
      //左侧小导航图标
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
      
      //配置属性
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
          data:[  
            {name: '北京',value: '100' },{name: '天津',value: this.randomData() },  
            {name: '上海',value: this.randomData() },{name: '重庆',value: this.randomData() },  
            {name: '河北',value: this.randomData() },{name: '河南',value: this.randomData() },  
            {name: '云南',value: this.randomData() },{name: '辽宁',value: this.randomData() },  
            {name: '黑龙江',value: this.randomData() },{name: '湖南',value: this.randomData() },  
            {name: '安徽',value: this.randomData() },{name: '山东',value: this.randomData() },  
            {name: '新疆',value: this.randomData() },{name: '江苏',value: this.randomData() },  
            {name: '浙江',value: this.randomData() },{name: '江西',value: this.randomData() },  
            {name: '湖北',value: this.randomData() },{name: '广西',value: this.randomData() },  
            {name: '甘肃',value: this.randomData() },{name: '山西',value: this.randomData() },  
            {name: '内蒙古',value: this.randomData() },{name: '陕西',value: this.randomData() },  
            {name: '吉林',value: this.randomData() },{name: '福建',value: this.randomData() },  
            {name: '贵州',value: this.randomData() },{name: '广东',value: this.randomData() },  
            {name: '青海',value: this.randomData() },{name: '西藏',value: this.randomData() },  
            {name: '四川',value: this.randomData() },{name: '宁夏',value: this.randomData() },  
            {name: '海南',value: this.randomData() },{name: '台湾',value: this.randomData() },  
            {name: '香港',value: this.randomData() },{name: '澳门',value: this.randomData() }  
        ]  //数据
      }]  
    }
    
    const myChart = echarts.init(this.chartMapBox)
    myChart.setOption(optionMap)
  }
  renderMap = () => {
    mapConfiger.zoom = 11
    const map = new window.mapabcgl.Map(mapConfiger)
    map.addControl(new window.mapabcgl.NavigationControl());
    const options = {
      minzoom: 1, // 路况显示的最小级别(1-24)
      maxzoom: 24, // 路况显示的最大级别(1-24)
      type: 'vector', // 路况图层类型:vector(矢量),raster(栅格)
      refresh: 30*1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on('load', () => {
      map.trafficLayer(true, options);
      this.addMarker(this.pointLists)
    })
    this.map = map
  }
  randomData = () => {  
    return Math.round(Math.random()*500);  
  } 
  handleCutMap = () => {
    this.setState({ mainHomePage: false }, () => {
      this.renderMap()
    })
  }
  render() {
    const { mainHomePage, congestionList, repairRateList, singalStatus, cloudSource, oprationData, faultData, areaMsgList } = this.state
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
                        <li className="jammedLi" key={item.area_id}>
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
                        <div className="faultDetails" key={item.area_id}>
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
                        if (index < 10) {
                          return (
                            <div className="areaDetails" key={item.area_id}>
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
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
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
                        </div>
                      </div>
                    </div>
                    <div className="centerMap" onClick={this.handleCutMap} ref={(input) => { this.chartMapBox = input }}></div>
                  </div>
                  <div className="centerRight">
                  {
                    areaMsgList &&
                    areaMsgList.map((item, index) => {
                      if (index > 9) {
                        return (
                          <div className="areaDetails" key={item.area_id}>
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
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Homepage
