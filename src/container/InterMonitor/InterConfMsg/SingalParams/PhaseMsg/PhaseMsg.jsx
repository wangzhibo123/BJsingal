import React, { Component } from 'react'
import { Select } from 'antd'
import phasePic from '../../../../imgs/01.png'

const { Option } = Select
class PhaseMsg extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    return (
      <div className="paramsTable">
        <span className="addBtn">新增相位</span>
        <div className="paramsThead">
          <div className="paramsTh">相位序号</div>
          <div className="paramsTh">相位名称</div>
          <div className="paramsTh">相位特征</div>
          <div className="paramsTh">相位标识</div>
          <div className="paramsTh">放行人行道方向</div>
          <div className="paramsTh">最大率</div>
          <div className="paramsTh">最小率</div>
          <div className="paramsTh">红黄时间</div>
          <div className="paramsTh">黄灯时间</div>
          <div className="paramsTh">全红时间</div>
          <div className="paramsTh">操作</div>
        </div>
        <div className="paramsTbody">
          <div className="paramsTr">
            <div className="paramsTd">1</div>
            <div className="paramsTd">A</div>
            <div className="paramsTd">非关键</div>
            <div className="paramsTd"><img src={phasePic} width="35px" height="35px" alt="" /></div>
            <div className="paramsTd">东向西</div>
            <div className="paramsTd">40</div>
            <div className="paramsTd">10</div>
            <div className="paramsTd">5</div>
            <div className="paramsTd">2</div>
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
            <div className="paramsTd">东向西</div>
            <div className="paramsTd">40</div>
            <div className="paramsTd">10</div>
            <div className="paramsTd">5</div>
            <div className="paramsTd">2</div>
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

export default PhaseMsg
