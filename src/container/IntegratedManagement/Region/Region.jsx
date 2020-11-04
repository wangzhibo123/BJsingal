/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Select } from 'antd'
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import './Region.scss'
import mapConfiger from '../../utils/minemapConf'
import axiosInstance from '../../utils/getInterfaceData'
const { SubMenu } = Menu;
class Region extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
      clickNum: '',
      treeList: [],
    }
    this.clickOperation = [
      {
        id: 1,
        name: '新增干线',
      },
      {
        id: 2,
        name: '删除干线',
      },
      {
        id: 3,
        name: '切换视图',
      }
    ]
    this.loadTree = '/engine-unified/districtManagement/loadTree' // 区域树
    this.editDistrictInfo = '/engine-unified/districtManagement/editDistrictInfo' // 加载当前区域信息
  }
  getDataList = () => {
    axiosInstance.post(this.loadTree).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        this.setState({ treeList })
      }
    })
  }
  componentDidMount = () => {
    this.renderMap()
    this.getDataList()
  }
  addMarker = () => {
    if (this.map) {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'green'
      new window.mapabcgl.Marker(el)
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
  clickOperationNum = () => {

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
  render() {
    const { Option } = Select
    const { mainHomePage, Istitletops, IsddMessge, treeList, clickNum } = this.state
    return (
      <div className='RegionBox'>
        <div className="iptSearchNavMap">
          <input type="text" placeholder="查询…" className="inptNavMon" />
          <div className="MagBox">
            <SearchOutlined />
          </div>
        </div>
        <div className='sidebarLeft'>
          <div className='tabLeft'>
            {
              this.clickOperation.map(item => <span className={clickNum === item.id ? 'active' : ''}
                onClick={() => this.clickOperationNum(item.id)} key={item.id}>{item.name}</span>)
            }
          </div>
          <div className='sidebarLeftBox'>
            <Menu
              onClick={this.handleClick}
              style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
              // defaultSelectedKeys={['7']}
              // defaultOpenKeys={['sub2', 'sub3']}
              mode="inline"

            >
              {
                treeList && treeList.map(item =>
                  <SubMenu
                    key={item.id}
                    title={item.district_name}
                  >
                  </SubMenu>
                )
                
                // <SubMenu key={item.id} title={item.district_name}>
                //   {/* <Menu.Item key="5"></Menu.Item> */}
                //   {/* <SubMenu key="sub3" title="知春路拥堵应急">
                //     <Menu.Item key="7">知春路与罗庄东路<EditOutlined /></Menu.Item>
                //     <Menu.Item key="8">知春路与罗庄中路</Menu.Item>
                //     <Menu.Item key="9">知春路与罗庄西路</Menu.Item>
                //     <Menu.Item key="10">知春路与海淀黄庄路</Menu.Item>
                //   </SubMenu>
                //   <SubMenu key="sub3-2" title="万泉庄路"></SubMenu> */}
                // </SubMenu>

              }
            </Menu>
          </div>

        </div>
        <div className='container'>
          {
            !mainHomePage &&
            <div className='contentCenter'>
              <div className='title'>区域管理</div>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div >
    )
  }
}

export default Region