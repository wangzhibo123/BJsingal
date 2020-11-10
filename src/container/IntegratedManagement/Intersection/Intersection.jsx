/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Select, Modal, message } from 'antd'
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Children } from 'react';
import $ from 'jquery'
import './Intersection.scss'
import mapConfiger from '../../utils/minemapConf'
import axiosInstance from '../../utils/getInterfaceData'
const { SubMenu } = Menu;
class Intersection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteConfirm: false,
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
      clickNum: '',
      treeList: [],
      menuOpenkeys: [],
      rights: -300,
      ismodify: false,
      isAddEdit: true,
      UnitPosition: [],
      UnitType: [],
      UnitGroup: [],
      UnitDistrict: [],

      // 路口详情参数
      roadposition: '',
      roadunit_type_code: '',
      roaddistrict_id: '',
      roaduser_group_id: '',
      roadbe_taken: '',

      unit_code: '',
      unit_type_code: '',
      unit_position: '',
      district_id: '',
      user_group_id: '',
      longitude: '',
      latitude: '',
      signal_sys_unit_id: '',
      signal_system_code: '',
      signal_unit_id: '',
      minor_unit_number: '',
      be_taken: '',
      unit_name: '',
      unit_name_signal_sys: '',
      main_unit_id: '',
      unit_name_old: '',
    }
    this.clickOperation = [
      {
        id: 1,
        name: '新增路口',
      },
      {
        id: 3,
        name: '切换视图',
      }
    ]

    this.getPointAll = '/engine-maintenance/unit/getPointAll' // 加载所有点位
    this.loadTree = '/engine-maintenance/districtManagement/loadTree' // 路口管理树
    this.editDistrictInfo = '/engine-maintenance/districtManagement/editSubDistrictInfo' // 加载当前区域信息
    this.deleteUnitInfo = '/engine-maintenance/unit/deleteUnitInfo' // 删除路口信息
    this.getUnitDistrict = '/engine-maintenance/unit/getUnitDistrict' // 所属区域
    this.getUnitGroup = '/engine-maintenance/unit/getUnitGroup' // 管理单位
    this.getUnitPosition = '/engine-maintenance/unit/getUnitPosition' // 路口位置
    this.getUnitType = '/engine-maintenance/unit/getUnitType' // 路口类型
    this.saveOrUpdateUnitInfo = '/engine-maintenance/unit/saveOrUpdateUnitInfo' // 新增修改路口信息
    this.defaultChildren = []
    this.newChildId = []
    this.showName = 'add'
    this.mapaddOnclick = false
  }
  componentDidMount = () => {
    this.renderMap()
    this.getDataList()
    this.addRoadList()
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
  initializationState = () => { // 新增修改变量初始化
    this.setState({
      roadposition: '',
      roadunit_type_code: '',
      roaddistrict_id: '',
      roaduser_group_id: '',
      roadbe_taken: '',
      unit_code: '',
      unit_type_code: '',
      unit_position: '',
      district_id: '',
      user_group_id: '',
      longitude: '',
      latitude: '',
      signal_sys_unit_id: '',
      signal_system_code: '',
      signal_unit_id: '',
      minor_unit_number: '',
      be_taken: '',
      unit_name: '',
      unit_name_signal_sys: '',
      main_unit_id: '',
      unit_name_old: '',
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
  addMarkerData = () => {
    axiosInstance.post(this.getPointAll).then(res => {
      const { code, list } = res.data
      if (code === '1') {
        this.addMarker(list)
      }
    })
  }
  addMarker = (mapMaker) => {
    const currentThis = this
    this.markers = []
    mapMaker && mapMaker.forEach(item => {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'green'
      el.style.cursor = 'pointer'
      el.addEventListener('click', function (e) {
        currentThis.addInfoWindow(item)
      });
      new window.mapabcgl.Marker(el)
        .setLngLat([item.longitude, item.latitude])
        .addTo(this.map)
    })
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
      .setLngLat(new window.mapabcgl.LngLat(marker.longitude, marker.latitude))
      .setHTML(this.getInfoWindowHtml(marker))
      .addTo(this.map)
    $('.mapabcgl-popup')[0].style.maxWidth = '1000px'
  }
  getInfoWindowHtml = (interMsg) => {
    return `
      <div class="infoWindow">
        <div class="infotitle">${interMsg.unit_name}</div>
        <div class="interMessage">
          <div class="message">设备类型：信号灯</div>
          <div class="message">所属城区：${interMsg.district_name}</div>
          <div class="message">控制状态：${interMsg.control_state}</div>
          <div class="message">信号系统：${interMsg.signal_system_code}</div>
          <div class="message">信号机IP：${interMsg.signal_ip}</div>
          <div class="message">设备状态：${interMsg.alarm_state}</div>
          <div class="message">运行阶段：${interMsg.stage_code}</div>
        </div>
        <div class="interDetails"><div class="monitorBtn">路口检测</div></div>
      </div>
    `
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
    // map.poiClick(true);
    map.on('click', (e) => {
      console.log(this.mapaddOnclick, e.lngLat.lng.toFixed(6))
      if (this.mapaddOnclick) {

        this.setState({
          longitude: e.lngLat.lng.toFixed(6),
          latitude: e.lngLat.lat.toFixed(6)
        })
      }
      // document.getElementById('lnglat').value = e.lngLat.lng.toFixed(6) + "," + e.lngLat.lat.toFixed(6);
    });
    map.on('load', () => {
      map.trafficLayer(true, options);
      this.addMarkerData()
      window.onbeforeunload = function (e) {
        map.removeLayerAndSource('icon');
      };
    })
    this.map = map
  }
  clickOperationNum = (id) => {
    if (id === 1) {
      this.mapaddOnclick = true
      this.showName = 'add'
      this.initializationState()
      this.setState({
        rights: 0,
        isAddEdit: true,
        ismodify: false,
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
  addRoadList = () => { // 添加路口调用函数
    axiosInstance.post(this.getUnitDistrict).then(res => {// 所属区域
      console.log(res.data, '所属区域')
      const { code, list } = res.data
      if (code === '1') {
        this.setState({
          UnitDistrict: list
        })
      }
    })
    axiosInstance.post(this.getUnitGroup).then(res => {// 管理单位
      console.log(res.data, '管理单位')
      const { code, list } = res.data
      if (code === '1') {
        this.setState({
          UnitGroup: list
        })
      }
    })
    axiosInstance.post(this.getUnitPosition).then(res => {// 路口位置
      console.log(res.data, '路口位置')
      const { code, list } = res.data
      if (code === '1') {
        this.setState({
          UnitPosition: list
        })
      }
    })
    axiosInstance.post(this.getUnitType).then(res => { // 路口类型
      console.log(res.data, '路口类型')
      const { code, list } = res.data
      if (code === '1') {
        this.setState({
          UnitType: list
        })
      }
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
        this.openkeys = keys
        this.getLoadChildTree(keys)
      }
    }
  }
  onClickMenuItem = (event) => { // 点击menu-item
    console.log(event.item.props.data_item, 'vvbbb')
    const { UnitPosition, UnitType, UnitDistrict, UnitGroup } = this.state
    const { data_item } = event.item.props
    this.roaddId = data_item.id
    console.log(UnitPosition, data_item.unit_position, '121321324564')
    const roadposition = UnitPosition && UnitPosition.find(item => item.c_code === data_item.unit_position).code_name
    const roadunit_type_code = UnitType && UnitType.find(item => item.c_code === data_item.unit_type_code).code_name
    const roaddistrict_id = UnitDistrict && UnitDistrict.find(item => item.id === data_item.district_id).district_name
    const roaduser_group_id = UnitGroup && UnitGroup.find(item => item.id === data_item.user_group_id).user_group_name
    const roadbe_taken = data_item.be_take === 1 ? '是' : '否'
    this.setState({
      rights: 0,
      isAddEdit: false,
      ismodify: true,
      unit_code: data_item.unit_code,
      unit_type_code: data_item.unit_type_code,
      unit_position: data_item.unit_position,
      district_id: data_item.district_id,
      user_group_id: data_item.user_group_id,
      longitude: data_item.longitude,
      latitude: data_item.latitude,
      signal_sys_unit_id: data_item.signal_sys_unit_id,
      signal_unit_id: data_item.signal_unit_id,
      minor_unit_number: data_item.minor_unit_number,
      be_taken: data_item.be_taken,
      unit_name: data_item.unit_name,
      unit_name_signal_sys: data_item.unit_name_signal_sys,
      signal_system_code: data_item.signal_system_code,
      main_unit_id: data_item.main_unit_id,
      unit_name_old: data_item.unit_name_old,
      roadposition,
      roadunit_type_code,
      roaddistrict_id,
      roaduser_group_id,
      roadbe_taken,
    })
  }
  delectRoad = () => { // 点击删除路口
    axiosInstance.post(`${this.deleteUnitInfo}/${this.roaddId}`).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        this.getLoadChildTree(this.openkeys)
      }
    })
  }
  noneAddRoad = () => { // 取消添加修改
    this.mapaddOnclick = false
    this.setState({
      rights: -300
    })
    this.initializationState()
  }
  handclickAddEdit = () => {// 添加或修改路口按钮
    // this.mapaddOnclick = false
    const {
      unit_code,
      unit_type_code,
      unit_position,
      district_id,
      user_group_id,
      longitude,
      latitude,
      signal_sys_unit_id,
      signal_system_code,
      signal_unit_id,
      minor_unit_number,
      be_taken,
      unit_name,
      unit_name_signal_sys,
      main_unit_id,
      unit_name_old,
    } = this.state
    let addroadData = {
      be_taken,
      district_id,
      latitude,
      longitude,
      main_unit_id,
      minor_unit_number,
      signal_sys_unit_id,
      signal_system_code,
      signal_unit_id,
      unit_code,
      unit_name,
      unit_name_old,
      unit_name_signal_sys,
      unit_position,
      unit_type_code,
      user_group_id,
      id: '',
    }
    if (this.showName === 'edit') {
      addroadData.id = JSON.stringify(this.roaddId)
    }
    // console.log(addroadData, '查看内容')
    axiosInstance.post(this.saveOrUpdateUnitInfo, addroadData).then(res => {// 路口位置
      // console.log(res.data, '路口添加 修改')
      const { code, result } = res.data
      if (code === '1') {
        if (result === '操作失败') {
          message.info(result)
        } else {
          this.setState({
            rights: -300,
            menuOpenkeys: [],
          })
          message.info(result)
        }

      }
      this.getDataList()
      this.initializationState()
    })

  }
  changeLoadRouteDirection = (e, options) => { // 选择干线方向
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
  getChangeValue = (e) => {
    console.log(e)
  }
  getismodify = (isShowName) => { // 添加编辑
    this.showName = isShowName // 编辑
    this.mapaddOnclick = true
    this.setState({
      ismodify: false,
      isAddEdit: true,
    })
  }
  // 显示提示框
  deleteList() {
    this.setState({
      deleteConfirm: true,
    })
  }
  // 确定删除
  deleteOks = () => {
    axiosInstance.post(`${this.getUnitGroup}/${this.roaddId}`).then(res => {// 管理单位 this.deleteUnitInfo
      console.log(res.data, '删除')
      // const { code, list } = res.data
      // if (code === '1') {
      //   this.setState({
      //     UnitGroup: list
      //   })
      // }
    })
  }
  // 取消删除
  deleteCancel = () => {
    this.setState({
      deleteConfirm: false,
    })
  }
  render() {
    const { Option } = Select
    const {
      mainHomePage, treeList, clickNum, menuOpenkeys, isAddEdit, rights, ismodify,
      unit_code, unit_type_code, unit_position, district_id, user_group_id, longitude, latitude,
      signal_sys_unit_id, signal_unit_id, minor_unit_number, be_taken, unit_name, deleteConfirm,
      UnitPosition, UnitType, UnitGroup, UnitDistrict, signal_system_code,
      unit_name_signal_sys, main_unit_id, unit_name_old,
      roadposition, roadunit_type_code, roaddistrict_id, roaduser_group_id, roadbe_taken
    } = this.state
    return (
      <div className='IntersectionBox'>
        <div className='sildeRight' style={{ right: `${rights}px` }}>
          <div className="slideRightBoxAdd">
            {/* <div className='addMainLine'>
                  <div className='newLine'>新增路口</div>
                  <div className='operationLine'><span>保存</span><span onClick={this.noneAddRoad}>取消</span></div>
                </div> */}
            <div className='addMainLine'>
              <div className='newLine'>西湖南大街详情</div>
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
                  <p><span>路口名称：</span><input value={unit_name} intername='unit_name' onChange={this.changeLoadRouteDirection} type="text" className='inputBox' placeholder="区域名称" /></p>
                  <p><span>路口编号：</span><input value={unit_code} intername='unit_code' onChange={this.changeLoadRouteDirection} type="text" className='inputBox' placeholder="区域编号" /></p>
                  <p><span>原始路口名称：</span><input value={unit_name_old} intername='unit_name_old' onChange={this.changeLoadRouteDirection} type="text" className='inputBox' placeholder="区域编号" /></p>
                  <div className='divs'><span>路口位置：</span>
                    <Select
                      value={roadposition}
                      style={{ width: 195, height: 30 }}
                      onChange={this.changeLoadRouteDirection}
                    >
                      {
                        UnitPosition && UnitPosition.map((item) => {
                          return (
                            <Option addeditname='roadposition' intername='unit_position' value={item.c_code} key={item.id}>{item.code_name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className='divs'><span>路口类型：</span>
                    <Select
                      value={roadunit_type_code}
                      style={{ width: 195, height: 30 }}
                      onChange={this.changeLoadRouteDirection}
                    >
                      {
                        UnitType && UnitType.map((item) => {
                          return (
                            <Option addeditname='roadunit_type_code' intername='unit_type_code' value={item.c_code} key={item.id}>{item.code_name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className='divs'><span>所属区域：</span>
                    <Select
                      value={roaddistrict_id}
                      style={{ width: 195, height: 30 }}
                      onChange={this.changeLoadRouteDirection}
                    >
                      {
                        UnitDistrict && UnitDistrict.map((item) => {
                          return (
                            <Option addeditname='roaddistrict_id' intername='district_id' value={item.id} key={item.id}>{item.district_name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className='divs'><span>管理单位：</span>
                    <Select
                      value={roaduser_group_id}
                      style={{ width: 195, height: 30 }}
                      onChange={this.changeLoadRouteDirection}
                    >
                      {
                        UnitGroup && UnitGroup.map((item) => {
                          return (
                            <Option addeditname='roaduser_group_id' intername='user_group_id' value={item.id} key={item.id}>{item.user_group_name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <p><span>经度：</span><input intername='longitude' onChange={this.changeLoadRouteDirection} value={longitude} type="text" className='inputBox' placeholder="经度" /></p>
                  <p><span>纬度：</span><input intername='latitude' onChange={this.changeLoadRouteDirection} value={latitude} type="text" className='inputBox' placeholder="纬度" /></p>
                  <p><span>信号系统路口名称：</span><input value={unit_name_signal_sys} intername='unit_name_signal_sys' onChange={this.changeLoadRouteDirection} type="text" className='inputBox' placeholder="信号系统路口名称：" /></p>
                  <p><span>信号系统路口编号：</span><input value={signal_sys_unit_id} intername='signal_sys_unit_id' onChange={this.changeLoadRouteDirection} type="text" className='inputBox' placeholder="信号系统路口编号：" /></p>
                  <p><span>信号机对应路口编号：</span><input value={signal_unit_id} intername='signal_unit_id' onChange={this.changeLoadRouteDirection} type="text" className='inputBox' placeholder="信号机对应路口编号" /></p>
                  <p><span>信号控制系统：</span><input value={signal_system_code} intername='signal_system_code' onChange={this.changeLoadRouteDirection} type="text" className='inputBox' placeholder="信号控制系统" /></p>
                  <p><span>控制路口数：</span><input value={minor_unit_number} intername='minor_unit_number' onChange={this.changeLoadRouteDirection} t type="text" className='inputBox' placeholder="控制路口数" /></p>
                  <div className='divs'><span>是否被带</span>
                    <Select
                      value={roadbe_taken}
                      style={{ width: 195, height: 30 }}
                      onChange={this.changeLoadRouteDirection}
                    >
                      <Option addeditname='roadbe_taken' intername='be_taken' value={1} key='784545475ss'>是</Option>
                      <Option addeditname='roadbe_taken' intername='be_taken' value={0} key='7845453265ss'>否</Option>
                    </Select>
                  </div>
                  <p><span>主路口编号：</span><input value={main_unit_id} intername='main_unit_id' onChange={this.changeLoadRouteDirection} type="text" className='inputBox' placeholder="主路口编号" /></p>
                </div>
                :
                <div className='roadDetailBox'>
                  <p>路口名称：<span>{unit_name}</span></p>
                  <p>路口编号：<span>{unit_code}</span></p>
                  <p>原始路口名称：<span>{unit_name_old}</span></p>
                  <p>路口位置：<span>{roadposition}</span></p>
                  <p>路口类型：<span>{roadunit_type_code}</span></p>
                  <p>所属区域：<span>{roaddistrict_id}</span></p>
                  <p>管理单位：<span>{roaduser_group_id}</span></p>
                  <p>经度：<span>{longitude}</span></p>
                  <p>纬度：<span>{latitude}</span></p>
                  <p>信号系统路口名称：<span>{unit_name_signal_sys}</span></p>
                  <p>信号系统路口编号：<span>{signal_sys_unit_id}</span></p>
                  <p>信号机对应路口编号：<span>{signal_unit_id}</span></p>
                  <p>信号控制系统：<span>{signal_system_code}</span></p>
                  <p>控制路口数：<span>{minor_unit_number}</span></p>
                  <p>是否被带：<span>{roadbe_taken}</span></p>
                  <p>主路口编号：<span>{main_unit_id}</span></p>
                </div>
            }
          </div>
          <div>
            {/* <div className='addMainLine'>
                  <div className='newLine'>西湖南大街详情</div>
                  {
                    !ismodify ? <div className='operationLine'><span>删除</span><span onClick={() => this.getismodify(true)}>编辑</span></div> : <div className='operationLineAdd'><span>保存</span><span>取消</span></div>
                  }
                </div> */}
            {/* <div className='roadDetailBox'>
                  <p>路口名称：<span>{unit_name}</span></p>
                  <p>路口编号：<span>{unit_code}</span></p>
                  <p>原始路口名称：<span>{}</span></p>
                  <p>路口类型：<span>{unit_type_code || 0}</span></p>
                  <p>路口位置：<span>{unit_position || 0}</span></p>
                  <p>所属区域：<span>{district_id || 0}</span></p>
                  <p>管理单位：<span>{user_group_id || 0}</span></p>
                  <p>经度：<span>{longitude || 0}</span></p>
                  <p>纬度：<span>{latitude || 0}</span></p>
                  <p>信号控制系统对应路口编号：<span>{signal_sys_unit_id || 0}</span></p>
                  <p>信号系统路口名称：<span>{}</span></p>
                  <p>信号机对应路口编号：<span>{signal_unit_id || 0}</span></p>
                  <p>控制路口数：<span>{minor_unit_number || 0}</span></p>
                  <p>是否被带：<span>{be_taken || 0}</span></p>
                  <p>主路口编号：<span>{}</span></p>
                </div> */}
          </div>
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
              style={{ width: 251, color: '#86b7fa', height: '100%', fontSize: '16px' }}
              mode="inline"
              openKeys={menuOpenkeys}
            >
              {
                treeList && treeList.map((item, index) =>
                  <SubMenu
                    key={item.id}
                    title={item.district_name}
                  >
                    {
                      item.childrens &&
                      item.childrens.map((child) => (
                        <Menu.Item data_item={child} key={child.id}>{child.unit_name}</Menu.Item>
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
              <div className='title'>路口管理</div>
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

export default Intersection