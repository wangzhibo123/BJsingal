import React, { Component } from 'react'
import { Select } from 'antd'
import { SearchOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import './InterMonitor.scss'

import Time from '../imgs/iconT.png'
import cneter from '../imgs/iconM.png'
import feel from '../imgs/iconS.png'
import hand from '../imgs/iconH.png'
import allred from '../imgs/iconR.png'
import yellow from '../imgs/IconY.png'

const { Option } = Select
class InterMonitor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModify: false,
      controlContent: '',
    }
    this.confItems = ['信号灯组参数', '检测器参数', '车道参数', '相位参数', '阶段参数', '配时方案', '方案相序表', '方案配时表', '日计划表', '调度表' ]
    this.controlItems = [
      { text: '时间表控制', img: Time },
      { text: '中心控制', img: cneter },
      { text: '感应控制', img: feel },
      { text: '中心手控', img: hand },
      { text: '全红控制', img: allred },
      { text: '闪黄控制', img: yellow },
    ]
  }
  handleModifyConf = () => {
    this.setState({ isModify: true })
  }
  handleCancelModify = () => {
    this.setState({ isModify: false })
  }
  render() {
    const { isModify, controlContent } = this.state
    return (
      <div className="interMonitorBox">
        <div className="interMessage">
          <div className="title">路口监视</div>
          <div className="monitorDetails">
            <div className="confList">
              <div className="showConf">
                <DoubleLeftOutlined className="showIcon" />
                <DoubleRightOutlined className="showIcon" />
              </div>
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
              <div className="controlMode">
                <div className="modeText">控制模式</div>
                <div className="controlDetails">
                  {
                    this.controlItems.map((item) => {
                      return (
                        <div className="controlItem" key={item.text}>
                          <div className="icon"><img src={item.img} alt="" /></div>
                          <div className="text">{item.text}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              {
                controlContent === 'default' &&
                <div className="excutePlan">
                  <span>执行方案</span><span className="planName">日常方案(周期120)</span>
                </div>
              }
              <div className="controlContent">
                {
                  controlContent === 'default' ?
                    <div className="phaseMsg">
                      <div className="phaseTime">
                        <div className="phaseinner">1</div>
                        <div className="phaseinner times">40</div>
                      </div>
                    </div> : controlContent === 'handCenter' ?
                    <div className="lockPhase">
                      <div className="lockText">锁定相位</div>
                      <div className="phaseList">
                        <div className="itemPic">
                          {/* 放相位图片 */}
                        </div>
                      </div>
                    </div> :
                    <div className="lockPhase">
                      <div className="lockText">全红控制</div>
                      <div className="phaseList">
                        <div className="itemPic">
                          {/* 放相位图片 */}
                        </div>
                      </div>
                    </div>
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
