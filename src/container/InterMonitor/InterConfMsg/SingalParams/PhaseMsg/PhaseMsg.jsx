import React, { Component } from 'react'
import { Select } from 'antd'
import phasePic from '../../../../imgs/01.png'
import axiosInstance from "../../../../utils/getInterfaceData"
const { Option } = Select
class PhaseMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interInfoList: null,
      interDirList: null,
      interMoveList: null,
    }
    this.dirInfoList="/control-application-front/basic/info/listCodeByCodeType"
    this.dirPhaseList="/control-application-front/signal/config/phase/listPhaseInfo"
  }
  componentDidMount = () => {
    this.getInterDirInfoList(6)
    this.getInterDirPhaseList(1000084)
  }
  getInterDirInfoList=(type)=>{
    axiosInstance.get(`${this.dirInfoList}?codeType=${type}`).then((res) => {
      const { code , data} = res.data
      if (code === 200 && data) {
        const stateName = type === 6 ? 'interInfoList' : 'interMoveList'
        this.setState({ [stateName]: data })
      }
    })
  }
  getInterDirPhaseList = (type) => {
    axiosInstance.get(`${this.dirPhaseList}?unitId=${type}`).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data) {
        console.log(data,"data")
        const stateName = type === 1000084 ? 'interDirList' : 'interMoveList'
        this.setState({ [stateName]: data })
      }
    })
  }
  getInterDirInfoListProperty=(code)=>{
    this.state.interInfoList.find((item)=>{
      if(item&&item.cCode===code){
        console.log(item,"dasdasdw")
      }
    })
  }
  render() {
    const { interDirList } =this.state;
    return (
      <div className="paramsTable">
        <span className="addBtn">新增相位</span>
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
                    {/* <div className="paramsTd">{item.feature===1 ?<span>关键</span> : <span>非关键</span>}</div> */}
                    <div className="paramsTd"><img src={phasePic} width="35px" height="35px" alt="" /></div>
                    <div className="paramsTd">东向西{console.log(item.peddirlist)}</div>
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
          <div className="paramsTr">
            <div className="paramsTd">1</div>
            <div className="paramsTd">A</div>
            {/* <div className="paramsTd">
              <Select defaultValue="0">
                <Option key="0" vlaue="0">请选择</Option>
                <Option key="1" vlaue="1">1</Option>
              </Select>
            </div> */}
            <div className="paramsTd">
              <Select defaultValue="0">
                <Option key="0" vlaue="0">请选择</Option>
                <Option key="1" vlaue="1">1</Option>
              </Select>  
            </div>
            <div className="paramsTd">东向西</div>
            <div className="paramsTd">40</div>
            <div className="paramsTd">10</div>
            <div className="paramsTd">5</div>
            <div className="paramsTd">2</div>
            <div className="paramsTd">10</div>
            <div className="paramsTd">
              <span className="editBtn">保存</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PhaseMsg
