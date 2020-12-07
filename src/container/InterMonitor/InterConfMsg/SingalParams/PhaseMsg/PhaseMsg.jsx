import React, { Component } from 'react'
import { Select } from 'antd'
import phasePic from '../../../../imgs/01.png'
import axiosInstance from "../../../../utils/getInterfaceData"
import "./PhaseMsg.scss"
const { Option } = Select
class PhaseMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interInfoList: null,  //字典数据
      interDirList: null,   //列表数据
      interMoveList: null,  //空
      interDirDisplay:false
    }
    this.dirInfoList="/control-application-front/basic/info/listCodeByCodeType"
    this.dirPhaseList="/control-application-front/signal/config/phase/listPhaseInfo"
    this.dirPhaseBind="/control-application-front/signal/config/phase/savePhaseInfo"
  }
  componentDidMount = () => {
    this.getInterDirInfoList(6)
    this.getInterDirPhaseList(1000084)
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
  getInterDirPhaseList = (type) => {
    axiosInstance.get(`${this.dirPhaseList}?unitId=${type}`).then((res) => {
      // console.log(res.data,"列表数据")
      const { code, data } = res.data
      if (code === 200 && data) {
        const stateName = type === 1000084 ? 'interDirList' : 'interMoveList'
        this.setState({ [stateName]: data })
      }
    })
  }
  getInterDirInfoListProperty=(direCode)=>{
    const { interInfoList } =this.state;
    if(direCode!=null){
      const getInterInfoFirList=direCode.split(",")[0]
      const getInterInfoNexList=direCode.split(",")[1]
      let getInterInfoFirTit=interInfoList.find(item=>{if(item.cCode==getInterInfoFirList){return item} })
      let getInterInfoNexTit=interInfoList.find(item=>{if(item.cCode==getInterInfoNexList){return item} })
      return document.innerHTML=`${getInterInfoFirTit.codeName}向${getInterInfoNexTit.codeName}`
    }else {
      return document.innerHTML=null
    }
  }
  //添加
  bindDirPhase=()=>{
    this.setState({interDirDisplay:true})
  }
  //取消
  bindCancelParse=()=>{
    this.setState({interDirDisplay:false})
  }
  //保存
  bindSaveParse=()=>{
    // this.setState({interDirDisplay:false})
    let aaa={
      "allred":1,
      "canalizationId": "东向西",
      "feature": 12,
      "greenmax": 1,
      "greenmin": 1,
      "id": 11,
      "lanenolist": "string",
      "peddirlist": "string",
      "phasename": "string",
      "phaseno": 0,
      "redyellow": 0,
      "unitId": 0,
      "yellow": 0
    }
    console.log(this.parseNum)
    axiosInstance.post(this.dirPhaseBind,aaa).then(res=>{
      console.log(res)
    })
  }
  render() {
    const { interDirList ,interDirDisplay} =this.state;
    return (
      <div className="paramsTable">
        <span className="addBtn" onClick={this.bindDirPhase}>新增相位</span>
        <div className="paramsThead">
          <div className="paramsTh">相位序号</div>
          <div className="paramsTh">相位名称</div>
          {/* <div className="paramsTh">相位特征</div> */}
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
            interDirList&&
            interDirList.map(item=>{
              return (
                <div className="paramsTr" key={item.id}>
                    <div className="paramsTd">{item.phaseno}</div>
                    <div className="paramsTd">{item.phasename}</div>
                    <div className="paramsTd"><img src={phasePic} width="35px" height="35px" alt="" /></div>
                    <div className="paramsTd">{this.getInterDirInfoListProperty(item.peddirlist)}</div>
                    <div className="paramsTd">{item.greenmax}</div>
                    <div className="paramsTd">{item.greenmin}</div>
                    <div className="paramsTd">{item.redyellow}</div>
                    <div className="paramsTd">{item.yellow}</div>
                    <div className="paramsTd">{item.allred}</div>
                    <div className="paramsTd">
                      <span className="editBtn">编辑</span>
                      <span className="editBtn">删除</span>
                    </div>
                </div>
              )
            })
          }
          {
            interDirDisplay&&
                  <div className="paramsTr">
                  <div className="paramsTd"><input type="text" onChange={e=>this.parseNum=e.target.value}/></div>
                  <div className="paramsTd"><input type="text"/></div>
                  <div className="paramsTd">
                    <Select defaultValue="0">
                      <Option key="0" vlaue="0">请选择</Option>
                      <Option key="1" vlaue="1">1</Option>
                    </Select>
                  </div>
                  <div className="paramsTd">
                    <Select defaultValue="0">
                      <Option key="0" vlaue="0">请选择</Option>
                      <Option key="1" vlaue="1">1</Option>
                    </Select>
                  </div>
                  <div className="paramsTd"><input type="text"/></div>
                  <div className="paramsTd"><input type="text"/></div>
                  <div className="paramsTd"><input type="text"/></div>
                  <div className="paramsTd"><input type="text"/></div>
                  <div className="paramsTd"><input type="text"/></div>
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
