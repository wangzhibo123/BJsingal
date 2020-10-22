import React, { Component } from 'react'
import { Select } from 'antd'
import { SearchOutlined, DoubleLeftOutlined, DoubleRightOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import './InterMonitor.scss'

import Time from '../imgs/iconT.png'
import cneter from '../imgs/iconM.png'
import feel from '../imgs/iconS.png'
import hand from '../imgs/iconH.png'
import allred from '../imgs/iconR.png'
import yellow from '../imgs/IconY.png'
import phasePic from '../imgs/01.png'
import allRed from '../imgs/allRed.png'
import allYellow from '../imgs/allY.png'
import InterTimeList from './InterTimeList/InterTimeList'
import Graph from './Graph/Graph'

const { Option } = Select
class InterMonitor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModify: false,
      confListLeft: 0,
      modifyStage: false,
      modeIndex: null,
    }
    this.confItems = ['基础信息', '信号参数', '一口一档', '交通指标', '时间表控制']
    // this.confItems = ['信号灯组参数', '检测器参数', '车道参数', '相位参数', '阶段参数', '配时方案', '方案相序表', '方案配时表', '日计划表', '调度表' ]
    this.controlItems = [
      // { text: '时间表控制', img: Time },
      
      // { text: '感应控制', img: feel },
      
      { text: '全红控制', img: allred },
      { text: '闪黄控制', img: yellow },
      { text: '中心控制', img: cneter },
      { text: '中心手控', img: hand },
    ]
  }
  handleModifyConf = () => {
    this.setState({
      isModify: true,
      modifyStage: true,
      modeIndex: 0,
    })
  }
  handleCancelModify = () => {
    this.setState({
      isModify: false,
      modifyStage: false,
      modeIndex: null,
    })
  }
  handleshowConfList = () => {
    const { confListLeft } = this.state
    this.setState({ confListLeft: confListLeft === 0 ? '-260px' : 0 })
  }
  handleControlMode = (indexs) => {
    this.setState({ modeIndex: indexs })
  }
  render() {
    const { isModify, confListLeft, modifyStage, modeIndex } = this.state
    return (
      <div className="interMonitorBox">
        <div className="interMessage">
          <div className="title">路口监视</div>
          <div className="monitorDetails">
            <InterTimeList />
            <div className="roadTrends">
              <Graph />
            </div>
            <div className="conditionList">
              <div className="titles">各路口实时路况</div>
                <div className="listBox">
                  <div className="listTh">
                    <span className="innterBorder" />
                    <div className="listTd" />
                    <div className="listTd">拥堵状态</div>
                    <div className="listTd">平均车速</div>
                    <div className="listTd">饱和度</div>
                  </div>
                  <div className="listTr">
                    <span className="innterBorder" />
                    <div className="listTd">北路</div>
                    <div className="listTd">40</div>
                    <div className="listTd">37km/h</div>
                    <div className="listTd">2.0</div>
                  </div>
                  <div className="listTr">
                    <span className="innterBorder" />
                    <div className="listTd">南路</div>
                    <div className="listTd">32</div>
                    <div className="listTd">35km/h</div>
                    <div className="listTd">1.8</div>
                  </div>
                  <div className="listTr">
                    <span className="innterBorder" />
                    <div className="listTd">东路</div>
                    <div className="listTd">38</div>
                    <div className="listTd">34km/h</div>
                    <div className="listTd">1.7</div>
                  </div>
                  <div className="listTr">
                    <span className="innterBorder" />
                    <div className="listTd">西路</div>
                    <div className="listTd">27</div>
                    <div className="listTd">40km/h</div>
                    <div className="listTd">1.1</div>
                  </div>
                </div>
            </div>
            <div className="confList" style={{ left: confListLeft }}>
              <div className="showConf" onClick={this.handleshowConfList}>
                {
                  confListLeft === 0 ?
                  <DoubleLeftOutlined className="showIcon" /> : <DoubleRightOutlined className="showIcon" />
                }
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
              <div className="controlMsg">
                <span className="controlItems">网络状态：<span className="itemsVal">在线</span></span>
                <span className="controlItems">控制模式：<span className="itemsVal">中心控制</span></span>
                <span className="controlItems">是否锁定：<span className="itemsVal">未锁</span></span>
                <span className="controlItems">方案号：<span className="itemsVal">4</span></span>
                <span className="controlItems">周期：<span className="itemsVal">141</span></span>
              </div>
              <div className="modifyBox">
                <div className="modifyBtn modify">运行</div>
                <div className="modifyBtn modify">复位</div>
              </div>
              <div className="controlMode">
                <div className="modeItems">
                  {
                    this.controlItems.map((item, index) => {
                      return (
                        <div className={`controlItem ${modeIndex === index && 'itemHover'}`} key={item.text} onClick={() => this.handleControlMode(index)}>
                          <div className="icon"><img src={item.img} alt="" /></div>
                          <div className="text">{item.text}</div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="controlDetails">
                  
                </div>
              </div>
              {
                modeIndex < 3 &&
                <div className="excutePlan">
                  <span>执行方案</span>
                  {
                    modifyStage ?
                    <span className="planName">
                      <Select defaultValue="1">
                        <Option key="1" value="1">日
                        常方案(周期120)</Option>
                      </Select>
                    </span> :
                    <span className="planName">日常方案(周期120)</span>
                  }
                </div>
              }
              <div className="controlContent">
                {
                  modeIndex > 2 ?
                    <div className="lockPhase">
                      <div className="lockText">锁定相位</div>
                      <div className="phaseList">
                        {
                          modeIndex === 3 &&
                          <div>
                            <img className="itemPic" src={phasePic} alt=""/>
                            <img className="itemPic" src={phasePic} alt=""/>
                          </div>
                        }
                        {
                          modeIndex === 4 &&
                          <img className="itemPic" src={allRed} alt="" />
                        }
                        {
                          modeIndex === 5 &&
                          <img className="itemPic" src={allYellow} alt="" />
                        }
                      </div>
                    </div> :
                    <div className="phaseMsg">
                    {
                      modifyStage ?
                        <div className="phaseTime">
                          <div className="phaseinner"><img src={phasePic} alt=""/></div>
                          <div className="phaseinner times">
                            <span>40</span>
                            <div className="caculate"><CaretUpOutlined className="add" /><CaretDownOutlined className="subtract" /></div>
                          </div>
                        </div> :
                        <div className="phaseTime">
                          <div className="phaseinner"><img src={phasePic} alt=""/></div>
                          <div className="phaseinner times">40</div>
                        </div>
                    }
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
