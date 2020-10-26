import React, { Component } from "react";
import "./AreaMonitoring.scss";
import ModeSequenceChartShowChart from "../../utils/GreenWaveCharts/GreenWaveCharts.jsx"
import AreaMessage from "./AreaMessage/AreaMessage"
import mineMapConf from "../../utils/minemapConf";
import { SearchOutlined } from "@ant-design/icons";
import { Select,Button } from "antd";
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
      //切换按钮
      modeAreaTabShow:true,
      //地图
      modeAreaMapShow:true,
      //左侧侧边栏
      modeAreaContentShow:true,
      //第二页面
      modeSequenceChartShow:false
    };
  }
  componentDidMount() {
    console.log(11)
    this.state.modeAreaMapShow&&this.renderMap();
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
  onChange(value) {
    console.log(`selected ${value}`);
  }
  
  onBlur() {
    console.log('blur');
  }
  
  onFocus() {
    console.log('focus');
  }
  
  onSearch(val) {
    console.log('search:', val);
  }
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
                <SearchOutlined  style={{cursor: "pointer"}}/>
              </div>
            </div>
          </div>

          <div className="listNav">
            <ul className="allNavList">
              <li>万泉河路</li>
              <div className="line"></div>
              <li>中关村大街</li>
              <div className="line"></div>
              <li>中关村东路</li>
              <div className="line"></div>
              <li>知春路</li>
              <div className="line"></div>
              <li>学院路</li>
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
                        <div className="subareaDetails">子区详细信息<div className="BGLine"></div></div>
                      </div>
                      <div className="modeSequenceCharShowListHeadChildName">
                        <div className="modeChildMark">子区号:<div className="modeChildMarkNum"><h3>254</h3></div></div>
                        <div className="modeChildName">子区名称:<div className="modeChildMarkText">郭沫若故居</div></div>
                      </div>
                </div>
                <div className="modeSequenceCharShowListBox">
                  <AreaMessage></AreaMessage>
                </div>
              </div>
              <div className="modeSequenceChartShowChart">
                <div className="modeSequenceChartShowChartHead">
                    <div className="modeSequenceChartShowChartIptSearch">
                      <Select
                        showSearch
                        style={{ width: 273,height:37,position:"absolute",left:"30px",top:"25px",backgroundColor:"red"}}
                        placeholder="请输入子区名称进行搜索"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        size="large"
                      >
                        <Option value="jack">1</Option>
                        <Option value="lucy">2</Option>
                        <Option value="tom">3</Option>
                      </Select>
                      <Button type="primary" style={{width:68,height:37,position:"absolute",left:"312px",top:'25px'}}>搜索</Button>
                    </div>
                    <div className="modeSwitchBtn">
                    <div className="modeTab" onClick={() => {
                      this.setState({
                        modeAreaTabShow:true,
                        modeAreaMapShow:true,
                        modeAreaContentShow:true,
                        modeSequenceChartShow:false
                      },()=>{
                        this.renderMap()
                      })
                    }}>地图模式</div>
                  </div>
                </div>
                <div className="modeSequenceChartShowChartList">
                    <ModeSequenceChartShowChart></ModeSequenceChartShowChart>
              </div>
              </div>
          </div>
        }
      </div>
    );
  }
}
