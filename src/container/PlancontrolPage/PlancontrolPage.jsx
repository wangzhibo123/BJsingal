/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Menu, Input, DatePicker, Button, Select, Switch } from 'antd'
import { EditOutlined, CloseOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import axiosInstance from '../utils/getInterfaceData'
import styles from './PlancontrolPage.module.scss'
import mapConfiger from '../utils/minemapConf'
import startPng from '../imgs/start.png'
import endPng from '../imgs/end.png'
import carPng from '../imgs/car.png'
import phase1 from '../imgs/01.png'
import phase2 from '../imgs/03.png'
import phase3 from '../imgs/03.png'
import phase4 from '../imgs/03.png'
import phase11 from '../imgs/03.png'
import yellowPag from '../imgs/yellow.png'
import redPag from '../imgs/red.png'
const { SubMenu } = Menu;
class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: false,
      clickNum: '',
      menuOpenkeys: [],
      rights: -320,
      rightsNew: -320,
      isAddEdit: false,
      ismodify: true,
      roadtitle: '干线信息',
      // rights: 0,
      // isAddEdit: true,
      // ismodify: false,
      // roadtitle: '新增预案',
      route_name: '',
      route_code: '',
      route_direction: '',
      route_directionvalue: '',
      route_miles: '',
      route_type: '',
      route_typevalue: '',
      detail: '',
      roadValue: [],
      roadValueId: [],
      treeList: [],
      loadRouteDirectionList: [],
      loadRouteTypeList: [],
      treeListChild: [],
      reserveplanName: '预按控制',
      addReserveplan: '新增预案',
    }
    this.defaultChildren = []
    this.interMarkers = []
    this.isreserveplan = false
    this.clickOperation = [
      {
        id: 1,
        name: '应急预案',
      },
      {
        id: 2,
        name: '新增预案',
      },
      {
        id: 3,
        name: '切换视图',
      }
    ]
    this.getDirection = '/control-application-front/planControl/addOrUpdateVipPlan' // 新增修改修改预案
    this.getDirection = '/control-application-front/planControl/getDirection' // 获取方向
    this.getPointAll = '/control-application-front/planControl/getPointAll' // 加载所有点位
    this.getTaskStatus = '/control-application-front/planControl/getTaskStatus' // 获取任务状态
    this.loadPlanTree = '/control-application-front/planControl/loadPlanAreaUnit' // 获取区域应急预案下的路口
    this.loadPlanUnit = '/control-application-front/planControl/loadPlanTable' // 预案列表
    this.loadPlanUnit = '/control-application-front/planControl/loadPlanVipUnit' // 获取特勤预案下的路口
    this.switchViews = false
  }
  componentDidMount = () => {
    this.renderMap()
    this.getDataList()
    this.getAddDataList()
  }
  getDataList = () => { // 获取所有点位
    axiosInstance.post(this.loadPlanTree).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        this.treeListDatas = treeList
        this.setState({ treeList, treeListChild: this.defaultChildren })
      }
    })
  }
  getAddDataList = () => {
    axiosInstance.post(this.getPointAll).then(res => {
      const { code, list } = res.data
      if (code === '1') {
        this.pointLists = list
        this.addMarker(this.pointLists, 8)
      }
    })
  }
  addMarker = (points, zoomVal) => {
    this.removeMarkers()
    if (this.map) {
      const currentThis = this
      this.markers = []
      const interList = zoomVal < 13 ? points && points.filter(item => item.unit_grade <= 4) : points
      console.log(interList, 'sssss')
      interList && interList.forEach((item, index) => {
        const el = document.createElement('div')
        el.style.width = '20px'
        el.style.height = '20px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = 'green'
        el.style.cursor = 'pointer'
        el.id = 'marker' + item.unit_code
        el.addEventListener('click', function (e) {
          // currentThis.addInfoWindow(item)
          // this.handleClckMessge(true)
        });
        el.addEventListener('contextmenu', function (e) {

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
  removeMarkers = () => {
    if (this.interMarkers.length) {
      this.interMarkers.forEach((item) => {
        item.remove()
      })
      this.interMarkers = []
    }
  }
  // addMarker = (arr) => {
  //   if (this.map) {
  //     const el = document.createElement('div')
  //     el.style.width = '20px'
  //     el.style.height = '20px'
  //     el.style.borderRadius = '50%'
  //     el.style.backgroundColor = '#02FB09'
  //     el.addEventListener('click', () => {
  //       this.handleClckMessge(true)
  //     })
  //     const marker = new window.mapabcgl.Marker(el)
  //       .setLngLat(arr)
  //       .addTo(this.map);
  //   }
  // }
  addMarkersTwo = (arr) => {
    if (this.map) {
      var marker = ''
      if (marker) {
        marker.remove()
      }
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = '#02FB09'
      el.addEventListener('click', () => {
        this.phaseChange()
      })
      marker = new window.mapabcgl.Marker(el)
        .setLngLat(arr)
        .addTo(this.map);
      this.addWin()
    }
  }
  addWin = () => {
    var marker = ''
    if (marker) {
      marker.remove()
    }
    marker = new window.mapabcgl.Marker(getMarkerEl())
      .setLngLat([116.38384768997417, 39.92253455638905])
      .setOffset([0, 28])
      .addTo(this.map);
    function getMarkerEl() {
      var el = document.createElement('div')
      el.className = "text-marker" //可以设置统一class，方便管理
      el.innerHTML = `<img width="36px" height="36px" src="${phase1}" />`
      el.style.width = '35px';
      el.style.height = '41px';
      el.style.paddingTop = '5px';
      // el.style.position = 'relative';
      // el.style.top = '-70px';
      return el
    }
  }
  phaseChange = () => {
    var popupOption = {
      closeOnClick: false,
      closeButton: true,
      anchor: "bottom-left",
      offset: [-25, 350]
    }
    // <img width="36px" height="36px" src="${}" />
    const popup = new window.mapabcgl.Popup(popupOption)
      .setLngLat(new window.mapabcgl.LngLat(116.38384768997417, 39.92253455638905))
      .setHTML(`<div style="width: 125px;height: 335px;background-color: rgba(21,42,149, 0.5);">
      <div style="height: 50px;">
        <div style="color: #4f6db6;height: 20px;text-align: right;">
          方案运行
        </div>
        <div style="height: 30px;line-height: 30px;text-align: center;">
          阶段锁定
        </div>
      </div>
      <div style="height: 285px;display: flex;flex-wrap: wrap;" className={styles.phaseMessageBox}>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><img style="width: 90%;height: 100%;" src="${yellowPag}" alt="" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><img style="width: 90%;height: 100%;" src="${redPag}" alt="" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><img style="width: 90%;height: 100%;" src="${phase1}" alt="" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;">3</li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><img style="width: 90%;height: 100%;" src="${phase3}" alt="" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><InputNumber min={1} max={10} defaultValue="3" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><img style="width: 90%;height: 100%;" src="${phase4}" alt="" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><InputNumber min={1} max={10} defaultValue="3" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><img style="width: 90%;height: 100%;" src="${phase11}" alt="" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><InputNumber min={1} max={10} defaultValue="3" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><img style="width: 90%;height: 100%;" src="${phase2}" alt="" /></li>
        <li style="width: 60px;height: 40px;display: flex;align-items: center;justify-content: center;"><InputNumber min={1} max={10} defaultValue="3" /></li>
      </div>
    </div>`)
      .addTo(this.map);
  }
  gettitletops = (isShow) => {
    this.setState({
      Istitletops: isShow,
    })
    if (!isShow) {
      this.getstartpoint({ lng: 116.38261247568647, lat: 39.92257376086323 })
      this.getendpoint({ lng: 116.39008337019641, lat: 39.922239886918305 })
      this.addMarkersTwo([116.38384768997417, 39.92253455638905])
    } else {
      this.getstartpoint({ lng: 116.39171507191793, lat: 39.910732551600205 })
      this.getendpoint({ lng: 116.3909904231216, lat: 39.9223143411036 })
    }
  }
  addMenu = () => {
    const _this = this
    // this.map.flyTo({ center: [116.391, 39.911], zoom: 14, pitch: 60 })
    var marker = '', startmarker = '', endmarker = '', channelmarker = [];
    this.map.on('contextmenu', function (item) {
      if (marker) {
        marker.remove();
      }
      var lnglat = item.lngLat;
      var style = 'background:#fff;color:#000;';
      var html = document.createElement('div');
      var contextmenu = `<div class="context_menu" style="padding:5px 10px;${style}"><li id="start" style="cursor:point;">起点</li><li style="cursor:point;" id="end">终点</li><li style="cursor:point;" id="channel">途径点</li><li style="cursor:point;" id="clearmap">清空地图</li></div>`;
      html.innerHTML = contextmenu;
      marker = new window.mapabcgl.Marker(html)
        .setLngLat([lnglat.lng, lnglat.lat])
        .setOffset([30, 0])
        .addTo(_this.map);
      var start = document.getElementById('start');
      var end = document.getElementById('end');
      var channel = document.getElementById('channel');
      var clear = document.getElementById('clearmap');
      start.addEventListener('click', function (e) {
        _this.getstartpoint(lnglat);
      })
      end.addEventListener('click', function (e) {
        _this.getendpoint(lnglat)
      })
      channel.addEventListener('click', function (e) {
        _this.getChannelpoint(lnglat)
      })
      clear.addEventListener('click', function (e) {
        clearMap();
      })
    })

    this.getstartpoint = (lnglat) => {
      console.log(lnglat, '开始')
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
    // this.getstartpoint({ lng: 116.39171507191793, lat: 39.910732551600205 })
    // this.getendpoint({ lng: 116.3909904231216, lat: 39.9223143411036 })
    this.getChannelpoint = (lnglat) => {
      if (marker) {
        marker.remove();
      }
      if (channelmarker.length >= 16) {
        alert("途径点最多支持16个")
        return;
      }
      var pointMarker = addMarkerpoint('http://map.mapabc.com:35001/mapdemo/apidemos/sourceLinks/img/point_1.png', [lnglat.lng, lnglat.lat], -441);
      channelmarker.push(pointMarker)
      var ary = [];
      rgeocode(3, pointMarker.getLngLat().lng + ',' + pointMarker.getLngLat().lat);
      plan();
      pointMarker.on('dragend', plan);
    }

    function plan() {
      var str = '',
        channelName = '';
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
            // eslint-disable-next-line no-redeclare
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

    function clearMap() {
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

    function rgeocode(type, location) {
      // var start = document.getElementById('startInp');
      // var end = document.getElementById('endInp');
      // var channel = document.getElementById('channelInp');
      // map.Geocoder({ location: location }, function (data) {
      //   if (data.status != '0') {
      //     alert(data.message);
      //     return
      //   };
      //   if (data.result.length > 0) {
      //     if (type == 1) {
      //       start.value = data.result[0].formatted_address;
      //     } else if (type == 2) {
      //       end.value = data.result[0].formatted_address;
      //     } else {
      //       var str = channel.value ? channel.value + ';' : channel.value;
      //       channel.value = trim(channel.value) + data.result[0].formatted_address + ';';
      //       channel.value = trim(channel.value)
      //     }
      //   };
      // });

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
  renderMap = () => {
    mapConfiger.zoom = 11
    const map = new window.mapabcgl.Map(mapConfiger)
    this.map = map
    map.addControl(new window.mapabcgl.NavigationControl());
    const options = {
      minzoom: 1, // 路况显示的最小级别(1-24)
      maxzoom: 24, // 路况显示的最大级别(1-24)
      type: 'vector', // 路况图层类型:vector(矢量),raster(栅格)
      refresh: 30 * 1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on('load', () => {
      map.loadImage(carPng, function (error, image) {
        if (error) throw error;
        map.addImage('icon', image);
        map.addLayer({
          "id": "addIconID",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [116.3917480249126, 39.91052905151085]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "icon",
            "icon-size": 0.26
          }
        });
      });
      map.trafficLayer(true, options);
      // this.addMarkers([116.39159349169165, 39.91203316087379])
      map.addControl(new window.mapabcgl.NavControl({ showCompass: true, position: 'bottom-right' }));
      map.loadImage('http://map.mapabc.com:35001/mapdemo/apidemos/sourceLinks/img/dir.png', function (error, image) {
        map.addImage('arrowImg', image);
      });
      this.addMenu()
    })
    //添加右键菜单
  }

  handleClick = e => {
    console.log('click ', e);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  handleClckMessge = (isShow) => {
    this.setState({
      IsddMessge: isShow,
    })
  }
  clickOperationNum = (name) => { // 点击新增
    if (name === 'reserveplan') {
      this.isreserveplan = !this.isreserveplan
      let isreserveplanTitle = ''
      let addTitle = ''
      if (this.isreserveplan) {
        isreserveplanTitle = '勤务疏导'
        addTitle = '新增勤务'

      } else {
        isreserveplanTitle = '应急预案'
        addTitle = '新增预案'
      }
      this.setState({
        reserveplanName: isreserveplanTitle,
        addReserveplan: addTitle
      })
    }
    if (name === 'add') {
      // if (this.isreserveplan) {
      //   this.setState({
      //     rightsNew: -320,
      //     rights: 0,
      //     isAddEdit: false,
      //     ismodify: true,
      //   })
      // } else {
      //   this.setState({
      //     rights: -320,
      //     rightsNew: 0,
      //     isAddEdit: false,
      //     ismodify: true,
      //   })
      // }
      this.setState({
        roadtitle: '新增预案',
        rights: 0,
        isAddEdit: true,
        ismodify: false,
      })
    }
    if (name === 'switch') {
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
  }
  handleShowInterConf = () => { // 点击回显编辑
    if (this.isreserveplan) {
      this.setState({
        rightsNew: -320,
        rights: 0,
        isAddEdit: false,
        ismodify: true,
      })
    } else {
      this.setState({
        rights: -320,
        rightsNew: 0,
        isAddEdit: false,
        ismodify: true,
      })
    }
  }
  render() {
    const { Option } = Select
    const {
      mainHomePage, Istitletops, IsddMessge, clickNum, menuOpenkeys, treeList,
      rights, isAddEdit, ismodify, roadtitle, roadValue,
      loadRouteDirectionList, loadRouteTypeList, treeListChild,
      route_name, route_code, route_directionvalue, route_miles, route_typevalue, detail,
      pointlist, reserveplanName, addReserveplan, rightsNew,
    } = this.state
    return (
      <div className={styles.PlancontrolPageWrapper}>
        <div className={styles.openEdit}><Switch checkedChildren="编辑模式" unCheckedChildren="正常模式" defaultChecked /></div>
        <div className={styles.videoBox}>
          <div className={styles.videoBoxer}>
            <div className={styles.header}>
              <span>海淀大街-海淀中街</span>
              <CloseOutlined />
            </div>
            <div className={styles.videos}>

            </div>
          </div>
          <div className={styles.videoBoxer}>
            <div className={styles.header}>
              <span>海淀大街-海淀中街</span>
              <CloseOutlined />
            </div>
            <div className={styles.videos}>

            </div>
          </div>
        </div>
        <div className={styles.sildeRight} style={{ right: `${rights}px` }}>
          <div className={styles.slideRightBoxAdd}>
            <div className={styles.addMainLine}>
              <div className={styles.newLine}>{roadtitle}</div>
              {
                ismodify ?
                  <div className={styles.operationLine}>
                    <span onClick={() => this.deleteList()} >删除</span><span onClick={() => this.getismodify('edit')}>编辑</span>
                  </div>
                  :
                  <div className={styles.operationLine}>
                    <span onClick={this.handclickAddEdit}>保存</span><span onClick={this.noneAddRoad}>取消</span>
                  </div>
              }
            </div>
            {
              isAddEdit ?
                <div className={styles.slideRightBoxAddBox}>
                  <p><span>干线名称：</span><input onChange={this.changeLoadRouteDirection} value={route_name} intername='route_name' type="text" className={styles.inputBox} placeholder="干线名称" /></p>
                  <p><span>干线编号：</span><input onChange={this.changeLoadRouteDirection} value={route_code} intername='route_code' type="text" className={styles.inputBox} placeholder="干线编号" /></p>
                  <div className={styles.divs}><span>干线方向：</span>
                    <Select
                      // defaultValue="海淀区"
                      value={route_directionvalue}
                      style={{ width: 225, height: 30 }}
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
                  <p><span>干线长度：</span><input onChange={this.changeLoadRouteDirection} value={route_miles} intername='route_miles' type="text" className={styles.inputBox} placeholder="干线长度" /></p>
                  <div className={styles.divs}><span>干线类型：</span>
                    <Select
                      // defaultValue="海淀区"
                      value={route_typevalue}
                      style={{ width: 225, height: 30 }}
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
                  <p><span>干线描述：</span><input onChange={this.changeLoadRouteDirection} intername='detail' value={detail} type="text" className={styles.inputBox} placeholder="干线描述" /></p>
                  <div className={styles.lineBox}>
                    <div className={styles.lineBoxRight}>
                      <p><span></span><input type="text" className={styles.inputBox} id='startInp' /></p>
                      {
                        typeof (roadValue[0]) == 'object' ?
                          roadValue && roadValue.map((item, index) => {
                            return (
                              <div className={styles.roadBox} key={item + index}>
                                < div className={styles.roadBoxLeft} >
                                </div>
                                <div className={styles.roadBoxRight}>
                                  <p><input type="text" onChange={this.getChangeValue} className={styles.inputBox} id='channelInp' value={item.unit_name} /></p>
                                </div>
                              </div>
                            )
                          }) :
                          roadValue && roadValue.map((item, index) => {
                            console.log(item, index, 'vsvsvsv')
                            return (
                              <div className={styles.roadBox} key={item + index}>
                                <div className={styles.roadBoxLeft}>
                                </div>
                                <div className={styles.roadBoxRight}>
                                  < p > <input type="text" onChange={this.getChangeValue} className={styles.inputBox} value={item} /></p>
                                </div >
                              </div >
                            )
                          })
                      }
                      {/*  <p><input type="text" className={styles.inputBox' /></p> */}
                      <p><span></span><input type="text" className={styles.inputBox} id='endInp' /></p>
                    </div >
                  </div >
                </div >
                :
                <div className={styles.slideRightBoxEditBox}>
                  <div className={styles.dateOperation}>
                    <div className={styles.datatime}>
                      <div>日期：2020-10-10</div>
                      <div>时间：14:30:00</div>
                    </div>
                    <div className={styles.boxoperation}>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  <div className={styles.lineBox}>
                    <div className={styles.lineBoxer}>
                      {/* {
                      treeListChild && treeListChild.map((item, index) => */}
                      <div className={styles.lineBoxer_item}>
                        <span ></span>
                        <div className={styles.streetBox}>
                          <div className={styles.streetTitleBox}>
                            <div>西安长街-金融街</div>
                            <div><span>模式：</span>中心控制</div>
                          </div>
                          <div className={styles.intersectionBox}>
                            <div className={styles.mountingThead}>
                              <span>阶段绑定</span>
                              <span>临时方案</span>
                              <span>默认方案</span>
                              <div>周期：50秒</div>
                            </div>
                            <div className={styles.mountingTh}>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>

                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div >
                      </div >
                      <div className={styles.lineBoxer_item}>
                        <span ></span>
                        <div className={styles.streetBox}>
                          <div className={styles.streetTitleBox}>
                            <div>西安长街-金融街</div>
                            <div><span>模式：</span>中心控制</div>
                          </div>
                          <div className={styles.intersectionBox}>
                            <div className={styles.mountingThead}>
                              <span>阶段绑定</span>
                              <span>临时方案</span>
                              <span>默认方案</span>
                              <div>周期：50秒</div>
                            </div>
                            <div className={styles.mountingTh}>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>

                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div >
                      </div >
                      <div className={styles.lineBoxer_item}>
                        <span ></span>
                        <div className={styles.streetBox}>
                          <div className={styles.streetTitleBox}>
                            <div>西安长街-金融街</div>
                            <div><span>模式：</span>中心控制</div>
                          </div>
                          <div className={styles.intersectionBox}>
                            <div className={styles.mountingThead}>
                              <span>阶段绑定</span>
                              <span>临时方案</span>
                              <span>默认方案</span>
                              <div>周期：50秒</div>
                            </div>
                            <div className={styles.mountingTh}>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>

                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div >
                      </div >
                      <div className={styles.lineBoxer_item}>
                        <span ></span>
                        <div className={styles.streetBox}>
                          <div className={styles.streetTitleBox}>
                            <div>西安长街-金融街</div>
                            <div><span>模式：</span>中心控制</div>
                          </div>
                          <div className={styles.intersectionBox}>
                            <div className={styles.mountingThead}>
                              <span>阶段绑定</span>
                              <span>临时方案</span>
                              <span>默认方案</span>
                              <div>周期：50秒</div>
                            </div>
                            <div className={styles.mountingTh}>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>

                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div >
                      </div >
                      <div className={styles.lineBoxer_item}>
                        <span ></span>
                        <div className={styles.streetBox}>
                          <div className={styles.streetTitleBox}>
                            <div>西安长街-金融街</div>
                            <div><span>模式：</span>中心控制</div>
                          </div>
                          <div className={styles.intersectionBox}>
                            <div className={styles.mountingThead}>
                              <span>阶段绑定</span>
                              <span>临时方案</span>
                              <span>默认方案</span>
                              <div>周期：50秒</div>
                            </div>
                            <div className={styles.mountingTh}>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>

                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div >
                      </div >
                      <div className={styles.lineBoxer_item}>
                        <span ></span>
                        <div className={styles.streetBox}>
                          <div className={styles.streetTitleBox}>
                            <div>西安长街-金融街</div>
                            <div><span>模式：</span>中心控制</div>
                          </div>
                          <div className={styles.intersectionBox}>
                            <div className={styles.mountingThead}>
                              <span>阶段绑定</span>
                              <span>临时方案</span>
                              <span>默认方案</span>
                              <div>周期：50秒</div>
                            </div>
                            <div className={styles.mountingTh}>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>

                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div >
                      </div >
                      <div className={styles.lineBoxer_item}>
                        <span ></span>
                        <div className={styles.streetBox}>
                          <div className={styles.streetTitleBox}>
                            <div>西安长街-金融街</div>
                            <div><span>模式：</span>中心控制</div>
                          </div>
                          <div className={styles.intersectionBox}>
                            <div className={styles.mountingThead}>
                              <span>阶段绑定</span>
                              <span>临时方案</span>
                              <span>默认方案</span>
                              <div>周期：50秒</div>
                            </div>
                            <div className={styles.mountingTh}>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>

                              <div className={styles.phaseTime}>
                                <div className={styles.phaseinner}><img src={phase3} alt="" /></div>
                                <div className={`${styles.phaseinner} ${styles.times}`}>
                                  <span>40</span>
                                  <div className={styles.caculate}><CaretUpOutlined className={styles.add} /><CaretDownOutlined className={styles.subtract} /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div >
                      </div >
                      {/* )
                    } */}
                    </div >
                  </div >
                </div >
              // <div className={styles.slideRightBoxEditBox}>
              //   {/* <p>干线名称：<span>{route_name}</span></p>
              //   <p>干线编号：<span>{route_code}</span></p>
              //   <p>干线方向：<span>{route_directionvalue}</span></p>
              //   <p>干线长度：<span>{route_miles}</span></p>
              //   <p>干线类型：<span>{route_typevalue}</span></p>
              //   <p>干线描述：<span>{detail}</span></p> */}
              //   <div className={styles.lineBox}>
              //     < div className={
              //       styles.lineBoxer}>
              //       {/* {
              //         treeListChild && treeListChild.map((item, index) => */}
              //       <div className={styles.lineBoxer_item}>
              //         <span ></span>
              //         <div className={styles.streetBox}>
              //           <div className={styles.streetTitleBox}>
              //             <div>西安长街-金融街</div>
              //             <div><span>模式：</span>中心控制</div>
              //           </div>
              //           <div className={styles.intersectionBox}>
              //             <div className={styles.mountingThead}>
              //               <div>需求阶段</div>
              //               <div>运行时间</div>
              //               <div>间隔时间</div>
              //               <div><span>开始</span></div>
              //             </div>
              //             <div className={styles.mountingTh}>
              //               <div>东西直行</div>
              //               <div>15秒</div>
              //               <div>50秒</div>
              //               <div><span>结束</span></div>
              //             </div>
              //           </div>
              //         </div >
              //       </div >
              //       {/* )
              //       } */}
              //     </div >
              //   </div >
              // </div >
            }
          </div >
          {/* :
              <div className='slideRightBoxEdit'>
            <div className='addMainLine'>
              <div className='newLine'>长安街干线详情</div>
              {
                !ismodify ? <div className='operationLine'><span>删除</span><span onClick={() => this.getismodify(true)}>编辑</span></div> : <div className='operationLineAdd'><span>保存</span><span onClick={() => this.getismodify(false)}>取消</span></div>
              }
            </div>
          </div> */}
        </div >
        <div className={styles.sildeRight} style={{ right: `${rightsNew}px` }}>
          <div className={styles.slideRightBoxAdd}>
            <div className={styles.addMainLine}>
              <div className={styles.newLine}>{roadtitle}</div>
              {
                ismodify ?
                  <div className={styles.operationLine}>
                    <span onClick={() => this.deleteList()} >删除</span><span onClick={() => this.getismodify('edit')}>编辑</span>
                  </div>
                  :
                  <div className={styles.operationLine}>
                    <span onClick={this.handclickAddEdit}>保存</span><span onClick={this.noneAddRoad}>取消</span>
                  </div>
              }
            </div>
            {
              isAddEdit ?
                <div className={styles.slideRightBoxAddBox}>
                  <p><span>干线名称：</span><input onChange={this.changeLoadRouteDirection} value={route_name} intername='route_name' type="text" className={styles.inputBox} placeholder="干线名称" /></p>
                  <p><span>干线编号：</span><input onChange={this.changeLoadRouteDirection} value={route_code} intername='route_code' type="text" className={styles.inputBox} placeholder="干线编号" /></p>
                  <div className={styles.divs}><span>干线方向：</span>
                    <Select
                      // defaultValue="海淀区"
                      value={route_directionvalue}
                      style={{ width: 225, height: 30 }}
                      onChange={this.changeLoadRouteDirection}
                    >
                      {
                        loadRouteDirectionList && loadRouteDirectionList.map((item) => {
                          return (
                            <Option addeditname='route_directionvalue' intername='route_direction' value={item.c_code} style={{ width: 225, height: 30 }} key={item.id}>{item.code_name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <p><span>干线长度：</span><input onChange={this.changeLoadRouteDirection} value={route_miles} intername='route_miles' type="text" className={styles.inputBox} placeholder="干线长度" /></p>
                  <div className={styles.divs}><span>干线类型：</span>
                    <Select
                      // defaultValue="海淀区"
                      value={route_typevalue}
                      style={{ width: 225, height: 30 }}
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
                  <p><span>干线描述：</span><input onChange={this.changeLoadRouteDirection} intername='detail' value={detail} type="text" className={styles.inputBox} placeholder="干线描述" /></p>
                  <div className={styles.lineBox}>
                    <div className={styles.lineBoxRight}>
                      <p><span></span><input type="text" className={styles.inputBox} id='startInp' /></p>
                      {
                        typeof (roadValue[0]) == 'object' ?
                          roadValue && roadValue.map((item, index) => {
                            return (
                              <div className={styles.roadBox} key={item + index}>
                                < div className={styles.roadBoxLeft} >
                                </div>
                                <div className={styles.roadBoxRight}>
                                  <p><input type="text" onChange={this.getChangeValue} className={styles.inputBox} id='channelInp' value={item.unit_name} /></p>
                                </div>
                              </div>
                            )
                          }) :
                          roadValue && roadValue.map((item, index) => {
                            console.log(item, index, 'vsvsvsv')
                            return (
                              <div className={styles.roadBox} key={item + index}>
                                <div className={styles.roadBoxLeft}>
                                </div>
                                <div className={styles.roadBoxRight}>
                                  < p > <input type="text" onChange={this.getChangeValue} className={styles.inputBox} value={item} /></p>
                                </div >
                              </div >
                            )
                          })
                      }
                      {/*  <p><input type="text" className={styles.inputBox' /></p> */}
                      <p><span></span><input type="text" className={styles.inputBox} id='endInp' /></p>
                    </div >
                  </div >
                </div >
                :
                <div className={styles.slideRightBoxEditBox}>
                  {/* <p>干线名称：<span>{route_name}</span></p>
                <p>干线编号：<span>{route_code}</span></p>
                <p>干线方向：<span>{route_directionvalue}</span></p>
                <p>干线长度：<span>{route_miles}</span></p>
                <p>干线类型：<span>{route_typevalue}</span></p>
                <p>干线描述：<span>{detail}</span></p> */}
                  <div className={styles.lineBoxNew}>
                    < div className={
                      styles.lineBoxer}>
                      {/* {
                      treeListChild && treeListChild.map((item, index) => */}
                      <div className={styles.lineBoxer_item}>
                        <span ></span>
                        <div className={styles.streetBox}>
                          <div className={styles.streetTitleBox}>
                            <div>西安长街-金融街</div>
                            <div><span>模式：</span>中心控制</div>
                          </div>
                          <div className={styles.intersectionBox}>
                            <div className={styles.mountingThead}>
                              <div>需求阶段</div>
                              <div>运行时间</div>
                              <div>间隔时间</div>
                              <div><span>开始</span></div>
                            </div>
                            <div className={styles.mountingTh}>
                              <div>东西直行</div>
                              <div>15秒</div>
                              <div>50秒</div>
                              <div><span>结束</span></div>
                            </div>
                          </div>
                        </div >
                      </div >
                      {/* )
                    } */}
                    </div >
                  </div >
                </div >
            }
          </div >
          {/* :
              <div className='slideRightBoxEdit'>
            <div className='addMainLine'>
              <div className='newLine'>长安街干线详情</div>
              {
                !ismodify ? <div className='operationLine'><span>删除</span><span onClick={() => this.getismodify(true)}>编辑</span></div> : <div className='operationLineAdd'><span>保存</span><span onClick={() => this.getismodify(false)}>取消</span></div>
              }
            </div>
          </div> */}
        </div >
        {/* <div class="control_panel position_lb driveInfo">
          <ul>
            <li>
              <span>起点（右键地图设置）：</span>
              <input id="startInp" type="text" placeholder="起点" autocomplete="off" />
            </li>
            <li>
              <span>终点（右键地图设置）：</span>
              <input id="endInp" type="text" placeholder="终点" autocomplete="off" />
            </li>
            <li>
              <span>途径点（右键地图设置）：</span>
              <textarea id="channelInp" rows="4" placeholder="途径点最多支持16个"></textarea>
            </li>
          </ul>
        </div> */}
        < div className={styles.reserveplan} >
          <div />
          <span>添加预案</span>
        </div >
        <div className={`${styles.reserveplan} ${styles.reserveplanTwo}`}>
          <div />
          <span>添加预案</span>
        </div>
        {
          IsddMessge &&
          <div className={styles.addMessge}>
            <div className={styles.close} onClick={() => this.handleClckMessge(false)}>
              <CloseOutlined />
            </div>
            <div className={styles.syetem_top}>
              <div className={styles.syetem_item}>
                <span className={styles.item}>勤务名称:</span>
                <div className={styles.inSle}><Input onChange={this.handleKeyWordChange} /></div>
              </div>
              <div className={styles.syetem_item}>
                <span className={styles.item}>备注描述:</span>
                <div className={`${styles.inSle} ${styles.inSles}`}><Input onChange={this.handleKeyWordChange} /></div>
              </div>
              <div className={styles.syetem_item}>
                <span className={styles.item}>计划时间:</span>
                <div className={styles.inSle}><DatePicker showTime onChange={this.handleStartTimeChange} /></div>
                <span style={{ margin: '0 10px' }}>-</span>
                <div className={styles.inSle}><DatePicker showTime onChange={this.handleEndTimeChange} /></div>
              </div>
              {/* <span className={styles.searchBtn} onClick={this.handleSearchLogList}>查询</span> */}
            </div>
            <div className={styles.addroadBox}>
              <div className={styles.addroad}>
                <div className={styles.headerTop}>
                  勤务路口
                <Button size='small' type="primary">添加路口</Button>
                </div>
                <div className={styles.headerBox}>
                  <div className={styles.headerList}>
                    <div className={styles.headerTitle}>
                      <span>青秀中新(ip:45.6.218.114)</span>
                      <span className={styles.closeHeaderTitle}><CloseOutlined /></span>
                    </div>
                    <div className={styles.headercenter}>
                      <div className={styles.imgBox}>
                        <div className={styles.imgBoxer}>

                        </div>
                      </div>
                      <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.headerBom}>
                      <span>预设勤务阶段:</span>
                      <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      <Button size='small' type="primary">保存</Button>
                    </div>
                  </div>
                  <div className={styles.headerList}>
                    <div className={styles.headerTitle}>
                      <span>青秀中新(ip:45.6.218.114)</span>
                      <span className={styles.closeHeaderTitle}><CloseOutlined /></span>
                    </div>
                    <div className={styles.headercenter}>
                      <div className={styles.imgBox}>
                        <div className={styles.imgBoxer}>

                        </div>
                      </div>
                      <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.headerBom}>
                      <span>预设勤务阶段:</span>
                      <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      <Button size='small' type="primary">保存</Button>
                    </div>
                  </div>
                  <div className={styles.headerList}>
                    <div className={styles.headerTitle}>
                      <span>青秀中新(ip:45.6.218.114)</span>
                      <span className={styles.closeHeaderTitle}><CloseOutlined /></span>
                    </div>
                    <div className={styles.headercenter}>
                      <div className={styles.imgBox}>
                        <div className={styles.imgBoxer}>

                        </div>
                      </div>
                      <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.headerBom}>
                      <span>预设勤务阶段:</span>
                      <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      <Button size='small' type="primary">保存</Button>
                    </div>
                  </div>
                  <div className={styles.headerList}>
                    <div className={styles.headerTitle}>
                      <span>青秀中新(ip:45.6.218.114)</span>
                      <span className={styles.closeHeaderTitle}><CloseOutlined /></span>
                    </div>
                    <div className={styles.headercenter}>
                      <div className={styles.imgBox}>
                        <div className={styles.imgBoxer}>

                        </div>
                      </div>
                      <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.headerBom}>
                      <span>预设勤务阶段:</span>
                      <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      <Button size='small' type="primary">保存</Button>
                    </div>
                  </div>
                  <div className={styles.headerList}>
                    <div className={styles.headerTitle}>
                      <span>青秀中新(ip:45.6.218.114)</span>
                      <span className={styles.closeHeaderTitle}><CloseOutlined /></span>
                    </div>
                    <div className={styles.headercenter}>
                      <div className={styles.imgBox}>
                        <div className={styles.imgBoxer}>

                        </div>
                      </div>
                      <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.headerBom}>
                      <span>预设勤务阶段:</span>
                      <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      <Button size='small' type="primary">保存</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.addroadname}>
                <div className={`${styles.headerTop} ${styles.headerTops}`}>
                  勤务路线
                <Button size='small' type="primary">保存路线</Button>
                </div>
                <div className={styles.headerTop}>
                  勤务路线路口列表
                <Button size='small' type="primary">一键勤务</Button>
                </div>
                <div className={styles.wrapperList}>
                  <div className={styles.mountingTable}>
                    <div className={styles.mountingThead}>
                      <div className={styles.mountingTh} />
                      <div className={styles.mountingTh}>路口名称</div>
                      <div className={styles.mountingTh}>勤务阶段</div>
                      <div className={styles.mountingTh}>勤务状态</div>
                      <div className={styles.mountingTh}>操作</div>
                    </div>
                    <div className={styles.mountingTbody}>
                      <div className={styles.mountingTr}>
                        <div className={styles.mountingTd}>1</div>
                        <div className={styles.mountingTd}>路口1</div>
                        <div className={styles.mountingTd}><span className={styles.phase}></span>紧急序号2</div>
                        <div className={styles.mountingTd}>中新勤务控制</div>
                        <div className={styles.mountingTd}>
                          <span className={styles.deviceMsg}>锁定</span>
                        </div>
                      </div>
                      <div className={styles.mountingTr}>
                        <div className={styles.mountingTd}>2</div>
                        <div className={styles.mountingTd}>路口2</div>
                        <div className={styles.mountingTd}><span className={styles.phase}></span>紧急序号2</div>
                        <div className={styles.mountingTd}>中新勤务控制</div>
                        <div className={styles.mountingTd}>
                          <span className={styles.deviceMsg}>锁定</span>
                        </div>
                      </div>
                      <div className={styles.mountingTr}>
                        <div className={styles.mountingTd}>3</div>
                        <div className={styles.mountingTd}>路口3</div>
                        <div className={styles.mountingTd}><span className={styles.phase}></span>紧急序号2</div>
                        <div className={styles.mountingTd}>中新勤务控制</div>
                        <div className={styles.mountingTd}>
                          <span className={styles.deviceMsg}>锁定</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {/* <div className={styles.sidebarLeft}>
          <div className={styles.titletops}>
            <span onClick={() => this.gettitletops(true)} className={Istitletops ? styles.titletopsActive : ''}>活动</span>
            <span onClick={() => this.gettitletops(false)} className={!Istitletops ? styles.titletopsActive : ''}>应急</span>
          </div>
          <Menu
            onClick={this.handleClick}
            style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
            mode="inline"

          >
          </Menu>
        </div> */}
        <div className={styles.sidebarLeft}>
          <div className={styles.tabLeft}>
            <span onClick={() => this.clickOperationNum('reserveplan')} className={clickNum === 'reserveplan' ? styles.active : ''}>{reserveplanName}</span>
            <span onClick={() => this.clickOperationNum('add')} className={clickNum === 'reserveplan' ? styles.active : ''}>{addReserveplan}</span>
            <span onClick={() => this.clickOperationNum('switch')} className={clickNum === 'reserveplan' ? styles.active : ''}>切换视图</span>
          </div>
          <div className={styles.sidebarLeftBox}>
            <ul className={styles.confUl}>
              <li className={styles.confLi} onClick={() => this.handleShowInterConf()}>123<span className={styles.innterBorder} /></li>
            </ul>
          </div>
        </div>
        <div className={styles.container} >
          {
            !mainHomePage &&
            <div className={styles.contentCenter}>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div >
    )
  }
}

export default Homepage
