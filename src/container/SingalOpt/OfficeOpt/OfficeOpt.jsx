import React, { Component } from 'react'
import { Progress } from 'antd';
import './officeOpt.scss'

import mapConfiger from '../../utils/minemapConf'
import GraphPlus from '../../../components/GraphPlus/GraphPlus'
import Graph from './Graph/Graph'
class OfficeOpt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
    }
    this.sortColors = ['#00BAFF', '#FF8400', '#9600FF', '#00FFD8', '#FF8400', '#00BAFF']
  }
  componentDidMount = () => {
    this.renderMap()
  }
  addMarker = () => {
    if (this.map) {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'green'
      const marker = new window.mapabcgl.Marker(el)
              .setLngLat([116.391,  39.911])
              .addTo(this.map);
      console.log(marker)
    }
  }
  renderMap = () => {
    mapConfiger.zoom = 11
    const map = new window.mapabcgl.Map(mapConfiger)
    map.addControl(new window.mapabcgl.NavigationControl());
    const options = {
      minzoom: 1, // 路况显示的最小级别(1-24)
      maxzoom: 24, // 路况显示的最大级别(1-24)
      type: 'vector', // 路况图层类型:vector(矢量),raster(栅格)
      refresh: 30*1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on('load', () => {
      map.trafficLayer(true, options);
      this.addMarker()
    })
    this.map = map
  }
  randomData = () => {  
    return Math.round(Math.random()*500);  
  } 
  handleCutMap = () => {
    this.setState({ mainHomePage: false }, () => {
      this.renderMap()
    })
  }
  render() {
    const { mainHomePage } = this.state
    return (
      <div className="officeOptWrapper">
        <div className="container">
          <div className="asideLeft">
            <div className="asideItem">
              <div className="title">优化路口统计</div>
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
              <div className="title">优化原因占比统计</div>
              <div className="itemContent">
                <div className="runRate">
                  <GraphPlus colors={{startColor: 'rgba(21,55,83,.6)', endColor: 'rgba(0,207,253,.6)', lidColor: '#00C5FA'}} />
                </div>
              </div>
            </div>
            <div className="asideItem">
              <div className="title">优化后指标影响统计</div>
              <div className="itemContent">
                <div className="holdRate">
                  <GraphPlus colors={{startColor: 'rgba(21,55,83,.6)', endColor: 'rgba(154,143,1,.6)', lidColor: '#9A8F01'}} />
                </div>
              </div>
            </div>
          </div>
          <div className="asideRight">
            <div className="asideItem" style={{flex:1.5}}>
              <div className="title">优化执行率</div>
              <div className="itemContent">
                {
                  [1,2,3,4,5,6,7,8,9,10].map((item,i) => {
                    return <div className="progressNowBox">
                            <i>{item}</i>
                            <em className="areaText">{"朝阳区"+item}</em>
                            <Progress strokeColor={{ from: '#007AFF', to: '#4FE2F2' }} status="active" percent={65} />
                          </div>
                  })
                }
              </div>
            </div>
            <div className="asideItem">
              <div className="title">优化未改进指数</div>
              <div className="itemContent">
                <div className="runRate">
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
            </div>
            <div className="asideItem">
              <div className="title">运行效益走势曲线</div>
              <div className="itemContent">
                <Graph />
              </div>
            </div>
          </div>
          {
            mainHomePage &&
            <div className="contentCenter">
              
            </div>
          }
          {
            !mainHomePage &&
            <div className="contentCenter">
              <div className="title">实时监控</div>
              <div className="centerMain">
                <div className="centerBox">
                  <div className="center">
                    <div className="topInfo">
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">全市</span>
                          <span>信号点位</span>
                        </div>
                        <div className="infoValue">
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
                        </div>
                      </div>
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">联网</span>
                          <span>接入点位</span>
                        </div>
                        <div className="infoValue">
                          <span className="infoNum">5</span>
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
                        </div>
                      </div>
                      <div className="info">
                        <div className="infoName">
                          <span className="infoText">离线</span>
                          <span>运行点位</span>
                        </div>
                        <div className="infoValue">
                          <span className="infoNum">2</span>
                          <span className="infoNum">3</span>
                          <span className="infoNum">3</span>
                        </div>
                      </div>
                    </div>
                    <div className="centerMap" onClick={this.handleCutMap} ref={(input) => { this.chartMapBox = input }}></div>
                  </div>
                </div>
              </div>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default OfficeOpt
