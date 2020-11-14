import React, { Component } from 'react'
import { Menu, Select, Switch, Modal } from 'antd'
import { SearchOutlined, DoubleRightOutlined, DoubleLeftOutlined, ZoomOutOutlined } from '@ant-design/icons';
import './Region.scss'
import $ from 'jquery'
import iconLeftBus from '../imgs/iconLeftBBus.png'
import iconRightBus from '../imgs/iconRightBBus.png'
import mapConfiger from '../utils/minemapConf'
import Graph from './Graph/Graph'
import GraphSingle from './GraphSingle/GraphSingle'
import Histogram from './Histogram/Histogram'
import Pie from './Pie/Pie'
const { SubMenu } = Menu;
const lineData = [
  [116.33625304425573,39.976441853446744],
  [116.33878504956658,39.976441853446744],
  [116.34399926389074,39.976441853446744]
] 
class BusPriority extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      cloudSource: null,
      roadInterFlag: false, // 路口的显示隐藏状态
      timeNum: 30,
      priorityReqName:['申请次数'],
      priorityReqDatas:[
        {'x_name':'00:00','y_amount':3},
        {'x_name':'02:00','y_amount':7},
        {'x_name':'04:00','y_amount':5},
        {'x_name':'06:00','y_amount':6},
        {'x_name':'08:00','y_amount':12},
      ],
      prioritySucName:['优先次数'],
      prioritySucDatas:[
        {'x_name':'00:00','y_amount':12},
        {'x_name':'02:00','y_amount':4},
        {'x_name':'04:00','y_amount':2},
        {'x_name':'06:00','y_amount':8},
        {'x_name':'08:00','y_amount':20},
      ],
      flowName:['上行进口','下行进口'],
      flowDatas:[
        [
          {'x_name':'00:00','y_amount':12},
          {'x_name':'02:00','y_amount':4},
          {'x_name':'04:00','y_amount':2},
          {'x_name':'06:00','y_amount':8},
          {'x_name':'08:00','y_amount':20},
        ],
        [
          {'x_name':'00:00','y_amount':3},
          {'x_name':'02:00','y_amount':7},
          {'x_name':'04:00','y_amount':5},
          {'x_name':'06:00','y_amount':6},
          {'x_name':'08:00','y_amount':12},
        ]
      ],
      statisticsName:['今日','昨日'],
      statisticsDatas:[
        [
          {'x_name':'00:00','y_amount':12},
          {'x_name':'02:00','y_amount':4},
          {'x_name':'04:00','y_amount':2},
          {'x_name':'06:00','y_amount':8},
          {'x_name':'08:00','y_amount':20},
        ],
        [
          {'x_name':'00:00','y_amount':3},
          {'x_name':'02:00','y_amount':7},
          {'x_name':'04:00','y_amount':5},
          {'x_name':'06:00','y_amount':6},
          {'x_name':'08:00','y_amount':12},
        ]
      ],
    }
    this.mapPopup = null
  }
  componentDidMount = () => {
    this.renderMap()
    window.showHide = this.showHide
    const cloudSource = {"list":[{"district_name":"检测数","memory":45,"harddisk":76},{"district_name":"请求数","memory":85,"harddisk":60}]}
    const areaList = []
    const harddisks = []
    const memeries = []
    cloudSource.list.forEach((item) => {
      areaList.push(item.district_name)
      harddisks.push(item.harddisk)
      memeries.push(item.memory)
    })
    this.setState({ cloudSource: { xData: areaList, harddisks, memeries } }) 
    const deg = this.bearing([116.33354937757014,39.97513460652752],[116.33354937757014,39.978554772010085])
    console.log('夹角度度', deg)
    setTimeout(() => {
      this.drawLine(lineData)
    }, 500)
  }
  timeCountdown = (timeNum) => {
    if (this.state.roadInterFlag) {
      setTimeout( () => {
        timeNum--
        this.setState({
          timeNum
        },() => {
          if (this.state.timeNum !== 0) {
            this.timeCountdown(this.state.timeNum)
          } else {
            this.setState({
              timeNum: 30
            }, () => {
              this.timeCountdown(this.state.timeNum)
            })
          }
        })
      },1000)
    }else{
      this.setState({
        timeNum: 30
      })
    }
  }
  addBus = (points, degs) => {
    this.addMarker()
    if (this.map) {
      const currentThis = this
      this.markers = []
      points.forEach((item, index) => {
        if (index !== points.length) {
          const el = document.createElement('div')
          el.style.width = '54px'
          el.style.height = '32px'
          el.style.margin = '-17px 0 0 0'
          el.style.background = `url(${iconLeftBus})`;
          el.style.cursor = 'pointer'
          $(el).attr('rotateRset','reset')
          new window.mapabcgl.Marker(el)
            .setLngLat([item[0], item[1]])
            .addTo(this.map)
        }
      })

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
      offset: [0,0]
    }
    this.mapPopup = new window.mapabcgl.Popup(popupOption)
      .setLngLat( new window.mapabcgl.LngLat(marker[0], marker[1]))
      .setHTML(this.getInfoWindowHtml(marker))
      .addTo(this.map)
    $('.mapabcgl-popup')[0].style.maxWidth = '1000px'
  }
  showHide = () => {
    this.setState({
      roadInterFlag: !this.state.roadInterFlag
    })
    this.renderPopLayerMap(this.returnCenterLnglat(lineData[0],lineData[lineData.length - 1]))
    this.timeCountdown(this.state.timeNum)
  }
  getInfoWindowHtml = (itemData) => {
    return `
      <div class="infoWindow">
        <div class="infotitle">XXX路与XXX路口</div>
        <div class="interMessage">
          <div class="message">当天请求次数：50</div>
          <div class="message">当天优先时间：120</div>
          <div class="message">当前优先时间：4</div>
          <div class="message">请求出发方向：东向西</div>
          <div class="message">路口状态：优先请求</div>
          <div class="message">上行车辆：3辆</div>
          <div class="message">下行车辆：0辆</div>
        </div>
        <div class="interDetails"><div class="monitorBtn" onclick="showHide()">路口监控</div></div>
      </div>
    `
  }
  addMarker = () => {
    if (this.map) {
      const elParent = document.createElement('div')
      elParent.style.width = '40px'
      elParent.style.height = '20px'
      elParent.style.position = 'relative'
      const elAnimation = document.createElement('div')
      elAnimation.setAttribute('class','animationS')
      const el = document.createElement('div')
      el.style.width = '40px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'rgba(34,245,248)'
      el.style.cursor = 'pointer'
      el.style.position = 'absolute'
      el.style.left = '0'
      el.style.top = '0'
      el.setAttribute("title", '中心点')
      el.addEventListener('click', () => {
        this.addInfoWindow(this.returnCenterLnglat(lineData[0], lineData[lineData.length - 1]))
      })
      elParent.appendChild(elAnimation)
      elParent.appendChild(el)
      new window.mapabcgl.Marker(elParent)
        .setLngLat(this.returnCenterLnglat(lineData[0], lineData[lineData.length - 1]))
        .addTo(this.map);
    }
  }
  renderPopLayerMap = (centerPoint) => {
    const styleUrl = process.env.NODE_ENV === 'development' ? 'mapabc://style/mapabc80' : 'mapabc://style/mapabc80'
    const mineMapConf = {
      container: 'mapPopContainer',
      style: styleUrl,
      center: centerPoint,
      zoom: 16,
      pitch: 0,
      maxZoom: 17,
      minZoom: 3,
    }
    new window.mapabcgl.Map(mineMapConf)
  }
  renderMap = () => {
    mapConfiger.zoom = 11
    const map = new window.mapabcgl.Map(mapConfiger)
    map.addControl(new window.mapabcgl.NavigationControl());
    const options = {
      minzoom: 1, // 路况显示的最小级别(1-24)
      maxzoom: 24, // 路况显示的最大级别(1-24)
      type: 'vector', // 路况图层类型:vector(矢量),raster(栅格)
      refresh: 30 * 1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on('load', () => {
      map.trafficLayer(true, options);
      window.onbeforeunload = function (e) {
        map.removeLayerAndSource('icon');
      };
    })
    map.on('click', (e) => {
      console.log('地图触发点：',e.lngLat.lng,e.lngLat.lat)
    })
    map.setZoom(15)
    map.setCenter([116.33861338819071,39.97636785900676])
    this.map = map
  }
  // 计算起始与终点之间的中心点 > 用于重置地图中心点
  returnCenterLnglat = (startPoint, endPoint) => {
    const lng = startPoint[0] + (Math.abs(startPoint[0] - endPoint[0]) / 2)
    const lat = startPoint[1] + (Math.abs(startPoint[1] - endPoint[1]) / 2)
    return [lng, lat]
  }
  /*
    * 弧度转换为角度
  */
  radiansToDegrees = (radians) => {
    const degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
  }
  // 两个经纬度转换成夹角度
  bearing = (start, end) => {
    let rad = Math.PI / 180,
        lat1 = start[1] * rad,
        lat2 = end[1] * rad,
        lon1 = start[0] * rad,
        lon2 = end[0] * rad;
    const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const b = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    return this.radiansToDegrees(Math.atan2(a, b));
  }
  deleteLine = (lineId) => {
    if (this.map) {
      const map = this.map
      map.removeLayer("route")
      map.removeSource("route")
    }
  }
  drawLine = (lineData, lineId, lineColor, lineWidth) => {
    const degsArr = []; // 所有两点间的夹角度
    if (this.map) {
      this.map.addLayer({
        "id": lineId ? lineId : 'demo1',
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": lineData
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": lineColor ? lineColor : 'yellow',
          "line-width": lineWidth ? lineWidth : 6
        }
      });
      this.map.setCenter(this.returnCenterLnglat(lineData[0],lineData[lineData.length - 1]))
      for ( let i = 0; i< lineData.length; i++) {
        if (lineData[i+1]){
          degsArr.push(Number(this.bearing(lineData[i],lineData[i+1]).toFixed(2)))
        }
      }
    }
    this.addBus(lineData, degsArr)
  }
  handleClick = e => {
    console.log('click ', e);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  handleClckMessge = () => {
  }

  render() {
    const { Option } = Select
    const { mainHomePage, cloudSource, roadInterFlag, timeNum, priorityReqName, priorityReqDatas, prioritySucName, prioritySucDatas, flowName, flowDatas,statisticsName, statisticsDatas } = this.state
    return (
      <div className='specialTopicBox'>
        <div className='sidebarLeft'>
          <div className='asideItem'>
            <div className='itemContent' style={{ overflow: 'hidden' }}>
            <div className='leftTit'>公交优先路线</div>
              <div className='menuBox'>
                <Menu
                  onClick={this.handleClick}
                  style={{ width: 251, color: '#86b7fa', height: '100%', fontSize: '16px' }}
                  defaultSelectedKeys={['0']}
                  defaultOpenKeys={['sub2', 'sub3']}
                  mode="inline">
                  <SubMenu key="sub2" title="安立路">
                    <SubMenu key="sub3-0" title="安立路与立军路"></SubMenu>
                    <SubMenu key="sub3-1" title="安立路与北苑路"></SubMenu>
                    <SubMenu key="sub3-2" title="安立路与双营路"></SubMenu>
                    <SubMenu key="sub3-3" title="安立路与清林路"></SubMenu>
                    <SubMenu key="sub3-4" title="安立路与仰山路"></SubMenu>
                    <SubMenu key="sub3-5" title="安立路与北五环"></SubMenu>
                    <SubMenu key="sub3-6" title="安立路与科荟路"></SubMenu>
                  </SubMenu>
                  <SubMenu key="sub4" title="中轴路"></SubMenu>
                  <SubMenu key="sub5" title="朝阜路"></SubMenu>
                  <SubMenu key="sub6" title="朝阳北路"></SubMenu>
                  <SubMenu key="sub7" title="平安大街"></SubMenu>
                  <SubMenu key="sub8" title="中关村大街"></SubMenu>
                  <SubMenu key="sub9" title="两广咱"></SubMenu>
                  <SubMenu key="sub10" title="阜外大街"></SubMenu>
                  
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div className='sidebarRight'>
          <div className="asideItem">
            <div className="title">公交优先统计次数</div>
            <div className="itemContent">
              <div className="faultRate">
                <Graph chartsName={statisticsName} chartsDatas={statisticsDatas} />
              </div>
            </div>
          </div>
          <div className="asideItem">
            <div className="title">优先信号柱状图</div>
            <div className="itemContent">
              <div className="faultRate">
                {
                  cloudSource &&
                  <Histogram chartsDatas={cloudSource} />
                }
              </div>
            </div>
          </div>
          <div className="asideItem">
            <div className="title">优先运行饼状图</div>
            <div className="itemContent">
              <div className="faultRate">
                <Pie />
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          {
            !mainHomePage &&
            <div className='contentCenter'>
              <div className='title'>公交优先</div>
              <div className='circleTag'>
                <span><i />优先请求</span>
                <span><i className='iBgColor1' />系统控制</span>
                <span><i className='iBgColor2' />检测器故障</span>
                <span><i className='iBgColor3' />无线传输故障</span>
                <span><i className='iBgColor4' />信号机通讯离线</span>
                <span><i className='iBgColor5' />优先申请设备离线</span>
              </div>
              <div id="mapContainer" className="map-container" style={{ height: '100%' }}></div>
            </div>
          }
        </div>
        {
          roadInterFlag ? 
            <div className='detailPopBox'>
              <i title='返回' onClick={this.showHide} />
              <div className='leftCenter'>
                <div className='detailPopName'>XXX路与XXX路口</div>
                <div className='roadInterBox'>
                  <div className='title'>实时监控</div>
                  <div className='roadInterBg'>
                    <em><i>{timeNum}s</i></em>
                    <div className='controlBtnBox'>
                      <span>实时请求</span>
                      <span>编 辑</span>
                    </div>
                  </div>
                </div>
                <div className='roadLineChartsBox'>
                  <div className='chartsItem'>
                    <div className='titleCharts'>优先请求曲线图</div>
                    <div className='chartsBox'>
                      <GraphSingle chartsName={priorityReqName} chartsDatas={priorityReqDatas} />
                    </div>
                  </div>
                  <div className='chartsItem'>
                    <div className='titleCharts'>优先成功曲线图</div>
                    <div className='chartsBox'>
                      <GraphSingle chartsName={prioritySucName} chartsDatas={prioritySucDatas} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='sidebarRight'>
                <div className="asideItem">
                  <div className="title">路口信息</div>
                  <div className="itemContent">
                    <div className="faultRate">
                      <div className="leftMenu">洞山路路口信息</div>
                      <div className="rightMenuContent">
                        <div className="itemLine">
                          <span>路口编号</span>
                          <span>路口名称</span>
                          <span>所属路线</span>
                        </div>
                        <div className="itemLine">
                          <span>102</span>
                          <span>丽江路</span>
                          <span>科力</span>
                        </div>
                        <div className="itemLine">
                          <span>信息系统</span>
                          <span>检测车次</span>
                          <span>优先请求车次</span>
                        </div>
                        <div className="itemLine">
                          <span>廊道</span>
                          <span>1025次</span>
                          <span>25次</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="asideItem">
                  <div className="title">路口子区监视</div>
                  <div className="itemContent">
                    <div id="mapPopContainer" className="faultRate" />
                  </div>
                </div>
                <div className="asideItem">
                  <div className="title">公交流量曲线图</div>
                  <div className="itemContent">
                    <div className="faultRate">
                     <Graph chartsName={flowName} chartsDatas={flowDatas} symbolFlag='circle' />
                    </div>
                  </div>
                </div>
              </div>
            </div> : null
        }
      </div>
    )
  }
}

export default BusPriority