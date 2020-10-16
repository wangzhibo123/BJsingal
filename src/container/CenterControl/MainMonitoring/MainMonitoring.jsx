import React, { Component } from "react";
import "./MainMonitoring.scss";
import mineMapConf from "../../utils/minemapConf";
import { SearchOutlined, CompassOutlined } from "@ant-design/icons";
import { Select, Button } from "antd";
const { Option } = Select;
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
      modeNavShow: true,
      modeMapShow: true,
      modeMainMonitor: false,
      modeMainTabShow: true
    };
  }
  componentDidMount() {
    if (this.state.modeMapShow) {
      this.renderMap();
    }
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
    });
    this.map = map;
  };

  render() {
    const { modeNavShow, modeMapShow, modeMainMonitor, modeMainTabShow } = this.state;
    return (
      <div className="mainMon">
        {
          modeNavShow && <div className="NavMon">
            <div className="topNavMon">
              <div className="selectNav">
                <Select
                  defaultValue="海淀区"
                  style={{ width: 100, height: 30 }}
                >
                  {
                    this.state.stateSelect.map((item, index) => {
                      return (
                        <Option value={index} style={{ width: 100, height: 30 }}>{item.name}</Option>
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
              <ul className="allNavList">
                <li>万泉河路</li>
                <div className="line"></div>
                <li>万泉河路</li>
                <div className="line"></div>
                <li>万泉河路</li>
                <div className="line"></div>
                <li>万泉河路</li>
                <div className="line"></div>
                <li>万泉河路</li>
                <div className="line"></div>
              </ul>
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
                  <div className="modeMainLength">干线长度</div><div className="modeMainLengthNum">6 <span className="modeMainLengthUnit">km</span></div>
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
                    <Button>东</Button>
                    <Button>西</Button>
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
                    <Button>南</Button>
                    <Button>北</Button>
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
              <div className="modeMainMonitor"><div className="modeMainMonitorContent">干线监视</div></div>
              <div className="modeMainMonitorContent">
                <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#02AED7,#0173C8)", borderRadius: "20px", position: "relative" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "-6px", top: 0 }}>

                  </div>
                </div>

                <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#3929D6,#800DC8)", borderRadius: "20px", position: "relative" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "-6px", top: 0 }}>

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
      </div >
    );
  }
}
