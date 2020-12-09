import React, { Component } from 'react'
import { Select } from 'antd'
import phasePic from '../../../../imgs/01.png'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class DayPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listNos: null
    }
    this.interId = this.props.interId
    this.listUrl = `/control-application-front/signal/config/dailyPlan/listDailyPlan?unitId=${this.interId}`
  }
  componentDidMount = () => {
    this.getDailyPlanList()
  }
  getDailyPlanList = () => {
    axiosInstance.get(this.listUrl).then((res) => {
      console.log(res)
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
  render() {
    const { listNos, dayLists } = this.state
    return (
      <div className="paramsTable">
        <span className="addBtn">新增计划</span>
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
            listNos.map((item) => {
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
                              <span className="editBtn">插入</span>
                              <span className="editBtn">删除</span>
                            </div>
                          </div>
                        )
                      })
                    }
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
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          
          
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DayPlan
