import React, { Component } from 'react'
import { Select } from 'antd'
import './ChannelTable.scss'

import left from '../../../imgs/left.png'
import right from '../../../imgs/right.png'

const { Option } = Select
class ChannelTable extends Component {
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
            <div className="confTh">车道序号</div>
            <div className="confTh">车道方向</div>
            <div className="confTh">车道流向</div>
            <div className="confTh">车道标识</div>
          </div>
          <div className="confTbody">
            <div className="confTr">
              <div className="confTd">1</div>
              <div className="confTd">南向</div>
              <div className="confTd">南向</div>
              <div className="confTd">
                <div className="identification">
                  <img src={left} alt="" height="100%" />
                </div>
              </div>
            </div>
            <div className="confTr">
              <div className="confTd">2</div>
              <div className="confTd">南向</div>
              <div className="confTd">南向</div>
              <div className="confTd">
                <div className="identification">
                  <img src={right} alt="" height="100%" />
                </div>
              </div>
            </div>
            <div className="confTr">
              <div className="confTd">3</div>
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd">
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

export default ChannelTable

