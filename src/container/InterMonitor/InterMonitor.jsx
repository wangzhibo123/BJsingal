import React, { Component } from 'react'
import { Select } from 'antd'
import {
  SearchOutlined, DoubleLeftOutlined, DoubleRightOutlined, CaretUpOutlined, CaretDownOutlined, LeftCircleOutlined,
  RightCircleOutlined, UpCircleOutlined, DownCircleOutlined,
} from '@ant-design/icons'
import './InterMonitor.scss'

import axiosInstance from '../utils/getInterfaceData'
import cneter from '../imgs/iconM.png'
import hand from '../imgs/iconH.png'
import allred from '../imgs/iconR.png'
import yellow from '../imgs/IconY.png'
import phasePic from '../imgs/01.png'
import test1 from '../imgs/test1.png'

import InterTimeList from './InterTimeList/InterTimeList'
import Graph from './Graph/Graph'
import InterConfMsg from './InterConfMsg/InterConfMsg'

const { Option } = Select
class InterMonitor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModify: false,
      confListLeft: 0,
      modifyStage: false,
      modeIndex: null,
      moveLeft: null,
      moveRight: null,
      moveUp: null,
      moveDown: null,
      trafficInfoList: null,
      interConfigMsg: null,
      trendChartsData: null,
    }
    this.confItems = [
      { confname: '基础信息', id: 'interBase' }, { confname: '信号参数', id: 'singalParams' },
      { confname: '一口一档', id: null }, { confname: '交通指标', id: null }, { confname: '时间表控制', id: null }
    ]
    this.controlItems = [
      { text: '全红控制', img: allred, },
      { text: '闪黄控制', img: yellow },
      { text: '中心控制', img: cneter },
      { text: '中心手控', img: hand },
    ]
    this.interId = this.props.match.params.id
    this.modeUrl = '/control-application-front/unitMontitor/getControlModeById?unit_id=1'
    this.trafficUrl = '/control-application-front/unitMontitor/getRealtimeTrafficById?unit_id=1'
    this.trendUrl = '/control-application-front/unitMontitor/getRoadTrendById?unit_id=1'
    this.messageUrl = `/control-application-front/unitMontitor/getUnitInfoById?unit_id=${this.interId}`
  }
  componentDidMount = () => {
    this.getControlMode()
    this.getTrafficInfo()
    this.getRoadTrend()
    this.getInterInfo()
  }
  // 路口信息
  getInterInfo = () => {
    axiosInstance.post(this.messageUrl).then((res) => {
      console.log(res)
    })
  }
  // 获取实时状态控制模式
  getControlMode = () => {
    axiosInstance.post(this.modeUrl).then((res) => {
      console.log(res)
    })
  }
  // 获取实时路况
  getTrafficInfo = () => {
    axiosInstance.post(this.trafficUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1') {
        this.setState({ trafficInfoList: list })
      } else {
        this.setState({ trafficInfoList: null })
      }
    })
  }
  // 24小时路况趋势
  getRoadTrend = () => {
    axiosInstance.post(this.trendUrl).then((res) => {
      const { code, list } = res.data
      if (code === '1' && list.length) {
        const jamdurArr = list.map(item => item.jamdur)
        const speedArr = list.map(item => item.speed)
        const timeArr = list.map(item => item.time)
        const trendCharts = { jamdurArr, speedArr, timeArr }
        this.setState({ trendChartsData: trendCharts })
      } else {
        this.setState({ trendChartsData: null })
      }
    })
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
  handleToggleInter = (e) => {
    const dir = e.currentTarget.getAttribute('dir')
    this.setState({ [dir]: true }, () => {
      setTimeout(() => {
        this.setState({ [dir]: false })
      }, 600)
    })
  }
  handleShowInterConf = (confName) => {
    this.setState({ interConfigMsg: confName })
  }
  hanldleCloseInterConf = () => {
    this.setState({ interConfigMsg: null })
  }
  render() {
    const { confListLeft, modeIndex, moveLeft, moveRight, moveUp, moveDown, trafficInfoList, interConfigMsg, trendChartsData } = this.state
    return (
      <div className="interMonitorBox">
        <div className="interMessage">
          <span className="slideLeft slideIcon" dir="moveLeft" onClick={this.handleToggleInter}><LeftCircleOutlined /></span>
          <span className="slideRight slideIcon" dir="moveRight" onClick={this.handleToggleInter}><RightCircleOutlined /></span>
          <span className="slideUp slideIcon" dir="moveUp" onClick={this.handleToggleInter}><UpCircleOutlined /></span>
          <span className="slideDown slideIcon" dir="moveDown" onClick={this.handleToggleInter}><DownCircleOutlined /></span>
          <div className="interPic">
            <img className={`${moveLeft ? 'slideInLeft' : moveRight ? 'slideInRight' : moveUp ? 'slideInUp' : moveDown ? 'slideInDown' : ''}`} src={test1} alt="" />
          </div>
          {
            !!interConfigMsg &&
            <InterConfMsg closeInterConf={this.hanldleCloseInterConf} configName={interConfigMsg} interId={this.interId} />
          }
          <div className="title">当前路口-</div>
          <div className="monitorDetails">
            <InterTimeList />
            <div className="roadTrends">
              {
                trendChartsData &&
                <Graph chartsDatas={trendChartsData} />
              }
            </div>
            {/* <Example /> */}
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
                  <div className="listBody">
                    {
                      trafficInfoList &&
                      trafficInfoList.map((item) => (
                        <div className="listTr" key={item.distriction}>
                          <span className="innterBorder" />
                          <div className="listTd">{item.distriction}路</div>
                          <div className="listTd">{item.jam_dur}</div>
                          <div className="listTd">{item.speed}km/h</div>
                          <div className="listTd">{item.saturation}</div>
                        </div>
                      ))
                    }
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
                  this.confItems.map(item => (
                    <li className="confLi" key={item.confname} onClick={() => this.handleShowInterConf(item.id)}>{item.confname}<span className="innterBorder" /></li>
                  ))
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
                  <div className="phaseTime">
                    <div className="phaseinner"><img src={phasePic} alt=""/></div>
                    <div className="phaseinner times">
                      <span>540</span>
                      <div className="caculate"><CaretUpOutlined className="add" /><CaretDownOutlined className="subtract" /></div>
                    </div>
                  </div>
                  <div className="phaseTime">
                    <div className="phaseinner"><img src={phasePic} alt=""/></div>
                    <div className="phaseinner times">
                      <span>40</span>
                      <div className="caculate"><CaretUpOutlined className="add" /><CaretDownOutlined className="subtract" /></div>
                    </div>
                  </div>
                  <div className="phaseTime">
                    <div className="phaseinner"><img src={phasePic} alt=""/></div>
                    <div className="phaseinner times">
                      <span>40</span>
                      <div className="caculate"><CaretUpOutlined className="add" /><CaretDownOutlined className="subtract" /></div>
                    </div>
                  </div>
                  <div className="phaseTime">
                    <div className="phaseinner"><img src={phasePic} alt=""/></div>
                    <div className="phaseinner times">
                      <span>40</span>
                      <div className="caculate"><CaretUpOutlined className="add" /><CaretDownOutlined className="subtract" /></div>
                    </div>
                  </div>
                  <div className="phaseTime">
                    <div className="phaseinner"><img src={phasePic} alt=""/></div>
                    <div className="phaseinner times">
                      <span>40</span>
                      <div className="caculate"><CaretUpOutlined className="add" /><CaretDownOutlined className="subtract" /></div>
                    </div>
                  </div>
                  <div className="phaseTime">
                    <div className="phaseinner"><img src={phasePic} alt=""/></div>
                    <div className="phaseinner times">
                      <span>40</span>
                      <div className="caculate"><CaretUpOutlined className="add" /><CaretDownOutlined className="subtract" /></div>
                    </div>
                  </div>
                  <div className="phaseTime">
                    <div className="phaseinner"><img src={phasePic} alt=""/></div>
                    <div className="phaseinner times">
                      <span>40</span>
                      <div className="caculate"><CaretUpOutlined className="add" /><CaretDownOutlined className="subtract" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InterMonitor
