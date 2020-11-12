/* eslint-disable no-redeclare */
/* eslint-disable eqeqeq */
import React, { Component } from 'react'
import { Menu, Select, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import $ from 'jquery'
import './TrunkManagement.scss'
import mapConfiger from '../../utils/minemapConf'
// import messageBac from '../../imgs/messageBac.png'
import startPng from '../../imgs/start.png'
import endPng from '../../imgs/end.png'
import axiosInstance from '../../utils/getInterfaceData'
import CustomInterTree from '../../../components/CustomInterTree/CustomInterTree'
const { SubMenu } = Menu;
class TrunkManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
      isAddEdit: true,
      roadValue: [],
      treeList: [],
      loadRouteDirectionList: [],
      loadRouteTypeList: [],
      clickNum: '',
      rights: -300,
      ismodify: false,
      menuOpenkeys: [],
      treeListChild: [],
      stateSelect: [
        {
          name: "海淀区",
          id: "1",
          children: []
        },
        {
          name: "朝阳区",
          id: "2",
          children: []
        },
        {
          name: "上地",
          id: "3",
          children: []
        },
        {
          name: "三里屯",
          id: "4",
          children: []
        }
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
    this.getPointAll = '/engine-maintenance/unitInfo/getPointAll'
    this.deleteRoute = '/engine-maintenance/routeManagement/deleteRoute' // 删除干线信息
    this.getRouteInfo = '/engine-maintenance/routeManagement/getRouteInfo' // 加载当前干线信息
    this.loadRouteTree = '/engine-maintenance/routeManagement/loadRouteTree' // 干线树
    this.loadRouteDirection = '/engine-maintenance/routeManagement/loadRouteDirection' // 干线方向
    this.loadRouteType = '/engine-maintenance/routeManagement/loadRouteType' // 干线类型
    this.saveOrUpdateDistrict = '/engine-unified/routeManagement/saveOrUpdateDistrict' // 新增修改干线信息
    this.addMainLine = false
    this.addRoadLine = false
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
      let treeListTwo = treeList
      console.log(treeList, 'vssksnf')
      if (code === '1') {
        const currentArea = this.treeListDatas.find((item) => item.id === Number(id))
        currentArea.childrens = treeList
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
            if (treeList.length >= 3) {
              const start = treeListTwo.shift()
              const end = treeListTwo.pop()
              // console.log(treeListTwo, 'vssss')
              this.getstartpoint({ lng: start.longitude, lat: start.latitude })
              treeListTwo.forEach(item => {
                this.getChannelpoint({ lng: item.longitude, lat: item.latitude })
              })
              this.getendpoint({ lng: end.longitude, lat: end.latitude })
            } else if (treeList.length === 2) {
              const start = treeList.shift()
              const end = treeList.pop()
              this.getstartpoint({ lng: start.longitude, lat: start.latitude })
              this.getendpoint({ lng: end.longitude, lat: end.latitude })
            } else {
              this.clearMap();
            }
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
        this.addMarker(list)
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
  getismodify = (isShow) => {
    this.setState({
      ismodify: isShow
    })
  }
  getChangeValue = (e) => {
    console.log(e)
  }
  // intersectionRenderin = async () => {

  // }
  addMenu = () => {
    const _this = this
    // this.map.flyTo({ center: [116.391, 39.911], zoom: 14, pitch: 60 })
    var marker = '', startmarker = '', endmarker = '', channelmarker = [];
    this.map.on('contextmenu', function (item) {
      console.log(654321, _this.addRoadLine)
      if (marker) {
        marker.remove();
      }
      var lnglat = item.lngLat;
      var style = 'background:#fff;color:#000;';
      var html = document.createElement('div');
      var contextmenu = `<div class="context_menu" style="padding:5px 10px;${style}">
        ${_this.addRoadLine ? '<li id="start" style="cursor:point;">起点</li>' : ''}
        ${_this.addRoadLine ? '<li style="cursor:point;" id="end">终点</li>' : ''}
        ${_this.addRoadLine ? '<li style="cursor: point" id="channel" > 途径点</li >' : ''}
        <li style="cursor:point;" id="clearmap">清空地图</li>
        </div > `
      html.innerHTML = contextmenu;
      marker = new window.mapabcgl.Marker(html)
        .setLngLat([lnglat.lng, lnglat.lat])
        .setOffset([30, 0])
        .addTo(_this.map);
      var clear = document.getElementById('clearmap');

      clear.addEventListener('click', function (e) {
        _this.clearMap();
      })
      if (_this.addRoadLine) {
        var start = document.getElementById('start');
        var end = document.getElementById('end');
        const channel = document.getElementById('channel');
        start.addEventListener('click', function (e) {
          _this.getstartpoint(lnglat);
        })
        end.addEventListener('click', function (e) {
          _this.getendpoint(lnglat)
        })
        channel.addEventListener('click', function (e) {
          _this.getChannelpoint(lnglat)
        })
      }
      // 初始话渲染路口
    })

    this.getstartpoint = (lnglat) => {
      console.log(lnglat, '开始')
      this.addMainLine = true
      if (marker) {
        marker.remove();
      }
      if (startmarker) {
        startmarker.remove();
      }
      startmarker = addMarker(startPng, [lnglat.lng, lnglat.lat], 0);
      plan()
      startmarker.on('dragend', plan);
    }

    this.getendpoint = (lnglat) => {
      console.log(lnglat, '结束')
      this.addMainLine = false
      if (marker) {
        marker.remove();
      }
      if (endmarker) {
        endmarker.remove();
      }
      endmarker = addMarker(endPng, [lnglat.lng, lnglat.lat], 0);
      plan();
      endmarker.on('dragend', plan);
    }
    // _this.intersectionRenderin()
    // this.getstartpoint({ lng: 116.39171507191793, lat: 39.910732551600205 })
    // this.getendpoint({ lng: 116.3909904231216, lat: 39.9223143411036 })
    this.getChannelpoint = (lnglat) => {
      console.log(lnglat, '途经点')
      if (marker) {
        marker.remove();
      }
      if (channelmarker.length >= 16) {
        alert("途径点最多支持16个")
        return;
      }
      var pointMarker = addMarkerpoint('http://map.mapabc.com:35001/mapdemo/apidemos/sourceLinks/img/point_1.png', [lnglat.lng, lnglat.lat], -441);
      channelmarker.push(pointMarker)
      // var ary = [];
      rgeocode(3, pointMarker.getLngLat().lng + ',' + pointMarker.getLngLat().lat);
      plan();
      pointMarker.on('dragend', plan);
    }

    function plan() {
      var str = '';
      // channelName = '';
      if (startmarker) {
        rgeocode(1, startmarker.getLngLat().lng + ',' + startmarker.getLngLat().lat);
      }
      if (endmarker) {
        rgeocode(2, endmarker.getLngLat().lng + ',' + endmarker.getLngLat().lat);
      }
      if (channelmarker.length > 0) {
        for (var i = 0; i < channelmarker.length; i++) {
          str += i === 0 ? channelmarker[i].getLngLat().lng + ',' + channelmarker[i].getLngLat().lat : ';' + channelmarker[i].getLngLat().lng + ',' + channelmarker[i].getLngLat().lat
        }
      }
      if (startmarker && endmarker) {
        var origin = startmarker.getLngLat().lng + ',' + startmarker.getLngLat().lat;
        var destination = endmarker.getLngLat().lng + ',' + endmarker.getLngLat().lat;

        _this.map.Driving({
          origin: origin,
          destination: destination,
          waypoints: str//途经点
        }, function (data) {
          if (data.status == 0) {
            var data = data.result.routes[0].steps, xys = '';
            _this.map.removeLayerAndSource('plan');
            _this.map.removeLayerAndSource('plan1');
            for (var i = 0; i < data.length; i++) {
              xys += data[i].path + ';';
            }
            if (xys) {
              xys = xys.substr(0, xys.length - 1)
              var path = xys.split(';'), lines = [];

              for (var k = 0; k < path.length; k++) {
                var xy = path[k].split(',')
                lines.push(xy)
              }
              _this.map.removeLayerAndSource('addArrowImg');
              addplanline(lines, 'plan', '#F7455D')
            }
          } else if (data.status != '0') {
            alert(data.message);
          };
        })
      }
    }

    function addplanline(lines, id, color) {
      var geojson = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": lines
          }
        }]
      };


      _this.map.addLayer({
        "id": id,
        "type": "line",
        "source": {
          "type": "geojson",
          "data": geojson
        },
        "layout": {
          "line-join": "miter",
          "line-cap": "square"
        },
        "paint": {
          "line-color": color,
          "line-width": 8,
          "line-opacity": 1,
        }
      });
      _this.map.addLayer({
        "id": id + 1,
        "type": "line",
        "source": {
          "type": "geojson",
          "data": geojson
        },
        "paint": {
          "line-width": 8,
          "line-pattern": 'arrowImg',
        }
      });
    }

    this.clearMap = () => {
      if (marker) {
        marker.remove();
        marker = ''
      }
      if (startmarker) {
        startmarker.remove();
        startmarker = ''
      }
      if (endmarker) {
        endmarker.remove();
        endmarker = ''
      }
      if (channelmarker.length > 0) {
        for (var i = 0; i < channelmarker.length; i++) {
          channelmarker[i].remove();
        }
        channelmarker = []
      }

      _this.map.removeLayerAndSource('plan');
      _this.map.removeLayerAndSource('plan1');
      // document.getElementById('startInp').value = '';
      // document.getElementById('endInp').value = '';
      // document.getElementById('channelInp').value = '';
    }
    let roadValue = []
    function rgeocode(type, location) {
      var start = document.getElementById('startInp');
      var end = document.getElementById('endInp');
      var channel = document.getElementById('channelInp');
      console.log(start, end, channel)
      _this.map.Geocoder({ location: location }, function (data) {
        if (data.status != '0') {
          alert(data.message);
          return
        };
        if (_this.isAddEdit) {
          if (data.result.length > 0) {
            if (type == 1) {
              start.value = data.result[0].formatted_address;
            } else if (type == 2) {
              end.value = data.result[0].formatted_address;
            } else {
              // var str = channel.value ? channel.value + ';' : channel.value;
              console.log(data.result[0].formatted_address, 'vvv')
              // console.log(channel, 'sss')
              roadValue.push(data.result[0].formatted_address)
              _this.setState({
                roadValue
              })
              // console.log(str, channel, data, 'vvvvvXR')
              // channel.value = trim(channel.value) + data.result[0].formatted_address + ';';
              // channel.value = trim(channel.value)
            }
          };
        }
      });

    }

    function trim(str) { //删除左右两端的空格
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    function addMarker(img, point, position) {
      var marker = '', html = ''
      html = document.createElement('div');
      html.style.cssText = 'background:url(' + img + ')' + position + 'px 0px no-repeat;width:80px;height:50px;';
      html.style.backgroundSize = '100% 100%';
      // html.style.position = 'relative';
      // html.style.top = '-20px';
      marker = new window.mapabcgl.Marker(html)
        .setLngLat(point)
        .setDraggable(true)
        .setOffset([0, -20])
        .addTo(_this.map);
      return marker;

    };
    function addMarkerpoint(img, point, position) {
      var marker = '', html = ''
      html = document.createElement('div');
      html.style.cssText = 'background:url(' + img + ')' + position + 'px 0px no-repeat;width:35px;height:26px;'
      marker = new window.mapabcgl.Marker(html)
        .setLngLat(point)
        .setDraggable(true)
        .addTo(_this.map);
      return marker;
    };
  }
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
      </div >
  `
  }
  // ClickMessge = () => {
  //   var popupOption = {
  //     closeOnClick: false,
  //     closeButton: true,
  //     // anchor: "bottom-left",
  //     offset: [-20, -10]
  //   }
  //   // <img width="36px" height="36px" src="${}" />
  //   this.popup = new window.mapabcgl.Popup(popupOption)
  //     .setLngLat(new window.mapabcgl.LngLat(116.391, 39.911))
  //     .setHTML(`
  //     <div style="width: 310px;color: #599FE0; font-size:12px;height: 165px;background:rgba(6,21,65,.5);border: 1px solid #3167AA; ">
  //     <div style="height:32px;line-height:32px;text-align: left;padding-left: 20px;"><span style="color:#599FE0">车农庄大街与车公庄北街路口</span></div>
  //     <div>
  //     <p style="height:32px;margin-bottom:0;line-height:32px;padding-left:40px"><span>路口编号 ：</span>120461</p>
  //     <p style="height:32px;margin-bottom:0;line-height:32px;padding-left:40px"><span>所属类型 ：</span>十字路口</p>
  //     <p style="height:32px;margin-bottom:0;line-height:32px;padding-left:40px"><span>所属区域 ：</span>西城区</p>
  //     <p style="height:32px;margin-bottom:0;line-height:32px;display: flex;align-items: center;justify-content: center;"><span style="
  //     padding: 0px 5px;
  //     height: 25px;
  //     line-height: 25px;
  //     color: #EBEFF7;
  //     background-color: #094FBA;">加入区域</span></p>
  //     </div>
  //   </div>`)
  //     .addTo(this.map);
  // }
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
      el.addEventListener('contextmenu', function (e) {
        currentThis.addRoadLine = true
        currentThis.unitArr += item.id
      });
      new window.mapabcgl.Marker(el)
        .setLngLat([item.longitude, item.latitude])
        .addTo(this.map)
    })
    // if (this.map) {
    //   const el = document.createElement('div')
    //   el.style.width = '20px'
    //   el.style.height = '20px'
    //   el.style.borderRadius = '50%'
    //   el.style.backgroundColor = 'green'
    //   el.addEventListener('click', (e) => {
    //     e.stopPropagation()
    //     this.ClickMessge()
    //   })
    //   const marker = new window.mapabcgl.Marker(el)
    //     .setLngLat([116.391, 39.911])
    //     .addTo(this.map);
    // }
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
        this.getAddDataList()
      }, 700)
    })
    map.on('load', () => {
      map.trafficLayer(true, options);
      this.addMarker()
      window.onbeforeunload = function (e) {
        map.removeLayerAndSource('icon');
      };
      this.addMenu()
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
  clickOperationNum = (id) => {
    if (id === 1) {
      this.clearMap();
      this.isAddEdit = true
      this.setState({
        rights: 0,
        isAddEdit: true,
        ismodify: false,
        roadtitle: '新增干线',
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
    this.clearMap();
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
  onOpeSubMenu = (e, SubMenuItem) => {
    this.isAddEdit = false
    this.roaddId = SubMenuItem.id
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
  getismodify = (isShowName) => { // 添加编辑
    // this.showName = isShowName // 编辑
    // this.mapaddOnclick = true
    // this.setState({
    //   ismodify: false,
    //   isAddEdit: true,
    //   roadtitle: '路口修改',
    // })
  }
  // 确定删除
  deleteOks = () => {
    // axiosInstance.post(`${this.deleteUnitInfo}/${this.roaddId}`).then(res => {// 管理单位 this.deleteUnitInfo
    //   // console.log(res.data, '删除')
    //   const { code, result } = res.data
    //   if (code === '1') {
    //     this.setState({
    //       deleteConfirm: false,
    //       rights: -300,
    //       menuOpenkeys: [],
    //     })
    //     message.info(result)
    //     this.getDataList()
    //   }
    // })
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
    // this.mapaddOnclick = false
    // const {
    //   unit_code,
    //   unit_type_code,
    //   unit_position,
    //   district_id,
    //   user_group_id,
    //   longitude,
    //   latitude,
    //   signal_sys_unit_id,
    //   signal_system_code,
    //   signal_unit_id,
    //   minor_unit_number,
    //   be_taken,
    //   unit_name,
    //   unit_name_signal_sys,
    //   main_unit_id,
    //   unit_name_old,
    // } = this.state
    // let addroadData = {
    //   be_taken,
    //   district_id,
    //   latitude,
    //   longitude,
    //   main_unit_id,
    //   minor_unit_number,
    //   signal_sys_unit_id,
    //   signal_system_code,
    //   signal_unit_id,
    //   unit_code,
    //   unit_name,
    //   unit_name_old,
    //   unit_name_signal_sys,
    //   unit_position,
    //   unit_type_code,
    //   user_group_id,
    //   id: '',
    // }
    // if (this.showName === 'edit') {
    //   addroadData.id = JSON.stringify(this.roaddId)
    // }
    // // console.log(addroadData, '查看内容')
    // axiosInstance.post(this.saveOrUpdateUnitInfo, addroadData).then(res => {// 路口位置
    //   // console.log(res.data, '路口添加 修改')
    //   const { code, result } = res.data
    //   if (code === '1') {
    //     if (result === '操作失败') {
    //       message.info(result)
    //     } else {
    //       this.setState({
    //         rights: -300,
    //         menuOpenkeys: [],
    //       })
    //       message.info(result)
    //     }

    //   }
    //   this.getDataList()
    //   this.initializationState()
    // })

  }
  render() {
    const { Option } = Select
    const {
      mainHomePage, stateSelect, clickNum, Istitletops, isAddEdit, ismodify, IsddMessge, rights, roadValue,
      loadRouteDirectionList, loadRouteTypeList, treeList, menuOpenkeys, deleteConfirm, treeListChild,
      route_name, route_code, route_directionvalue, route_miles, route_typevalue, detail, roadtitle
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
                    {/* <span onClick={() => this.deleteList()} >删除</span><span onClick={() => this.getismodify('edit')}>编辑</span> */}
                    <span onClick={() => this.deleteList()} >删除</span><span onClick={this.noneAddRoad}>取消</span>
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
                  <p><span>干线长度：</span><input onChange={this.changeLoadRouteDirection} value={route_miles} intername='route_miles' type="text" className='inputBox' placeholder="干线编号" /></p>
                  <div className='divs'><span>干线类型：</span>
                    <Select
                      // defaultValue="海淀区"
                      value={route_typevalue}
                      style={{ width: 195, height: 30 }}
                      onChange={this.changeLoadRouteType}
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
                  <p><span>干线描述：</span><input onChange={this.changeLoadRouteDirection} value={detail} onChange={this.changeLoadRouteDirection} type="text" className='inputBox' placeholder="干线编号" /></p>
                  <div className='lineBox'>
                    <div className="lineBoxRight">
                      <p><span></span><input type="text" className='inputBox' id='startInp' /></p>
                      {
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
                      }
                      {/*  <p><input type="text" className='inputBox' /></p> */}
                      <p><span></span><input type="text" className='inputBox' id='endInp' /></p>
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
                              <p className='street'><span>{index < 9 ? ('0' + (index + 1)) : index}</span>{item.unit_name}{ismodify ? <DeleteOutlined /> : ''}</p>
                              <div className='intersectionBox'>
                                <p className='intersection'><span>{item.unit_name_old}</span><span>{item.district_name}</span></p>
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