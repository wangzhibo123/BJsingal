import React, { Component } from "react";
import "./MainMonitoring.scss";
import yellow from "../../imgs/yellow.png"
import red from "../../imgs/red.png";
import upDownPng from "../../imgs/03.png"
import leftRightPng from "../../imgs/01.png"
import upLeftDownRight from "../../imgs/04.png"
import upLeftUp from "../../imgs/11.png"
import rightUpLeftDown from "../../imgs/02.png"

import mineMapConf from "../../utils/minemapConf";
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
      modeMainNStyle:false
    };
  }
  componentDidMount() {
    this.state.modeMapShow&&this.renderMap();
  }
  onChange(checked) {
    console.log(`switch to ${checked}`);
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
    const { modeNavShow, modeMapShow, modeMainMonitor, modeMainTabShow ,modeMainEStyle,modeMainWStyle,modeMainSStyle,modeMainNStyle} = this.state;
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
                  <div className="modeMainMonitorContentStripTwo">
                      <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0}}>
                        </div>
                      </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo">
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
      </div >
    );
  }
}
