import React, { Component } from "react";
import "./MainMonitoring.scss";
import yellow from "../../imgs/yellow.png"
import red from "../../imgs/red.png";
import upDownPng from "../../imgs/03.png"
import leftRightPng from "../../imgs/01.png"
import upLeftDownRight from "../../imgs/04.png"
import upLeftUp from "../../imgs/11.png"
import rightUpLeftDown from "../../imgs/02.png"
import startPng from '../../imgs/start.png'
import endPng from '../../imgs/end.png'

import mapConfiger from "../../utils/minemapConf";
import { EditOutlined,SearchOutlined, CompassOutlined } from "@ant-design/icons";
import { Select, Button,Switch,Menu } from "antd";
const { Option } = Select;
const { SubMenu } = Menu;
export default class MainMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateSelect: [
        {
          name: "海淀区",
          id: "1",
          children: [{
            name: "西二旗",
            id: "1_1"
          },
          {
            name: "西直门",
            id: "1_2"
          },
          {
            name: "东直门",
            id: "1_3"
          }]
        },
        {
          name: "朝阳区",
          id: "2",
          children: [{
            name: "奥林匹克",
            id: "2_1"
          },
          {
            name: "欢乐谷",
            id: "2_2"
          }]
        },
        {
          name: "上地",
          id: "3",
          children: [{
            name: "华联",
            id: "3_1"
          }, {
            name: "中关村",
            id: "3_2"
          }]
        },
        {
          name: "三里屯",
          id: "4",
          children: [
            {
              name: "太里古",
              id: "4_1"
            }, {
              name: "乾坤大厦",
              id: "4_2"
            }
          ]
        }
      ],
      modeMapFlyToPitch:60,
      modeMapFlyToZoom:15,
      modeNavShow: true,
      modeMapShow: true,
      modeMainMonitor: false,
      modeMainTabShow: true,
      //向东 按钮
      modeMainEStyle:true,
       //向西 按钮
      modeMainWStyle:false,
       //向南 按钮
      modeMainSStyle:true,
       //向北 按钮
      modeMainNStyle:false,
      //切换到2D按钮
      modeMainTabTypeD:true,
      //2D到3D
      modeMainTabD:true,
      //控制多次渲染起点 终点图标
      modeMainControlMapSign:true
    };
  }
  componentDidMount() {
    this.state.modeMapShow&&this.renderMap();
  }
  onChange(checked) {
  }
  modeTabToMapPage=()=>{
    this.setState({
      modeNavShow: true,
      modeMapShow: true,
      modeMainMonitor: false,
      modeMainTabShow: true
    },()=>{
      this.renderMap()
    })
  }
  intersectionRenderin = async () => {
    await this.getstartpoint({ lng: 116.38251572176512, lat: 39.90708534816005 })
    await this.getendpoint({ lng: 116.41149060058893, lat: 39.90803874332477 })
    await this.getChannelpoint({ lng: 116.39934569026138, lat: 39.90753821453271 })
    await this.getChannelpoint({ lng: 116.38315705392921, lat: 39.907079696277606 })
  }

  addMenu = () => {
    const _this = this
    this.map.flyTo({ center: [116.391, 39.911], zoom: this.state.modeMapFlyToZoom, pitch: this.state.modeMapFlyToPitch })
    var marker = '', startmarker = '', endmarker = '', channelmarker = [];
    this.map.on('contextmenu', function (item) {
      if (marker) {
        marker.remove();
      }
      var lnglat = item.lngLat;
      var style = 'background:#fff;color:#000;';
      var html = document.createElement('div');
      var contextmenu = '<div class="context_menu" style="padding:5px 10px;' + style + '">' + '<li id="start" style="cursor:point;">起点</li>' + '<li style="cursor:point;" id="end">终点</li>' + '<li style="cursor:point;" id="channel">途径点</li>' + '<li style="cursor:point;" id="clearmap">清空地图</li>' + '</div>';
      html.innerHTML = contextmenu
      marker = new window.mapabcgl.Marker(html)
        .setLngLat([lnglat.lng, lnglat.lat])
        .setOffset([50, 0])
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
      // 初始话渲染路口
    })

    this.getstartpoint = (lnglat) => {
      // console.log(lnglat, '开始')
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
      // console.log(lnglat, '结束')
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
    _this.intersectionRenderin()
    // this.getstartpoint({ lng: 116.39171507191793, lat: 39.910732551600205 })
    // this.getendpoint({ lng: 116.3909904231216, lat: 39.9223143411036 })
    this.getChannelpoint = (lnglat) => {
      // console.log(lnglat, '途经点')
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
          if (data.status === 0) {
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
              addplanline(lines, 'plan', '#D6CE22')
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
      
    }
    let roadValue = []
    function rgeocode(type, location) {
      _this.map.Geocoder({ location: location }, function (data) {
        if (data.status !== '0') {
          alert(data.message);
          return
        };
        if (data.result.length > 0) {
          if (type === 1) {
          } else if (type === 2) {
          } else {
            // var str = channel.value ? channel.value + ';' : channel.value;
            // console.log(data.result[0].formatted_address, 'vvv')
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
      });

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
  
  ClickMessge = () => {
    var popupOption = {
      closeOnClick: false,
      closeButton: true,
      // anchor: "bottom-left",
      offset: [-20, -10]
    }
    // <img width="36px" height="36px" src="${}" />
    //控制绿点弹出框
    this.popup = new window.mapabcgl.Popup(popupOption)
      .setLngLat(new window.mapabcgl.LngLat(116.391, 39.911))
      .setHTML(`
      <div style="width: 310px;color: #599FE0; font-size:12px;height: 165px;background:rgba(6,21,65,.5);border: 1px solid #3167AA; ">
      1111
      </div>`)
      .addTo(this.map);
  }
  addMarker = () => {
    if (this.map) {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'green'
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        this.ClickMessge()
      })
      new window.mapabcgl.Marker(el)
      //绿色中心点坐标
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
      type: 'raster', // 路况图层类型:vector(矢量),raster(栅格)
      refresh: 30 * 1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
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
  modeMainEBtn=()=>{
    this.setState({
      modeMainEStyle:true,
      modeMainWStyle:false
    })
  }
  modeMainWBtn=()=>{
    this.setState({
      modeMainEStyle:false,
      modeMainWStyle:true
    })
  }
  modeMainSBtn=()=>{
    this.setState({
      modeMainSStyle:true,
      modeMainNStyle:false
    })
  }
  modeMainNBtn=()=>{
    this.setState({
      modeMainSStyle:false,
      modeMainNStyle:true
    })
  }
  //2D,3D切换
  flyTo2D=()=>{
    if(this.state.modeMainTabD){
      this.setState({
        modeMapFlyToPitch:0,
        modeMainTabD:false,
        modeMapFlyToZoom:13,
        modeMainControlMapSign:false
      },()=>{
        this.addMenu()
      })
    }else{
      this.setState({
        modeMapFlyToPitch:60,
        modeMainTabD:true,
        modeMapFlyToZoom:15,
        modeMainControlMapSign:false
      },()=>{
        this.addMenu()
      })
    }
  }
  render() {
    const { modeNavShow, modeMapShow, modeMainMonitor, modeMainTabShow ,modeMainEStyle,modeMainWStyle,modeMainSStyle,modeMainNStyle,modeMainTabTypeD,modeMainTabD} = this.state;
    return (
      <div className="mainMon">
        {
          modeNavShow && <div className="NavMon">
            <div className="topNavMon">
              <div className="selectNav">
                <Select
                  defaultValue="海淀区"
                  style={{ width: 100,height:30 }}
                  size="middle"      
                >
                  {
                    this.state.stateSelect.map((item, index) => {
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
            <div className="listNav">
            <Menu
            onClick={this.handleClick}
            style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto',overflowX:"hidden", fontSize: '16px' }}
            // defaultSelectedKeys={['7']}
            // defaultOpenKeys={['sub2', 'sub3']}
            mode="inline"
          >
            <SubMenu key="sub2" title="海淀区">
              {/* <Menu.Item key="5"></Menu.Item> */}
              <SubMenu key="sub3" title="知春路拥堵应急">
                <Menu.Item key="7">知春路与罗庄东路<EditOutlined /></Menu.Item>
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
        }
        {
          modeMapShow && <div className="mapContent">
            <div id="mapContainer" className="map-container"></div>
          </div>
        }
        {
          modeMainMonitor && <div className="modeMainMonitorHome">
            <div className="modeMainSlidMode">
              <div className="modeMainSlidHeadMode">
                <div className="modeMainIptHome">
                  <input type="text" placeholder="查询…" className="modeMainIpt" />
                  <div className="modeMainIptBox">
                    <SearchOutlined />
                  </div>
                </div>
                <div className="modeMainLengthHome">
                  <div className="modeMainLength">干线长度</div><div className="modeMainLengthNum"><span className="modeMainLengthUnit">6</span>km</div>
                </div>
                <div className="modeMainLabelHome">
                  <div className="modeMainLabel">
                    <div className="modeMainLabelIcon"><CompassOutlined /></div>
                    <div className="modeMainLabelText">东西向</div>
                  </div>
                </div>
              </div>
              <div className="modeMainDirection">
                <div className="modeMainEWMode">
                  {/* 东西走向 */}
                  <div className="modeMainEWBtn">
                    <Button onClick={this.modeMainEBtn} className={modeMainEStyle&&"modeShowStyle"}>东</Button>
                    <Button onClick={this.modeMainWBtn} className={modeMainWStyle&&"modeShowStyle"}>西</Button>
                  </div>
                  <div className="modeMainEWVideo">
                    <video src="*" style={{ width: "100%", height: "100%" }} controls>
                      <source src="*" type="video/mp4"></source>
                    </video>
                  </div>
                </div>
                <div className="modeMainSNMode">
                  {/* 南北走向 */}
                  <div className="modeMainSNBtn">
                    <Button onClick={this.modeMainSBtn} className={modeMainSStyle&&"modeShowStyle"}>南</Button>
                    <Button onClick={this.modeMainNBtn} className={modeMainNStyle&&"modeShowStyle"}>北</Button>
                  </div>
                  <div className="modeMainSNVideo">
                    <video style={{ width: "100%", height: "100%" }} controls>
                      <source src="*" type="video/mp4"></source>
                    </video>
                  </div>
                </div>
              </div>
            </div>
            <div className="modeMainContentMode">
              <div className="modeMainMonitor"><div className="modeMainMonitorContentSink">干线监视</div>
              <div className="modeSwitchBtn">
                  <div className="modeTab" onClick={this.modeTabToMapPage}>模式切换</div>
              </div>
           </div>
              <div className="modeMainMonitorContent">
                <div className="modeMainMonitorContentHome">

                  {/* 条状图 */}
                  <div className="modeMainMonitorContentStrip">
                      <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#02AED7,#0173C8)", borderRadius: "20px", position: "relative" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0}}>
                        </div>
                      </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLine">
                    <div className="modeMainMonitorContentCross">
                        <div className="modeMainMonitorContentCrossText">
                            苏州街
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball">
                    </div>
                    <div className="modeMainMonitorContentList">
                        <div className="modeMainMonitorContentListTop">
                            <div className="autoOper">自动运行</div>
                            <div className="switch"><Switch defaultChecked onChange={this.onChange} style={{background:"#4A62E7"}}/></div>
                            <div className="openHand">开启手动</div>
                        </div>
                        <div className="modeMainMonitorContentListBottom">
                          <div className="modeMainMonitorContentListTable">
                            <div className="modeMainMonitorContentListImg"><img src={yellow} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={red} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt=""/></div> 
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"  style={{background:"#000E35"}}><img src={upDownPng} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upLeftUp} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          </div>
                        </div>
                    </div>
                  </div>
                  
                  {/* 条状图 */}
                  <div className="modeMainMonitorContentStripTwo" style={{position: "absolute",top: "202px",left: "calc(190px * 1)"}}>
                      <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0}}>
                        </div>
                      </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{position: "absolute",top: "0px",left: "calc(155px + 185px * 1)"}}>
                    <div className="modeMainMonitorContentCross">
                        <div className="modeMainMonitorContentCrossText">
                            中关村大街
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball">
                        
                    </div>
                    <div className="modeMainMonitorContentList">
                        <div className="modeMainMonitorContentListTop">
                            <div className="autoOper">自动运行</div>
                            <div className="switch"><Switch defaultChecked onChange={this.onChange} style={{background:"#4A62E7"}}/></div>
                            <div className="openHand">开启手动</div>
                        </div>  
                        <div className="modeMainMonitorContentListBottom">
                          <div className="modeMainMonitorContentListTable">
                            <div className="modeMainMonitorContentListImg"><img src={yellow} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={red} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt=""/></div> 
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg" style={{background:"#000E35"}}><img src={upLeftUp} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          </div>
                        </div>
                    </div>
                  </div>
              




              {/* 条状图 */}
              <div className="modeMainMonitorContentStripTwo" style={{position: "absolute",top: "202px",left: "calc((190px - 2px) * 2)"}}>
                      <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0}}>
                        </div>
                      </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{position: "absolute",top: "0px",left: "calc(155px + 185px * 2)"}}>
                    <div className="modeMainMonitorContentCross">
                        <div className="modeMainMonitorContentCrossText">
                            中关村大街
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball">
                        
                    </div>
                    <div className="modeMainMonitorContentList">
                        <div className="modeMainMonitorContentListTop">
                            <div className="autoOper">自动运行</div>
                            <div className="switch"><Switch defaultChecked onChange={this.onChange} style={{background:"#4A62E7"}}/></div>
                            <div className="openHand">开启手动</div>
                        </div>  
                        <div className="modeMainMonitorContentListBottom">
                          <div className="modeMainMonitorContentListTable">
                            <div className="modeMainMonitorContentListImg"><img src={yellow} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={red} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt=""/></div> 
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg" style={{background:"#000E35"}}><img src={upLeftUp} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          </div>
                        </div>
                    </div>
                  </div>

                {/* 条状图 */}
              <div className="modeMainMonitorContentStripTwo" style={{position: "absolute",top: "202px",left: "calc((190px - 3px) * 3)"}}>
                      <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0}}>
                        </div>
                      </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{position: "absolute",top: "0px",left: "calc(155px + 185px * 3)"}}>
                    <div className="modeMainMonitorContentCross">
                        <div className="modeMainMonitorContentCrossText">
                            中关村大街
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball">
                        
                    </div>
                    <div className="modeMainMonitorContentList">
                        <div className="modeMainMonitorContentListTop">
                            <div className="autoOper">自动运行</div>
                            <div className="switch"><Switch defaultChecked onChange={this.onChange} style={{background:"#4A62E7"}}/></div>
                            <div className="openHand">开启手动</div>
                        </div>  
                        <div className="modeMainMonitorContentListBottom">
                          <div className="modeMainMonitorContentListTable">
                            <div className="modeMainMonitorContentListImg"><img src={yellow} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={red} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt=""/></div> 
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg" style={{background:"#000E35"}}><img src={upLeftUp} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          </div>
                        </div>
                    </div>
                  </div>

                {/* 条状图 */}
              <div className="modeMainMonitorContentStripTwo" style={{position: "absolute",top: "202px",left: "calc((190px - 4px) * 4)"}}>
                      <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0}}>
                        </div>
                      </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{position: "absolute",top: "0px",left: "calc(155px + 185px * 4)"}}>
                    <div className="modeMainMonitorContentCross">
                        <div className="modeMainMonitorContentCrossText">
                            中关村大街
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball">
                        
                    </div>
                    <div className="modeMainMonitorContentList">
                        <div className="modeMainMonitorContentListTop">
                            <div className="autoOper">自动运行</div>
                            <div className="switch"><Switch defaultChecked onChange={this.onChange} style={{background:"#4A62E7"}}/></div>
                            <div className="openHand">开启手动</div>
                        </div>  
                        <div className="modeMainMonitorContentListBottom">
                          <div className="modeMainMonitorContentListTable">
                            <div className="modeMainMonitorContentListImg"><img src={yellow} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={red} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt=""/></div> 
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg" style={{background:"#000E35"}}><img src={upLeftUp} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          </div>
                        </div>
                    </div>
                  </div>

                  {/* 条状图 */}
              <div className="modeMainMonitorContentStripTwo" style={{position: "absolute",top: "202px",left: "calc((190px - 4px) * 5)"}}>
                      <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0}}>
                        </div>
                      </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{position: "absolute",top: "0px",left: "calc(155px + 185px * 5)"}}>
                    <div className="modeMainMonitorContentCross">
                        <div className="modeMainMonitorContentCrossText">
                            中关村大街
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball">
                        
                    </div>
                    <div className="modeMainMonitorContentList">
                        <div className="modeMainMonitorContentListTop">
                            <div className="autoOper">自动运行</div>
                            <div className="switch"><Switch defaultChecked onChange={this.onChange} style={{background:"#4A62E7"}}/></div>
                            <div className="openHand">开启手动</div>
                        </div>  
                        <div className="modeMainMonitorContentListBottom">
                          <div className="modeMainMonitorContentListTable">
                            <div className="modeMainMonitorContentListImg"><img src={yellow} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={red} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt=""/></div> 
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg" style={{background:"#000E35"}}><img src={upLeftUp} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          </div>
                        </div>
                    </div>
                    </div>

                    {/* 条状图 */}
              <div className="modeMainMonitorContentStripTwo" style={{position: "absolute",top: "202px",left: "calc((190px - 4px) * 6)"}}>
                      <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0}}>
                        </div>
                      </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{position: "absolute",top: "0px",left: "calc(155px + 185px * 6)"}}>
                    <div className="modeMainMonitorContentCross">
                        <div className="modeMainMonitorContentCrossText">
                            中关村大街
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball">
                        
                    </div>
                    <div className="modeMainMonitorContentList">
                        <div className="modeMainMonitorContentListTop">
                            <div className="autoOper">自动运行</div>
                            <div className="switch"><Switch defaultChecked onChange={this.onChange} style={{background:"#4A62E7"}}/></div>
                            <div className="openHand">开启手动</div>
                        </div>  
                        <div className="modeMainMonitorContentListBottom">
                          <div className="modeMainMonitorContentListTable">
                            <div className="modeMainMonitorContentListImg"><img src={yellow} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={red} alt=""/></div>
                            <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt=""/></div> 
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg" style={{background:"#000E35"}}><img src={upLeftUp} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                            <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt=""/></div>
                            <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          </div>
                        </div>
                    </div>
                  </div>

                  </div>
                </div>

            </div>
          </div>
        }
        {
          modeMainTabShow && <div className="modeSwitchBtn">
            <div className="modeTab" onClick={() => {
              this.setState({
                modeNavShow: false,
                modeMapShow: false,
                modeMainMonitor: true,
                modeMainTabShow: false
              })
            }}>模式切换</div>
          </div>
        }
        {
          modeMainTabTypeD&&<div style={{width:"50px",height:'50px',background:'rgba(32, 120, 195,.6)',color:"#fff",position:"absolute",right:"30px",bottom:"45px",textAlign:"center",cursor:'pointer',borderRadius:"5px",lineHeight:"50px",fontWeight:700}}>
            <div style={{fontSize:'17px'}} onClick={this.flyTo2D}>{modeMainTabD?"2D":"3D"}</div>
          </div>
        }
      </div >
    );
  }
}
