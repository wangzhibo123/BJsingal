import React, { Component } from 'react'
import "./MinMap.scss"
import mineMapConf from "../../../utils/minemapConf";
import { SearchOutlined } from "@ant-design/icons";
export default class MinMap extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
      addMenu = () => {
        const _this = this
        this.map.flyTo({ center: [116.391, 39.911], zoom: 17, pitch: 60 })
        var marker = '', startmarker = '', endmarker = '', channelmarker = [];
        this.map.on('contextmenu', function (item) {
          if (marker) {
            marker.remove();
          }
          var lnglat = item.lngLat;
          var style = 'background:#fff;color:#000;';
          var html = document.createElement('div');
          var contextmenu = '<div class="context_menu" style="padding:5px 10px;' + style + '">' + '<li id="start" style="cursor:point;">起点</li>' + '<li style="cursor:point;" id="end">终点</li>' + '<li style="cursor:point;" id="channel">途径点</li>' + '<li style="cursor:point;" id="clearmap">清空地图</li>' + '</div>';
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
          // 初始话渲染路口
        })
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
              str += i == 0 ? channelmarker[i].getLngLat().lng + ',' + channelmarker[i].getLngLat().lat : ';' + channelmarker[i].getLngLat().lng + ',' + channelmarker[i].getLngLat().lat
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
          document.getElementById('startInp').value = '';
          document.getElementById('endInp').value = '';
          document.getElementById('channelInp').value = '';
        }
        let roadValue = []
        function rgeocode(type, location) {
          var start = document.getElementById('startInp');
          var end = document.getElementById('endInp');
          var channel = document.getElementById('channelInp');
          _this.map.Geocoder({ location: location }, function (data) {
            if (data.status != '0') {
              alert(data.message);
              return
            };
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
    componentDidMount() {
        this.renderMap();
    }
    addMarker = () => {
        if (this.map) {
            const el = document.createElement("div");
            el.style.width = "20px";
            el.style.height = "20px";
            el.style.borderRadius = "50%";
            el.style.backgroundColor = "green";
            const marker = new window.mapabcgl.Marker(el)
                .setLngLat([116.391, 39.911])
                .addTo(this.map);
            console.log(marker);
        }
    };
    renderMap = () => {
        mineMapConf.zoom = 11;
        const map = new window.mapabcgl.Map(mineMapConf);
        //添加地图类型控件
        map.addControl(
            new window.mapabcgl.NavigationControl({
                showCompass: true,
                position: "bottom-right",
            })
        );
        const options = {
            minzoom: 1, // 路况显示的最小级别(1-24)
            maxzoom: 24, // 路况显示的最大级别(1-24)
            type: "vector", // 路况图层类型:vector(矢量),raster(栅格)
            refresh: 30 * 1000, // 路况图层刷新时间，毫秒
            // before:'roads-symbol-49'
        };
        map.on("load", () => {
            map.trafficLayer(true, options);
            this.addMarker();
            this.addMenu()
        });
        map.setZoom(13)
        map.setCenter([116.46216681806493, 39.94101458892803])
        this.map = map;
    };
    render() {
        return (
            <div className="minMapHome">            
                <div className="mapHome">
                    <div className="modeMainIptHome">
                    <input type="text" placeholder="查询…" className="modeMainIpt" />
                    <div className="modeMainIptBox">
                        <SearchOutlined />
                    </div>
                    </div>
                    <div className="mapContent">
                        <div id="mapContainer" className="map-container"></div>
                    </div>
                </div>
            </div>
        )
    }
}
