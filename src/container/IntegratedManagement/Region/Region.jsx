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
    this.getPointAll = '/control-application-front/index/getPointByFault?user_id=1' // 加载所有点位
    this.loadSubDistrictTree = '/control-application-front/subDistrictManagement/loadSubDistrictTree' // 区域树
    this.deleteSubDistrict = '/control-application-front/subDistrictManagement/deleteSubDistrict' // 删除子区信息
    this.saveOrUpdateSubDistrict = '/control-application-front/subDistrictManagement/saveOrUpdateSubDistrict' // 新增修改子区信息

    this.interMarkers = []
    this.addRoad = false // 新增区域数组
    this.unitArr = []
    this.switchViews = false
    this.regionRoad = {
      sub_district_name: '请输入区域名称',
      sub_district_code: '请输入区域编号',
      sub_district_user: '请输入区域创建者',
      unitArr: '请在页面选择点位'
    }
  }
  componentDidMount = () => {
    this.renderMap()
    this.getDataList()
    this.addMarkerData()
  }
  ficationRoad = () => { // 验证新增路口不能为空
    for (const i in this.regionRoad) {
      if (!this.state[i]) {
        return message.warning(this.regionRoad[i])
      } else {
        if (i == 'sub_district_code' || i == 'sub_district_user') {
          const reg = /^[0-9]*$/.test(this.state[i])
          if (!reg) {
            return message.warning(`${this.trunkRoad[i]}且只能为数字`)
          }
        }
      }
    }
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
      const { code, pointlist } = res.data
      if (code === '1') {
        this.pointLists = pointlist
        this.addMarker(this.pointLists, 13)
        this.setState({
          pointlist: pointlist,
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
        console.log(treeList, 'sdds')
        this.unitArr = treeList
        this.addRoadCircle(this.unitArr)
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
      console.log(points, zoomVal, interList, 'sdfsdfds')
      interList && interList.forEach((item, index) => {
        const innerBgcolor = item.alarm_state === 1 ? '#08c208' : item.alarm_state === 2 ? '#D7C19C' : '#FF0200'
        const bgColor = item.alarm_state === 1 ? 'rgba(8,194,8,.3)' : item.alarm_state === 2 ? 'rgba(215,193,156,.3)' : 'rgba(255,2,0,.3)'
        const el = document.createElement('div')
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = bgColor
        el.style.display = 'flex'
        el.style.justifyContent = 'center'
        el.style.alignItems = 'center'
        el.style.cursor = 'pointer'
        el.id = 'marker' + item.unit_code
        const childEl = document.createElement('div')
        childEl.style.width = '10px'
        childEl.style.height = '10px'
        childEl.style.borderRadius = '50%'
        childEl.style.backgroundColor = innerBgcolor
        el.appendChild(childEl)
        el.addEventListener('click', function (e) {
          // console.log(item, currentThis.addRoad, '123456')
          if (currentThis.addRoad) {
            $('#marker' + item.unit_code).addClass('markers')
            currentThis.unitArr.push(item)
            currentThis.setState({
              unitArr: currentThis.unitArr,
            })
          }
        });
        if (isNaN(item.longitude) || isNaN(item.latitude)) {
          console.log(index)
        }
        const marker = new window.mapabcgl.Marker(el)
          .setLngLat([item.longitude, item.latitude])
          .addTo(this.map)
        this.interMarkers.push(marker)
      })
    }
  }
  removeOneCircle = (unit_code) => { // 删除单个点位颜色
    $('#marker' + unit_code).removeClass('markers')
  }
  addRoadCircle = (Arr) => { // 渲染所有点位
    Arr.forEach(item => {
      $('#marker' + item.unit_code).addClass('markers')
    })
  }
  removeRoadCircle = () => { // 清除颜色点位
    if (this.unitArr.length) {
      this.unitArr.forEach(item => {
        $('#marker' + item.unit_code).removeClass('markers')
      })
      this.unitArr = []
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
    // map.on('zoom', () => {
    //   if (this.zoomTimer) {
    //     clearTimeout(this.zoomTimer)
    //     this.zoomTimer = null
    //   }
    //   this.zoomTimer = setTimeout(() => {
    //     const zoomLev = Math.round(this.map.getZoom())
    //     this.addMarker(this.pointLists, zoomLev)
    //   }, 700)
    // })
    this.map = map
  }
  clickOperationNum = (id) => {
    if (id === 1) {
      // this.getAddDataList()
      this.initializationState()
      this.removeRoadCircle()
      this.addRoad = true
      this.setState({
        rights: 0,
        ismodify: false,
        isAddEdit: true,
        menuOpenkeys: []
      })
    } else if (id === 3) {
      this.switchViews = !this.switchViews
      if (this.switchViews) {
        this.map.flyTo({
          // center: [116.391, 39.911], 
          zoom: 14,
          pitch: 60
        })
      } else {
        this.map.flyTo({
          // center: [116.391, 39.911], 
          zoom: 11,
          pitch: 0
        })
      }
    }
    this.setState({
      clickNum: id
    })
  }
  handleClickMenu = e => { //SubMenu-item触发
    console.log('click ', e);
  }
  onOpenChangeSubMenu = (eventKey) => { // SubMenu-ite触发
    this.addRoad = false
    this.removeRoadCircle()
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
      clickNum:0, // 新增按钮取消
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
    this.removeRoadCircle()
    this.addRoad = false
    this.setState({
      rights: -300,
      menuOpenkeys: []
    })
  }
  getismodify = (isShowName) => { // 添加编辑
    this.showName = isShowName // 编辑
    this.addRoad = true
    this.setState({
      ismodify: false,
      isAddEdit: true,
      roadtitle: '区域修改',
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
  handclickAddEdit = async () => {// 添加或修改路口按钮
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
    const as = await this.ficationRoad()
    if (!as) {
      if (this.showName === 'edit') {
        addobjs.id = JSON.stringify(this.roaddId)
      }
      axiosInstance.post(`${this.saveOrUpdateSubDistrict}?${this.FormData(addobjs)}`,).then(res => { // 区域
        const { code, result } = res.data
        if (code === '1') {
          this.setState({
            rights: -300,
            menuOpenkeys: [],
          })
          message.info(result)
          this.addRoad = false
          this.getDataList()
          this.initializationState()
          this.removeRoadCircle()
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
  }
  delectroad = (id) => {
    const index = this.unitArr.findIndex(item => item.id === id)
    this.removeOneCircle(this.unitArr[index].unit_code)
    this.unitArr.splice(index, 1)
    this.setState({
      unitArr: this.unitArr,
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
        <div className="mapLegend">
          <div className="pointStatus">
            <div className="statusItem"><span className="pointIcon onlineColor"></span> 在线</div>
            <div className="statusItem"><span className="pointIcon offlineColor"></span> 离线</div>
            <div className="statusItem"><span className="pointIcon faultColor"></span> 故障</div>
          </div>
        </div>
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
                    <div className='lineBoxer'>
                      {
                        unitArr && unitArr.map((item, index) =>
                          <div key={item.id} className='lineBoxer_item'>
                            <div className='streetBox'>
                              <p title={item.unit_name} className='street'><span>{index < 9 ? ('0' + (index + 1)) : index}</span>
                                <li>{item.unit_name}</li>
                                <b><DeleteOutlined onClick={() => this.delectroad(item.id)} /></b></p>
                              <div className='intersectionBox'>
                                <p className='intersection'><span>{item.unit_name}</span><span>{item.org_area}</span></p>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    {/* <div className="lineBoxRight">
                      {
                        unitArr && unitArr.map((item, index) => {
                          return (
                            <p key={item + index}><b>{item.unit_name}</b></p>
                          )
                        })
                      }
                    </div> */}
                  </div>
                </div>
                :
                <div className='roadDetailBox'>
                  <p>区域名称：{sub_district_name}</p>
                  <p>区域编号：{sub_district_code}</p>
                  <p>区域创建者：{sub_district_user}</p>
                  <p>区域描述：{detail}</p>
                  <div className='lineBox'>
                    <div className='lineBoxer'>
                      {
                        unitArr && unitArr.map((item, index) =>
                          <div key={item.id} className='lineBoxer_item'>
                            <div className='streetBox'>
                              <p title={item.unit_name} className='street'><span>{index < 9 ? ('0' + (index + 1)) : index}</span>{item.unit_name}</p>
                              <div className='intersectionBox'>
                                <p className='intersection'><span>{item.unit_name}</span><span>{item.org_area}</span></p>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
        {/* <div className="interSearchBox"> // 搜索输入框
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
        </div> */}
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
                        <Menu.Item disabled={true} key={child.id}>{child.unit_name}</Menu.Item>
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