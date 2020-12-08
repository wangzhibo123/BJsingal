import React, { Component } from 'react'
import { Select, message, Modal} from 'antd'
import phasePic from '../../../../imgs/01.png'
import axiosInstance from "../../../../utils/getInterfaceData"
import "./PhaseMsg.scss"
const { Option } = Select
class PhaseMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interInfoList: null,  //字典数据
      interPhaseList: null,   //列表数据
      interMoveList: null,  //空
      dirPhaseSelectIden: null,
      interDirDisplay: false
    }
    this.interId = this.props.interId
    this.phaseno=null
    this.phasename=null
    this.greenmax=null
    this.greenmin=null
    this.redyellow=null
    this.yellow=null
    this.allred=null
    this.peddirlist=null
    this.lanenolist=null
    this.dirInfoList="/control-application-front/basic/info/listCodeByCodeType"
    this.dirPhaseList=`/control-application-front/signal/config/phase/listPhaseInfo?unitId=${this.interId}`
    this.dirPhaseSave="/control-application-front/signal/config/phase/savePhaseInfo"
    this.dirPhaseDelete="/control-application-front/signal/config/phase/removePhaseInfo"
    this.dirPhaseSelectIden=`/control-application-front/signal/config/phase/phaseImage?unitId=${this.interId}`
  }
  componentDidMount = () => {
    // console.log(this.props)
    this.getInterDirInfoList(6)
    this.getInterDirPhaseList(1000084)
  }
  getInterDirInfoList=(type)=>{
    axiosInstance.get(`${this.dirInfoList}?codeType=${type}`).then((res) => {
      // console.log(res,"字典")
      const { code , data} = res.data
      if (code === 200 && data) {
        this.setState({ interInfoList: data })
      } else {
        this.setState({ interInfoList: null })
      }
    })
  }
  // 相位标识下拉 
  getInterDirSelectIden=()=>{
    axiosInstance.post(`${this.dirPhaseSelectIden}`).then((res) => {
      const { code , data} = res.data
      console.log(data,"相位标识数据")
      if (code === 200 && data) {
        this.setState({ dirPhaseSelectIden: data })
      } else {
        this.setState({ dirPhaseSelectIden: null })
      }
    })
  }
  // 列表
  getInterDirPhaseList = () => {
    axiosInstance.get(this.dirPhaseList).then((res) => {
      const { code, data } = res.data
      // console.log(data,"liebiaoData")
      if (code === 200 && data) {
        this.setState({ interPhaseList: data })
      } else {
        this.setState({ interPhaseList: null })
      }
    })
  }
  getInterDirInfoListProperty=(direCode)=>{
    const { interInfoList } =this.state;
    if(direCode!=null && interInfoList){
      const getInterInfoFirList=direCode.split(",")[0]
      const getInterInfoNexList=direCode.split(",")[1]
      let getInterInfoFirTit=interInfoList.find(item=>{if(item.cCode==getInterInfoFirList){return item} })
      let getInterInfoNexTit=interInfoList.find(item=>{if(item.cCode==getInterInfoNexList){return item} })
      return document.innerHTML=`${getInterInfoFirTit&&getInterInfoFirTit.codeName} ， ${getInterInfoNexTit&&getInterInfoNexTit.codeName}`
    }else {
      return document.innerHTML=null
    }
  }
  //添加
  bindDirPhase=()=>{
    this.setState({interDirDisplay:true})
    this.getInterDirSelectIden()
  }
  //取消
  bindCancelParse=()=>{
    this.setState({interDirDisplay:false})
  }
  //保存
  bindSaveParse=()=>{
    let transmitPara = {
      allred: this.allred,
      canalizationId: 4,
      feature: 12,
      greenmax: this.greenmax,
      greenmin: this.greenmin,
      id: null,
      lanenolist: this.lanenolist,
      peddirlist: this.peddirlist, //所属车道
      phasename: this.phasename,
      phaseno: this.phaseno,
      redyellow: this.redyellow,
      unitId: this.interId,
      yellow: this.yellow
    }
    if(this.phasename!==null && this.phaseno!==null){
      axiosInstance.post(this.dirPhaseSave,transmitPara).then(res=>{
        // console.log(res,"保存")
        if(res.data.code === 200 && res.data){
          this.getInterDirPhaseList()
          this.setState({interDirDisplay:false})
        }
        message.info(res.data.message + "😊")
      })
    }else {
      message.info('参数不全，无法存储😭')
    }
  }
  //删除
  bindDeleteParse=(id)=>{
    axiosInstance.post(`${this.dirPhaseDelete}?id=${id}`).then(res=>{
      if(res.data.code === 200){
        this.getInterDirPhaseList()
      }
    })
  }
  handleDelete = (e) => {
    const id = e.target.getAttribute('id')
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除吗？',
      className: 'confirmBox',
      onOk() {
        selfThis.bindDeleteParse(id)
      },
    })
  }
  onInterInfoList=(value)=>{
    let newValue=value.join()
    this.peddirlist=newValue
  }
  onDirPhaseSelectIden=(value)=>{
    let newValue=value.join()
    this.lanenolist=newValue
  }
  render() {
    const { interPhaseList ,interDirDisplay, interInfoList ,dirPhaseSelectIden} =this.state;
    return (
      <div className="paramsTable">
        <span className="addBtn" onClick={this.bindDirPhase}>新增相位</span>
        <div className="paramsThead">
          <div className="paramsTh">相位序号</div>
          <div className="paramsTh">相位名称</div>
          <div className="paramsTh">相位标识</div>
          <div className="paramsTh">放行人行道方向</div>
          <div className="paramsTh">最大率</div>
          <div className="paramsTh">最小率</div>
          <div className="paramsTh">红黄时间</div>
          <div className="paramsTh">黄灯时间</div>
          <div className="paramsTh">全红时间</div>
          <div className="paramsTh">操作</div>
        </div>
        <div className="paramsTbody">
          {
            interPhaseList&&
            interPhaseList.map(item=>{
              let img=item.ui_image_name;
              let imgPreFix=localStorage.getItem("ImgUrl");
              return (
                <div className="paramsTr" key={item.id}>
                    <div className="paramsTd">{item.phaseno}</div>
                    <div className="paramsTd">{item.phasename}</div>
                    <div className="paramsTd"><img src={`${imgPreFix}${img ? img.split(",")[0]: null}`} width="17px" height="35px" alt="" /></div>
                    <div className="paramsTd">{this.getInterDirInfoListProperty(item.peddirlist)}</div>
                    <div className="paramsTd">{item.greenmax}</div>
                    <div className="paramsTd">{item.greenmin}</div>
                    <div className="paramsTd">{item.redyellow}</div>
                    <div className="paramsTd">{item.yellow}</div>
                    <div className="paramsTd">{item.allred}</div>
                    <div className="paramsTd">
                      <span className="editBtn">编辑</span>
                      <span className="editBtn" id={item.id} onClick={this.handleDelete}>删除</span>
                    </div>
                </div>
              )
            })
          }
          {
            interDirDisplay&&
                  <div className="paramsTr">
                  <div className="paramsTd"><input type="text" onChange={e=>this.phaseno=e.target.value}/></div>
                  <div className="paramsTd"><input type="text" onChange={e=>this.phasename=e.target.value}/></div>
                  <div className="paramsTd">
                    <Select defaultValue="请选择" mode="multiple" onChange={this.onDirPhaseSelectIden}>
                      {
                        dirPhaseSelectIden && dirPhaseSelectIden.map(item=>{
                          return (
                            <Option key={item.laneno} vlaue={item.laneno}><img src={`${localStorage.getItem("ImgUrl")}${item.ui_image_name}`} alt="" height="30px"/></Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className="paramsTd">
                    <Select defaultValue="东" onChange={this.onInterInfoList} mode="multiple">
                      {
                        interInfoList && interInfoList.map(item=>{
                          return (
                            <Option key={item.cCode} vlaue={item.codeName}>
                              <div className="demo-option-label-item" style={{color:"#032473"}}>
                                {item.codeName}
                              </div>
                            </Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className="paramsTd"><input type="text" onChange={e=>this.greenmax=e.target.value}/></div>
                  <div className="paramsTd"><input type="text" onChange={e=>this.greenmin=e.target.value}/></div>
                  <div className="paramsTd"><input type="text" onChange={e=>this.redyellow=e.target.value}/></div>
                  <div className="paramsTd"><input type="text" onChange={e=>this.yellow=e.target.value}/></div>
                  <div className="paramsTd"><input type="text" onChange={e=>this.allred=e.target.value}/></div>
                  <div className="paramsTd">
                    <span className="editBtn" onClick={this.bindCancelParse}>取消</span>
                    <span className="editBtn" onClick={this.bindSaveParse}>保存</span>
                  </div>
                </div>
          }
        </div>
      </div>
    )
  }
}

export default PhaseMsg
