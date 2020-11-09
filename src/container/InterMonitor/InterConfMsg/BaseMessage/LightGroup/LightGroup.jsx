import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select
class LightGroup extends Component {
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
            <div className="confTh">灯组序号</div>
            <div className="confTh">方向</div>
            <div className="confTh">灯组类型</div>
          </div>
          <div className="confTbody">
            <div className="confTr">
              <div className="confTd">南向</div>
              <div className="confTd">130308</div>
              <div className="confTd">南向</div>
            </div>
            <div className="confTr">
              <div className="confTd">南向</div>
              <div className="confTd">130308</div>
              <div className="confTd">南向</div>
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

export default LightGroup

