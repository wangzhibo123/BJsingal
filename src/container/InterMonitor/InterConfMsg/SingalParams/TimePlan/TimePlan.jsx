import React, { Component } from 'react'
import { Select } from 'antd'
import phasePic from '../../../../imgs/01.png'

const { Option } = Select
class TimePlan extends Component {
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
          <div className="paramsTh">方案号</div>
          <div className="paramsTh">方案名称</div>
          <div className="paramsTh">阶段配时</div>
          <div className="paramsTh">周期长</div>
          <div className="paramsTh">协调阶段</div>
          <div className="paramsTh">协调时间</div>
          <div className="paramsTh">操作</div>
        </div>
        <div className="paramsTbody">
          <div className="paramsTr">
            <div className="paramsTd">1</div>
            <div className="paramsTd">A</div>
            <div className="paramsTd">
              <span>40</span>
              <img src={phasePic} width="35px" height="35px" alt="" />
              <span className="arrowsIcon">→</span>
              <span>40</span>
              <img src={phasePic} width="35px" height="35px" alt="" />
            </div>
            <div className="paramsTd">140</div>
            <div className="paramsTd"><img src={phasePic} width="35px" height="35px" alt="" /></div>
            <div className="paramsTd">10</div>
            <div className="paramsTd">
              <span className="editBtn">编辑</span>
              <span className="editBtn">删除</span>
            </div>
          </div>
          <div className="paramsTr">
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
          </div>
        </div>
      </div>
    )
  }
}

export default TimePlan
