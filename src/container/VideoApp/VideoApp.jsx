import React , {Component} from "react"
import "./VideoApp.scss"
import moment from 'moment'
import $ from "jquery"
import Video from "../utils/video/video"
//引入图片
import share from "../imgs/share.png" //分享
import transcribe from "../imgs/transcribe.png" //录制
import playback from "../imgs/playback.png" //回放
import derive from "../imgs/derive.png" //导出
import rotateBtn from "../imgs/rotateBtn.png"
//引入antd
import { Select, Menu , DatePicker ,Slider} from "antd";
import { EditOutlined, SearchOutlined ,CloseOutlined, MinusOutlined, PlusOutlined,BackwardOutlined,CaretLeftOutlined,PauseOutlined,CaretRightOutlined,ForwardOutlined,StepBackwardOutlined,StepForwardOutlined} from "@ant-design/icons";
//引用axios
import axiosInstance from "../utils/getInterfaceData"
const { Option } = Select;
const { SubMenu } = Menu;
export default class VideoApp extends Component{
    constructor(props){
        super(props)
        this.state={
            stateSelect: [
                { name: "海淀区", id: "1", children: [{ name: "西二旗", id: "1_1" }, { name: "西直门", id: "1_2" }, { name: "东直门", id: "1_3" }] },
                { name: "朝阳区", id: "2", children: [{ name: "奥林匹克", id: "2_1" }, { name: "欢乐谷", id: "2_2" }] },
                { name: "上地", id: "3", children: [{ name: "华联", id: "3_1" }, { name: "中关村", id: "3_2" }] },
                { name: "三里屯", id: "4", children: [{ name: "太里古", id: "4_1" }, { name: "乾坤大厦", id: "4_2" }] }
              ],
            videoCameraState:[
              {name:"知春路与罗庄东路",url: "rtmp://58.200.131.2:1935/livetv/cctv13", id: 'my_S1'},{name:"汉源宾馆",url: "rtmp://58.200.131.2:1935/livetv/cctv2", id: 'my_S2'},{name:"汉源宾馆",url: "rtmp://58.200.131.2:1935/livetv/cctv13", id: 'my_S3'},{name:"汉源宾馆",url: "rtmp://58.200.131.2:1935/livetv/cctv2", id: 'my_S4'},{name:"汉源宾馆",url: "rtmp://58.200.131.2:1935/livetv/cctv13", id: 'my_S5'},{name:"汉源宾馆",url: "rtmp://58.200.131.2:1935/livetv/cctv13", id: 'my_S6'},{name:"汉源宾馆",url: "rtmp://58.200.131.2:1935/livetv/cctv13", id: 'my_S7'},{name:"汉源宾馆",url: "rtmp://58.200.131.2:1935/livetv/cctv2", id: 'my_S8'},{name:"汉源宾馆",url: "rtmp://58.200.131.2:1935/livetv/cctv13", id: 'my_S9'}
            ],
              //展示开关  
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
              //摄像头放大值
              inputValue: 1,
        };
    }
    onChange = value => {
      this.setState({
        inputValue: value,
      });
    };
    componentDidMount () {
      
    }
    relief=()=>{
      // console.log(1111)
    }
    gagarin=()=>{
      // console.log(2222)
    }
    render () {
        const {  modeMapShow ,videoCameraState ,inputValue} = this.state;
        return (
            <div className="videoApp">
                <div className="mainVideoTop">
                    <div className="mainVideoTopBg"></div>
                    <div className="mainVideoTopTit">视频监控</div>
                </div> 
              {
                //左侧导航页面渲染
                 <div className="NavMon">
                  <div className="topNavMon">
                    <div className="topNavMonTitle">北京市公安局交通管理局</div>
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
              <div className="videoAppMon">
                  {/* 日历 */}
                  <div className="videoAppMonTopChunk">
                    <div className="videoAppMonTopChunkO" style={{cursor:'pointer'}}>
                       <div><img src={share} alt=""/></div>
                        <div style={{marginLeft:"5px",lineHeight:'40px'}}>共享</div>
                    </div>
                    <div className="videoAppMonTopChunkT">
                        <div><img src={transcribe} alt=""  style={{cursor:'pointer'}}/></div>
                          <div style={{marginLeft:"5px",lineHeight:'44px',cursor:'pointer'}}>录制</div>
                          <div className="videoAppMonTopChunkTPicker">
                          <DatePicker
                            indicatorname="nihao"
                            style={{ minWidth: '150px' }}
                            showTime
                            format="YYYY-MM-DD HH:mm"
                            defaultValue={moment('2020-07-11 00:00')}
                            // onChange={(options, value) => { this.handleTimeChange(options, value, msgName, 'init_start_date') }}
                          />
                        </div>
                    </div>
                    <div  className="videoAppMonTopChunkTR">
                        <div><img src={playback} alt="" style={{cursor:'pointer'}}/></div>
                        <div style={{marginLeft:"5px",lineHeight:'44px',cursor:'pointer'}}>回放 </div>
                        <div className="videoAppMonTopChunkTRPicker">
                        <DatePicker
                            indicatorname="nihao"
                            style={{ minWidth: '150px' }}
                            showTime
                            format="YYYY-MM-DD HH:mm"
                            defaultValue={moment('2020-12-1 19:56')}
                            // onChange={(options, value) => { this.handleTimeChange(options, value, msgName, 'init_start_date') }}
                          /> <span style={{textAlign:"center",marginLeft:"4px"}}>—</span>
                           <DatePicker
                          indicatorname="nihao"
                          style={{ minWidth: '150px' }}
                          showTime
                          format="YYYY-MM-DD HH:mm"
                          defaultValue={moment('2020-12-1 19:56')}
                          // onChange={(options, value) => { this.handleTimeChange(options, value, msgName, 'init_start_date') }}
                        />
                        </div>
                    </div>
                    <div  className="videoAppMonTopChunkF">
                        <div><img src={derive} alt=""  style={{cursor:'pointer'}}/></div>
                        <div style={{marginLeft:"5px",lineHeight:'44px',cursor:'pointer'}}>导出</div>
                    </div>
                  </div>
                  {/* 摄像头 */}
                  <div className="videoAppMonCameraChunk">
                    {
                      videoCameraState.map((item,index)=>{
                        return <div style={{width:"449px",height:"260px",border:"1px solid",border:"1px solid #214C87",borderRadius:"6px",margin:"20px",position:"relative"}}  key={index}>
                            <div style={{height:"35px",width:"100%",display:'flex'}}>
                              <div style={{color:"#5D81CC",fontSize:"17px",margin:"0 17px",lineHeight:"35px",height:"35px"}}>{item.name}</div>
                              <div style={{marginTop:"2px"}}>
                                  <Select defaultValue="通道一" size="smiall" style={{ width: 135, height: 35 }}>
                                      <Option value={index} style={{ width: 135, height: 35 }}>{item.name}</Option>
                                  </Select>
                              </div>
                            </div>
                            <div style={{width:"100%",height:"calc(100% - 35px)",marginTop:"2px"}}>
                              <Video width="420px" height="187px" arlVideo={[{url:item.url,id:item.id}]}/>
                              <div style={{display:"flex",height:"35px",lineHeight:"35px"}}>
                                <div style={{display:'flex',height:"35px"}}>
                                    <div onClick={this.relief} style={{marginLeft:"15px",cursor:"pointer"}}><MinusOutlined /></div>
                                    <div style={{width:"73px",marginLeft:"5px"}}><Slider defaultValue={30}/></div>
                                    <div onClick={this.gagarin} style={{marginLeft:"5px",cursor:"pointer"}}><PlusOutlined /></div>
                                </div>
                                <div style={{display:"flex",marginLeft:"20px",fontSize:"17px",height:"35px"}}>
                                    <div style={{marginLeft:"15px",cursor:"pointer"}}><BackwardOutlined /></div>
                                    <div style={{marginLeft:"15px",cursor:"pointer"}}><StepBackwardOutlined /></div>
                                    <div style={{marginLeft:"15px",cursor:"pointer"}}><PauseOutlined /></div>
                                    <div style={{marginLeft:"15px",cursor:"pointer"}}><StepForwardOutlined /></div>
                                    <div style={{marginLeft:"15px",cursor:"pointer"}}><ForwardOutlined /></div>
                                </div>
                              </div>
                            </div>
                            <div style={{position:"absolute",right:"5px",bottom:"5px",cursor:"pointer"}}><img src={rotateBtn} alt=""/></div>
                        </div>
                      })
                    }
                    
                  </div>
                  {/* 日期 */}
                  <div className="videoAppMonDateChunk" style={{position:"relative"}}>
                      <div style={{position:"absolute",right:"200px",top:"25px"}}>2020年12月3日</div>
                      <div style={{position:"absolute",right:"136px",top:"25px"}}>星期四</div>
                      <div style={{position:"absolute",right:"50px",top:"25px"}}>20:29:21</div>
                  </div>
              </div>
              
            </div >
          );
    }    
}