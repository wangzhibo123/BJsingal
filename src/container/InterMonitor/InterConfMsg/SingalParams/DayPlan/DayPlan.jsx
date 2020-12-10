import React, { Component } from 'react'
import moment from 'moment'
import { message, Select, TimePicker } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class DayPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listNos: null,
      addPlanInner: null,
      addDayPlan: null,
    }
    this.interId = this.props.interId
    this.listUrl = `/control-application-front/signal/config/dailyPlan/listDailyPlan?unitId=${this.interId}`
    this.saveParams = {
      controlmodel: 0,
      dailyplanno: 0,
      id: 0,
      planno: 0,
      starttime: 'string',
      unitId: 0,
    }
  }
  componentDidMount = () => {
    this.getDailyPlanList()
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
  handleAddDayPlan = () => {
    this.setState({ addDayPlan: true })
  }
  handleCancelDayPlan = () => {
    this.setState({ addDayPlan: false })
  }
  handleAddPlaninner = (e) => {
    const insertIndex = e.target.getAttribute('indexs')
    this.setState({ addPlanInner: parseInt(insertIndex) })
  }
  handleCancelPlanInner = () => {
    this.setState({ addPlanInner: null })
  }
  handleTimeChange = (options, val, planNo) => {
    const { dayLists } = this.state
    const childrens = dayLists.filter(items => items.dailyplanno === planNo)
    const currentTimeList = childrens.map(item => item.starttime)
    if (currentTimeList.indexOf(val) < 0) {
      this.saveParams.starttime = val
    } else {
      message.info('时间已存在，请重新选择')
    }
  }
  render() {
    const { listNos, dayLists, addPlanInner, addDayPlan } = this.state
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
                            <div className="paramsTd">{child.starttime}</div>
                            <div className="paramsTd">{child.planno}</div>
                            <div className="paramsTd">{child.controlmodel === 1 ? '固定' : '感应'}</div>
                            <div className="paramsTd">
                              <span className="editBtn">编辑</span>
                              <span className="editBtn" indexs={index} onClick={this.handleAddPlaninner}>插入</span>
                              <span className="editBtn">删除</span>
                            </div>
                          </div>
                        )
                      })
                    }
                    {
                      addPlanInner === index &&
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
              <div className="dayPlanNo">2</div>
              <div className="paramsTrItem">
                <div className="paramsTr">
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
                    <span className="editBtn">保存</span>
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
