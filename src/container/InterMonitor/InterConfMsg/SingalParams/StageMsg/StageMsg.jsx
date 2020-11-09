import React, { Component } from 'react'
import { Select } from 'antd'
import phasePic from '../../../../imgs/01.png'

const { Option } = Select
class StageMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
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
          <div className="paramsTr">
            <div className="paramsTd">1</div>
            <div className="paramsTd">A</div>
            <div className="paramsTd">40</div>
            <div className="paramsTd">10</div>
            <div className="paramsTd"><img src={phasePic} width="35px" height="35px" alt="" /></div>
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
              <span className="editBtn">保存</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StageMsg
