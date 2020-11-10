/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Select } from 'antd'
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import './Region.scss'
import mapConfiger from '../../utils/minemapConf'
import axiosInstance from '../../utils/getInterfaceData'
import { Children } from 'react';
const { SubMenu } = Menu;
class Region extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // roadName
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
      clickNum: '',
      treeList: [],
      menuOpenkeys: [],
      rights: -300,
      ismodify: false,
      isAddEdit: true,
    }
    this.clickOperation = [
      {
        id: 1,
        name: '新增区域',
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
  componentDidMount = () => {
    this.renderMap()
    this.getDataList()
  }
  getDataList = () => {
    axiosInstance.post(this.loadTree).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        this.treeListDatas = treeList
        this.setState({ treeList, treeListChild: this.defaultChildren })
      }
    })
  }
  // 获取区域子集
  getLoadChildTree = (id) => {
    axiosInstance.post(`${this.loadTree}?id=${id}`).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        const currentArea = this.treeListDatas.find((item) => item.id === Number(id))
        currentArea.childrens = treeList
        this.setState({ treeList: this.treeListDatas, menuOpenkeys: [id] })

      }
    })
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
  clickOperationNum = (id) => {
    if (id === 1) {
      // this.getAddDataList()
      this.setState({
        rights: 0,
        isAddEdit: true,
      })
    } else if (id === 3) {
      this.map.flyTo({
        // center: [116.391, 39.911], 
        zoom: 14,
        pitch: 60
      })
    }
    this.setState({
      clickNum: id
    })
  }
  handleClickMenu = e => { //SubMenu-item触发
    console.log('click ', e);
  }
  onOpenChangeSubMenu = (eventKey) => { // SubMenu-ite触发
    if (eventKey.length === 0) {
      this.setState({ menuOpenkeys: [] })
    } else {
      const keys = eventKey.pop()
      const { menuOpenkeys } = this.state
      if (eventKey !== menuOpenkeys) {
        this.getLoadChildTree(keys)
      }
    }
  }
  onClickMenuItem = (item) => {
    console.log(item, 'vvcss')
    this.setState({
      rights: 0,
      isAddEdit: false
    })
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  handleClckMessge = () => {
    this.setState({

    })
  }
  noneAddRoad = () => { // 取消添加修改
    this.setState({
      rights: -300
    })
  }
  changeLoadRouteDirection = (e, s) => { // 选择干线方向
    console.log(e, s)
  }
  changeLoadRouteType = () => { // 选择干线类型

  }
  getChangeValue = (e) => {
    console.log(e)
  }
  getismodify = (isShow) => { // 添加编辑
    this.setState({
      ismodify: isShow,
    })
  }
  render() {
    const { Option } = Select
    const { mainHomePage, treeList, clickNum, menuOpenkeys, isAddEdit, rights, ismodify } = this.state
    return (
      <div className='RegionBox'>
        <div className='sildeRight' style={{ right: `${rights}px` }}>
          {
            isAddEdit ?
              <div className="slideRightBoxAdd">
                <div className='addMainLine'>
                  <div className='newLine'>新增区域</div>
                  <div className='operationLine'><span>保存</span><span onClick={this.noneAddRoad}>取消</span></div>
                </div>
                <p><span>区域名称：</span><input type="text" className='inputBox' placeholder="区域名称" /></p>
                <p><span>区域编号：</span><input type="text" className='inputBox' placeholder="区域编号" /></p>
                <div className='divs'><span>区域方向：</span>
                  <Select
                    // defaultValue="海淀区"
                    style={{ width: 195, height: 30 }}
                    onChange={this.changeLoadRouteDirection}
                  >
                    {/* {
                      loadRouteDirectionList && loadRouteDirectionList.map((item) => {
                        return (
                          <Option value={item.c_code} style={{ width: 195, height: 30 }} key={item.id}>{item.code_name}</Option>
                        )
                      })
                    } */}
                  </Select>
                </div>
                <p><span>区域长度：</span><input type="text" className='inputBox' placeholder="干线编号" /></p>
                <div className='divs'><span>区域类型：</span>
                  <Select
                    // defaultValue="海淀区"
                    style={{ width: 195, height: 30 }}
                    onChange={this.changeLoadRouteType}
                  >
                    {/* {
                      loadRouteTypeList && loadRouteTypeList.map((item) => {
                        return (
                          <Option value={item.c_code} style={{ width: 193, height: 30 }} key={item.id}>{item.code_name}</Option>
                        )
                      })
                    } */}
                  </Select>
                </div>
                <div className='lineBox'>
                  <div className="lineBoxRight">
                    {/* document.getElementById('startInp').value = '';
                    document.getElementById('endInp').value = '';
                    document.getElementById('channelInp').value = ''; */}
                    <p><span></span><input type="text" className='inputBox' id='startInp' /></p>
                    {/* {
                      roadValue && roadValue.map((item, index) => {
                        return (
                          <div className='roadBox' key={item + index}>
                            <div className="roadBoxLeft">
                            </div>
                            <div className="roadBoxRight">
                              <p><input type="text" onChange={this.getChangeValue} className='inputBox' id='channelInp' value={item} /></p>
                            </div>
                          </div>
                        )
                      })
                    } */}
                    {/*  <p><input type="text" className='inputBox' /></p> */}
                    <p><span></span><input type="text" className='inputBox' id='endInp' /></p>
                  </div>
                </div>
              </div>
              :
              <div className='slideRightBoxEdit'>
                <div className='addMainLine'>
                  <div className='newLine'>西湖南大街详情</div>
                  {
                    !ismodify ? <div className='operationLine'><span>删除</span><span onClick={() => this.getismodify(true)}>编辑</span></div> : <div className='operationLineAdd'><span>保存</span><span onClick={() => this.getismodify(false)}>取消</span></div>
                  }
                </div>
                <p>干线编号：<span>0001</span></p>
                <p>干线长度：<span>7.3公里</span></p>
                <p>干线方向：<span>西向东</span></p>
                <div className='lineBox'>
                  <div className="lineBoxRight">
                    <div className='streetBox'>
                      <p className='street'><span>01</span>西长安街与西单北大街{ismodify ? <DeleteOutlined /> : ''}</p>
                      <p className='intersection'><span>十字路口</span><span>西城区</span></p>
                    </div>
                    <div className='streetBox'>
                      <p className='street'><span>01</span>西长安街与西单北大街{ismodify ? <DeleteOutlined /> : ''}</p>
                      <p className='intersection'><span>十字路口</span><span>西城区</span></p>
                    </div>
                    <div className='streetBox'>
                      <p className='street'><span>01</span>西长安街与西单北大街{ismodify ? <DeleteOutlined /> : ''}</p>
                      <p className='intersection'><span>十字路口</span><span>西城区</span></p>
                    </div>
                    <div className='streetBox'>
                      <p className='street'><span>01</span>西长安街与西单北大街{ismodify ? <DeleteOutlined /> : ''}</p>
                      <p className='intersection'><span>十字路口</span><span>西城区</span></p>
                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
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
              onClick={this.onClickMenuItem}
              style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
              mode="inline"
              openKeys={menuOpenkeys}
            >
              {
                treeList && treeList.map((item, index) =>
                  <SubMenu
                    key={item.id}
                    title={item.sub_district_name}
                  >
                    {
                      item.childrens &&
                      item.childrens.map((child) => (
                        <Menu.Item key={child.id}>{child.unit_name}</Menu.Item>
                      ))
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