import React, { Component } from 'react'
import { Select } from 'antd'
import phasePic from '../../../../imgs/01.png'
import axiosInstance from '../../../../utils/getInterfaceData'
const { Option } = Select
class TimePlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dirTimePlanList:null
    }
    this.interId = this.props.interId
    this.listUrl=`/control-application-front/signal/config/plan/listPlan?unitId=${this.interId}`
  }
  componentDidMount = () => {
    this.dirTimePlanList()
  }
  dirTimePlanList=()=>{
    axiosInstance.get(this.listUrl).then(res=>{
      const { code, data } = res.data
      console.log(data,"data")
      if (code === 200 && data) {
        this.setState({ dirTimePlanList: data })
      } else {
        this.setState({ dirTimePlanList: null })
      }
    })
  }
//   0:
// cfgPlan:
// coordStageOrder: 1
// cyclelen: 150
// id: 1
// offset: 20
// phaseplanid: 1
// planname: "早高峰"
// planno: 1
// unitId: 1000084
// __proto__: Object
// cfgPlanStageChain: Array(4)
// 0:
// id: 1
// planno: 1
// stageId: 1
// stageOrder: 1
// stageTime: 50
// unitId: 1000084
// __proto__: Object
// 1: {planno: 1, stageTime: 30, unitId: 1000084, id: 2, stageOrder: 2, …}
// 2: {planno: 1, stageTime: 40, unitId: 1000084, id: 3, stageOrder: 3, …}
// 3: {planno: 1, stageTime: 30, unitId: 1000084, id: 4, stageOrder: 4, …}
// length: 4
// __proto__: Array(0)
// id: 1
  render() {
    const { dirTimePlanList} =this.state;
    return (
      <div className="paramsTable">
        <span className="addBtn">新增方案</span>
        <div className="paramsThead">
          <div className="paramsTh">方案号</div>
          <div className="paramsTh">方案名称</div>
          <div className="paramsTh">阶段配时</div>
          <div className="paramsTh">周期长</div>
          <div className="paramsTh">协调阶段</div>
          <div className="paramsTh">协调时间</div>
          <div className="paramsTh">操作</div>
        </div>
        <div className="paramsTbody">
          {
            dirTimePlanList && dirTimePlanList.map((item)=>{
              console.log(item,"item")
              return (
              <div className="paramsTr">
                <div className="paramsTd">{item.cfgPlan.planno}</div>
                <div className="paramsTd">{item.cfgPlan.planname}</div>
                <div className="paramsTd">
                  {
                    item.cfgPlanStageChain.map((child)=>{
                        return (
                          <div style={{height:"100%"}} key={child.id}>
                              <span>{child.stageTime}</span>
                              <img src={phasePic} width="35px" height="35px" alt="" />
                              <span className="arrowsIcon">→</span>
                          </div>
                        )
                    })
                  }
                </div>
                <div className="paramsTd">{item.cfgPlan.cyclelen}</div>
                <div className="paramsTd"><img src={phasePic} width="35px" height="35px" alt="" /></div>
                <div className="paramsTd">{item.cfgPlan.offset}</div>
                <div className="paramsTd">
                  <span className="editBtn">编辑</span>
                  <span className="editBtn">删除</span>
                </div>
              </div>
              )
            })
          }
         {/* <div className="paramsTr">
            <div className="paramsTd">1</div>
            <div className="paramsTd">A</div>
            <div className="paramsTd">
              <span>40 </span>
              <img src={phasePic} width="35px" height="35px" alt="" />
              <span className="arrowsIcon">→</span>
              <span>40 </span>
              <img src={phasePic} width="35px" height="35px" alt="" />
            </div>
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
            <div className="paramsTd">10</div>
            <div className="paramsTd">
              <span className="editBtn">保存</span>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

export default TimePlan
