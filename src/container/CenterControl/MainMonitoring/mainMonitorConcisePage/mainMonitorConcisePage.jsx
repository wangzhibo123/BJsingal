import React , {Component} from "react";
import "./mainMonitorConcisePage.scss"
//引入视频
import Video from '../../../utils/video/video'
//引入图片
import yellow from "../../../imgs/yellow.png"
import red from "../../../imgs/red.png";
import upDownPng from "../../../imgs/03.png"
import leftRightPng from "../../../imgs/01.png"
import upLeftDownRight from "../../../imgs/04.png"
import upLeftUp from "../../../imgs/11.png"
import rightUpLeftDown from "../../../imgs/02.png"
import bascRightLeft from "../../../imgs/bascRightLeft.png"
import bascRightUpLeft from "../../../imgs/bascRightUpLeft.png"
import bascUpDown from "../../../imgs/bascUpDown.png"
import ballP from "../../../imgs/ballP.png"
import ballG from "../../../imgs/ballG.png"
import ballRY from "../../../imgs/ballRY.png"
//引入antd
import { Select, Switch, Menu } from "antd";
import { SearchOutlined, CompassOutlined } from "@ant-design/icons";
//引入axios
import axiosInstance from '../../../utils/getInterfaceData'
const { Option } =Select
export default class MainMonitorConcisePage extends Component{
    constructor(props){
        super(props)
        this.state={
            stateSelect: [
                { name: "海淀区", id: "1", children: [{ name: "西二旗", id: "1_1" }, { name: "西直门", id: "1_2" }, { name: "东直门", id: "1_3" }] },
                { name: "朝阳区", id: "2", children: [{ name: "奥林匹克", id: "2_1" }, { name: "欢乐谷", id: "2_2" }] },
                { name: "上地", id: "3", children: [{ name: "华联", id: "3_1" }, { name: "中关村", id: "3_2" }] },
                { name: "三里屯", id: "4", children: [{ name: "太里古", id: "4_1" }, { name: "乾坤大厦", id: "4_2" }] }
              ],
              lineData: [{ lnglat: [116.383, 39.90706], img: bascRightLeft }, { lnglat: [116.389, 39.90723], img: bascRightUpLeft }, { lnglat: [116.399, 39.90753], img: bascUpDown }],
              //地图默认中心点
              defaultCenterPoint: [116.396, 39.9075],
              //地图视角角度
              modeMapFlyToPitch: 60, //0 表示竖直状态视角 90表示水平状态视角
              //地图缩放倍率
              modeMapFlyToZoom: 15, //范围 0~17  17表示放大到最大 15及以上开始3D
              //切换到2D按钮
              modeMainTabTypeD: true,
              //2D到3D
              modeMainTabD: true,
              //控制多次渲染起点 终点图标
              modeMainControlMapSign: true,
              //点击中心点渲染多次处理
              clickCenterRenders: false,
              //视频
              newState: null,
              arlVideo: [{ url: "rtmp://58.200.131.2:1935/livetv/cctv13", name: "南", id: 'my_S'  }],
            };
            //视频接口
            this.videoUrl="/control-application-front/video/get/rtmp/url/400/300"
      }
      componentDidMount=()=>{
          // this.getVideoMonCarList()
      }
      getVideoMonCarList=()=>{
        axiosInstance.post(this.videoUrl,{"cameraCode": "08143150969233750102#f0dfa07ea18f4a5da535fd251bdc5569","mediaURLParam": {"broadCastType": 0,"packProtocolType": 1,"protocolType": 2,"serviceType": 1,"streamType": 1,"transMode": 0}}).then(res=>{
          this.setState({
            newState:res.data.data
          })
          console.log(res,"------res")
        })
      }
      render(){
        const {videoStateBind} =this.state;
        return (
            <div className="modeMainMonitorHome">
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
                    <div className="modeMainEWVideo">
                      <div className="modeMainEWVideoSelect">
                        {/* <div style={{height:"40px",margin:"0 17px",lineHeight:'40px',fontSize:"18px",color:"#567AC4"}}>中关村大街东</div> */}
                        <div style={{height:"40px"}}>
                          <Select defaultValue="1" size="middle">
                            <Option value="1" key="1">小街桥路口南进口球机全景</Option>
                          </Select>
                        </div>
                      </div>
                      <Video {...this.state} url={this.videoUrl}></Video> 
                      {/* { this.state.newState && <Video {...this.state} url={this.state.newState}></Video> } */}
                    </div>
                </div>
                <div className="modeMainSNMode">
                  {/* 南北走向 */}
                  <div className="modeMainSNVideo">
                  <div className="modeMainEWVideoSelect">
                  {/* <div style={{height:"40px",margin:"0 17px",lineHeight:'40px',fontSize:"18px",color:"#567AC4"}}>中关村大街东</div> */}
                    <div style={{height:"40px"}}>
                      <Select defaultValue="1" size="middle">
                        <Option value="1" key="1">通道一</Option>
                        <Option value="2" key="2">通道二</Option>
                        <Option value="3" key="3">通道三</Option>
                        <Option value="4" key="4">通道四</Option>
                      </Select>
                    </div>
                  </div>
                  <Video {...this.state}></Video> 
                  </div>
                </div>
              </div>
            </div>
            <div className="modeMainContentMode">
              <div className="modeMainMonitor"><div className="modeMainMonitorContentSink">干线监视</div>
                
              </div>
              <div className="modeMainMonitorContent">
                <div className="modeMainMonitorContentHome">

                  {/* 条状图 */}
                  <div className="modeMainMonitorContentStrip">
                    <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#02AED7,#0173C8)", borderRadius: "20px", position: "relative" }}>
                      <div style={{ width: 15, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0 }}>
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
                    <div className="modeMainMonitorContentball" style={{background: `url(${ballP}) center no-repeat`,backgroundSize:"100% 100%"}}>
                    </div>
                    <div className="modeMainMonitorContentList">
                      <div className="modeMainMonitorContentListTop">
                        <div className="autoOper">自动运行</div>
                        <div className="switch"><Switch defaultChecked onChange={this.onChange}/></div>
                        <div className="openHand">开启手动</div>
                      </div>
                      <div className="modeMainMonitorContentListBottom">
                        <div className="modeMainMonitorContentListTable">
                          <div className="modeMainMonitorContentListImg"><img src={yellow} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={red} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg" style={{ background: "#000E35" }}><img src={upDownPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upLeftUp} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 条状图 */}
                  <div className="modeMainMonitorContentStripTwo" style={{ position: "absolute", top: "202px", left: "calc(190px * 1)" }}>
                    <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                      <div style={{ width: 15, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0 }}>
                      </div>
                    </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{ position: "absolute", top: "0px", left: "calc(155px + 185px * 1)" }}>
                    <div className="modeMainMonitorContentCross">
                      <div className="modeMainMonitorContentCrossText">
                        中关村大街
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball" style={{background: `url(${ballG}) center no-repeat`,backgroundSize:"100% 100%"}}>

                    </div>
                    <div className="modeMainMonitorContentList">
                      <div className="modeMainMonitorContentListTop">
                        <div className="autoOper">自动运行</div>
                        <div className="switch"><Switch defaultChecked onChange={this.onChange} /></div>
                        <div className="openHand">开启手动</div>
                      </div>
                      <div className="modeMainMonitorContentListBottom">
                        <div className="modeMainMonitorContentListTable">
                          <div className="modeMainMonitorContentListImg"><img src={yellow} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={red} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg" style={{ background: "#000E35" }}><img src={upLeftUp} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 条状图 */}
                  <div className="modeMainMonitorContentStripTwo" style={{ position: "absolute", top: "202px", left: "calc((190px - 2px) * 2)" }}>
                    <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#810CC9,#422AD3)", borderRadius: "20px", position: "relative" }}>
                      <div style={{ width: 15, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0 }}>
                      </div>
                    </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{ position: "absolute", top: "0px", left: "calc(155px + 185px * 2)" }}>
                    <div className="modeMainMonitorContentCross">
                      <div className="modeMainMonitorContentCrossText">
                        中关村东路
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball" style={{background: `url(${ballRY}) center no-repeat`,backgroundSize:"100% 100%"}}>

                    </div>
                    <div className="modeMainMonitorContentList">
                      <div className="modeMainMonitorContentListTop">
                        <div className="autoOper">自动运行</div>
                        <div className="switch"><Switch defaultChecked onChange={this.onChange}/></div>
                        <div className="openHand">开启手动</div>
                      </div>
                      <div className="modeMainMonitorContentListBottom">
                        <div className="modeMainMonitorContentListTable">
                          <div className="modeMainMonitorContentListImg"><img src={yellow} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={red} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg" style={{ background: "#000E35" }}><img src={upLeftUp} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 条状图 */}
                  <div className="modeMainMonitorContentStripTwo" style={{ position: "absolute", top: "202px", left: "calc((190px - 3px) * 3)" }}>
                    <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                      <div style={{ width: 15, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0 }}>
                      </div>
                    </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{ position: "absolute", top: "0px", left: "calc(155px + 185px * 3)" }}>
                    <div className="modeMainMonitorContentCross">
                      <div className="modeMainMonitorContentCrossText">
                        学知桥
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball" style={{background: `url(${ballP}) center no-repeat`,backgroundSize:"100% 100%"}}>

                    </div>
                    <div className="modeMainMonitorContentList">
                      <div className="modeMainMonitorContentListTop">
                        <div className="autoOper">自动运行</div>
                        <div className="switch"><Switch defaultChecked onChange={this.onChange}/></div>
                        <div className="openHand">开启手动</div>
                      </div>
                      <div className="modeMainMonitorContentListBottom">
                        <div className="modeMainMonitorContentListTable">
                          <div className="modeMainMonitorContentListImg"><img src={yellow} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={red} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg" style={{ background: "#000E35" }}><img src={upLeftUp} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 条状图 */}
                  <div className="modeMainMonitorContentStripTwo" style={{ position: "absolute", top: "202px", left: "calc((190px - 4px) * 4)" }}>
                    <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#850BC7,#4228D4)", borderRadius: "20px", position: "relative" }}>
                      <div style={{ width: 15, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0 }}>
                      </div>
                    </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{ position: "absolute", top: "0px", left: "calc(155px + 185px * 4)" }}>
                    <div className="modeMainMonitorContentCross">
                      <div className="modeMainMonitorContentCrossText">
                        花园东路
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball" style={{background: `url(${ballG}) center no-repeat`,backgroundSize:"100% 100%"}}>

                    </div>
                    <div className="modeMainMonitorContentList">
                      <div className="modeMainMonitorContentListTop">
                        <div className="autoOper">自动运行</div>
                        <div className="switch"><Switch defaultChecked onChange={this.onChange}/></div>
                        <div className="openHand">开启手动</div>
                      </div>
                      <div className="modeMainMonitorContentListBottom">
                        <div className="modeMainMonitorContentListTable">
                          <div className="modeMainMonitorContentListImg"><img src={yellow} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={red} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg" style={{ background: "#000E35" }}><img src={upLeftUp} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 条状图 */}
                  <div className="modeMainMonitorContentStripTwo" style={{ position: "absolute", top: "202px", left: "calc((190px - 4px) * 5)" }}>
                    <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#0163DA,#0147CB)", borderRadius: "20px", position: "relative" }}>
                      <div style={{ width: 15, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0 }}>
                      </div>
                    </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{ position: "absolute", top: "0px", left: "calc(155px + 185px * 5)" }}>
                    <div className="modeMainMonitorContentCross">
                      <div className="modeMainMonitorContentCrossText">
                        健翔桥
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball" style={{background: `url(${ballG}) center no-repeat`,backgroundSize:"100% 100%"}}>
                    </div>
                    <div className="modeMainMonitorContentList">
                      <div className="modeMainMonitorContentListTop">
                        <div className="autoOper">自动运行</div>
                        <div className="switch"><Switch defaultChecked onChange={this.onChange}/></div>
                        <div className="openHand">开启手动</div>
                      </div>
                      <div className="modeMainMonitorContentListBottom">
                        <div className="modeMainMonitorContentListTable">
                          <div className="modeMainMonitorContentListImg"><img src={yellow} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={red} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg" style={{ background: "#000E35" }}><img src={upLeftUp} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 条状图 */}
                  <div className="modeMainMonitorContentStripTwo" style={{ position: "absolute", top: "202px", left: "calc((190px - 4px) * 6)" }}>
                    <div style={{ width: 150, height: 18, background: "linear-gradient(to top,#02AED7,#0173C8)", borderRadius: "20px", position: "relative" }}>
                      <div style={{ width: 15, height: 18, borderRadius: "50%", background: "rgba(67,176,220,.66)", position: "absolute", right: "0", top: 0 }}>
                      </div>
                    </div>
                  </div>
                  {/* 球形+内容 */}
                  <div className="modeMainMonitorContentLineTwo" style={{ position: "absolute", top: "0px", left: "calc(155px + 185px * 6)" }}>
                    <div className="modeMainMonitorContentCross">
                      <div className="modeMainMonitorContentCrossText">
                        西直门
                        </div>
                    </div>
                    <div className="modeMainMonitorContentball" style={{background: `url(${ballP}) center no-repeat`,backgroundSize:"100% 100%"}}>

                    </div>
                    <div className="modeMainMonitorContentList">
                      <div className="modeMainMonitorContentListTop">
                        <div className="autoOper">自动运行</div>
                        <div className="switch"><Switch defaultChecked onChange={this.onChange}/></div>
                        <div className="openHand">开启手动</div>
                      </div>
                      <div className="modeMainMonitorContentListBottom">
                        <div className="modeMainMonitorContentListTable">
                          <div className="modeMainMonitorContentListImg"><img src={yellow} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={red} alt="" /></div>
                          <div className="modeMainMonitorContentListImg"><img src={leftRightPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upDownPng} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={upLeftDownRight} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg" style={{ background: "#000E35" }}><img src={upLeftUp} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                          <div className="modeMainMonitorContentListImg"><img src={rightUpLeftDown} alt="" /></div>
                          <div className="modeMainMonitorContentListNum"><div className="contentListNum">44</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
    
}