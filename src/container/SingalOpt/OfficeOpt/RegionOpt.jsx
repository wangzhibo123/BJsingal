import React, { Component } from 'react'
import { Menu, Input, DatePicker, Button, Select, Switch } from 'antd'
import 'animate.css'
import { SearchOutlined, DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import './Region.scss'
import $ from 'jquery'
import mapConfiger from '../../utils/minemapConf'
import GraphCharts from '../../../components/GraphCharts/GraphCharts'
const { SubMenu } = Menu;
class RegionOpt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
      iconFlag: true,
      iconFlagR: true,
      faultCompare: {
        delay:[10, 20, 30, 40, 10, 25, 34, 25, 22, 33, 50, 60, 10, 15, 5, 20, 10, 10, 5, 20, 40, 22, 19, 14], 
        speed:[22, 19, 14, 33, 50, 60, 10, 15, 5, 20, 10, 10, 5, 20, 40, 10, 20, 30, 40, 10, 25, 34, 25, 22]
      },
    }
    this.time = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    this.stylesH = `position:fixed;
      top:100px;
      left: 0px;
      width: 0;
      height:calc(100% - 100px);
      display: flex;   
      padding:0;   
      transition:all .5s;`

    this.stylesL = `
      position: fixed;
      top:100px;
      left: 0px;
      width: 300px;
      height:calc(100% - 100px);
      display: flex;
      transition:all .5s;
    `
    this.stylesRH = `position:fixed;
      top:100px;
      right: 0px;
      width: 260px;
      height:calc(100% - 100px);
      display: flex;   
      padding:0;   
      transition:all .5s;`

    this.stylesR = `
      position: fixed;
      top:100px;
      right: 0px;
      width: 690px;
      height:calc(100% - 100px);
      display: flex;
      transition:all .5s;
    `
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
        .setLngLat([116.33372103894942, 39.976474739839944])
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
    map.on('click', (e) => {
      console.log('地图信处',e)
    })
    map.setZoom(15)
    map.setCenter([116.33861338819071,39.97636785900676])
    this.map = map
  }
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
  // 左边栏的收起和展开
  handleLeftClick = (e) => {
    const _this = this;
    const styleLeft = 'left:0;transition:all .5s;'
    if (!this.state.iconFlag) {
      $(e.target).parent().attr('style', _this.stylesL)
      $(e.target).next().attr('style','')
      $(e.target).attr('title', '展开')
      this.setState({
        iconFlag: true,
      })
    } else {
      const styleLeftH = 'transition:all .5s;'
      $(e.target).parent().attr('style', _this.stylesH)
      $(e.target).next().attr('style', 'flex:0;overflow:hidden;')
      $(e.target).attr('title', '收起')
      this.setState({
        iconFlag: false,
      })

    }
  }
  // 右边栏的收起和展开
  handleRightClick = (e) => {
    const styleR = 'right:5px;transition:all .5s;'
    const _this = this;
    if (!this.state.iconFlagR) {
      $(e.target).parent().parent().attr('style', _this.stylesR)
      $(e.target).next().attr('style','flex:3')
      $(e.target).attr('title', '展开')
      this.setState({
        iconFlagR: true,
      })
    } else {
      const styleRH = 'transition:all .5s;'
      $(e.target).parent().parent().attr('style', _this.stylesRH)
      $(e.target).next().attr('style', 'display:none;')
      $(e.target).attr('title', '收起')
      this.setState({
        iconFlagR: false,
      })
    }
  }
  render() {
    const { Option } = Select
    const { mainHomePage, iconFlag, iconFlagR } = this.state
    return (
      <div className='RegionBox'>
        <div className='sidebarLeft animated'>
          { iconFlag ? 
            <em className='iconDirection' title='收起' onClick={this.handleLeftClick}><DoubleLeftOutlined /></em> : 
            <em className='iconDirection' title='展开'onClick={this.handleLeftClick}><DoubleRightOutlined /></em>
          }
          <div className='asideItem'>
            <div className='itemContent' style={{ overflow: 'hidden' }}>
              <div className='interSearch'>
                <Select defaultValue="1">
                  <Option key="1" value="1">海淀区</Option>
                </Select>
                <span className='searchInput'>
                  <input type="text" className='inputBox' placeholder="查询..." />
                  <SearchOutlined className='searchIcon' />
                </span>
              </div>
              <div className='menuBox'>
                <Menu
                  onClick={this.handleClick}
                  style={{ width: 251, color: '#86b7fa', height: '100%', fontSize: '16px' }}
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
            </div>
          </div>
        </div>
        <div className='sidebarRight animated'>
          <div className='selectPopLayer'>
            <div className='selectItem'>协调路线：<Select defaultValue="1">
              <Option key="1" value="1">知春路</Option>
            </Select></div>
            <div className='selectItem'>协调记向切换：<Switch size="small" defaultChecked /></div>
            <div className='selectItem'>干线长度：580m</div>
            <div className='selectItem'>
              <span><i/>关键路口</span>
              <span><i/>常规路口</span>
            </div>
          </div>
          <div className='listLayer'>
            { iconFlagR ?  
              <em className='iconDirection' title='收起'onClick={this.handleRightClick}><DoubleRightOutlined /></em> :
              <em className='iconDirection' title='展开' onClick={this.handleRightClick}><DoubleLeftOutlined /></em>
            }
            <div className='asideItem' style={{flex:3}}>
              <div className='titleName'>知春路<span>区域优化配置</span></div>
              <div className='itemContent'>
                {
                [1,2,3,4].map((item)=>{
                  return <div className='itemFormBox'>
                    <div className='itemTit'><i/>知春路与***路</div>
                    <div className='itemForm'>
                      <dl>
                        <dd>实时相位差</dd>
                        <dd><input type="number" className='inputBox' defaultValue="30" /><em>秒</em></dd>
                      </dl>
                      <dl>
                        <dd>建议相位差</dd>
                        <dd><input type="number" className='inputBox' defaultValue="0" /><em>秒</em></dd>
                      </dl>
                      <dl>
                        <dd>偏移</dd>
                        <dd><input type="number" className='inputBox' defaultValue="20" /><em>秒</em></dd>
                      </dl>
                      <dl>
                        <dd>协调相位</dd>
                        <dd>
                        <Select defaultValue="1">
                          <Option key="1" value="1">A</Option>
                        </Select>
                        </dd>
                      </dl>
                      <div className='itemPic'/>
                    </div>
                  </div>
                })
              }
              </div>
            </div>
            <div className='asideItem'>
              <div className='titleName'>区域运行整体指标</div>
              <div className='itemContent'>
                  <div className='runRateCharts'>
                    <GraphCharts chartsDatas={this.state.faultCompare} times={this.time} />
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          {
            !mainHomePage &&
            <div className='contentCenter'>
              <div className='title'>区域优化</div>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div >
    )
  }
}

export default RegionOpt