/* eslint-disable no-redeclare */
/* eslint-disable eqeqeq */
import React, { Component } from 'react'
import { Menu, Select, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import $ from 'jquery'
import './TrunkManagement.scss'
import mapConfiger from '../../utils/minemapConf'
// import messageBac from '../../imgs/messageBac.png'
import startPng from '../../imgs/start.png'
import endPng from '../../imgs/end.png'
import axiosInstance from '../../utils/getInterfaceData'
const { SubMenu } = Menu
class TrunkManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
      isAddEdit: true,
      treeListChild: [],
      treeListChildId: [],
      treeList: [],
      loadRouteDirectionList: [],
      loadRouteTypeList: [],
      clickNum: '',
      rights: -300,
      ismodify: false,
      menuOpenkeys: [],
      treeListChild: [],
      stateSelect: [
      ],
      route_name: '',
      route_code: '',
      route_direction: '',
      route_directionvalue: '',
      route_miles: '',
      route_type: '',
      route_typevalue: '',
      detail: '',
      roadtitle: '路口信息',
      deleteConfirm: false,
      // 添加和修改

    }
    this.defaultChildren = []
    this.clickOperation = [
      {
        id: 1,
        name: '新增干线',
      },
      {
        id: 3,
        name: '切换视图',
      }
    ]
    this.getPointAll = '/control-application-front/unitInfo/getPointAll' // 获取所有点位
    this.deleteRoute = '/control-application-front/routeManagement/deleteRoute' // 删除干线信息
    this.getRouteInfo = '/control-application-front/routeManagement/getRouteInfo' // 加载当前干线信息
    this.loadRouteTree = '/control-application-front/routeManagement/loadRouteTree' // 干线树
    this.loadRouteDirection = '/control-application-front/routeManagement/loadRouteDirection' // 干线方向
    this.loadRouteType = '/control-application-front/routeManagement/loadRouteType' // 干线类型
    this.saveOrUpdateDistrict = '/control-application-front/routeManagement/saveOrUpdateRoute' // 新增修改干线信息
    this.addMainLine = false
    this.addRoadLine = false
    this.interMarkers = []
    this.unitArr = ''
    this.showName = 'add'
    this.treeListChild = []
    this.addlineroute = false // 判断是否已经划线
    this.chidArrs = []
    this.switchViews = false
    this.isAddEdit = false
  }
  getDataList = () => {
    axiosInstance.post(this.loadRouteTree).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        this.treeListDatas = treeList
        this.setState({ treeList, treeListChild: this.defaultChildren })
      }
    })
  }
  // getDataList = () => {
  //   axiosInstance.post(this.loadRouteTree).then(res => {
  //     const { code, treeList } = res.data
  //     if (code === '1') {
  //       this.setState({
  //         treeList,
  //       })
  //     }
  //   })
  // }
  // 获取干线子集
  getLoadChildTree = (id) => {
    axiosInstance.post(`${this.loadRouteTree}?id=${id}`).then(res => {
      const { code, treeList } = res.data
      // console.log(treeList, 'vssksnf')
      if (code === '1') {
        this.chidArrs = treeList
        this.treeListChild = treeList
        // console.log(this.treeListDatas, treeList, 'ddvvvv')
        const currentArea = this.treeListDatas.find((item) => item.id === Number(id))
        currentArea.childrens = treeList
        let arrList = []
        treeList.forEach(item => {
          let arrchild = []
          arrchild[0] = item.longitude
          arrchild[1] = item.latitude
          arrList.push(arrchild)
          $('#marker' + item.id).addClass('markers')
        })
        this.drawLine(arrList, true)
        this.setState({
          treeList: this.treeListDatas,
          treeListChild: treeList,
          menuOpenkeys: [id],
          rights: 0,
          isAddEdit: false,
          ismodify: true,
          roadtitle: '干线信息',
        },
          () => {
            // 
            // currentThis.treeListChild.push(item)
            // currentThis.unitArr += item.id + ','
            // currentThis.setState({
            //   treeListChild: currentThis.treeListChild
            // })
            // currentThis.delectlineroute()



            // if (treeList.length >= 3) {
            //   const end = treeList.length
            //   const treeListTwo = treeList.slice(1, end - 1)
            //   // console.log(treeListTwo, 'vssss')
            //   this.getstartpoint({ lng: treeList[0].longitude, lat: treeList[0].latitude })
            //   treeListTwo.forEach(item => {
            //     this.getChannelpoint({ lng: item.longitude, lat: item.latitude })
            //   })
            //   this.getendpoint({ lng: treeList[end - 1].longitude, lat: treeList[end - 1].latitude })
            // } else if (treeList.length === 2) {
            //   const end = treeList.length
            //   this.getstartpoint({ lng: treeList[0].longitude, lat: treeList[0].latitude })
            //   this.getendpoint({ lng: treeList[end - 1].longitude, lat: treeList[end - 1].latitude })
            // } else {
            //   this.clearMap();
            // }
          })
      }
    })
  }
  // getLoadChildTree = (id) => {
  //   axiosInstance.post(`${this.loadRouteTree}?id=${id}`).then(res => {
  //     const { code, treeList } = res.data
  //     if (code === '1') {
  //       this.setState({
  //         defaultChildren: treeList,
  //       })
  //     }
  //   })
  // }
  getAddDataList = () => {
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
    axiosInstance.post(this.loadRouteDirection).then(res => { // 干线方向
      const { code, list } = res.data
      if (code === '1') {
        this.setState({
          loadRouteDirectionList: list,
        })
      }
    })
    axiosInstance.post(this.loadRouteType).then(res => {  // 干线类型
      const { code, list } = res.data
      if (code === '1') {
        this.setState({
          loadRouteTypeList: list,
        })
      }
    })
  }
  gettitletops = (isShow) => {
    this.setState({
      Istitletops: isShow,
    })
  }

  // // 从子集获取区域id和index 请求路口
  // getSelectTreeId = (id) => {
  //   this.getLoadChildTree(id)
  // }
  // 获取子id, 路口id
  // getSelectChildId = (childId) => {
  //   this.setState({
  //     rights: 0,
  //     isAddEdit: false
  //   })
  // }
  getChangeValue = (e) => {
    console.log(e)
  }
  // intersectionRenderin = async () => {

  // }
  componentDidMount = () => {
    this.renderMap()
    this.getDataList()
    this.getAddDataList()
  }
  addInfoWindow = (marker) => {
    if (this.mapPopup) {
      this.mapPopup.remove()
    }
    this.map.addControl(new window.mapabcgl.NavigationControl())
    const popupOption = {
      closeOnClick: false,
      closeButton: true,
      maxWidth: '1000px',
      offset: [0, 0]
    }
    this.mapPopup = new window.mapabcgl.Popup(popupOption)
      .setLngLat(new window.mapabcgl.LngLat(marker.longitude, marker.latitude))
      .setHTML(this.getInfoWindowHtml(marker))
      .addTo(this.map)
    // $('.mapabcgl-popup')[0].style.maxWidth = '1000px'
    // console.log(this.interMonitorBtn)
  }
  getInfoWindowHtml = (interMsg) => {
    // console.log(interMsg, 'dfdfd')
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
      </div >
  `
  }

  // 计算起始与终点之间的中心点 > 用于重置地图中心点
  returnCenterLnglat = (startPoint, endPoint) => {
    const lng = startPoint[0] + (Math.abs(startPoint[0] - endPoint[0]) / 2)
    const lat = startPoint[1] + (Math.abs(startPoint[1] - endPoint[1]) / 2)
    return [lng, lat]
  }
  drawLine = (arr, list) => { // 页面连线f 1111111111111
    if (this.map) {
      this.addlineroute = true
      // console.log(arr, ':::::::::vvv')
      this.map.addLayer({
        "id": 'route',
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": arr,
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": 'yellow',
          "line-width": 6
        }
      });
      if (list) {
        this.map.setZoom(13)
        this.map.setCenter(this.returnCenterLnglat(arr[0], arr[arr.length - 1]))
      }
    }
  }
  delectlineroute = () => { //取消划线
    // 默认为假，点击点位之后为真
    if (this.addlineroute) {
      this.map.removeLayer("route")
      this.map.removeSource("route")
      // console.log(arrList[0], 'one')
    }
  }

  roadCircle = (list) => { // 清空点位颜色取消划线
    if (this.addlineroute) {
      this.map.removeLayer("route")
      this.map.removeSource("route")
    }
    if (list) {
      // console.log(list,'ddfdf')
      list.forEach(item => $('#marker' + item.id).removeClass('markers'))
    }
    this.addlineroute = false
  }
  addMarker = (points, zoomVal) => {
    this.removeMarkers()
    if (this.map) {
      const currentThis = this
      this.markers = []
      const interList = zoomVal < 13 ? points.filter(item => item.unit_grade <= 4) : points
      // console.log(interList, 'sdfsdf')
      interList && interList.forEach((item, index) => {
        const el = document.createElement('div')
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = 'green'
        el.style.cursor = 'pointer'
        el.id = 'marker' + item.id
        el.addEventListener('click', function (e) {
          // console.log(item, '点击点位557')
          if (currentThis.isAddEdit) {
            if (!$('#marker' + item.id).hasClass('markers')) {
              $('#marker' + item.id).addClass('markers')
              currentThis.treeListChild.push(item)
              currentThis.setState({
                treeListChild: currentThis.treeListChild
              })
              currentThis.delectlineroute() // 取消划线
              let arrList = []
              currentThis.treeListChild.forEach(item => {
                let arrchild = []
                arrchild[0] = item.longitude
                arrchild[1] = item.latitude
                arrList.push(arrchild)
              })
              currentThis.drawLine(arrList) // 调用划线
            }
          }
          // currentThis.addInfoWindow(item)
        });
        // el.addEventListener('contextmenu', function (e) {
        //   currentThis.addRoadLine = true
        //   // 新增干线时添加路线
        //   currentThis.unitArr += item.id + ','
        // });
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
  removeMarkers = () => {
    if (this.interMarkers.length) {
      this.interMarkers.forEach((item) => {
        item.remove()
      })
      this.interMarkers = []
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
      refresh: 30 * 1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on('zoom', () => {
      if (this.zoomTimer) {
        clearTimeout(this.zoomTimer)
        this.zoomTimer = null
      }
      this.zoomTimer = setTimeout(() => {
        const zoomLev = Math.round(this.map.getZoom())
        // this.addMarker(this.pointLists, zoomLev)
      }, 700)
    })
    map.on('load', () => {
      map.trafficLayer(true, options);
      window.onbeforeunload = function (e) {
        map.removeLayerAndSource('icon');
      };
      // this.addMenu()
    })
    map.on('click', () => {
      if (this.popup) {
        this.popup.remove()
      }
    })
    this.map = map
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  // handleClckMessge = () => {
  //   this.setState({

  //   })
  // }

  initializationState = () => { // 新增修改变量初始化
    this.setState({
      route_name: '',
      route_code: '',
      route_direction: '',
      route_directionvalue: '',
      route_miles: '',
      route_type: '',
      route_typevalue: '',
      detail: '',
    })
  }
  clickOperationNum = (id) => {
    if (id === 1) {
      this.isAddEdit = true
      this.initializationState()
      this.roadCircle(this.treeListChild)
      this.treeListChild = []
      this.setState({
        rights: 0,
        isAddEdit: true,
        ismodify: false,
        roadtitle: '新增干线',
        treeListChild: []
      })
      this.showName = 'add'
      this.unitArr = ''
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
  noneAddRoad = () => { // 取消添加修改
    this.removeRoadCircle() // 取消点位
    this.delectlineroute() // 取消线
    this.addlineroute = false
    this.addRoad = false
    this.setState({
      rights: -300
    })
  }
  changeLoadRouteDirection = (e, s) => { // 选择干线方向
    console.log(e, s)
  }
  changeLoadRouteType = () => { // 选择干线类型

  }
  visibleShowLeft = (top, id, show) => { // 框的跳转与位置
    if (top || id) {
      this.setState({
        visible: show,
        visibleTop: top,
        vipId: id,
      }, () => {
        // console.log(id, '显示右键信息')
      })
    } else {
      this.setState({
        visible: show,
      })
    }
  }
  onOpenChangeSubMenu = (eventKey) => { // SubMenu-ite触发
    this.isAddEdit = false
    this.unitArr = ''
    this.roadCircle(this.chidArrs) // 清空上次点击划线
    if (eventKey.length === 0) {
      this.setState({
        menuOpenkeys: [],
        rights: -300,
      })
    } else {
      const keys = eventKey.pop()
      const { menuOpenkeys } = this.state
      if (eventKey !== menuOpenkeys) {
        this.getLoadChildTree(keys)
      }
    }
  }
  onOpeSubMenu = (e, SubMenuItem) => {
    this.isAddEdit = false
    this.roaddId = SubMenuItem.id
    console.log(SubMenuItem, '回显数据')
    const { loadRouteDirectionList, loadRouteTypeList } = this.state
    const route_direction = loadRouteDirectionList && loadRouteDirectionList.find(item => item.c_code === SubMenuItem.route_direction).code_name
    const route_type = loadRouteTypeList && loadRouteTypeList.find(item => item.c_code === SubMenuItem.route_type).code_name
    this.setState({
      route_name: SubMenuItem.route_name,
      route_code: SubMenuItem.route_code,
      route_direction: SubMenuItem.route_direction,
      route_directionvalue: route_direction,
      route_miles: SubMenuItem.route_miles,
      route_type: SubMenuItem.route_type,
      route_typevalue: route_type,
      detail: SubMenuItem.detail,
      isAddEdit: false,
    })
  }
  onClickMenuItem = (event) => {
    // const { data_item } = event.item.props
    // console.log(event, data_item, 'vvcss')
    // this.roaddId = data_item.id
    // const { UnitPosition, UnitType, UnitDistrict, UnitGroup } = this.state
    // this.setState({
    //   route_name: data_item.unit_name,
    //   route_code: '',
    //   route_direction: [],
    //   route_directionvalue: '',
    //   route_miles: '',
    //   route_type: [],
    //   route_typevalue: '',
    //   detail: '',
    //   rights: 0,
    //   isAddEdit: false,
    //   ismodify: true,
    //   roadtitle: '干线信息',
    // })
  }
  // 显示提示框
  deleteList() {
    this.setState({
      deleteConfirm: true,
    })
  }
  getismodify = (isShowName) => {
    this.isAddEdit = true
    this.showName = isShowName // 编辑
    const { treeListChild } = this.state
    // const treeListChild = treeListChild.slice(1, treeListChild.length - 1)
    // console.log(treeListChild, treeListChild, 'dfksfjsdkjfk')
    this.setState({
      ismodify: false,
      isAddEdit: true,
      roadtitle: '干线修改',
      treeListChild: treeListChild,
    }, () => {
      // var start = document.getElementById('startInp ');
      // var end = document.getElementById('endInp');
      // start.value = treeListChild[0].unit_name
      // end.value = treeListChild[treeListChild.length - 1].unit_name
    })
  }
  // 确定删除
  deleteOks = () => {
    axiosInstance.post(`${this.deleteRoute}/${this.roaddId}`).then(res => {// 管理单位 this.deleteUnitInfo
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
  FormData = (adj) => {
    let str = ''
    for (const key in adj) {
      str += `${key}=${adj[key]}&`
    }
    return str
  }
  handclickAddEdit = () => {// 添加或修改路口按钮
    this.treeListChild.forEach(item => {
      this.unitArr += item.id + ','
    })
    const {
      route_name,
      route_code,
      route_direction,
      route_miles,
      route_type,
      detail,
    } = this.state
    const addobjs = {
      route_name,
      route_code,
      route_direction: JSON.stringify(route_direction),
      route_miles,
      route_type: JSON.stringify(route_type),
      detail,
      unitArr: this.unitArr,
      id: '',
    }
    if (this.showName === 'edit') {
      addobjs.id = JSON.stringify(this.roaddId)
    }
    axiosInstance.post(`${this.saveOrUpdateDistrict}?${this.FormData(addobjs)}`,).then(res => { // 干线
      const { code, result } = res.data
      if (code === '1') {
        this.setState({
          rights: -300,
          menuOpenkeys: [],
        })
        message.info(result)
        this.getDataList()
        this.initializationState()
        this.delectlineroute()
        this.removeRoadCircle()
        this.addlineroute = false
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
  removeOneCircle = (id) => { // 删除单个点位颜色
    $('#marker' + id).removeClass('markers')
  }
  addRoadCircle = (Arr) => { // 渲染所有点位
    Arr.forEach(item => {
      $('#marker' + item.id).addClass('markers')
    })
  }
  removeRoadCircle = () => { // 清除颜色点位
    this.treeListChild.forEach(item => {
      $('#marker' + item.id).removeClass('markers')
    })
    this.treeListChild = []
  }
  delectroad = (id) => { // 删除单个路口
    this.delectlineroute() // 取消划线
    const index = this.treeListChild.findIndex(item => item.id === id)
    this.removeOneCircle(this.treeListChild[index].id) // 删除单个颜色
    this.treeListChild.splice(index, 1)
    let arrList = []
    this.treeListChild.forEach(item => {
      let arrchild = []
      arrchild[0] = item.longitude
      arrchild[1] = item.latitude
      arrList.push(arrchild)
    })
    this.drawLine(arrList) // 调用划线
    this.setState({
      treeListChild: this.treeListChild,
    })

  }
  render() {
    const { Option } = Select
    const {
      mainHomePage, stateSelect, clickNum, Istitletops, isAddEdit, ismodify, IsddMessge, rights, treeListChild,
      loadRouteDirectionList, loadRouteTypeList, treeList, menuOpenkeys, deleteConfirm,
      route_name, route_code, route_directionvalue, route_miles, route_typevalue, detail, roadtitle,
      pointlist
    } = this.state
    return (
      <div className='TrunkManagementBox'>
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
                <div className="slideRightBoxAddBox">
                  <p><span>干线名称：</span><input onChange={this.changeLoadRouteDirection} value={route_name} intername='route_name' type="text" className='inputBox' placeholder="干线名称" /></p>
                  <p><span>干线编号：</span><input onChange={this.changeLoadRouteDirection} value={route_code} intername='route_code' type="text" className='inputBox' placeholder="干线编号" /></p>
                  <div className='divs'><span>干线方向：</span>
                    <Select
                      // defaultValue="海淀区"
                      value={route_directionvalue}
                      style={{ width: 195, height: 30 }}
                      onChange={this.changeLoadRouteDirection}
                    >
                      {
                        loadRouteDirectionList && loadRouteDirectionList.map((item) => {
                          return (
                            <Option addeditname='route_directionvalue' intername='route_direction' value={item.c_code} style={{ width: 195, height: 30 }} key={item.id}>{item.code_name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <p><span>干线长度：</span><input onChange={this.changeLoadRouteDirection} value={route_miles} intername='route_miles' type="text" className='inputBox' placeholder="干线长度" /></p>
                  <div className='divs'><span>干线类型：</span>
                    <Select
                      // defaultValue="海淀区"
                      value={route_typevalue}
                      style={{ width: 195, height: 30 }}
                      onChange={this.changeLoadRouteDirection}
                    >
                      {
                        loadRouteTypeList && loadRouteTypeList.map((item) => {
                          return (
                            <Option addeditname='route_typevalue' intername='route_type' value={item.c_code} style={{ width: 193, height: 30 }} key={item.id}>{item.code_name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <p><span>干线描述：</span><input onChange={this.changeLoadRouteDirection} intername='detail' value={detail} type="text" className='inputBox' placeholder="干线描述" /></p>
                  <div className='lineBox'>
                    <div className="lineBoxRight">
                      {
                        treeListChild && treeListChild.map((item, index) => {
                          return (
                            <div className='roadBox' key={item + index}>
                              <div className="roadBoxLeft">
                              </div>
                              <div className="roadBoxRight">
                                <p><input type="text" onChange={this.getChangeValue} className='inputBox' value={item.unit_name} /><span><CloseOutlined onClick={() => this.delectroad(item.id)} /></span></p>
                              </div>
                            </div>
                          )
                        })
                      }
                      {/*  <p><input type="text" className='inputBox' /></p> */}
                      {/* <p><span></span><input type="text" className='inputBox' id='endInp' /></p> */}
                    </div>
                  </div>
                </div>
                :
                <div className="slideRightBoxEditBox">
                  <p>干线名称：<span>{route_name}</span></p>
                  <p>干线编号：<span>{route_code}</span></p>
                  <p>干线方向：<span>{route_directionvalue}</span></p>
                  <p>干线长度：<span>{route_miles}</span></p>
                  <p>干线类型：<span>{route_typevalue}</span></p>
                  <p>干线描述：<span>{detail}</span></p>
                  <div className='lineBox'>
                    <div className='lineBoxer'>
                      {
                        treeListChild && treeListChild.map((item, index) =>
                          <div key={item.id} className='lineBoxer_item'>
                            <span></span>
                            <div className='streetBox'>
                              <p title={item.unit_name} className='street'><span>{index < 9 ? ('0' + (index + 1)) : index}</span>{item.unit_name}</p>
                              <div className='intersectionBox'>
                                <p className='intersection'><span>{item.unit_name}</span><span>{item.district_name}</span></p>
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
          {/* :
              <div className='slideRightBoxEdit'>
            <div className='addMainLine'>
              <div className='newLine'>长安街干线详情</div>
              {
                !ismodify ? <div className='operationLine'><span>删除</span><span onClick={() => this.getismodify(true)}>编辑</span></div> : <div className='operationLineAdd'><span>保存</span><span onClick={() => this.getismodify(false)}>取消</span></div>
              }
            </div>
          </div> */}
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
                  stateSelect && stateSelect.map((item, index) => {
                    return (
                      <Option value={index} style={{ width: 100, height: 30 }} key={index}>{item.name}</Option>
                    )
                  })
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
                    title={item.route_name}
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
              <div className='title'>干线管理</div>
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

export default TrunkManagement