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
    this.id=null
    this.roadNarr=null  //车道信息
    this.dirInfoList="/control-application-front/basic/info/listCodeByCodeType"
    this.dirPhaseList=`/control-application-front/signal/config/phase/listPhaseInfo?unitId=${this.interId}`
    this.dirPhaseSave="/control-application-front/signal/config/phase/savePhaseInfo"
    this.dirPhaseDelete="/control-application-front/signal/config/phase/removePhaseInfo"
    this.dirPhaseSelectIden=`/control-application-front/signal/config/phase/phaseImage?unitId=${this.interId}`
  }
  componentDidMount = () => {
    // console.log(this.props)
    this.getInterDirInfoList(6)
    this.getInterDirPhaseList()
  }
  getInterDirInfoList=(type)=>{
    axiosInstance.get(`${this.dirInfoList}?codeType=${type}`).then((res) => {
      console.log(res,"字典")
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
  getInterDirPhaseList=()=>{
    axiosInstance.get(this.dirPhaseList).then((res) => {
      const { code, data } = res.data
      console.log(data,"列表数据")
      if (code === 200 && data) {
        this.setState({ interPhaseList: data })
      } else {
        this.setState({ interPhaseList: null })
      }
    })
  }
  //查字典 处理人行道数据
  getInterDirInfoListProperty=(direCode)=>{
    const { interInfoList } =this.state;
    if(direCode!=null && interInfoList){
      let infoList=direCode.split(",")  //["3","7"] ["3"]
      let buttList=this.getInterDirInfoListButt(infoList)
      return buttList
    }else {
      return null
    }
  }
  getInterDirInfoListButt=(buttArr)=>{
    const { interInfoList } =this.state;
    let buttNull=[]
    interInfoList.map(item=>{
      buttArr.map(child=>{
        if(item.cCode==child){
          buttNull.push(item.codeName)
        }
      })
    })
    return buttNull
  }
  //处理图标数据
  getInterDirImgListProperty=(imgList)=>{
    //返回图标路径
    if(imgList){
      let buttImgUrl=[];
      buttImgUrl.push(imgList)
      let imgListArr=imgList!==null?imgList.split(','):""
      let baseImgUrl=localStorage.getItem("ImgUrl");
      let newBaseImgUrl=imgListArr.map(item=>{return `${baseImgUrl}${item}`})
      return newBaseImgUrl
    }
  }
  //添加
  bindDirPhase=()=>{
    const { interPhaseList } =this.state;
    const listLen = interPhaseList ? interPhaseList.length : 0
    const defaultNo = listLen > 0 ? interPhaseList[listLen - 1].phaseno + 1 : 1
    interPhaseList.phaseno=defaultNo
    if(this.phaseno===null){
      this.phaseno=defaultNo
    }
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
      id: this.id,
      lanenolist: this.lanenolist,
      peddirlist: this.peddirlist, //所属车道
      phasename: this.phasename,
      phaseno: this.phaseno,
      redyellow: this.redyellow,
      unitId: this.interId,
      yellow: this.yellow,
      phaseImage: this.phase_image,
    }
    if(this.phasename!==null && this.phaseno!==null){
      axiosInstance.post(this.dirPhaseSave,transmitPara).then(res=>{
        // console.log(res,"保存")
        if(res.data.code === 200 && res.data){
          this.getInterDirPhaseList()
          this.setState({interDirDisplay:false})
          this.editIndex=null
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
    this.id=this.saveParams.id
    this.getInterDirSelectIden()
    this.getInterDirInfoList()
    this.setState({ editIndex: indexs })
  }
  onInterInfoList=(value)=>{
    let newValue=value.join()
    this.peddirlist=newValue
  }
  onDirPhaseSelectIden=(value)=>{
    if(value){
      let newValue=value.join()
      console.log(value,"value")
      this.lanenolist=newValue
    }
  }
  //关联车道
  onDirPhaseAssLan=(value)=>{
    console.log(value,"车道value")
    // this.peddirlist=value.join()
  }
  //相位图标
  onDirPhaseIcon=(value)=>{
    console.log(value,"相位value")
  }
  //添加相位图标
  onDirPhaseSelectMC=(value)=>{
    console.log(value,"tupianvalue")
    this.phase_image=value
  }
  //取消
  bindRemoveParse=()=>{
    this.setState({ editIndex: null })
  }
  render() {
    const { interPhaseList ,interDirDisplay, interInfoList ,dirPhaseSelectIden ,editIndex} =this.state;
    const { devicePiclist} =this.props.data;
    console.log(devicePiclist,"devicePiclist")
    return (
      <div className="paramsTable">
        <span className="addBtn" onClick={this.bindDirPhase}>新增相位</span>
        <div className="paramsThead">
          <div className="paramsTh">相位序号</div>
          <div className="paramsTh">相位名称</div>
          <div className="paramsTh">关联车道</div>
          <div className="paramsTh">相位图标</div>
          <div className="paramsTh">放行人行道方向</div>
          <div className="paramsTh">最大绿</div>
          <div className="paramsTh">最小绿</div>
          <div className="paramsTh">红黄时间</div>
          <div className="paramsTh">黄灯时间</div>
          <div className="paramsTh">全红时间</div>
          <div className="paramsTh">操作</div>
        </div>
        <div className="paramsTbody">
          {
            interPhaseList&&
            interPhaseList.map((item,index)=>{
              return (
                <div className="paramsTr" key={item.id}>
                    <div className="paramsTd">{editIndex===index? <input type="text" onChange={e=>this.phaseno=e.target.value} defaultValue={item.phaseno}/> : <span>{item.phaseno}</span>}</div>
                    <div className="paramsTd">{editIndex===index? <input type="text" onChange={e=>this.phasename=e.target.value} defaultValue={item.phasename}/> : <span>{item.phasename}</span>}</div>
                    <div className="paramsTd">
                      {/* 车道 */}
                      { editIndex===index ?  
                      <Select defaultValue={item.ui_image_name&&this.getInterDirImgListProperty(item.ui_image_name).map(item=>{return (<img src={item} alt=""/>)})} mode="tags" onChange={this.onDirPhaseAssLan} className="selectLength">
                      {
                        dirPhaseSelectIden && dirPhaseSelectIden.map((item,index)=>{
                          return (
                            <Option key={index} value={item.ui_image_name} style={{height:"35px"}}><img src={`${localStorage.getItem("ImgUrl")}${item.ui_image_name}`} alt="" maxHeight="35px"/></Option>
                          )
                        })
                      }
                    </Select>:
                    // 回显车道
                    <div>{item.ui_image_name&&this.getInterDirImgListProperty(item.ui_image_name).map((item,index)=>{return <img key={index} src={item} alt="" style={{marginRight:"15px",maxHeight:"30px"}}/>})}</div>}  
                    </div>
                      {/* 相位图标 */}
                    <div className="paramsTd">
                      { editIndex===index?
                      <Select style={{textAlign:"center"}} defaultValue={<img src={item.phase_image&&this.getInterDirImgListProperty(item.phase_image)} alt="" maxHeight="35px"/>} onChange={this.onDirPhaseIcon} className="selectLength">
                      {
                        devicePiclist && devicePiclist[6].map(item=>{
                          return (
                            <Option key={item.id} value={item.uiImageName} style={{height:"47px"}}><img src={`${localStorage.getItem("ImgUrl")}${item.uiImageName}`} alt="" maxHeight="35px"/></Option>
                          )
                        })
                      }
                    </Select>: 
                    // 回显相位图标
                    <img src={item.phase_image && `${localStorage.getItem("ImgUrl")}${item.phase_image}`} style={{maxHeight:"35px"}}/>}</div>
                      {/* 放行人行道 */}
                    <div className="paramsTd">
                      { editIndex === index? 
                      <Select defaultValue={item.peddirlist&&this.getInterDirInfoListProperty(item.peddirlist).map((item,index)=>{ return <span key={index}>{item}</span>})} mode="tags" onChange={this.onDirPhaseSelectIden} className="selectLength">
                      {
                        interInfoList && interInfoList.map((item,index)=>{
                          return (
                            <Option key={item.codeName} value={item.codeName} style={{height:"47px",marginRight:"10px"}}>{item.codeName}</Option>
                          )
                        })
                      }
                    </Select>: 
                    // 回显放行人行道
                    <span>{item.peddirlist&&this.getInterDirInfoListProperty(item.peddirlist)}</span>} 
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
                    <Select mode="tags" onChange={this.onDirPhaseSelectIden} className="selectLength" placeholder="请选择">
                      {
                        dirPhaseSelectIden && dirPhaseSelectIden.map(item=>{
                          return (
                            <Option key={item.laneno} vlaue={item.laneno} style={{height:"47px",textAlign:"center"}}><img src={`${localStorage.getItem("ImgUrl")}${item.ui_image_name}`} alt=""/></Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className="paramsTd">
                    <Select defaultValue="请选择" onChange={this.onDirPhaseSelectMC} className="selectLength" style={{textAlign:"center"}}>
                      {
                        devicePiclist && devicePiclist[6].map((item,index)=>{
                          return (
                            <Option key={index} vlaue={item.uiImageName} style={{height:"47px"}}><img src={`${localStorage.getItem("ImgUrl")}${item.uiImageName}`} alt="" style={{verticalAlign: "middle",maxHeight:"100%",maxWidth:"100%"}}/></Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className="paramsTd">
                    <Select onChange={this.onInterInfoList} mode="tags" className="selectLength" placeholder="请选择">
                      {
                        interInfoList && interInfoList.map((item,index)=>{
                          return (
                            <Option key={index} vlaue={item.codeName}>
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
