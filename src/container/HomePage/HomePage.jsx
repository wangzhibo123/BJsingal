import React, { Component } from 'react'
import './HomePage.scss'


class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.sortColors = ['#00BAFF', '#FF8400', '#9600FF', '#00FFD8', '#FF8400', '#00BAFF']
  }
  render() {
    return (
      <div className="homepageWrapper">
        <div className="container">
          <div className="asideLeft">
            <div className="asideItem">
              <div className="title">实时拥堵排名</div>
              <div className="itemContent">
                <ul className="jammedSort">
                  <li className="jammedLi">
                    <div className="areaSort"><span className="sortNo">No.1</span> 朝阳区</div>
                    <div className="sortValue">
                      <span className="progressVal" style={{ width: '80%', backgroundColor: '#00BAFF' }} />
                      <span className="value">8.0</span>
                    </div>
                  </li>
                  <li className="jammedLi">
                    <div className="areaSort"><span className="sortNo">No.2</span> 朝阳区</div>
                    <div className="sortValue">
                      <span className="progressVal" style={{ width: '70%', backgroundColor: '#FF8400' }} />
                      <span className="value">7.0</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="asideItem">
              <div className="title">运行效率</div>
              <div className="itemContent">123</div>
            </div>
            <div className="asideItem">
              <div className="title">云资源占用率</div>
              <div className="itemContent">123</div>
            </div>
          </div>
          <div className="asideRight">
            <div className="asideItem">
              <div className="title">故障报修率</div>
              <div className="itemContent">
                <div className="faultRate">
                  <div className="faultDetails">
                    <div className="faultNo" style={{ backgroundColor: '#ff0000' }}>1</div>
                    <div className="faultArea">朝阳区</div>
                    <div className="present">95%</div>
                    <div className="faultValue">
                      <div className="progress" style={{ width: '80%' }} />
                      <div className="value">130</div>
                    </div>
                  </div>
                  <div className="faultDetails">
                    <div className="faultNo" style={{ backgroundColor: '#FF7800' }}>2</div>
                    <div className="faultArea">朝阳区</div>
                    <div className="present">95%</div>
                    <div className="faultValue">
                      <div className="progress" style={{ width: '80%' }} />
                      <div className="value">130</div>
                    </div>
                  </div>
                  <div className="faultDetails">
                    <div className="faultNo" style={{ backgroundColor: '#FFD800' }}>3</div>
                    <div className="faultArea">朝阳区</div>
                    <div className="present">95%</div>
                    <div className="faultValue">
                      <div className="progress" style={{ width: '80%' }} />
                      <div className="value">130</div>
                    </div>
                  </div>
                  <div className="faultDetails">
                    <div className="faultNo" style={{ backgroundColor: '#0BB423' }}>4</div>
                    <div className="faultArea">朝阳区</div>
                    <div className="present">95%</div>
                    <div className="faultValue">
                      <div className="progress" style={{ width: '80%' }} />
                      <div className="value">130</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="asideItem">
              <div className="title">故障统计曲线图</div>
              <div className="itemContent">123</div>
            </div>
            <div className="asideItem">
              <div className="title">信号机实时状态统计</div>
              <div className="itemContent">
                <div className="singalStatus">
                  <div className="statusEach"><span className="each">区域</span><span className="each">品牌</span></div>
                  <div className="statusDetails">
                    <div className="singalMsg">
                      <div className="singalName">西门子</div>
                      <div className="presents">
                        <div className="nomals" style={{ width: '80%' }}><span>80%</span></div>
                        <div className="faults" style={{ width: '10%' }}><span>10%</span></div>
                        <div className="outlines" style={{ width: '10%' }}><span>10%</span></div>
                      </div>
                    </div>
                    <div className="singalMsg">
                      <div className="singalName">海信</div>
                      <div className="presents">
                        <div className="nomals" style={{ width: '60%' }}><span>70%</span></div>
                        <div className="faults" style={{ width: '15%' }}><span>10%</span></div>
                        <div className="outlines" style={{ width: '25%' }}><span>20%</span></div>
                      </div>
                    </div>
                    <div className="singalMsg">
                      <div className="singalName">易华录</div>
                      <div className="presents">
                        <div className="nomals" style={{ width: '80%' }}><span>80%</span></div>
                        <div className="faults" style={{ width: '10%' }}><span>10%</span></div>
                        <div className="outlines" style={{ width: '10%' }}><span>10%</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="statusInfo">
                    <div className="legendInfo"><span className="statusLegend nomal" /><span>正常</span></div>
                    <div className="legendInfo"><span className="statusLegend fault" /><span>故障</span></div>
                    <div className="legendInfo"><span className="statusLegend outline" /><span>离线</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contentCenter">
            <div className="title">实时监控</div>
            <div className="centerMain">123</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Homepage
