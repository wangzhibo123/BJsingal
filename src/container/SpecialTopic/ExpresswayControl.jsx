import React, { Component } from 'react'
import { Menu, Select, Switch, Modal } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import './Region.scss'
import $ from 'jquery'
import iconLeftBus from '../imgs/iconLeftBBus.png'
import busPopImg from '../imgs/icon_bus_pop_bg.png'
import hand from '../imgs/icon_bus_hand.png'
import lightGreen from '../imgs/icon_bus_light_green.png'
import lightRed from '../imgs/icon_bus_light_red.png'
import lightRectangle from '../imgs/icon_bus_Rectangle.png'
import laneArrowBLeft from '../imgs/icon_arrow_bottm_left.png'
import laneArrowBRight from '../imgs/icon_arrow_bottm_right.png'
import laneArrowTLeft from '../imgs/icon_arrow_top_left.png'
import laneArrowTRight from '../imgs/icon_arrow_top_right.png'
import mapConfiger from '../utils/minemapConf'
const { SubMenu } = Menu;
const lineData = [
  [116.33025304425573, 39.976441853446744],
  [116.34025304425573, 39.976441853446744],
  [116.34568921483447, 39.976441853446744]
]
const lineDatas = [
  [116.33335322545487, 39.98396257498689],
  [116.33345322545487, 39.97974391515476],
  [116.33365322545487, 39.976441853446744],
  [116.33387322545487, 39.97264462081506],
  [116.33410322545487, 39.968587550079974]
]
class ExpresswayControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      cloudSource: null,
      roadInterFlag: true, // 路口的显示隐藏状态
    }
    this.mapPopup = null
  }
  componentDidMount = () => {
    this.renderMap()
    window.showHide = this.showHide
    const cloudSource = { "list": [{ "district_name": "检测数", "memory": 45, "harddisk": 76 }, { "district_name": "请求数", "memory": 85, "harddisk": 60 }] }
    const areaList = []
    const harddisks = []
    const memeries = []
    cloudSource.list.forEach((item) => {
      areaList.push(item.district_name)
      harddisks.push(item.harddisk)
      memeries.push(item.memory)
    })
    this.setState({ cloudSource: { xData: areaList, harddisks, memeries } })
    setTimeout(() => {
      this.drawLine(lineData)
      this.drawLine(lineDatas, 'demo2')
    }, 500)
  }
  addBus = (points, flag) => {
    if (flag !== 'demo2'){
      this.addMarker()
    } 
    if (this.map && flag === 'demo2') {
      const currentThis = this
      this.markers = []
      points.forEach((item, index) => {
        if (index !== points.length) {
          const elArrow1 = document.createElement('div')
          elArrow1.style.width = '31px'
          elArrow1.style.height = '33px'
          elArrow1.style.position = 'absolute'
          elArrow1.style.top = '-33px'
          elArrow1.style.background = `url(${laneArrowTLeft})`;
          const elArrow2 = document.createElement('div')
          elArrow2.style.width = '31px'
          elArrow2.style.height = '33px'
          elArrow2.style.position = 'absolute'
          elArrow2.style.top = '15px'
          elArrow2.style.background = `url(${laneArrowBLeft})`;
          const elArrow3 = document.createElement('div')
          elArrow3.style.width = '31px'
          elArrow3.style.height = '33px'
          elArrow3.style.position = 'absolute'
          elArrow3.style.top = '-33px'
          elArrow3.style.left = '31px'
          elArrow3.style.background = `url(${laneArrowTRight})`;
          const elArrow4 = document.createElement('div')
          elArrow4.style.width = '31px'
          elArrow4.style.height = '33px'
          elArrow4.style.position = 'absolute'
          elArrow4.style.left = '31px'
          elArrow4.style.top = '15px'
          elArrow4.style.background = `url(${laneArrowBRight})`;
          const el = document.createElement('div')
          el.style.width = '63px'
          el.style.height = '15px'
          el.style.position = 'absolute'
          el.style.background = `url(${lightRectangle})`
          el.style.backgroundSize='cover'
          el.style.cursor = 'pointer'
          el.appendChild(elArrow1)
          el.appendChild(elArrow2)
          el.appendChild(elArrow3)
          el.appendChild(elArrow4)
          $(el).attr('rotateRset', 'reset')
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
      offset: [0, 0]
    }
    this.mapPopup = new window.mapabcgl.Popup(popupOption)
      .setLngLat(new window.mapabcgl.LngLat(marker[0], marker[1]))
      .setHTML(this.getInfoWindowHtml(marker))
      .addTo(this.map)
    $('.mapabcgl-popup')[0].style.maxWidth = '1000px'
  }
  popShowHide = () => {
    this.setState({
      roadInterFlag: !this.state.roadInterFlag
    })
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
      lineData.map((item, i) => {
        const elParent = document.createElement('div')
        elParent.style.width = '40px'
        elParent.style.height = '20px'
        elParent.style.position = 'absolute'
        elParent.style.display = 'inline-block'
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
        // el.addEventListener('click', () => {
        //   this.addInfoWindow(this.returnCenterLnglat(lineData[0], lineData[lineData.length - 1]))
        // })
        elParent.appendChild(elAnimation)
        elParent.appendChild(el)
        new window.mapabcgl.Marker(elParent)
          .setLngLat([item[0], item[1]])
          .addTo(this.map);
        })
      }
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
      console.log('地图触发点：', e.lngLat.lng, e.lngLat.lat)
    })
    map.setZoom(14)
    map.setCenter([116.33375322545487, 39.976441853446744])
    this.map = map
  }
  // 计算起始与终点之间的中心点 > 用于重置地图中心点
  returnCenterLnglat = (startPoint, endPoint) => {
    const lng = startPoint[0] + (Math.abs(startPoint[0] - endPoint[0]) / 2)
    const lat = startPoint[1] + (Math.abs(startPoint[1] - endPoint[1]) / 2)
    return [lng, lat]
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
      // this.map.setCenter(this.returnCenterLnglat(lineData[0], lineData[lineData.length - 1]))
    }
    this.addBus(lineData, lineId)
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
    const { mainHomePage, roadInterFlag } = this.state
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
                  defaultOpenKeys={['sub2', 'sub3', 'sub4']}
                  mode="inline">
                  <SubMenu key="sub2" title="快速路一期区域">
                    <SubMenu key="sub3-0" title="二环出入口子区1"></SubMenu>
                    <SubMenu key="sub3-1" title="二环车道灯子区1"></SubMenu>
                    <SubMenu key="sub3-2" title="三环出入口子区1"></SubMenu>
                    <SubMenu key="sub3-3" title="四环出入口子区1"></SubMenu>
                    <SubMenu key="sub3-4" title="非环路车道灯子区1"></SubMenu>
                  </SubMenu>
                  <SubMenu key="sub4" title="快速路二期区域">
                    <SubMenu key="sub4-0" title="二环出入口子区2"></SubMenu>
                    <SubMenu key="sub4-1" title="内环阜成门桥北入口"></SubMenu>
                    <SubMenu key="sub4-2" title="内环西便门桥北入口"></SubMenu>
                    <SubMenu key="sub4-3" title="内环复兴门桥北入口"></SubMenu>
                    <SubMenu key="sub4-4" title="内环官园桥南出口"></SubMenu>
                    <SubMenu key="sub4-5" title="内环西直门桥南出口"></SubMenu>
                    <SubMenu key="sub4-6" title="内环积水潭西入口"></SubMenu>
                  </SubMenu>
                  <SubMenu key="sub5" title="三环出入口子区3"></SubMenu>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          {
            !mainHomePage &&
            <div className='contentCenter' style={{ width: '100%' }}>
              <div className='title'>公交优先</div>
              <div className='circleTag' style={{ width: '220px', padding: '5px' }}>
                <span><i className='imgRectangleBg' />车道灯</span>
                <span><i className='imgArrowBg' />出入口</span>
              </div>
              <div id="mapContainer" className="map-container" style={{ height: '100%' }}></div>
            </div>
          }
        </div>
        { roadInterFlag ?
          <div>
            <div className='roadInterPop'>
              <CloseOutlined title='关闭' onClick={this.popShowHide} className="closeIcon" />
              <div className='roadInterPopTit'>内环阜成门桥北入口</div>
              <div className='roadInterPopImg'><img src={`${busPopImg}`} /></div>
              <div className='roadInterPopCon'>
                <div className='conBox' style={{ flex: 1, marginRight: '10px' }}>
                  <dl>
                    <dt>路口名称：内环阜成门桥北入口</dt>
                    <dt>路口编号：100234</dt>
                    <dt>控制方式：中心控制</dt>
                    <dt>控制方案：12</dt>
                    <dt>放行相位：1</dt>
                    <dt>驻留相位：无</dt>
                  </dl>
                </div>
                <div className='conBox'>
                  <div className='conBoxTit'>
                    联网模式：<em>在线</em> 控制模式：<em>中心控制</em> <span>执行</span>
                  </div>
                  <div className='conBoxContent'>
                    <span>
                      <i><img src={`${lightRed}`} /></i>
                      <em>红灯</em>
                    </span>
                    <span>
                      <i><img src={`${lightGreen}`} /></i>
                      <em>绿灯</em>
                    </span>
                    <span>
                      <i><img src={`${hand}`} /></i>
                      <em>关灯</em>
                    </span>
                    <span>
                      <i><img src={`${lightRed}`} /></i>
                      <em>红灯</em>
                    </span>
                    <span>
                      <i><img src={`${lightGreen}`} /></i>
                      <em>绿灯</em>
                    </span>
                    <span>
                      <i><img src={`${hand}`} /></i>
                      <em>关灯</em>
                    </span>
                    <span>
                      <i><img src={`${lightRed}`} /></i>
                      <em>红灯</em>
                    </span>
                    <span>
                      <i><img src={`${lightGreen}`} /></i>
                      <em>绿灯</em>
                    </span>
                    <span>
                      <i><img src={`${hand}`} /></i>
                      <em>关灯</em>
                    </span>
                    <span>
                      <i><img src={`${lightRed}`} /></i>
                      <em>红灯</em>
                    </span>
                    <span>
                      <i><img src={`${lightRed}`} /></i>
                      <em>红灯</em>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='maskPop'></div>
          </div> : null
        }

      </div>
    )
  }
}

export default ExpresswayControl