import React , {Component} from "react"
import "./mainMonitor2DPage.scss"
//引入图片
import yellow from "../../../imgs/yellow.png"
import red from "../../../imgs/red.png";
import upDownPng from "../../../imgs/03.png"
import leftRightPng from "../../../imgs/01.png"
import upLeftDownRight from "../../../imgs/04.png"
import upLeftUp from "../../../imgs/11.png"
import rightUpLeftDown from "../../../imgs/02.png"
import startPng from '../../../imgs/start.png'
import endPng from '../../../imgs/end.png'
import bascRightLeft from "../../../imgs/bascRightLeft.png"
import bascRightUpLeft from "../../../imgs/bascRightUpLeft.png"
import bascUpDown from "../../../imgs/bascUpDown.png"

//引入地图
import mapConfiger from "../../../utils/minemapConf";
//引入antd
import { Select, Menu } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
//引用axios
const { Option } = Select;
const { SubMenu } = Menu;
export default class MainMonitor2DPage extends Component{
    constructor(props){
        super(props)
        this.state={
            stateSelect: [
                { name: "海淀区", id: "1", children: [{ name: "西二旗", id: "1_1" }, { name: "西直门", id: "1_2" }, { name: "东直门", id: "1_3" }] },
                { name: "朝阳区", id: "2", children: [{ name: "奥林匹克", id: "2_1" }, { name: "欢乐谷", id: "2_2" }] },
                { name: "上地", id: "3", children: [{ name: "华联", id: "3_1" }, { name: "中关村", id: "3_2" }] },
                { name: "三里屯", id: "4", children: [{ name: "太里古", id: "4_1" }, { name: "乾坤大厦", id: "4_2" }] }
              ],
              lineData: [{ lnglat: [116.383, 39.90709], img: bascRightLeft }, { lnglat: [116.389, 39.90725], img: bascRightUpLeft }, { lnglat: [116.399, 39.90756], img: bascUpDown }],
              //地图默认中心点
              defaultCenterPoint: [116.396, 39.9075],
              //地图视角角度
              modeMapFlyToPitch: 0, //0 表示竖直状态视角 90表示水平状态视角
              //地图缩放倍率
              modeMapFlyToZoom: 14.99, //范围 0~17  17表示放大到最大 15及以上开始3D
              //展示开关
              modeNavShow: true,
              modeMapShow: true,
              modeMainMonitor: false,
              modeMainTabShow: true,
              //切换到2D按钮
              modeMainTabTypeD: true,
              //2D到3D
              modeMainTabD: true,
              //控制多次渲染起点 终点图标
              modeMainControlMapSign: true,
              //点击中心点渲染多次处理
              clickCenterRenders: false,
              //视频
              url: [{ url: "rtmp://58.200.131.2:1935/livetv/cctv2", name: "东", id: "my_E"  }, { url: "rtmp://58.200.131.2:1935/livetv/cetv2", name: "西", id: "my_W" , displayStyle:true }],
              arl: [{ url: "rtmp://58.200.131.2:1935/livetv/cctv13", name: "南", id: 'my_S'  }, { url: "rtmp://58.200.131.2:1935/livetv/startv", name: "北", id: "my_N" , displayStyle:true }],
        };
            //接口
            this.videoState="/control-application-front/video/getLiveUrl/123";
    }
    componentDidMount () {
        this.renderMap();
    }
    //地图默认坐标
    intersectionRenderin = async () => {
        //默认起始点坐标
        await this.getstartpoint({ lng: 116.38151572176511, lat: 39.90708534816005 })
        //默认终止点坐标
        await this.getendpoint({ lng: 116.41149060058893, lat: 39.90803874332477 })
        //默认途径点坐标
        // await this.getChannelpoint({ lng: 116.39934569026138, lat: 39.90753821453271 })
        // await this.getChannelpoint({ lng: 116.38315705392921, lat: 39.907079696277606 })
    }
    modeTabToMapPage = () => {	  //地图默认坐标
        this.setState({
          modeNavShow: true,
          modeMapShow: true,
          modeMainMonitor: true,
          modeMainTabShow: true,
          modeMainTabTypeD: true
        }, () => {
          this.renderMap()
        })
      }
      addMenu = () => {
        const {defaultCenterPoint,modeMapFlyToZoom,modeMapFlyToPitch} =this.state;
        const _this = this
        this.map.flyTo({ center: defaultCenterPoint, zoom: modeMapFlyToZoom, pitch:modeMapFlyToPitch })
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
          marker = new window.mapabcgl.Marker()
            .setLngLat([lnglat.lng, lnglat.lat])
            .setOffset([50, 0])
            .addTo(_this.map);
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
        //清除地图
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
                roadValue.push(data.result[0].formatted_address)
                _this.setState({
                  roadValue
                })
              }
            };
          });
        }
        function addMarker(img, point, position) {
          var marker = '', html = ''
          html = document.createElement('div');
          // html.style.cssText = 'background:url(' + img + ')' + position + 'px 0px no-repeat;width:80px;height:50px;';
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
      // 计算起始与终点之间的中心点 > 用于重置地图中心点
      returnCenterLnglat = (startPoint, endPoint) => {
        const lng = startPoint[0] + (Math.abs(startPoint[0] - endPoint[0]) / 2)
        const lat = startPoint[1] + (Math.abs(startPoint[1] - endPoint[1]) / 2)
        return [lng, lat]
      }
      ClickMessge = (index) => {
        console.log(index,"index")
        if (this.mapPopup) {
          this.mapPopup.remove()
        }
        this.map.addControl(new window.mapabcgl.NavigationControl())
        var popupOption = {
          closeOnClick: false,
          closeButton: true,
          // anchor: "bottom-left",
          offset: [0, 25]
        }
        // this.state.clickCenterRenders ? this.setState({ clickCenterRenders: false }) : this.setState({ clickCenterRenders: true })
    //控制绿点弹出框
    // if (this.state.clickCenterRenders) {
      this.mapPopup = new window.mapabcgl.Popup(popupOption) 
        .setLngLat(new window.mapabcgl.LngLat(index[0], index[1]))
        .setHTML(`
                <div style="width: 74px;color: #fff; font-size:12px;height: 500px;display:flex;flex-direction: column;">
                    <div style="flex:1;display:flex;flex-direction: column;justify-content: center;align-items: center;">
                      <div className="switch"> 
                        <button type="button" role="switch" aria-checked="true" class="ant-switch ant-switch-checked" ant-click-animating="false" style="background:"#4A62E7">
                            <div class="ant-switch-handle">
                            </div>
                            <span class="ant-switch-inner"></span>
                        </button>
                      </div>
                      <div>开启手动</div>
                    </div>
                    <div style="flex:1;display: flex;justify-content: center;align-items: center;cursor: pointer;border-top:1px solid  #3661E9;"><img src=${rightUpLeftDown} alt=""/></div>
                    <div style="flex:1;display: flex;justify-content: center;align-items: center;cursor: pointer;border-top:1px solid  #3661E9;"><img src=${leftRightPng} alt=""/></div>
                    <div style="flex:1;display: flex;justify-content: center;align-items: center;cursor: pointer;border-top:1px solid  #3661E9;"><img src=${upDownPng} alt=""/></div>
                    <div style="flex:1;display: flex;justify-content: center;align-items: center;cursor: pointer;border-top:1px solid  #3661E9;"><img src=${upLeftUp} alt=""/></div>
                    <div style="flex:1;display: flex;justify-content: center;align-items: center;cursor: pointer;border-top:1px solid  #3661E9;"><img src=${upLeftDownRight} alt=""/></div>
                    <div style="flex:1;display: flex;justify-content: center;align-items: center;cursor: pointer;border-top:1px solid  #3661E9;"><img src=${yellow} alt=""/></div>
                    <div style="flex:1;display: flex;justify-content: center;align-items: center;cursor: pointer;border-top:1px solid  #3661E9;"><img src=${red} alt=""/></div>
                </div>`)
        .addTo(this.map);
    // }
  }
  //地图中心点
  addMarker = () => {
    const {lineData} =this.state;
    if (this.map) {
        lineData.map(item=>{
        const elParent = document.createElement('div')
        elParent.style.width = '40px'
        elParent.style.height = '20px'
        const elAnimation = document.createElement('div')
        elAnimation.setAttribute('class', 'animationS')
        const el = document.createElement('div')
        el.style.width = '32px'
        el.style.height = '32px'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = '#E9DA22'
        el.style.cursor = 'pointer'
        el.style.position = 'absolute'
        el.style.left = '0'
        el.style.top = '0'
        new window.mapabcgl.Marker(el)
        el.addEventListener('click', () => {
          this.ClickMessge(item.lnglat)
        })
        elParent.appendChild(elAnimation)
        elParent.appendChild(el)
        new window.mapabcgl.Marker(elParent)
          .setLngLat(item.lnglat)
          .addTo(this.map);
      })
    }
  }
     //地图渲染
    renderMap = () => {
        mapConfiger.zoom = 11;
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
        this.addMenu()
        })
        //清除弹框
        map.on('click', () => {
        this.setState({ clickCenterRenders: false })
        if (this.popup) {
            this.popup.remove()
        }
        })
        this.map = map
    }
    render () {
        const { modeNavShow, modeMapShow, modeMainMonitor, modeMainTabShow, modeMainTabTypeD, modeMainTabD } = this.state;
        return (
            <div className="mainMon2D">
              {
                //左侧导航页面渲染
                modeNavShow && <div className="NavMon">
                  <div className="topNavMon">
                    <div className="selectNav">
                      <Select defaultValue="海淀区" style={{ width: 100, height: 30 }} size="middle">
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
                    <Menu onClick={this.handleClick} style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto', overflowX: "hidden", fontSize: '16px' }} mode="inline">
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
                      <SubMenu key="sub4" title="房山区">
                        {/* <Menu.Item key="1-2-9">Option 9</Menu.Item> */}
                      </SubMenu>
                      <SubMenu key="sub5" title="通州区">
                      </SubMenu>
                      <SubMenu key="sub6" title="门头沟区">
                      </SubMenu>
                      <SubMenu key="sub7" title="中关村东路">
                      </SubMenu>
                    </Menu>
                  </div>
                </div>
              }
              {
                //地图显示
                modeMapShow && <div className="mapContent">
                  <div id="mapContainer" className="map-container"></div>
                </div>
              }
            </div >
          );
    }    
}