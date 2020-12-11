import React, { Component } from 'react'
import moment from 'moment'
import { message, Select, TimePicker, Modal } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class DayPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listNos: null,
      addPlanInner: null,
      addDayPlan: null,
      planNoList: null,
      addNo: null,
      editMsg: { no: '', id: '' }
    }
    this.interId = this.props.interId
    this.planNos = `/control-application-front/signal/config/plan/listPlan?unitId=${this.interId}`
    this.listUrl = `/control-application-front/signal/config/dailyPlan/listDailyPlan?unitId=${this.interId}`
    this.deleteUrl = '/control-application-front/signal/config/dailyPlan/removeDailyPlan'
    this.saveUrl = '/control-application-front/signal/config/dailyPlan/saveDailyPlan'
  }
  componentDidMount = () => {
    this.getDailyPlanList()
    this.getPlanNos()
  }
  getPlanNos = () => {
    axiosInstance.get(this.planNos).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        this.setState({ planNoList: data })
      }
    })
  }
  getDailyPlanList = () => {
    axiosInstance.get(this.listUrl).then((res) => {
      const { code, data } = res.data
      if (code === 200 && data) {
        const listNos = []
        data.forEach((item) => {
          if (listNos.indexOf(item.dailyplanno) < 0) {
            listNos.push(item.dailyplanno)
          }
        })
        this.setState({ listNos, dayLists: data })
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
        selfThis.handleRemovePlan(id)
      },
    })
  }
  handleRemovePlan = (id) => {
    axiosInstance.post(`${this.deleteUrl}?id=${id}`).then((res) => {
      console.log(res)
      const { code } = res.data
      if (code === 200) {
        this.getDailyPlanList()
      }
      message.info(res.data.message)
    })
  }
  // 新增
  handleAddDayPlan = () => {
    this.saveParams = {
      controlmodel: 1,
      dailyplanno: 0,
      id: 0,
      planno: 0,
      starttime: '',
      unitId: this.interId,
    }
    const { listNos } = this.state
    const len = listNos.length
    const addNo = len > 0 ? listNos[len - 1] + 1 : 1
    this.saveParams.dailyplanno = addNo
    this.setState({ addDayPlan: true, addNo })
  }
  handleCancelDayPlan = () => {
    this.setState({ addDayPlan: false })
  }
  // 插入
  handleAddPlaninner = (e) => {
    this.saveParams = {
      controlmodel: 1,
      dailyplanno: 0,
      id: 0,
      planno: 0,
      starttime: '',
      unitId: this.interId,
    }
    const insertIndex = e.target.getAttribute('indexs')
    this.saveParams.dailyplanno = insertIndex
    this.setState({ addPlanInner: parseInt(insertIndex) })
  }
  handleCancelPlanInner = () => {
    this.setState({ addPlanInner: null })
  }
  handleTimeChange = (options, val, planNo) => {
    const { dayLists } = this.state
    if (planNo) {
      const childrens = dayLists.filter(items => items.dailyplanno === planNo)
      const currentTimeList = childrens.map(item => item.starttime)
      if (currentTimeList.indexOf(val) < 0) {
        this.saveParams.starttime = val
      } else {
        message.warning('时间已存在，请重新选择')
      }
    } else {
      this.saveParams.starttime = val
    }
  }
  handleParamsChange = (val, options) => {
    this.saveParams[options.pname] = val
  }
  // 保存
  handleSavePlanInner = () => {
    axiosInstance.post(this.saveUrl, this.saveParams).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.handleCancelDayPlan()
        this.handleCancelEdit()
        this.handleCancelPlanInner()
        this.getDailyPlanList()
      }
      message.info(res.data.message)
    })
  }
  // 编辑
  handleEditPlan = (e) => {
    const planNo = parseInt(e.target.getAttribute('planno'))
    const id = parseInt(e.target.getAttribute('ids'))
    this.saveParams = this.state.dayLists.find(item => item.id === id)
    this.setState({ editMsg: { no: planNo, id } })
  }
  handleCancelEdit = () => {
    this.setState({ editMsg: { no: '', id: '' } })
  }
  // 修改编号
  handleSaveaddNo = (e) => {
    this.saveParams.dailyplanno = e.target.value
  }
  render() {
    const { listNos, dayLists, addPlanInner, addDayPlan, planNoList, addNo, editMsg } = this.state
    const timeFormat = 'HH:mm'
    return (
      <div className="paramsTable">
        <span className="addBtn" onClick={this.handleAddDayPlan}>新增计划</span>
        <div className="paramsThead">
          <div className="dayPlanNo">日计划编号</div>
          <div className="paramsThBox">
            <div className="paramsTh">执行时间</div>
            <div className="paramsTh">方案号</div>
            <div className="paramsTh">控制模式</div>
            <div className="paramsTh">操作</div>
          </div>
        </div>
        <div className="paramsTbody">
          {
            listNos &&
            listNos.map((item, index) => {
              const childrens = dayLists.filter(items => items.dailyplanno === item)
              return (
                <div className="paramsTrBox" key={item}>
                  <div className="dayPlanNo">{item}</div>
                  <div className="paramsTrItem">
                    {
                      childrens.length > 0 &&
                      childrens.map((child) => {
                        return (
                          <div className="paramsTr" key={child.id}>
                            <div className="paramsTd">
                              {
                                (editMsg.no === item && editMsg.id === child.id) ?
                                <TimePicker
                                  className="planTime"
                                  format={timeFormat}
                                  allowClear={false}
                                  defaultValue={moment(child.starttime, timeFormat)}
                                  onChange={(options, val) => { this.handleTimeChange(options, val, item) }}
                                /> :
                                child.starttime
                              }
                            </div>
                            <div className="paramsTd">
                              {
                                (editMsg.no === item && editMsg.id === child.id) ?
                                <Select defaultValue={child.planno} onChange={this.handleParamsChange}>
                                  <Option key="0" value="0">请选择</Option>
                                  {
                                    planNoList &&
                                    planNoList.map((item) => (
                                      <Option key={item.cfgPlan.planno} value={item.cfgPlan.planno} pname="planno">{item.cfgPlan.planno}</Option>
                                    ))
                                  }
                                </Select> :
                                child.planno
                              }
                            </div>
                            <div className="paramsTd">
                              {
                                (editMsg.no === item && editMsg.id === child.id) ?
                                <Select defaultValue={child.controlmodel} onChange={this.handleParamsChange}>
                                  <Option key={1} value={1} pname="controlmodel">固定</Option>
                                  <Option key={2} value={2} pname="controlmodel">感应</Option>
                                </Select> :
                                child.controlmodel === 1 ? '固定' : '感应'
                              }
                            </div>
                            <div className="paramsTd">
                              {
                                (editMsg.no === item && editMsg.id === child.id) ?
                                <>
                                  <span className="editBtn" onClick={this.handleSavePlanInner}>保存</span>
                                  <span className="editBtn" planno={item} ids={child.id} onClick={this.handleCancelEdit}>取消</span>
                                </> :
                                <>
                                  <span className="editBtn" planno={item} ids={child.id} onClick={this.handleEditPlan}>编辑</span>
                                  <span className="editBtn" indexs={item} onClick={this.handleAddPlaninner}>插入</span>
                                  <span className="editBtn" onClick={this.handleDelete} id={child.id}>删除</span>
                                </>
                              }
                            </div>
                          </div>
                        )
                      })
                    }
                    {
                      addPlanInner === item &&
                      <div className="paramsTr">
                        <div className="paramsTd">
                          <TimePicker
                            className="planTime"
                            format={timeFormat}
                            allowClear={false}
                            onChange={(options, val) => { this.handleTimeChange(options, val, item) }}
                          />
                        </div>
                        <div className="paramsTd">
                          <Select defaultValue="0" onChange={this.handleParamsChange}>
                            <Option key="0" value="0">请选择</Option>
                            {
                              planNoList &&
                              planNoList.map((item) => (
                                <Option key={item.cfgPlan.planno} value={item.cfgPlan.planno} pname="planno">{item.cfgPlan.planno}</Option>
                              ))
                            }
                          </Select>
                        </div>
                        <div className="paramsTd">
                          <Select defaultValue="1" onChange={this.handleParamsChange}>
                            <Option key="1" value="1" pname="controlmodel">固定</Option>
                            <Option key="2" value="2" pname="controlmodel">感应</Option>
                          </Select>
                        </div>
                        <div className="paramsTd">
                          <span className="editBtn" onClick={this.handleSavePlanInner}>保存</span>
                          <span className="editBtn" onClick={this.handleCancelPlanInner}>取消</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              )
            })
          }
          {
            addDayPlan &&
            <div className="paramsTrBox">
              <div className="dayPlanNo">
                <input className="dayPlanno" type="text" defaultValue={addNo} onChange={this.handleSaveaddNo} />
              </div>
              <div className="paramsTrItem">
                <div className="paramsTr">
                  <div className="paramsTd">
                    <TimePicker
                      className="planTime"
                      format={timeFormat}
                      allowClear={false}
                      onChange={(options, val) => { this.handleTimeChange(options, val) }}
                    />
                  </div>
                  <div className="paramsTd">
                    <Select defaultValue="0" onChange={this.handleParamsChange}>
                      <Option key="0" value="0">请选择</Option>
                      {
                        planNoList &&
                        planNoList.map((item) => (
                          <Option key={item.cfgPlan.planno} value={item.cfgPlan.planno} pname="planno">{item.cfgPlan.planno}</Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className="paramsTd">
                    <Select defaultValue="1" onChange={this.handleParamsChange}>
                      <Option key="1" value="1" pname="controlmodel">固定</Option>
                      <Option key="2" value="2" pname="controlmodel">感应</Option>
                    </Select>
                  </div>
                  <div className="paramsTd">
                    <span className="editBtn" onClick={this.handleSavePlanInner}>保存</span>
                    <span className="editBtn" onClick={this.handleCancelDayPlan}>取消</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default DayPlan
