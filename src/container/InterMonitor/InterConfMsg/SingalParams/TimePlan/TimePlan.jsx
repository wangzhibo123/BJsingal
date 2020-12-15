import React, { Component } from 'react'
import { Select, Radio, Modal, message } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import phasePic from '../../../../imgs/01.png'
import axiosInstance from '../../../../utils/getInterfaceData'
const { Option } = Select
class TimePlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dirTimePlanList:null,
      stagePics: null,
      isAddEdit: false,
      isAddStageList: false,
      editInfos: null,
    }
    this.globalImgUrl = localStorage.getItem('ImgUrl')
    this.interId = this.props.interId
    this.listUrl=`/control-application-front/signal/config/plan/listPlan?unitId=${this.interId}`
    this.stagePics = `/control-application-front/planControl/getUnitStageAll?id=${this.interId}`
    this.saveUrl = '/control-application-front/signal/config/plan/savePlan'
    this.deleteUrl = `/control-application-front/signal/config/plan/removePlan?unitId=${this.interId}`
  }
  componentDidMount = () => {
    this.getDirTimePlanList()
    this.getInterStagePics()
  }
  // 当前路口阶段
  getInterStagePics = () => {
    axiosInstance.post(this.stagePics).then((res) => {
      const { code, list } = res.data
      if (code === '1' && list) {
        this.setState({ stagePics: list })
      }
    })
  }
  // 方案列表
  getDirTimePlanList = () => {
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
  // 添加方案
  handleAddPlan = () => {
    this.saveParams = {
      cfgPlan: {
        coordStageOrder: '',
        cyclelen: 0,
        id: 0,
        offset: 20,
        phaseplanid: 0,
        planname: '新方案',
        planno: 0,
        unitId: this.interId,
      },
      cfgPlanStageChain: [],
      id: 0,
    }
    const { dirTimePlanList } = this.state
    const len = dirTimePlanList ? dirTimePlanList.length : 0
    const newPlanNo = len === 0 ? 1 : dirTimePlanList[len - 1].cfgPlan.planno + 1
    this.saveParams.cfgPlan.planno = newPlanNo
    this.setState({ isAddEdit: true, editInfos: this.saveParams })
  }
  // 添加阶段列表
  handleAddStage = () => {
    this.setState({ isAddStageList: true })
  }
  handleCancelStage = () => {
    this.setState({ isAddStageList: false })
  }
  // 选择阶段列表
  handleStageRadio = (e) => {
    const { stage } = e.target
    this.addInnerStage = {
      id: '',
      planno: this.saveParams.cfgPlan.planno,
      stageId: stage.id,
      stageImage: stage.stage_image,
      stageOrder: stage.stageno,
      stageTime: 0,
      unitId: stage.unit_id,
    }
  }
  // 确定添加阶段
  handleSaveInnerState = () => {
    this.saveParams.cfgPlanStageChain.push(this.addInnerStage)
    console.log(this.saveParams)
    this.setState({ editInfos: this.saveParams, isAddStageList: false })
  }
  // 修改阶段时间
  handleStageTimeChange = (e) => {
    const { value } = e.target
    const indexs = e.target.getAttribute('indexs')
    const { cfgPlanStageChain } = this.saveParams
    cfgPlanStageChain[indexs].stageTime = value
    const totalTime = (cfgPlanStageChain.map(item => item.stageTime)).reduce((a, b) => parseInt(a) + parseInt(b))
    this.saveParams.cfgPlan.cyclelen = totalTime
    if (this.stageTimer) {
      clearTimeout(this.stageTimer)
      this.stageTimer = null
    }
    this.stageTimer = setTimeout(() => {
      this.setState({ editInfos: this.saveParams })
    }, 600)
  }
  handleSelectChange = (val, options) => {
    this.saveParams.cfgPlan.coordStageOrder = val
  }
  // 修改输入框参数
  handlePlanmsgChange = (e) => {
    const { value } = e.target
    const pName = e.target.getAttribute('pname')
    this.saveParams.cfgPlan[pName] = value
  }
  // 保存添加方案
  handleSaveAddPlan = () => {
    axiosInstance.post(this.saveUrl, this.saveParams).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.getDirTimePlanList()
        this.setState({ isAddEdit: false })
      }
      message.info(res.data.message)
    })
  }
  // 删除方案
  handleDeletePlan = (e) => {
    const planNo = e.target.getAttribute('planno')
    const { confirm } = Modal
    const selfThis = this
    confirm({
      title: '确定要删除吗？',
      className: 'confirmBox',
      onOk() {
        selfThis.handleRemovePlan(planNo)
      },
    })
  }
  handleRemovePlan = (planNo) => {
    axiosInstance.post(`${this.deleteUrl}&planNo=${planNo}`).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.getDirTimePlanList()
      }
      message.info(res.data.message)
    })
  }
  // 删除阶段
  handleMinusStage = () => {
    const { cfgPlanStageChain } = this.saveParams
    if (cfgPlanStageChain.length === 1) {
      message.info('至少保留一个阶段')
      return
    }
    cfgPlanStageChain.pop()
    const totalTime = (cfgPlanStageChain.map(item => item.stageTime)).reduce((a, b) => parseInt(a) + parseInt(b))
    this.saveParams.cfgPlan.cyclelen = totalTime
    this.setState({ editInfos: this.saveParams })
  }
  // 取消添加
  handleCancelAddPlan = () => {
    this.setState({ isAddEdit: false })
  }
  // 编辑方案
  handleEditPlan = (planInfo) => {
    this.saveParams = JSON.parse(JSON.stringify(planInfo))
    this.setState({ editInfos: this.saveParams, isAddEdit: true })
  }
  render() {
    const { dirTimePlanList, stagePics, isAddEdit, isAddStageList, editInfos } = this.state
    return (
      <div className="paramsTable">
        <span className="addBtn" onClick={this.handleAddPlan}>新增方案</span>
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
              const coordinate = item.cfgPlanStageChain && item.cfgPlanStageChain.length > 0 ?
                item.cfgPlanStageChain.filter(phaseMsg => phaseMsg.stageId === item.cfgPlan.coordStageOrder) : []
              const coordinateStage = coordinate.length > 0 ? this.globalImgUrl + coordinate[0].stageImage : null
              return (
              <div className="paramsTr" key={item.id}>
                <div className="paramsTd">{item.cfgPlan.planno}</div>
                <div className="paramsTd">{item.cfgPlan.planname}</div>
                <div className="paramsTd">
                  {
                    item.cfgPlanStageChain.map((child, index)=>{
                      return (
                        <div style={{height:"100%"}} key={child.id}>
                          { index !== 0 && <span className="arrowsIcon">→</span> }
                          <span>{child.stageTime}</span>
                          <img src={this.globalImgUrl + child.stageImage} width="35px" height="35px" alt="" />
                        </div>
                      )
                    })
                  }
                </div>
                <div className="paramsTd">{item.cfgPlan.cyclelen}</div>
                <div className="paramsTd">
                  { coordinateStage && <img src={coordinateStage} width="35px" height="35px" alt="" /> }
                </div>
                <div className="paramsTd">{item.cfgPlan.offset}</div>
                <div className="paramsTd">
                  <span className="editBtn" onClick={() => { this.handleEditPlan(item) }}>编辑</span>
                  <span className="editBtn" planno={item.cfgPlan.planno} onClick={this.handleDeletePlan}>删除</span>
                </div>
              </div>
              )
            })
          }
        </div>
        {
          isAddEdit &&
          <div className="editInfoBox">
            <div className="editPelMsg">
              <div className="editItem">
                <div className="eitems">
                  <span className="itemTxt">方案号：</span>
                  <input
                    type="text"
                    className="editInput pl10"
                    pname="planno"
                    key={editInfos && editInfos.cfgPlan.planno}
                    defaultValue={editInfos && editInfos.cfgPlan.planno}
                    onChange={this.handlePlanmsgChange}
                  />
                </div>
                <div className="eitems">
                  <span className="itemTxt">方案名称：</span>
                  <input
                    type="text"
                    className="editInput pl10"
                    pname="planname"
                    key={editInfos && editInfos.cfgPlan.planname}
                    defaultValue={editInfos && editInfos.cfgPlan.planname}
                    onChange={this.handlePlanmsgChange}
                  />
                </div>
              </div>
              <div className="editItem">
                <div className="eitems">
                  <span className="itemTxt">协调时间：</span>
                  <input
                    type="text"
                    className="editInput pl10"
                    pname="offset"
                    key={editInfos && editInfos.cfgPlan.offset}
                    defaultValue={editInfos && editInfos.cfgPlan.offset}
                    onChange={this.handlePlanmsgChange}
                  />
                </div>
                <div className="eitems">
                  <span className="itemTxt">协调阶段：</span>
                  <Select key={editInfos && editInfos.cfgPlan.coordStageOrder} defaultValue={editInfos && editInfos.cfgPlan.coordStageOrder} onChange={this.handleSelectChange}>
                    {
                      editInfos &&
                      editInfos.cfgPlanStageChain.map((item) => (
                        <Option key={item.stageId} value={item.stageId} pname="direction">
                          <img src={this.globalImgUrl + item.stageImage} alt=""/>
                        </Option>
                      ))
                    }
                  </Select>
                </div>
              </div>
              <div className="editItem">
                <div className="eitems">
                  <span className="itemTxt">周期长：</span>
                  <input
                    disabled
                    type="text"
                    className="editInput pl10"
                    key={editInfos && editInfos.cfgPlan.cyclelen}
                    defaultValue={editInfos && editInfos.cfgPlan.cyclelen}
                    onChange={this.handleLaneNoChange}
                  />
                </div>
              </div>
              <div className="editItem">
                <div className="eitems">
                  <span className="itemTxt">阶段配时：</span>
                  {
                    editInfos && editInfos.cfgPlanStageChain.map((item, index) => {
                      return (
                        <div className="stageInfo">
                          <p><img src={this.globalImgUrl + item.stageImage} alt="" width="30px" height="30px" /></p>
                          <p><input type="text" defaultValue={item.stageTime} className="editInput stageInput" indexs={index} onChange={this.handleStageTimeChange} /></p>
                        </div>
                      )
                    })
                  }
                  <div className="stageInfo">
                    <p><MinusOutlined className="addIcon" onClick={this.handleMinusStage} /></p>
                    <p><PlusOutlined className="addIcon" onClick={this.handleAddStage} /></p>
                  </div>
                </div>
              </div>
              {
                isAddStageList &&
                <div className="stageListmsg">
                  <Radio.Group name="stageRadio" onChange={this.handleStageRadio}>
                    {
                      stagePics &&
                      stagePics.map((item) => {
                        return (
                          <div className="stageInfo" key={item.id}>
                            <p><Radio value={item.id} stage={item}></Radio></p>
                            <p><img src={this.globalImgUrl + item.stage_image} alt="" width="30px" height="30px" /></p>
                          </div>
                        )
                      })
                    }
                  </Radio.Group>
                  <div className="activeBtn">
                    <div className="btn" onClick={this.handleSaveInnerState}>确定</div>
                    <div className="btn" onClick={this.handleCancelStage}>取消</div>
                  </div>
                </div>
              }
              <div className="activeBtn">
                <div className="btn" onClick={this.handleSaveAddPlan}>确定</div>
                <div className="btn" onClick={this.handleCancelAddPlan}>取消</div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default TimePlan
