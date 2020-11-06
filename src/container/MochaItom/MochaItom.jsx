import React, { Component } from 'react'
import { Select, Menu, Progress } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Pie3D from '../../components/Pie3D/Pie3D'
import Graph from './Graph/Graph'
import mapConfiger from '../utils/minemapConf'
import './MochaItom.scss'
const { Option } = Select
const { SubMenu } = Menu
class MochaItom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: true,
      surfaceData: [
        {
          name: '未完成',
          value: 11,
          itemStyle: {
              color: 'yellow',
              opacity: 0.5
            }
        }, 
        {
          name: '已完成',
          value: 18,
          itemStyle: {
              color: '#02347D',
              opacity: 0.5
          }
        }
      ],// Pie3D数据
    }
    this.sortColors = ['#00BAFF', '#FF8400', '#9600FF', '#00FFD8', '#FF8400', '#00BAFF']
  }
  componentDidMount = () => {
    this.renderMap()

  }
  addMarker = () => {
    if (this.map) {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'green'
      const marker = new window.mapabcgl.Marker(el)
              .setLngLat([116.391,  39.911])
              .addTo(this.map);
      console.log(marker)
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
      refresh: 30*1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on('load', () => {
      map.trafficLayer(true, options);
      this.addMarker()
    })
    this.map = map
  }
  render() {
    const { mainHomePage, surfaceData } = this.state
    return (
      <div className="homepagesWrapper">
        <div className="container">
          <div className="asideLeft">
            <div className="asideItem" style={{flex:2}}>
              <div className="title">设备列表</div>
              <div className="itemContent" style={{overflow:'hidden'}}>
                <div className="interSearch">
                  <Select defaultValue="1">
                    <Option key="1" value="1">北京市</Option>
                  </Select>
                  <span className="searchInput">
                    <input type="text" className="inputBox" placeholder="查询..." />
                    <SearchOutlined className="searchIcon" />
                  </span>
                </div>
                <div className="menuBox">
                
                <Menu
            onClick={this.handleClick}
            style={{ color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
            mode="inline">
            <SubMenu key="sub2" title="海淀区">
              <SubMenu key="sub3" title="知春路拥堵应急">
                <Menu.Item key="7">知春路与罗庄东路</Menu.Item>
                <Menu.Item key="8">知春路与罗庄中路</Menu.Item>
                <Menu.Item key="9">知春路与罗庄西路</Menu.Item>
                <Menu.Item key="10">知春路与海淀黄庄路</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3-2" title="万泉庄路"></SubMenu>
            </SubMenu>
            <SubMenu
              key="sub4"
              title="房山区"
            >
            </SubMenu>
            <SubMenu
              key="sub5"
              title="通州区"
            >
            </SubMenu>
            <SubMenu
              key="sub6"
              title="门头沟区"
            >
            </SubMenu>
            <SubMenu
              key="sub7"
              title="中关村东路"
            >
            </SubMenu>
          </Menu>
                </div>
              </div>
            </div>
            <div className="asideItem">
              <div className="title">维护工单</div>
              <div className="itemContent">
                <div className="runRateCon">
                维护工单
                </div>
              </div>
            </div>
          </div>
          <div className="asideRight">
            <div className="asideItem">
              <div className="title">设备故障分布图</div>
              <div className="itemContent">
                <div className="itemShow">
                  <div className="itemDiv">
                  信号机
                  <Progress percent={50.12} size="small" steps={66} />
                  </div>
                  <div className="itemDiv">
                  信号灯
                  <Progress percent={40} size="small" steps={66} />
                  </div>
                  <div className="itemDiv">
                  网络设备
                  <Progress percent={50} size="small" steps={66} />
                  </div>
                  <div className="itemDiv">
                  电源
                  <Progress percent={50} size="small" steps={66} />
                  </div>
                  <div className="itemDiv">
                  外设
                  <Progress percent={50} size="small" steps={66} />
                  </div>
                </div>
                
              </div>
            </div>
            <div className="asideItem">
              <div className="title">运维任务分布图</div>
              <div className="itemContent" style={{overflow:'hidden'}}>
                <div className="pie3DCon">
                  <div className="pie3DText">
                    <text>
                      <div className="textCon">
                        <em>已完成18个</em> <br /> <s>62.07%</s>
                      </div>
                    </text>
                    <text><em>未完成11个</em> <br /> <s>37.93%</s></text>
                  </div>
                  <Pie3D resData={surfaceData} />
                </div>
              </div>
            </div>
            <div className="asideItem">
              <div className="title">故障走势图</div>
              <div className="itemContent">
                <div className="runRate">
                  <Graph />
                </div>
              </div>
            </div>
          </div>
          <div className="contentCenter">
            <div className="title">运维管理</div>
            <div className="centerMain">
              <div className="itemDom itemColor1">
                <span>故障数</span>
                <em>8</em>
                <i>个</i>
              </div>
              <div className="itemDom itemColor2">
                <span>运维单</span>
                <em>8</em>
                <i>个</i>
              </div>
              <div className="itemDom itemColor3">
                <span>待派发</span>
                <em>8</em>
                <i>个</i>
              </div>
              <div className="itemDom itemColor4">
                <span>待接单</span>
                <em>8</em>
                <i>个</i>
              </div>
              <div className="itemDom itemColor5">
                <span>待维护</span>
                <em>8</em>
                <i>个</i>
              </div>
              <div className="itemDom itemColor6">
                <span>待审核</span>
                <em>8</em>
                <i>个</i>
              </div>
            </div>
            <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default MochaItom
