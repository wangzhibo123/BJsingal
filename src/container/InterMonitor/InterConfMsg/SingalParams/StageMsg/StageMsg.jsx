import React, { Component } from 'react'
import { Select, Modal, message } from 'antd'
import axiosInstance from "../../../../utils/getInterfaceData"
const { Option } = Select
class StageMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interInfoList: null,  //字典数据
      interStageList: null,   //列表数据
      interMoveList: null,  //空
      interDirDisplay:false,
      interPhaseList: null,
      stageDatas: null
    }
    this.interId = this.props.interId
    this.dirInfoList="/control-application-front/basic/info/listCodeByCodeType" //字典
    this.codeByUiType=`/control-application-front/basic/info/listUiCodeByUiType` //查询指定图元类型的图元集合
    this.listPhaseInfo=`/control-application-front/signal/config/phase/listPhaseInfo?unitId=${this.interId}` //查询相位信息列表
    this.dirPhaseList="/control-application-front/signal/config/stage/listStageInfo"  //查询阶段信息列表
    this.dirPhaseDel="/control-application-front/signal/config/stage/removeStageInfo" //删除阶段信息
    this.dirPhaseAdd="/control-application-front/signal/config/stage/saveStageInfo" //保存阶段信息
  }
  componentDidMount = () => {
    this.getInterDirInfoList(6)
    this.getInterDirPhaseList(this.interId)
    this.getListPhaseInfo()
    this.getCodeByUiType()
  }
  // 关联相位列表
  getListPhaseInfo=()=>{
    axiosInstance.get(this.listPhaseInfo).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({ interPhaseList: data })
      }
    })
  }
  returnPhasenolistImg = (phasenolist) => {
    const phasenolistArr = phasenolist && phasenolist.split(",")
    const phaseImgArr = []
    const { interPhaseList } = this.state
    phasenolistArr && phasenolistArr.map((item, i) => {
      interPhaseList && interPhaseList.map((items) => {
        if(item == items.id){
          phaseImgArr.push(items.phase_image)
        }
      }) 
    })
    return phaseImgArr
  }
  // code取阶段图示
  getCodeByUiType = () => {
    axiosInstance.post(`${this.codeByUiType}`,[11]).then((res) => {
      const { code, data} = res.data
      if (code === 200) {
        this.setState({
          stageDatas: data["11"]
        })
      }
    })
  }
  getInterDirInfoList=(type)=>{
    axiosInstance.get(`${this.dirInfoList}?codeType=${type}`).then((res) => {
      // console.log(res,"字典")
      const { code , data} = res.data
      if (code === 200 && data) {
        const stateName = type === 6 ? 'interInfoList' : 'interMoveList'
        this.setState({ [stateName]: data })
      }
    })
  }
  // 编辑文本修改
  handleInputSaveNo = (e,name) => {
    this.saveParams[name] = e.target.value
  }
  // 编辑下拉修改
  handleEditSelectChange = (value, options) => {
    // this.saveParams[options.pname] = value
    console.log(value)
    if(options === "stageDatas"){
      this.saveParams.stageImage = value
    }else{
      this.saveParams.phasenolist = value.join(',')
    }
  }
  
  // 删除方法
  getInterDirPhaseDel = (unitId, stageNo) => {
    axiosInstance.post(`${this.dirPhaseDel}?unitId=${unitId}&stageNo=${stageNo}`).then((res) => {
      const { code} = res.data
      if (code === 200) {
        this.getInterDirPhaseList(unitId)
      }
      message.info(res.data.message)
    })
    
  }
  // 删除提示
  handleDelete = (e) => {
    const unitId = Number(e.target.getAttribute('unitid'))
    const stageNo = Number(e.target.getAttribute('stageno'))
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除该阶段吗？',
      className: 'confirmBox',
      onOk() {
        selfThis.getInterDirPhaseDel(unitId, stageNo)
      },
    })
  }
  // 列表
  getInterDirPhaseList = (type) => {
    axiosInstance.get(`${this.dirPhaseList}?unitId=${type}`).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data) {
        const stateName = type == 1000084 ? 'interStageList' : 'interMoveList'
        this.setState({ [stateName]: data })
      }
    })
  }
  //添加
  bindDirPhase=()=>{
    this.saveParams={
      allred: 0,
      attribute: 0,
      green: 0,
      phasenolist: '',
      redyellow: 0,
      signalStageId: 0,
      stageImage: '',
      stagename: '',
      stageno: 0,
      unitId: this.interId,
      yellow: 0
    }
    const { interStageList } = this.state
    const listLen = interStageList ? interStageList.length : 0
    const stageno = interStageList ? interStageList[interStageList.length - 1].stageno + 1 : 1
    const defaultNo = listLen > 0 ? interStageList[listLen - 1].scheduleno + 1 : 1
    this.saveParams.scheduleno = defaultNo
    this.saveParams.stageno = stageno
    this.setState({ interDirDisplay: true, defaultNo })
  }
  // 保存
  addSaveStage = () => {
    axiosInstance.post(`${this.dirPhaseAdd}`,this.saveParams).then((res) => {
      const { code} = res.data
      if (code === 200) {
        this.getInterDirPhaseList(this.interId)
        this.setState({
          interDirDisplay: null
        })
      }
      message.info(res.data.message)
    })
  }
  // 取消
  cancelSave = () => {
    this.setState({
      interDirDisplay: null
    })
  } 
  render() {
    const { interStageList ,interDirDisplay, interPhaseList, stageDatas } =this.state;
    return (
      <div className="paramsTable">
        <span className="addBtn" onClick={this.bindDirPhase}>新增阶段</span>
        <div className="paramsThead">
          <div className="paramsTh">阶段序号</div>
          <div className="paramsTh">阶段名称</div>
          <div className="paramsTh">最大绿</div>
          <div className="paramsTh">最小绿</div>
          <div className="paramsTh">关联相位</div>
          <div className="paramsTh">阶段图示</div>
          <div className="paramsTh">关联信号系统阶段号</div>
          <div className="paramsTh">操作</div>
        </div>
        <div className="paramsTbody">
        {/* allred: 2
            attribute: 1
            green: null
            id: 1
            phasenolist: "1,3"
            redyellow: 0
            signalStageId: 1
            stageImage: "group0/M00/00/01/image/stage/01.png"
            stagename: "东西直行"
            stageno: 1
            unitId: 1000084
            yellow: 3 */}
          {
            interStageList &&
            interStageList.map(item=>{
              return (
                <div className="paramsTr" key={item.id}>
                  <div className="paramsTd">{item.stageno}</div>
                  <div className="paramsTd">{item.stagename}</div>
                  <div className="paramsTd">40</div>
                  <div className="paramsTd">10</div>
                  <div className="paramsTd">
                  {
                    this.returnPhasenolistImg(item.phasenolist).map(item => {
                      return <img src={`${localStorage.getItem("ImgUrl")}${item}`} style={{margin:'0 5px'}} height="28px" alt="" />
                    })
                  }
                  </div>
                  <div className="paramsTd"><img src={`${localStorage.getItem("ImgUrl")}${item.stageImage}`} width="35px" height="35px" alt="" /></div>
                  <div className="paramsTd">{item.signalStageId}</div>
                  <div className="paramsTd">
                    <span className="editBtn">编辑</span>
                    <span className="editBtn" unitid={item.unitId} stageno={item.stageno} onClick={(e) => this.handleDelete(e)}>删除</span>
                  </div>
                </div>
              )
            })
          }
          {
          interDirDisplay && 
          <div className="paramsTr">
            <div className="paramsTd"><input type="text" defaultValue={this.saveParams.stageno} onChange={(e) => this.handleInputSaveNo(e, 'stageno')} /></div>
            <div className="paramsTd"><input type="text" placeholder="请输入" defaultValue={this.saveParams.stagename} onChange={(e) => this.handleInputSaveNo(e, 'stagename')} /></div>
            <div className="paramsTd"><input type="text" defaultValue="40" /></div>
            <div className="paramsTd"><input type="text" defaultValue="10" /></div>
            <div className="paramsTd">
              <Select mode="tags" className="selectLength" placeholder="请选择" onChange={(e) => this.handleEditSelectChange(e, 'interPhaseList')}>
                <Option key="0" vlaue="0">请选择</Option>
                {
                  interPhaseList && interPhaseList.map(item=>{
                    return (
                      <Option key={item.id} value={item.id} style={{height:"47px"}}><img src={`${localStorage.getItem("ImgUrl")}${item.phase_image}`} alt="" maxHeight="28px"/></Option>
                    )
                  })
                }
              </Select> 
            </div>
            <div className="paramsTd">            
            <Select className="selectLength" placeholder="请选择" onChange={(e) => this.handleEditSelectChange(e, 'stageDatas')}>
                <Option key="0" vlaue="0">请选择</Option>
                {
                  stageDatas && stageDatas.map(item=>{
                    return (
                      <Option key={item.id} value={item.uiImageName} style={{height:"47px"}}><img src={`${localStorage.getItem("ImgUrl")}${item.uiImageName}`} alt="" maxHeight="28px"/></Option>
                    )
                  })
                }
              </Select> 
            </div>
            <div className="paramsTd"><input type="text" placeholder="请输入" defaultValue="0"  onChange={(e) => this.handleInputSaveNo(e, 'phasenolist')} /></div>
            <div className="paramsTd">
              <span className="editBtn" onClick={this.addSaveStage}>保存</span>
              <span className="editBtn" onClick={this.cancelSave}>取消</span>
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}

export default StageMsg
