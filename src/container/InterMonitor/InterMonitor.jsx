import React, { Component } from 'react'
import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './InterMonitor.scss'

const { Option } = Select
class InterMonitor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModify: false,
    }
    this.confItems = ['信号灯组参数', '检测器参数', '车道参数', '相位参数', '阶段参数', '配时方案', '方案相序表', '方案配时表', '日计划表', '调度表' ]
  }
  handleModifyConf = () => {
    this.setState({ isModify: true })
  }
  handleCancelModify = () => {
    this.setState({ isModify: false })
  }
  render() {
    const { isModify } = this.state
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
                  this.confItems.map(item => (<li className="confLi" key={item}>{item}<span className="innterBorder" /></li>))
                }
              </ul>
            </div>
            <div className="controlExecute">
              <div className="modifyBox">
                {
                  isModify ?
                    <React.Fragment>
                      <div className="modifyBtn" onClick={this.handleCancelModify}>取消</div>
                      <div className="modifyBtn" style={{ color: '#fff' }}>执行</div>
                    </React.Fragment> :
                    <div className="modifyBtn modify" onClick={this.handleModifyConf}>修改</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InterMonitor
