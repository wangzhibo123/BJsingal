import React , {Component} from "react"
import "./VideoApp.scss"
import $ from "jquery"



//引入antd
import { Select, Menu } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
//引用axios
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
              intersectioNodes:[{latitude:116.38151572176511,longitude:39.90708534816005},{latitude:116.38151572176511,longitude:39.90708534816005},{latitude:116.38151572176511,longitude:39.90708534816005}]
        };
            //接口
            this.videoState="/control-application-front/video/getLiveUrl/123";
    }
    componentDidMount () {
    }
   
    render () {
        const {  modeMapShow } = this.state;
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

              </div>
              
            </div >
          );
    }    
}