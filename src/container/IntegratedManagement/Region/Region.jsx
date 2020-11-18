/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Select, message, Modal } from 'antd'
import { EditOutlined, SearchOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import $ from 'jquery'
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
      roadtitle: '新增区域',
      detail: '',
      sub_district_code: '',
      sub_district_name: '',
      sub_district_user: '',
      unitArr: '',
      deleteConfirm: false,
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
    this.defaultChildren = []
    this.newChildId = []
    this.getPointAll = '/control-application-front/unitInfo/getPointAll' // 加载所有点位
    this.loadSubDistrictTree = '/control-application-front/subDistrictManagement/loadSubDistrictTree' // 区域树
    this.deleteSubDistrict = '/control-application-front/subDistrictManagement/deleteSubDistrict' // 删除子区信息
    this.saveOrUpdateSubDistrict = '/control-application-front/subDistrictManagement/saveOrUpdateSubDistrict' // 新增修改子区信息

    this.interMarkers = []
    this.addRoad = false // 新增区域数组
    this.unitArr = []
  }
  componentDidMount = () => {
    this.renderMap()
    this.getDataList()
    this.addMarkerData()
  }
  initializationState = () => { // 新增修改变量初始化
    this.setState({
      detail: '',
      sub_district_code: '',
      sub_district_name: '',
      sub_district_user: '',
      unitArr: '',
    })
  }
  addMarkerData = () => {
    axiosInstance.post(this.getPointAll).then(res => {
      const { code, list } = res.data
      if (code === '1') {
        this.pointLists = list
        this.addMarker(this.pointLists, 8)
        this.setState({
          pointlist: list,
        })
      }
    })
  }
  getDataList = () => {
    axiosInstance.post(this.loadSubDistrictTree).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        this.treeListDatas = treeList
        this.setState({ treeList, treeListChild: this.defaultChildren })
      }
    })
  }
  // 获取区域子集
  getLoadChildTree = (id) => {
    axiosInstance.post(`${this.loadSubDistrictTree}?id=${id}`).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        const arr = treeList.map(item => item)
        const currentArea = this.treeListDatas.find((item) => item.id === Number(id))
        currentArea.childrens = treeList
        this.setState({ treeList: this.treeListDatas, menuOpenkeys: [id], unitArr: arr })

      }
    })
  }
  addMarker = (points, zoomVal) => {
    this.removeMarkers()
    if (this.map) {
      const currentThis = this
      this.markers = []
      const interList = zoomVal < 13 ? points && points.filter(item => item.unit_grade <= 4) : points
      console.log(points, zoomVal,interList,'sdfsdfds')
      interList && interList.forEach((item, index) => {
        const el = document.createElement('div')
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = 'green'
        el.style.cursor = 'pointer'
        el.id = 'marker' + item.unit_code
        el.addEventListener('click', function (e) {
          console.log(item, currentThis.addRoad, '123456')
          if (currentThis.addRoad) {
            currentThis.unitArr.push(item)
            currentThis.setState({
              unitArr: currentThis.unitArr,
            })
          }
        });
        if (isNaN(item.longitude) || isNaN(item.latitude)) {
          console.log(index)
        }
        console.log(item,item.longitude, item.latitude,'dfdfdfdfvvvvv::::')
        const marker = new window.mapabcgl.Marker(el)
          .setLngLat([item.longitude, item.latitude])
          .addTo(this.map)
        this.interMarkers.push(marker)
      })
    }
  }
  removeMarkers = () => {
    if (this.interMarkers.length) {
      this.interMarkers.forEach((item) => {
        item.remove()
      })
      this.interMarkers = []
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
      // refresh: 30 * 1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on('load', () => {
      map.trafficLayer(true, options);
      window.onbeforeunload = function (e) {
        map.removeLayerAndSource('icon');
      };
    })
    map.on('zoom', () => {
      if (this.zoomTimer) {
        clearTimeout(this.zoomTimer)
        this.zoomTimer = null
      }
      this.zoomTimer = setTimeout(() => {
        const zoomLev = Math.round(this.map.getZoom())
        this.addMarker(this.pointLists, zoomLev)
      }, 700)
    })
    this.map = map
  }
  clickOperationNum = (id) => {
    if (id === 1) {
      // this.getAddDataList()
      this.initializationState()
      this.addRoad = true
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
    this.addRoad = true
    if (eventKey.length === 0) {
      this.setState({ menuOpenkeys: [], rights: -300 })
    } else {
      const keys = eventKey.pop()
      const { menuOpenkeys } = this.state
      if (eventKey !== menuOpenkeys) {
        this.openkeys = keys
        this.getLoadChildTree(keys)
      }
    }
  }
  onOpeSubMenu = (e, SubMenuItem) => { // 数据回显
    this.isAddEdit = false
    this.roaddId = SubMenuItem.id
    this.setState({
      isAddEdit: false,
      rights: 0,
      ismodify: true,
      detail: SubMenuItem.detail,
      sub_district_code: SubMenuItem.sub_district_code,
      sub_district_name: SubMenuItem.sub_district_name,
      sub_district_user: SubMenuItem.sub_district_user,
      roadtitle: '区域信息',
    })
  }
  onClickMenuItem = (item) => {
    // console.log(item, 'vvcss')
    // this.setState({
    //   rights: 0,
    //   isAddEdit: false
    // })
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  handleClckMessge = () => {
    this.setState({

    })
  }
  noneAddRoad = () => { // 取消添加修改
    this.addRoad = false
    this.setState({
      rights: -300
    })
  }
  getismodify = (isShowName) => { // 添加编辑
    this.showName = isShowName // 编辑
    this.setState({
      ismodify: false,
      isAddEdit: true,
      roadtitle: '干线修改',
    })
  }
  changeLoadRouteDirection = (e, options) => { // 添加修改input selecct
    if (options) {
      const { addeditname, intername, children } = options.props
      // console.log(intername, children, e)
      this.setState({
        [addeditname]: children,
        [intername]: e,
      })
    } else {
      const { value } = e.target
      const nameInput = e.target.getAttribute('intername')
      this.setState({
        [nameInput]: value,
      })
    }
  }
  handclickAddEdit = () => {// 添加或修改路口按钮
    let str = ''
    const {
      detail,
      sub_district_code,
      sub_district_name,
      sub_district_user,
      unitArr,
    } = this.state
    unitArr && unitArr.forEach(item => str += item.id + ',')
    const addobjs = {
      sub_district_code,
      sub_district_name,
      sub_district_user,
      unitArr: str,
      detail: detail,
      id: '',
    }
    console.log(this.FormData(addobjs), sub_district_name, sub_district_user, sub_district_code, detail, ":::::")
    if (this.showName === 'edit') {
      addobjs.id = JSON.stringify(this.roaddId)
    }
    axiosInstance.post(`${this.saveOrUpdateSubDistrict}?${this.FormData(addobjs)}`,).then(res => { // 干线
      const { code, result } = res.data
      if (code === '1') {
        this.setState({
          rights: -300,
          menuOpenkeys: [],
        })
        message.info(result)
        this.getDataList()
        this.initializationState()
      } else {
        // this.setState({
        //   rights: -300,
        //   menuOpenkeys: [],
        // })
        // message.info(result)
      }
      // this.getDataList()
      // this.initializationState()
    })
  }
  delectroad = (id) => {
    const { unitArr } = this.state
    const index = unitArr.findIndex(item => item.id === id)
    unitArr.splice(index, 1)
    console.log(index, unitArr)
    this.setState({
      unitArr: unitArr,
    })
  }
  FormData = (adj) => {
    let str = ''
    for (const key in adj) {
      str += `${key}=${adj[key]}&`
    }
    return str
  }
  // 显示提示框
  deleteList() {
    this.setState({
      deleteConfirm: true,
    })
  }
  // 确定删除
  deleteOks = () => {
    axiosInstance.post(`${this.deleteSubDistrict}/${this.roaddId}`).then(res => {// 管理单位 this.deleteUnitInfo
      // console.log(res.data, '删除')
      const { code, result } = res.data
      if (code === '1') {
        this.setState({
          deleteConfirm: false,
          rights: -300,
          menuOpenkeys: [],
        })
        message.info(result)
        this.getDataList()
      }
    })
  }
  // 取消删除
  deleteCancel = () => {
    this.setState({
      deleteConfirm: false,
    })
  }
  // 路口搜索
  handleInterSearch = (value, options) => {
    console.log(value, options)
    const { key, lng, lat } = options
    this.map.panTo([lng, lat])
    $('#marker' + key).trigger('click')
  }
  render() {
    const { Option } = Select
    const {
      mainHomePage, treeList, clickNum, menuOpenkeys, isAddEdit, rights, ismodify, pointlist,
      roadtitle, detail, sub_district_code, sub_district_name, sub_district_user, unitArr, deleteConfirm,
    } = this.state
    return (
      <div className='RegionBox'>
        <div className='sildeRight' style={{ right: `${rights}px` }}>
          <div className="slideRightBoxAdd">
            <div className='addMainLine'>
              <div className='newLine'>{roadtitle}</div>
              {
                ismodify ?
                  <div className='operationLine'>
                    <span onClick={() => this.deleteList()} >删除</span><span onClick={() => this.getismodify('edit')}>编辑</span>
                  </div>
                  :
                  <div className='operationLine'>
                    <span onClick={this.handclickAddEdit}>保存</span><span onClick={this.noneAddRoad}>取消</span>
                  </div>
              }
            </div>
            {
              isAddEdit ?
                <div className='slideRightBoxAddBox'>
                  <p><span>区域名称：</span><input onChange={this.changeLoadRouteDirection} value={sub_district_name} intername='sub_district_name' type="text" className='inputBox' placeholder="区域名称" /></p>
                  <p><span>区域编号：</span><input onChange={this.changeLoadRouteDirection} value={sub_district_code} intername='sub_district_code' type="text" className='inputBox' placeholder="区域编号" /></p>
                  <p><span>区域创建者：</span><input onChange={this.changeLoadRouteDirection} value={sub_district_user} intername='sub_district_user' type="text" className='inputBox' placeholder="区域创建者" /></p>
                  <p><span>区域描述：</span><input onChange={this.changeLoadRouteDirection} value={detail} intername='detail' type="text" className='inputBox' placeholder="区域描述" /></p>
                  <div className='lineBox'>
                    <div className="lineBoxRight">
                      {
                        unitArr && unitArr.map((item, index) => {
                          return (
                            <p key={item + index}><b>{item.unit_name}</b><span><CloseOutlined onClick={() => this.delectroad(item.id)} /></span></p>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                :
                <div className='roadDetailBox'>
                  <p>区域名称：{sub_district_name}</p>
                  <p>区域编号：{sub_district_code}</p>
                  <p>区域创建者：{sub_district_user}</p>
                  <p>区域描述：{detail}</p>
                  <div className='lineBox'>
                    <div className="lineBoxRight">
                      {
                        unitArr && unitArr.map((item, index) => {
                          return (
                            <p key={item + index}><b>{item.unit_name}</b></p>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
        <div className="interSearchBox">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="路口查询"
            onChange={this.handleInterSearch}
            dropdownClassName="searchList"
          >
            {
              pointlist &&
              pointlist.map((item) => (
                <Option key={item.unit_code} value={item.unit_name} lng={item.longitude} lat={item.latitude}>{item.unit_name}</Option>
              ))
            }
          </Select>
        </div>
        <div className='sidebarLeft'>
          <div className='tabLeft'>
            {
              this.clickOperation.map(item => <span className={clickNum === item.id ? 'active' : ''}
                onClick={() => this.clickOperationNum(item.id)} key={item.id}>{item.name}</span>)
            }
          </div>
          {/* <div className="topNavMon">
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
          </div> */}
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
                    onTitleClick={(e) => this.onOpeSubMenu(e, item)}
                    title={item.sub_district_name}
                    data_item={item}
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
        <Modal
          title="确定删除?"
          visible={deleteConfirm}
          onOk={this.deleteOks}
          onCancel={this.deleteCancel}
        />
      </div >
    )
  }
}

export default Region