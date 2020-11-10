import React, { Component } from "react";
import "./AreaMonitoring.scss";
import ModeSequenceChartShowChart from "../../utils/GreenWaveCharts/GreenWaveCharts.jsx"
import AreaMessage from "./AreaMessage/AreaMessage"
import mineMapConf from "../../utils/minemapConf";
import { EditOutlined,SearchOutlined, CompassOutlined } from "@ant-design/icons";
import { Select, Button,Switch,Menu } from "antd";
const { Option } = Select;
const { SubMenu } = Menu;
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
      modeAreaTabShow:false,
      //地图
      modeAreaMapShow:true,
      //左侧侧边栏
      modeAreaContentShow:true,
      //第二页面
      modeSequenceChartShow:false,
      //切换到2D按钮
      modeMainTabTypeD:true,
      //2D到3D
      modeMainTabD:true,
    };
  }
  componentDidMount() {
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
  //2D,3D切换
  flyTo2D=()=>{
    if(this.state.modeMainTabD){
      this.setState({
        modeMapFlyToPitch:0,
        modeMainTabD:false,
        modeMapFlyToZoom:13,
        modeMainControlMapSign:false
      },()=>{
        this.map.flyTo({  zoom: this.state.modeMapFlyToZoom, pitch: this.state.modeMapFlyToPitch })
      })
    }else{
      this.setState({
        modeMapFlyToPitch:60,
        modeMainTabD:true,
        modeMapFlyToZoom:15,
        modeMainControlMapSign:false
      },()=>{
        this.map.flyTo({  zoom: this.state.modeMapFlyToZoom, pitch: this.state.modeMapFlyToPitch })
      })
    }
  }
  render() {
    const {modeAreaTabShow,modeAreaMapShow,modeAreaContentShow,modeSequenceChartShow,modeMainTabTypeD,modeMainTabD} =this.state;
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
              <Select defaultValue="海淀区" style={{ width: 100, height: 30 }}>
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
          <Menu onClick={this.handleClick} style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto',overflowX:"hidden", fontSize: '16px' }} mode="inline">
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
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
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
        {
          modeMainTabTypeD&&<div style={{width:"50px",height:'50px',background:'rgba(32, 120, 195,.6)',color:"#fff",position:"absolute",right:"30px",bottom:"45px",textAlign:"center",cursor:'pointer',borderRadius:"5px",lineHeight:"50px",fontWeight:700}}>
            <div style={{fontSize:'17px'}} onClick={this.flyTo2D}>{modeMainTabD?"2D":"3D"}</div>
          </div>
        }
      </div>
    );
  }
}
