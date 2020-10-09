import React, { Component } from 'react'
import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './InterMonitor.scss'

const { Option } = Select
class InterMonitor extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.confItems = ['信号灯组参数', '检测器参数', '车道参数', '相位参数', '阶段参数', '配时方案', '方案相序表', '方案配时表', '日计划表', '调度表' ]
  }
  render() {
    return (
      <div className="interMonitorBox">
        <div className="interMessage">
          <div className="title">路口监视</div>
          <div className="monitorDetails">
            <div className="confList">
              <div className="interSearch">
                <Select defaultValue="1">
                  <Option key="1" value="1">北京市</Option>
                </Select>
                <span className="searchInput">
                  <input type="text" className="inputBox" placeholder="查询..." />
                  <SearchOutlined className="searchIcon" />
                </span>
              </div>
              <ul className="confUl">
                {
                  this.confItems.map(item => (<li className="confLi" key={item}>{item}</li>))
                }
              </ul>
            </div>
            <div className="controlExecute">
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InterMonitor
