import React, { Component } from 'react'
import { Select } from 'antd'
import phasePic from '../../../../imgs/01.png'
import axiosInstance from "../../../../utils/getInterfaceData"
const { Option } = Select
class StageMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interInfoList: null,  //字典数据
      interStageList: null,   //列表数据
      interMoveList: null,  //空
      interDirDisplay:false
    }
    this.dirInfoList="/control-application-front/basic/info/listCodeByCodeType" //字典
    this.dirPhaseList="/control-application-front/signal/config/stage/listStageInfo"  
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
      console.log(res.data,"列表数据")
      const { code, data } = res.data
      if (code === 200 && data) {
        const stateName = type === 1000084 ? 'interStageList' : 'interMoveList'
        this.setState({ [stateName]: data })
      }
    })
  }
  render() {
    const { interStageList } =this.state;
    return (
      <div className="paramsTable">
        <span className="addBtn">新增阶段</span>
        <div className="paramsThead">
          <div className="paramsTh">阶段序号</div>
          <div className="paramsTh">阶段名称</div>
          <div className="paramsTh">最大率</div>
          <div className="paramsTh">最小率</div>
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
            interStageList&&
            interStageList.map(item=>{
              return (
                <div className="paramsTr" key={item.id}>
                  <div className="paramsTd">{item.stageno}</div>
                  <div className="paramsTd">{item.stagename}</div>
                  <div className="paramsTd">40</div>
                  <div className="paramsTd">10</div>
                  <div className="paramsTd"><img src={phasePic} width="35px" height="35px" alt="" /></div>
                  <div className="paramsTd"><img src={`${localStorage.getItem("ImgUrl")}${item.stageImage}`} width="35px" height="35px" alt="" /></div>
                  <div className="paramsTd">{item.signalStageId}</div>
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
              <span className="editBtn">取消</span>
              <span className="editBtn">保存</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StageMsg
