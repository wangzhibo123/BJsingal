import React, { Component } from 'react'
import { Select } from 'antd'
import phasePic from '../../../../imgs/01.png'

const { Option } = Select
class DayPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    return (
      <div className="paramsTable">
        <span className="addBtn">新增计划</span>
        <div className="paramsThead">
          <div className="dayPlanNo">日计划编号</div>
          <div className="paramsThBox">
            <div className="paramsTh">直行时间</div>
            <div className="paramsTh">方案号</div>
            <div className="paramsTh">控制模式</div>
            <div className="paramsTh">操作</div>
          </div>
        </div>
        <div className="paramsTbody">
          <div className="paramsTrBox">
            <div className="dayPlanNo">1</div>
            <div className="paramsTrItem">
              <div className="paramsTr">
                <div className="paramsTd">00:00</div>
                <div className="paramsTd">00001</div>
                <div className="paramsTd">本地多时段控制</div>
                <div className="paramsTd">
                  <span className="editBtn">编辑</span>
                  <span className="editBtn">插入</span>
                  <span className="editBtn">删除</span>
                </div>
              </div>
              <div className="paramsTr">
                <div className="paramsTd">00:00</div>
                <div className="paramsTd">00001</div>
                <div className="paramsTd">本地多时段控制</div>
                <div className="paramsTd">
                  <span className="editBtn">编辑</span>
                  <span className="editBtn">插入</span>
                  <span className="editBtn">删除</span>
                </div>
              </div>
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
