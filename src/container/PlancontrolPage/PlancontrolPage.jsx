import React, { Component } from 'react'
import { Menu } from 'antd'
import styles from './PlancontrolPage.module.scss'
import mapConfiger from '../utils/minemapConf'
const { SubMenu } = Menu;
class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
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
    })
    this.map = map
  }
  handleClick = e => {
    console.log('click ', e);
  }
  render() {
    const { mainHomePage, Istitletops } = this.state
    return (
      <div className={styles.PlancontrolPageWrapper}>
        <div className={styles.sidebarLeft}>
          <div className={styles.titletops}>
            <span onClick={() => this.gettitletops(true)} className={Istitletops ? styles.titletopsActive : ''}>活动</span>
            <span onClick={() => this.gettitletops(false)} className={!Istitletops ? styles.titletopsActive : ''}>应急</span>
          </div>
          <Menu
            onClick={this.handleClick}
            style={{ width: 256, color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
            // defaultSelectedKeys={['7']}
            // defaultOpenKeys={['sub2', 'sub3']}
            mode="inline"

          >
            <SubMenu key="sub2" title="海淀区">
              {/* <Menu.Item key="5"></Menu.Item> */}
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
        <div className={styles.container}>
          {
            !mainHomePage &&
            <div className={styles.contentCenter}>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Homepage
