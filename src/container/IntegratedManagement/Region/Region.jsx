/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Select } from 'antd'
import { EditOutlined, } from '@ant-design/icons';
import './Region.scss'
import mapConfiger from '../../utils/minemapConf'
const { SubMenu } = Menu;
class Region extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
    }
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
        .setLngLat([116.391, 39.911])
        .addTo(this.map);
    }
  }
  gettitletops = (isShow) => {
    this.setState({
      Istitletops: isShow,
    })
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
      this.addMarker()

      window.onbeforeunload = function (e) {
        map.removeLayerAndSource('icon');

      };
    })
    this.map = map
  }
  // renderMap = () => {
  //   mapConfiger.zoom = 11
  //   const map = new window.mapabcgl.Map(mapConfiger)
  //   this.map = map
  //   map.addControl(new window.mapabcgl.NavigationControl());
  //   const options = {
  //     minzoom: 1, // 路况显示的最小级别(1-24)
  //     maxzoom: 24, // 路况显示的最大级别(1-24)
  //     type: 'vector', // 路况图层类型:vector(矢量),raster(栅格)
  //     refresh: 30 * 1000, // 路况图层刷新时间，毫秒
  //     // before:'roads-symbol-49' 
  //   };
  //   map.on('load', () => {
  //     map.trafficLayer(true, options);
  //     this.addMarker()
  //     map.addControl(new window.mapabcgl.NavControl({ showCompass: true, position: 'bottom-right' }));
  //     map.loadImage('http://map.mapabc.com:35001/mapdemo/apidemos/sourceLinks/img/dir.png', function (error, image) {
  //       map.addImage('arrowImg', image); // 添加3d指南针
  //     });
  //   })
  // }
  handleClick = e => {
    console.log('click ', e);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  handleClckMessge = () => {
    this.setState({

    })
  }
  render() {
    const { Option } = Select
    const { mainHomePage, Istitletops, IsddMessge } = this.state
    return (
      <div class='RegionBox'>
        <div class='sidebarLeft'>
          <Menu
            onClick={this.handleClick}
            style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
            // defaultSelectedKeys={['7']}
            // defaultOpenKeys={['sub2', 'sub3']}
            mode="inline"

          >
            <SubMenu key="sub2" title="海淀区">
              {/* <Menu.Item key="5"></Menu.Item> */}
              <SubMenu key="sub3" title="知春路拥堵应急">
                <Menu.Item key="7">知春路与罗庄东路<EditOutlined /></Menu.Item>
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
              {/* <Menu.Item key="1-2-9">Option 9</Menu.Item> */}
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
        <div class='container'>
          {
            !mainHomePage &&
            <div class='contentCenter'>
              <div class='title'>区域管理</div>
              <div id="mapContainer" class="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div >
    )
  }
}

export default Region