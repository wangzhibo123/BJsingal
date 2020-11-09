import React, { Component } from 'react'
import { Select } from 'antd'
import './InterRelation.scss'

const { Option } = Select
class InterRelation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    return (
      <>
        <div className="confTable">
          <div className="confThead">
            <div className="confTh">路口方向</div>
            <div className="confTh">流向路口id</div>
            <div className="confTh">流向路口方向</div>
            <div className="confTh">道路长度</div>
            <div className="confTh">道路名称描述</div>
          </div>
          <div className="confTbody">
            <div className="confTr">
              <div className="confTd">北向</div>
              <div className="confTd">30308</div>
              <div className="confTd">南向</div>
              <div className="confTd">2.3</div>
              <div className="confTd">宁夏路</div>
            </div>
            <div className="confTr">
              <div className="confTd">北向</div>
              <div className="confTd">30308</div>
              <div className="confTd">南向</div>
              <div className="confTd">2.3</div>
              <div className="confTd">宁夏路</div>
            </div>
            <div className="confTr">
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
            </div>
          </div>
        </div>
        <div className="actionBtnBox">
          <div className="saveBtn">取消</div>
          <div className="saveBtn">保存</div>
        </div>
      </>
    )
  }
}

export default InterRelation

