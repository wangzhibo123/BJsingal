import React, { Component } from 'react'
import { Menu, Input, DatePicker, Button, Select } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './PlancontrolPage.module.scss'
import mapConfiger from '../utils/minemapConf'
import startPng from '../imgs/start.png'
import endPng from '../imgs/end.png'
import carPng from '../imgs/car.png'
const { SubMenu } = Menu;
class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: false,
    }
  }
  componentDidMount = () => {
    this.renderMap()
  }
  addMarkers = (arr) => {
    if (this.map) {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = '#02FB09'
      el.addEventListener('click', () => {
        this.handleClckMessge(true)
      })
      const marker = new window.mapabcgl.Marker(el)
        .setLngLat(arr)
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
      this.addMarkers([116.39159349169165, 39.91203316087379])
      map.addControl(new window.mapabcgl.NavControl({ showCompass: true, position: 'bottom-right' }));
      map.loadImage('http://map.mapabc.com:35001/mapdemo/apidemos/sourceLinks/img/dir.png', function (error, image) {
        map.addImage('arrowImg', image);
      });
      addMenu()
    })
    var marker = '', startmarker = '', endmarker = '', channelmarker = [];
    function allfun() {
      getstartpoint({ lng: 116.3914995897319, lat: 39.91082015896538 })
      getendpoint({ lng: 116.3909904231216, lat: 39.9223781190357 })
    }
    //添加右键菜单
    function addMenu() {
      map.flyTo({ center: [116.391, 39.911], zoom: 14, pitch: 60 })
      map.on('contextmenu', function (item) {

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
          .addTo(map);
        var start = document.getElementById('start');
        var end = document.getElementById('end');
        var channel = document.getElementById('channel');
        var clear = document.getElementById('clearmap');
        start.addEventListener('click', function (e) {
          getstartpoint(lnglat);
        })
        end.addEventListener('click', function (e) {
          getendpoint(lnglat)
        })
        channel.addEventListener('click', function (e) {
          getChannelpoint(lnglat)
        })
        clear.addEventListener('click', function (e) {
          clearMap();
        })
      })
      allfun()
    }
    function getstartpoint(lnglat) {
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

    function getendpoint(lnglat) {
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
    function getChannelpoint(lnglat) {
      if (marker) {
        marker.remove();
      }
      if (channelmarker.length >= 16) {
        alert("途径点最多支持16个")
        return;
      }
      var pointMarker = addMarker('http://map.mapabc.com:35001/mapdemo/apidemos/sourceLinks/img/point_1.png', [lnglat.lng, lnglat.lat], -441);
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

        map.Driving({
          origin: origin,
          destination: destination,
          waypoints: str//途经点
        }, function (data) {
          if (data.status == 0) {
            var data = data.result.routes[0].steps, xys = '';
            map.removeLayerAndSource('plan');
            map.removeLayerAndSource('plan1');
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
              map.removeLayerAndSource('addArrowImg');
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


      map.addLayer({
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
      map.addLayer({
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

      map.removeLayerAndSource('plan');
      map.removeLayerAndSource('plan1');
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
      var html = document.createElement('div');
      html.style.cssText = 'background:url(' + img + ')' + position + 'px 0px no-repeat;width:80px;height:50px;'
      var marker = new window.mapabcgl.Marker(html)
        .setLngLat(point)
        .setDraggable(true)
        .addTo(map);
      return marker;
    };
    this.map = map
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
  render() {
    const { Option } = Select
    const { mainHomePage, Istitletops, IsddMessge } = this.state
    return (
      <div className={styles.PlancontrolPageWrapper}>
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
        <div className={styles.reserveplan}>
          <div />
          <span>添加预案</span>
        </div>
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
        <div className={styles.sidebarLeft}>
          <div className={styles.titletops}>
            <span onClick={() => this.gettitletops(true)} className={Istitletops ? styles.titletopsActive : ''}>活动</span>
            <span onClick={() => this.gettitletops(false)} className={!Istitletops ? styles.titletopsActive : ''}>应急</span>
          </div>
          <Menu
            onClick={this.handleClick}
            style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
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
        <div className={styles.container}>
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
