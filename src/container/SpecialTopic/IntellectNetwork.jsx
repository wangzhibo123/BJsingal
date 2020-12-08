import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select, message } from 'antd'
import {
  SearchOutlined, DoubleLeftOutlined, DoubleRightOutlined, CaretUpOutlined, CaretDownOutlined, LeftCircleOutlined,
  RightCircleOutlined, UpCircleOutlined, DownCircleOutlined, CloseOutlined, EnvironmentOutlined,
} from '@ant-design/icons'
import './Region.scss'
import { getStartControl } from '../../reduxs/action/interConfig'
import axiosInstance from '../utils/getInterfaceData'
import DirectionPie from '../../components/DirectionPie/DirectionPie'
import cneter from '../imgs/iconM.png'
import hand from '../imgs/iconH.png'
import allred from '../imgs/iconR.png'
import yellow from '../imgs/IconY.png'
import $ from 'jquery'
import '../utils/updatePhase/jqueryPhaseSvg' 
import Websocket from 'react-websocket'
const { Option } = Select
class IntellectNetwork extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stageList: null,
      stageIndexs: 0,
      timeNum: 30,
      modeIndex: null,
      resetFlag: null,
      statusControlData: null,
      isResetStage: true,
      timeMinutesIndex: null,
      modeTimeFlag: null,
      realTimeStatus: [{"SIGNAL_SYSTEM_CODE":4,"UNNORMALSIZE":239,"CODE_NAME":"海信","NORMALSIZE":0},{"SIGNAL_SYSTEM_CODE":3,"UNNORMALSIZE":100,"CODE_NAME":"中控","NORMALSIZE":4}],
    }
    this.defaultStageList = []
    // this.interId = this.props.match.params.id
    this.interId = 1000084
    this.modeUrl = `/control-application-front/unitMontitor/getControlModeById?unit_id=${this.interId}`
    this.timeMinutes = ['5分钟', '15分钟', '30分钟', '不限制', '自定义']
    this.controlItems = [
      { text: '全红控制', img: allred, id: 'allred' },
      { text: '闪黄控制', img: yellow, id: 'yellow' },
      { text: '中心控制', img: cneter, id: 'center' },
      { text: '中心手控', img: hand, id: 'hand' },
    ]
    this.controlParams = {
      "centerId": "center001",
      "cmd": "Start",
      "crossIds": "10001",
      "dataMap": {"CrossID": "10001", "StageNo": "1"},
      "serverId": "node-001",
      "typeName": "CrossStage"
    }
  }
  componentDidMount = () => {
    // this.getControlMode()
    this.timeCountdown(this.state.timeNum)
    this.phaseInit()
  }
  componentDidUpdate = (preveState) => {
    const { startControl } = this.props.data
    if (preveState.data.startControl !== startControl) {
      this.startControlMessage(startControl)
    }
  }
  // 执行结果提示
  startControlMessage = (data) => {
    message.info(data.detail)
  }
  timeCountdown = (timeNum) => {
    setTimeout( () => {
      timeNum--
      this.setState({
        timeNum
      },() => {
        if (this.state.timeNum !== 0) {
          this.timeCountdown(this.state.timeNum)
        } else {
          this.setState({
            timeNum: 30
          }, () => {
            this.timeCountdown(this.state.timeNum)
          })
        }
      })
    },1000)
  }
  phaseInit = () => {
    window.cd_data = {
      inter_id: null,
      phase_plan_id: null,
      phase_status: null,
      phase_name: null,
      time: null,
      remain: 0,
      url: null
    }
    // 请求接口成功后
    let res = {"success":true,"data":{"total":5,"map":{"road":{"x":0,"y":0,"width":200,"height":180,"path":"M120.00,0.00 L120.00,43.33 Q120.00,70.00 146.67,70.00 L200.00,70.00 L200.00,110.00 L143.33,110.00 Q120.00,110.00 120.00,133.33 L120.00,180.00 L80.00,180.00 L80.00,136.67 Q80.00,110.00 53.33,110.00 L0.00,110.00 L0.00,70.00 L56.67,70.00 Q80.00,70.00 80.00,46.67 L80.00,0.00 L120.00,0.00"},"turn_desc":{"x":0,"y":180,"width":200,"height":30,"title":["南左转;南、南直行","南、南、北、北直行","北、北左转;北、北直行","东左转;东直行","西、西左转;西直行"],"path":[["M110.00,170.00 L110.00,124.00 Q100.00,90.00 66.00,80.00 L20.00,80.00","M110.00,170.00 C110.00,100.00 110.00,80.00 110.00,53.33 L110.00,20.00","M110.00,170.00 C110.00,100.00 110.00,80.00 110.00,53.33 L110.00,20.00"],["M90.00,10.00 C90.00,80.00 90.00,100.00 90.00,126.67 L90.00,160.00","M110.00,170.00 C110.00,100.00 110.00,80.00 110.00,53.33 L110.00,20.00","M110.00,170.00 C110.00,100.00 110.00,80.00 110.00,53.33 L110.00,20.00","M90.00,10.00 C90.00,80.00 90.00,100.00 90.00,126.67 L90.00,160.00"],["M90.00,10.00 L90.00,56.00 Q100.00,90.00 134.00,100.00 L180.00,100.00","M90.00,10.00 L90.00,56.00 Q100.00,90.00 134.00,100.00 L180.00,100.00","M90.00,10.00 C90.00,80.00 90.00,100.00 90.00,126.67 L90.00,160.00","M90.00,10.00 C90.00,80.00 90.00,100.00 90.00,126.67 L90.00,160.00"],["M190.00,80.00 L134.00,80.00 Q100.00,90.00 90.00,124.00 L90.00,160.00","M190.00,80.00 C110.00,80.00 90.00,80.00 66.67,80.00 L20.00,80.00"],["M10.00,100.00 L66.00,100.00 Q100.00,90.00 110.00,56.00 L110.00,20.00","M10.00,100.00 L66.00,100.00 Q100.00,90.00 110.00,56.00 L110.00,20.00","M10.00,100.00 C90.00,100.00 110.00,100.00 133.33,100.00 L180.00,100.00"]],"phase_name":["A","B","C","D","E"],"phase_current":[1554113260,1554113260,1554113260,1554113260,1554113260],"phase_status":["green","red","red","red","red"],"phase_remaining":[0,0,0,0,0]},"old_info":{"x":200,"y":0,"width":30,"height":180}},"name":"世纪公园二横路与世纪公园中路路口","inter_id":"11LAV063MH0","phase_plan_id":"1"}};
    window.map_data = res;
    if(res.success){
      window.cd_data.inter_id = res.data.inter_id;
      window.cd_data.phase_plan_id = res.data.phase_plan_id;
        // jQuery调用方式
        $("#PhaseSvg").jqueryPhaseSvg({
            dataSourse:res,
            url:'',//需要实时数据时请求的接口
            // 以下为可选填
            svgFont:{"fontFill":"#708090","fontStroke":"black","fontSize":"18px","fontWeight":"bold"},//字体样式
            signalColor: { "red": "#FF4500", "green": "#00FF00", "yellow": "#F1C40F" },//箭头和线的颜色
            svgBox:{"svgSize":210,"svgBg":"transparent","bgFill":"transparent","bgStroke":"white"},//svg盒子大小、背景色、路口填充色、路口边框色
            viewBox:"0 0 210 210",//svg 盒子的尺寸
        });
    }
  }
  handleModifyConf = () => {
    this.setState({
      isModify: true,
      modifyStage: true,
      modeIndex: 0,
    })
  }
  handleCancelModify = () => {
    this.setState({
      isModify: false,
      modifyStage: false,
      modeIndex: null,
    })
  }
  handleControlMode = (indexs, id) => {
    this.setState({ modeIndex: indexs, resetFlag: null })
    const controlParams = JSON.parse(JSON.stringify(this.controlParams))
    switch(id){
      case 'allred':
        console.log(controlParams,'allred')
        break;
      case 'yellow':
        controlParams.centerId = 2
        console.log(controlParams,'yellow')
        break;
      case 'center':
        controlParams.centerId = 3
        console.log(controlParams,'center')
        break;
        case 'hand':
          controlParams.centerId = 4
          console.log(controlParams,'hand')
        break;
    }
    this.nowControlParams = controlParams

  }
  // // 获取实时状态控制模式
  // getControlMode = () => {
  //   axiosInstance.post(this.modeUrl).then((res) => {
  //     const { code, list } = res.data
  //     if (code === '1' && list.stage_id.length) {
  //       const stageIds = list.stage_id.split(',')
  //       const stageTimes = list.stage_time.split(',')
  //       const imgs = list.stage_image.split(',')
  //       stageIds.forEach((item, index) => {
  //         const obj = { stageId: item, stageTime: stageTimes[index], modifyTime: stageTimes[index], stageImg: imgs[index] }
  //         this.defaultStageList.push(obj)
  //       })
  //       this.setState({
  //         statusControlData: list,
  //         stageList: this.defaultStageList,
  //         isResetStage: true,
  //       })
  //     }
  //   })
  // }
  // 修改阶段时间
  handleModifyStageTime = (type, indexs, e) => {
    e.stopPropagation()
    const stageListOld = JSON.parse(JSON.stringify(this.defaultStageList))
    const defaultTime = parseInt(this.defaultStageList[indexs].modifyTime)
    this.defaultStageList[indexs].modifyTime = type === 'add' ? defaultTime + 1 : defaultTime - 1
    this.setState({ stageList: this.defaultStageList, stageListOld, isResetStage: false, resetFlag: null })
    console.log(this.state.stageListOld)
  }
  // 取消
  handleCancelStage  = () => {
    this.setState({
      modeIndex: null,
      isResetStage: true,
    })
    this.defaultStageList = JSON.parse(JSON.stringify(this.state.stageListOld))
  }    
  // 执行
  handleRunStage  = () => {
    this.setState({
      resetFlag: true
    })
    if (this.state.modeIndex === 2) {
      this.setState({
        modeTimeFlag: true
      })
    }
    this.props.getStartControl(this.nowControlParams)
  }    
  // 步进
  handleStepStage  = (stageIndexs) => {
    const stageList = JSON.parse(JSON.stringify(this.state.stageList))
    let nowIndex = null
    stageList.map((item, i) => {
      if (stageIndexs == item.stageId){
        stageList[i+1] ? this.setState({ stageIndexs: stageList[i+1].stageId }) : this.setState({ stageIndexs: stageList[0].stageId })
      }
    })
    
  }   
  // 锁定
  handleLockedStage  = () => {
    console.log('锁定')
    const goControlParams = JSON.parse(JSON.stringify(this.nowControlParams))
    goControlParams.centerId = 'lockedId'
    this.props.getStartControl(goControlParams)    
  }   
  // 复位
  handleResetStage = () => {
    this.defaultStageList.forEach(item => item.modifyTime = item.stageTime)
    this.setState({ isResetStage: true, modeIndex: null, resetFlag: null })
  }
  // 选时间
  timeGetItem = (e, timeMinutesIndex) => {
    e.stopPropagation()
    this.setState({ timeMinutesIndex })
    switch(timeMinutesIndex){
      case 0:
        console.log('选择的是5分钟');
        break;
      case 1:
          console.log('选择的是15分钟');
        break;
      case 2:
        console.log('选择的是30分钟');
        break;
      case 3:
        console.log('选择的是不限制');
        break;
      case 4:

        console.log('选择的是自定义');
        break;
    }
  }
    // 是否执行
    goImplement = (e, flag) => {
      e.stopPropagation()
      if (flag){
        this.setState({
          modeTimeFlag: !flag
        })
        console.log('确认执行')
        const goControlParams = JSON.parse(JSON.stringify(this.nowControlParams))
        goControlParams.centerId = 'rightId'
        this.props.getStartControl(goControlParams)
      } else {
        this.setState({
          modeTimeFlag:flag
        })
        console.log('取消执行')
  
      }
    }
  handleCheckStage = (indexs) => {
    this.setState({ stageIndexs: indexs })
  }
  // webSocketData 获取实时状态控制模式
  webSocketData = (e) => {
    let result = JSON.parse(e);
    console.log(result)
    this.defaultStageList = []
    result.stageTimeS.forEach((item, index) => {
      const obj = { stageId: item.stage_id, stageTime: item.stage_time, modifyTime: item.stage_time, stageImg: item.stage_image }
      this.defaultStageList.push(obj)
    })
    console.log(this.defaultStageList)
    this.setState({
      statusControlData: result,
      stageList: this.defaultStageList,
      isResetStage: true,
      stageIndexs: result.stage_code,
    })
  }
  render() {
    const { stageList, stageIndexs, statusControlData, modeIndex, resetFlag, isResetStage, timeNum, timeMinutesIndex, modeTimeFlag } = this.state
    const globalImgurl = localStorage.getItem('ImgUrl')
    return (
      <div className='WrapperContent'>
        { modeIndex !== null || !isResetStage ? null : <Websocket
          url={`ws://192.168.1.22:20194/engine-monitor/webSocket/1000084`} onMessage={this.webSocketData.bind(this)} />
        }
        <div className='specialTopicBox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
          { resetFlag && modeIndex === 2 && modeTimeFlag ? <div className="MaskBox"></div> : null}
          <div className="controlExecute">
            <div className="controlMsg">
              <span className="controlItems">网络状态：<span className="itemsVal">{statusControlData && statusControlData.alarm_state_txt}</span></span>
              <span className="controlItems">控制模式：<span className="itemsVal">{statusControlData && statusControlData.manual_control_state_txt}</span></span>
              {/* <span className="controlItems">是否锁定：<span className="itemsVal">未锁</span></span> */}
              <span className="controlItems">方案号：<span className="itemsVal">{statusControlData && statusControlData.plan_id}</span></span>
              <span className="controlItems">周期：<span className="itemsVal">{statusControlData && statusControlData.cycle_run_time}</span></span>
            </div>
              {
                modeIndex !== null || !isResetStage ? 
                <div className="modifyBox">
                  { !resetFlag ? <div className="modifyBtn modify" onClick={this.handleCancelStage}>取消</div> : null }
                  { !resetFlag ? <div className="modifyBtn modify" onClick={this.handleRunStage}>执行</div> : null }
                  { resetFlag && modeIndex === 3 ? <div className="modifyBtn modify" onClick={() => this.handleStepStage(stageIndexs)}>步进</div> : null }
                  { resetFlag && modeIndex === 3 ? <div className="modifyBtn modify" onClick={this.handleLockedStage}>锁定</div> : null }
                  { resetFlag ? <div className="modifyBtn modify" onClick={this.handleResetStage}>复位
                  { modeIndex === 2 && modeTimeFlag ?
                      <div className="timePopBox" onClick={(e) => { e.stopPropagation()}}>
                          <dl>
                            <dt>请选择方案运行时间</dt>
                            <dd>
                              {
                                this.timeMinutes.map((item, index) => {
                                  return <em className={`${timeMinutesIndex === index ? 'emCurrent' : ''}`} onClick={(e) => this.timeGetItem(e, index)}>{item}</em>
                                })
                              }
                              { timeMinutesIndex === 4 ? <i><input type="number" className="inputBox" placeholder="请输入" />分钟</i> : null }
                            </dd>
                            <dd>
                              <span onClick={(e) => this.goImplement(e, null)}>取消</span>
                              <span onClick={(e) => this.goImplement(e, true)}>确认执行</span>              
                            </dd>
                          </dl>
                        </div> : null }
                  </div> : null }
                </div> : null
              }
            <div className="controlMode">
              <div className="modeItems">
                {
                  this.controlItems.map((item, index) => {
                    return (
                      <div className={`controlItem ${modeIndex === index && 'itemHover'}`} key={item.text} onClick={() => this.handleControlMode(index, item.id)}>
                        <div className="icon"><img src={item.img} alt="" /></div>
                        <div className="text">{item.text}</div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="controlDetails">
                {
                  stageList &&
                  stageList.map((item, index) => {
                    return (
                      <div className={`phaseTime ${stageIndexs == item.stageId ? 'phaseActive' : ''}`} key={'stateList' + item.stageId} onClick={() => { this.handleCheckStage(item.stageId) }}>
                        <div className="phaseinner"><img src={globalImgurl + item.stageImg} alt="" /></div>
                        <div className="phaseinner times">
                          <span>{isResetStage ? item.stageTime : item.modifyTime}</span>
                          { modeIndex !== 3 ?
                            <div className="caculate">
                              <CaretUpOutlined className="add" onClick={(e) => { this.handleModifyStageTime('add', index, e) }} />
                              <CaretDownOutlined className="subtract" onClick={(e) => { this.handleModifyStageTime('subtract', index, e) }} />
                            </div> : null
                            }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="interRoadBoxBg">
            <em><i>{timeNum}s</i></em>
            <div className="leftInterRoadBox">
              <div className="roadInterName">
                <h5>张志忠路与交通路南大街路口</h5>
                <h6><span>通讯状态：在线</span><span>信号灯状态：开灯</span><span>运行状态：信号系统自主控制</span></h6>
              </div>
              <div className="interSearch">
                <Select defaultValue="1">
                  <Option key="1" value="1">北京市</Option>
                </Select>
                <span className="searchInput">
                  <input type="text" className="inputBox" placeholder="查询..." />
                  <SearchOutlined className="searchIcon" />
                </span>
              </div>
              <div className='PhaseSvgBox'>
                <div id="PhaseSvg" />
              </div>
            </div>
            <div className="rightStageBox">
              <h4>相位需求</h4>
              <div className='itemStageBox'>
                <dl>
                  <dd>
                    <img src={require('../imgs/05.png')} />
                    <span>西向东直行 <br />需求数量：35辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/06.png')} />
                    <span>东向西直行 <br />需求数量：27辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/07.png')} />
                    <span>南向北直行 <br />需求数量：35辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/08.png')} />
                    <span>北向南直行 <br />需求数量：27辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/05.png')} />
                    <span>西向东直行 <br />需求数量：35辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/06.png')} />
                    <span>东向西直行 <br />需求数量：27辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/07.png')} />
                    <span>南向北直行 <br />需求数量：35辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/08.png')} />
                    <span>北向南直行 <br />需求数量：27辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/05.png')} />
                    <span>西向东直行 <br />需求数量：35辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/06.png')} />
                    <span>东向西直行 <br />需求数量：27辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/07.png')} />
                    <span>南向北直行 <br />需求数量：35辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/08.png')} />
                    <span>北向南直行 <br />需求数量：27辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/05.png')} />
                    <span>西向东直行 <br />需求数量：35辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/06.png')} />
                    <span>东向西直行 <br />需求数量：27辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/07.png')} />
                    <span>南向北直行 <br />需求数量：35辆</span>
                  </dd>
                  <dd>
                    <img src={require('../imgs/08.png')} />
                    <span>北向南直行 <br />需求数量：27辆</span>
                  </dd>                  
                </dl>
              </div>
              <h4>需求占比</h4>
              <div className='itemPieBox'>
                {
                  this.state.realTimeStatus &&
                  <DirectionPie chartsDatas={this.state.realTimeStatus} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.interConfig,
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getStartControl: bindActionCreators(getStartControl, dispatch),
  }
}
export default connect(mapStateToProps, mapDisPatchToProps)(IntellectNetwork)