import React, { Component } from "react";
import "./AreaMonitoring.scss";
import mineMapConf from "../../utils/minemapConf";
import { SearchOutlined } from "@ant-design/icons";
import { Select } from "antd";
const { Option } = Select;
export default class AreaMonitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      modeAreaTabShow:true,
      modeAreaMapShow:true,
      modeAreaContentShow:true,
      modeSequenceChartShow:false
    };
  }
  componentDidMount() {
    if(this.state.modeAreaMapShow){
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
    const {modeAreaTabShow,modeAreaMapShow,modeAreaContentShow,modeSequenceChartShow} =this.state;
    return (
      <div className="AreaMon">
        {
          modeAreaContentShow&&<div className="modeAreaContent">
              <div className="NavMon">
          <div className="areaMonNum">
            <div>系统子区:</div>
            <div>
              <span>16</span>个
            </div>
          </div>
          <div className="topNavMon">
            <div className="selectNav">
              <Select
                defaultValue="海淀区"
                style={{ width: 100, height: 30 }}
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
          </div>
        }
        {
          modeAreaMapShow&&
            <div className="mapContent">
                <div id="mapContainer" className="map-container"></div>
            </div>
        }
        
        {
          modeAreaTabShow && <div className="modeSwitchBtn">
            <div className="modeTab" onClick={() => {
              this.setState({
                modeAreaTabShow:false,
                modeAreaMapShow:false,
                modeAreaContentShow:false,
                modeSequenceChartShow:true
              })
            }}>时序图</div>
          </div>
        }
        {
          modeSequenceChartShow&&<div className="modeSequenceChartShowHome">
            <div className="modeSequenceChartShowList">
                <div className="modeSequenceCharShowListHead">
                      <div className="modeSequenceCharShowListHeadInfo">
                        <div>子区详细信息</div>
                      </div>
                      <div className="modeSequenceCharShowListHeadChildName">
                        <div className="modeChildMark">子区号:<div className="modeChildMarkNum">254</div></div>
                        <div className="modeChildName">子区名称:<div className="modeChildMarkText">平安大街</div></div>
                      </div>
                </div>
                <div className="modeSequenceCharShowListBox">
                      <div className="modeSequenceCharShowListBoxTh">
                        <div className="modeSequenceCharShowListBoxTd">路口号</div>
                        <div className="modeSequenceCharShowListBoxTd">控制模式</div>
                        <div className="modeSequenceCharShowListBoxTd">当前方案</div>
                        <div className="modeSequenceCharShowListBoxTd">周期</div>
                        <div className="modeSequenceCharShowListBoxTd">相位差</div>
                        <div className="modeSequenceCharShowListBoxTd">当前阶段</div>
                        <div className="modeSequenceCharShowListBoxTd">时间(秒)</div>
                      </div>
                      <div className="modeSequenceCharShowListBoxTr">
                      <div className="modeSequenceCharShowListBoxTd">25521-郭沫若故居</div>
                        <div className="modeSequenceCharShowListBoxTd">中心控制</div>
                        <div className="modeSequenceCharShowListBoxTd">4</div>
                        <div className="modeSequenceCharShowListBoxTd">141</div>
                        <div className="modeSequenceCharShowListBoxTd">0</div>
                        <div className="modeSequenceCharShowListBoxTd">1-东西直左</div>
                        <div className="modeSequenceCharShowListBoxTd">73</div>
                      </div>
                      <div className="modeSequenceCharShowListBoxTr">
                      <div className="modeSequenceCharShowListBoxTd">25521-郭沫若故居</div>
                        <div className="modeSequenceCharShowListBoxTd">中心控制</div>
                        <div className="modeSequenceCharShowListBoxTd">4</div>
                        <div className="modeSequenceCharShowListBoxTd">141</div>
                        <div className="modeSequenceCharShowListBoxTd">0</div>
                        <div className="modeSequenceCharShowListBoxTd">1-东西直左</div>
                        <div className="modeSequenceCharShowListBoxTd">73</div>
                      </div>
                      <div className="modeSequenceCharShowListBoxTr">
                      <div className="modeSequenceCharShowListBoxTd">25521-郭沫若故居</div>
                        <div className="modeSequenceCharShowListBoxTd">中心控制</div>
                        <div className="modeSequenceCharShowListBoxTd">4</div>
                        <div className="modeSequenceCharShowListBoxTd">141</div>
                        <div className="modeSequenceCharShowListBoxTd">0</div>
                        <div className="modeSequenceCharShowListBoxTd">1-东西直左</div>
                        <div className="modeSequenceCharShowListBoxTd">73</div>
                      </div>
                      <div className="modeSequenceCharShowListBoxTr">
                      <div className="modeSequenceCharShowListBoxTd">25521-郭沫若故居</div>
                        <div className="modeSequenceCharShowListBoxTd">中心控制</div>
                        <div className="modeSequenceCharShowListBoxTd">4</div>
                        <div className="modeSequenceCharShowListBoxTd">141</div>
                        <div className="modeSequenceCharShowListBoxTd">0</div>
                        <div className="modeSequenceCharShowListBoxTd">1-东西直左</div>
                        <div className="modeSequenceCharShowListBoxTd">73</div>
                      </div>
                      
                </div>
            </div>
            <div className="modeSequenceChartShowChart">
              
            </div>
          </div>
        }
      </div>
    );
  }
}
