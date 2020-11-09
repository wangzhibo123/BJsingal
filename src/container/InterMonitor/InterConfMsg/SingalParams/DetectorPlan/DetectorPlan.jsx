import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select
class DetectorPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    return (
      <div className="paramsTable">
        <span className="addBtn">新增方案</span>
        <div className="paramsThead">
          <div className="paramsTh">调度方案编号</div>
          <div className="paramsTh">调度类型</div>
          <div className="paramsTh">优先级</div>
          <div className="paramsTh">调度时间</div>
          <div className="paramsTh">日计划编号</div>
          <div className="paramsTh">操作</div>
        </div>
        <div className="paramsTbody">
          <div className="paramsTr">
            <div className="paramsTd">1</div>
            <div className="paramsTd">星期</div>
            <div className="paramsTd">1</div>
            <div className="paramsTd">周一、周二</div>
            <div className="paramsTd">00001</div>
            <div className="paramsTd">
              <span className="editBtn">编辑</span>
              <span className="editBtn">删除</span>
            </div>
          </div>
          <div className="paramsTr">
            <div className="paramsTd">1</div>
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
            <div className="paramsTd">
              <span className="editBtn">保存</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DetectorPlan
