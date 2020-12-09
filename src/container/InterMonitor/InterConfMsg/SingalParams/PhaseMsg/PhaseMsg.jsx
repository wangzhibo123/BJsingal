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
      interPhaseList: null,  //列表数据
      dirPhaseSelectIden: null, //下拉数据
      interDirDisplay: false,
      editIndex: null,
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
    this.phase_image=null
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
      console.log(data,"liebiaoData")
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
    const { interPhaseList } =this.state;
    const listLen = interPhaseList ? interPhaseList.length : 0
    const defaultNo = listLen > 0 ? interPhaseList[listLen - 1].phaseno + 1 : 1
    interPhaseList.phaseno=defaultNo
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
      phase_image: this.phase_image,
      phasename: this.phasename,
      phaseno: this.phaseno,
      redyellow: this.redyellow,
      unitId: this.interId,
      yellow: this.yellow,
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
  //编辑
  handleEdit=(e)=>{
    const indexs = parseInt(e.target.getAttribute('indexs'))
    this.saveParams = this.state.interPhaseList[indexs]
    this.setState({ editIndex: indexs })
  }
  onInterInfoList=(value)=>{
    let newValue=value.join()
    this.peddirlist=newValue
  }
  onDirPhaseSelectIden=(value)=>{
    let newValue=value.join()
    this.lanenolist=newValue
  }
  bindRemoveParse=()=>{
    this.setState({ editIndex: null })
  }
  render() {
    const { interPhaseList ,interDirDisplay, interInfoList ,dirPhaseSelectIden ,editIndex} =this.state;
    return (
      <div className="paramsTable">
        <span className="addBtn" onClick={this.bindDirPhase}>新增相位</span>
        <div className="paramsThead">
          <div className="paramsTh">相位序号</div>
          <div className="paramsTh">相位名称</div>
          <div className="paramsTh">关联车道</div>
          <div className="paramsTh">相位图标</div>
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
            interPhaseList.map((item,index)=>{
              let img=item.ui_image_name;
              let imgPreFix=localStorage.getItem("ImgUrl");
              return (
                <div className="paramsTr" key={item.id}>
                    <div className="paramsTd">{editIndex===index? <input type="text" onChange={e=>this.phaseno=e.target.value} defaultValue={item.phaseno}/> : <span>{item.phaseno}</span>}</div>
                    <div className="paramsTd">{editIndex===index? <input type="text" onChange={e=>this.phasename=e.target.value} defaultValue={item.phasename}/> : <span>{item.phasename}</span>}</div>
                    <div className="paramsTd">
                      {editIndex===index?  <Select defaultValue={<img src={`${localStorage.getItem("ImgUrl")}${item.ui_image_name}`} alt="" maxHeight="28px"/>} mode="multiple" onChange={this.onDirPhaseSelectIden}>
                      {
                        dirPhaseSelectIden && dirPhaseSelectIden.map(item=>{
                          return (
                            <Option key={item.laneno}  style={{height:"50px"}}><img src={`${localStorage.getItem("ImgUrl")}${item.ui_image_name}`} alt="" maxHeight="28px"/></Option>
                          )
                        })
                      }
                    </Select>: <img src={`${imgPreFix}${img ? img.split(",")[0]: null}`} height="35px" alt="" />}  
                    </div>      
                    <div className="paramsTd">{editIndex===index?  <Select defaultValue={<img src={`${localStorage.getItem("ImgUrl")}${item.ui_image_name}`} alt="" maxHeight="28px"/>} onChange={this.onDirPhaseSelectIden}>
                      {
                        dirPhaseSelectIden && dirPhaseSelectIden.map(item=>{
                          return (
                            <Option key={item.laneno} style={{height:"50px"}}><img src={`${localStorage.getItem("ImgUrl")}${item.ui_image_name}`} alt="" maxHeight="28px"/></Option>
                          )
                        })
                      }
                    </Select>: <span>{item.phase_image}</span>}</div>
                    <div className="paramsTd">
                      {editIndex===index?  <Select defaultValue={this.getInterDirInfoListProperty(item.peddirlist)} mode="multiple" onChange={this.onDirPhaseSelectIden}>
                      {
                        dirPhaseSelectIden && dirPhaseSelectIden.map(item=>{
                          return (
                            <Option key={item.cCode} value={item.codeName} style={{height:"50px"}}>{item.peddirlist}</Option>
                          )
                        })
                      }
                    </Select>: <span>{this.getInterDirInfoListProperty(item.peddirlist)}</span>} 
                    </div>
                    <div className="paramsTd">{editIndex===index? <input type="text" onChange={e=>this.greenmax=e.target.value} defaultValue={item.greenmax}/> : <span>{item.greenmax}</span>}</div>
                    <div className="paramsTd">{editIndex===index? <input type="text" onChange={e=>this.greenmin=e.target.value} defaultValue={item.greenmin}/> : <span>{item.greenmin}</span>}</div>
                    <div className="paramsTd">{editIndex===index? <input type="text" onChange={e=>this.redyellow=e.target.value} defaultValue={item.redyellow}/> : <span>{item.redyellow}</span>}</div>
                    <div className="paramsTd">{editIndex===index? <input type="text" onChange={e=>this.yellow=e.target.value} defaultValue={item.yellow}/> : <span>{item.yellow}</span>}</div>
                    <div className="paramsTd">{editIndex===index? <input type="text" onChange={e=>this.allred=e.target.value} defaultValue={item.allred}/> : <span>{item.allred}</span>}</div>
                    <div className="paramsTd">
                      { editIndex===index ? <span className="editBtn" onClick={this.bindSaveParse}>保存</span> : <span className="editBtn" onClick={this.handleEdit} indexs={index}>编辑</span>}
                      { editIndex===index ? <span className="editBtn" onClick={this.bindRemoveParse}>取消</span> : <span className="editBtn" id={item.id} onClick={this.handleDelete}>删除</span>}
                    </div>
                </div>
              )
            })
          }
          {
            interDirDisplay&&
                  <div className="paramsTr">
                  <div className="paramsTd"><input type="text" onChange={e=>this.phaseno=e.target.value} defaultValue={interPhaseList.phaseno}/></div>
                  <div className="paramsTd"><input type="text" onChange={e=>this.phasename=e.target.value}/></div>
                  <div className="paramsTd">
                    <Select defaultValue="请选择" mode="multiple" onChange={this.onDirPhaseSelectIden}>
                      {
                        dirPhaseSelectIden && dirPhaseSelectIden.map(item=>{
                          return (
                            <Option key={item.laneno} vlaue={item.laneno} style={{height:"28px"}}><img src={`${localStorage.getItem("ImgUrl")}${item.ui_image_name}`} alt=""/></Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className="paramsTd">
                    <Select defaultValue="请选择" onChange={this.onDirPhaseSelectIden}>
                      {
                        dirPhaseSelectIden && dirPhaseSelectIden.map(item=>{
                          return (
                            <Option key={item.laneno} vlaue={item.laneno} style={{height:"50px"}}><img src={`${localStorage.getItem("ImgUrl")}${item.ui_image_name}`} alt="" style={{verticalAlign: "middle",maxHeight:"100%",maxWidth:"100%"}}/></Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className="paramsTd">
                    <Select defaultValue={interInfoList[0].codeName} onChange={this.onInterInfoList} mode="multiple">
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
                    <span className="editBtn" onClick={this.bindSaveParse}>保存</span>
                    <span className="editBtn" onClick={this.bindCancelParse}>取消</span>
                  </div>
                </div>
          }
        </div>
      </div>
    )
  }
}

export default PhaseMsg
