/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Select } from 'antd'
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import './Region.scss'
import mapConfiger from '../../utils/minemapConf'
import axiosInstance from '../../utils/getInterfaceData'
import { Children } from 'react';
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
      treeListChild: []
    }
    this.clickOperation = [
      {
        id: 1,
        name: '新增区域',
      },
      {
        id: 2,
        name: '删除区域',
      },
      {
        id: 3,
        name: '切换视图',
      }
    ]
    this.loadTree = '/engine-maintenance/districtManagement/loadSubDistrictTree' // 区域树
    this.editDistrictInfo = '/engine-maintenance/districtManagement/editSubDistrictInfo' // 加载当前区域信息
    this.defaultChildren = []
    this.newChildId = []
  }
  getDataList = () => {
    axiosInstance.post(this.loadTree).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        this.defaultChildren = treeList.map(() => [])
        this.setState({ treeList, treeListChild: this.defaultChildren })
      }
    })
  }
  getLoadChildTree = (id) => {
    const { treeList } = this.state
    const IndexTree = treeList.findIndex(item => item.id == id)
    axiosInstance.post(`${this.loadTree}?id=${id}`).then(res => {
      const { code } = res.data
      const treeListChilder = res.data.treeList
      if (code === '1') {
        this.defaultChildren.splice(IndexTree, 1, treeListChilder)
        this.setState({
          treeListChild: this.defaultChildren,
        })
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
  handleClickMenu = e => { //SubMenu-item触发
    console.log('click ', e);
  }
  onOpenChangeSubMenu = (eventKey) => { // SubMenu-ite触发
    if (eventKey > this.newChildId) {
      this.newChildId = eventKey
      const newChildId = eventKey.splice(-1, 1)
      this.getLoadChildTree(newChildId)
    }
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
    const { mainHomePage, Istitletops, IsddMessge, treeList, clickNum, treeListChild } = this.state
    console.log(treeListChild, 'treeListChild')
    const ChildrenTree = (data) => {
      return data.map(item => <Menu.Item key={item.id}>{item.unit_name}</Menu.Item>)
    }
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
          <div className="topNavMon">
            <div className="selectNav">
              <Select
                // defaultValue="海淀区"
                style={{ width: 100, height: 30 }}
              >
                {
                  // stateSelect && stateSelect.map((item, index) => {
                  //   return (
                  <Option value={123} style={{ width: 100, height: 30 }} key={555}>下拉</Option>
                  // )
                  // })
                }
              </Select>
            </div>
            <div className="iptSearchNav">
              <input type="text" placeholder="查询…" className="inptNavMon" />
              <div className="MagBox">
                <SearchOutlined />
              </div>
            </div>
          </div>
          <div className='sidebarLeftBox'>
            <Menu
              onOpenChange={this.onOpenChangeSubMenu}
              style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
              mode="inline"
            >
              {
                treeList && treeList.map((item, index) =>
                  <SubMenu
                    key={item.id}
                    title={item.sub_district_name}
                  >
                    {
                      treeListChild[index].length > 0 ? ChildrenTree(treeListChild[index]) : ''
                    }
                  </SubMenu>
                )
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