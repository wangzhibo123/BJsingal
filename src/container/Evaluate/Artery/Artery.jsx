import React from 'react'
import { Select, Menu } from 'antd'
import { SearchOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons'
import InterMsg from '../InterMsg/InterMsg'
import LineCharts from '../../../components/LineCharts/LineCharts'
import publics from '../Evaluate.module.scss'
const { Option } = Select
const { SubMenu } = Menu

class Artery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interTree: null,
      expendskey: [],
      delayTimeData: {"legend":["正向-对比","反向-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向-对比","type":"line","data":["75.70","0.00","48.56","0.00","0.00","0.00","79.57","0.00","0.00","0.00","0.00","0.00","0.00","21.41","41.14","123.19","44.32","88.62","48.86","81.92","42.84","67.28","63.84","92.66","75.50","76.34","98.47","0.00","42.29","128.68","35.62","40.10","105.44","136.92","104.33","135.33","114.47","54.72","77.90","76.05","48.49","72.63","61.02","58.15","66.78","31.63","41.40","92.18"],"itemStyle":{"normal":{"color":"#ff9d00"}}},{"name":"反向-对比","type":"line","data":["0.00","0.00","60.31","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","50.10","89.92","63.50","0.00","0.00","32.65","25.18","55.23","27.63","108.40","28.96","58.54","28.56","94.61","75.02","140.12","118.77","31.44","310.46","64.34","17.50","59.50","104.78","50.88","26.62","66.34","34.62","75.60","65.27","80.24","58.58","0.00","74.42"],"itemStyle":{"normal":{"color":"#0db4ff"}}}]},
      avgspeedData: {"legend":["正向-对比","反向-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向-对比","type":"line","data":["1.00","0.00","1.00","0.00","0.00","0.00","1.00","0.00","0.00","0.00","0.00","0.00","0.00","0.50","1.00","1.83","1.25","1.33","0.67","2.00","0.83","1.75","1.06","1.12","1.22","1.08","1.00","0.00","1.17","1.69","1.00","0.80","1.50","1.75","1.00","2.75","1.97","0.96","1.33","1.29","1.00","1.33","1.33","0.89","1.75","1.00","1.00","2.00"],"itemStyle":{"normal":{"color":"#ff9d00"}}},{"name":"反向-对比","type":"line","data":["0.00","0.00","2.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","1.00","1.00","1.00","0.00","0.00","1.08","1.00","0.92","1.00","1.22","1.00","1.00","0.50","1.50","1.00","1.50","1.78","1.00","3.00","1.25","0.75","0.67","1.33","1.08","0.42","1.11","0.50","1.00","0.89","1.00","1.53","0.00","1.00"],"itemStyle":{"normal":{"color":"#0db4ff"}}}]},
      stopnumData: {"legend":["正向-对比","反向-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向-对比","type":"line","data":["23.18","26.69","26.36","30.99","29.48","31.73","34.00","31.89","30.87","34.79","35.79","36.08","34.88","29.60","19.87","16.00","17.03","18.34","19.04","17.91","19.52","19.76","19.55","16.77","15.37","16.19","19.77","20.46","17.95","19.26","18.79","18.93","18.86","14.57","11.68","10.61","14.16","14.29","15.47","16.53","16.16","14.70","13.82","17.78","18.74","16.30","20.24","20.48"],"itemStyle":{"normal":{"color":"#ff9d00"}}},{"name":"反向-对比","type":"line","data":["24.89","25.84","28.57","27.22","26.27","33.29","36.49","33.47","32.53","39.37","34.27","39.69","37.16","32.11","18.67","16.37","16.35","17.61","20.28","19.42","19.65","21.25","17.83","18.64","17.99","18.22","19.58","22.88","21.35","19.35","18.71","15.49","17.66","17.16","15.28","14.60","15.48","16.84","16.60","16.03","15.41","16.04","17.86","18.98","19.38","16.17","20.81","23.60"],"itemStyle":{"normal":{"color":"#0db4ff"}}}]},
      travelTimeData: {"legend":["正向-对比","反向-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向-对比","type":"line","data":["246.31","215.14","198.82","170.49","183.79","172.52","146.25","158.83","168.61","146.16","141.95","144.41","143.52","171.89","341.09","376.42","329.27","311.92","295.06","312.86","266.47","274.40","267.72","356.03","349.44","318.78","275.59","294.57","299.44","292.29","298.33","277.96","272.37","400.56","779.74","595.26","352.93","355.53","353.44","311.33","343.83","360.65","400.76","299.96","274.55","325.26","264.81","250.61"],"itemStyle":{"normal":{"color":"#ff9d00"}}},{"name":"反向-对比","type":"line","data":["206.32","210.16","189.87","279.86","212.19","157.64","134.35","154.16","156.69","122.39","153.25","121.60","130.62","157.13","383.47","368.15","356.89","320.26","282.64","306.54","275.00","240.86","306.35","298.67","365.06","313.10","278.90","234.56","255.01","299.39","295.36","389.04","323.41","378.56","501.96","446.00","438.93","326.33","311.26","327.76","345.69","336.69","292.73","288.17","284.92","322.55","268.68","230.34"],"itemStyle":{"normal":{"color":"#0db4ff"}}}]},
      rdchlName: null,
      isShowTree: true, // 临时变量, 用于查询
      showZoomCharts: false,
      zoomChartsData: null,
      zoomChartsName: null,
      startComDate: '2020-06-10',
      endComDate: '2020-06-10',
    }
    this.setExportParams = {}
    this.chartsParams = {
      compare_end_date: '2020-06-10',
      compare_start_date: '2020-06-10',
      ft_dir_8_no: '1,2,3,4,5,6,7,8',
      group_type: 'inter',
      init_end_date: '2020-07-11 23:59',
      init_start_date: '2020-07-11 00:00',
      inter_id: '11LM1063PG0',
      tp: '5mi',
      turn_dir_no: '1,2,3,4',
    }
    this.indicators = [
      { names: '干线平均延误时间', params: JSON.parse(JSON.stringify(this.chartsParams)), fn: this.props.getTrunklineDelayTime },
      { names: '干线平均速度', params: JSON.parse(JSON.stringify(this.chartsParams)), fn: this.props.getTrunklineSpeed },
      { names: '干线停车次数', params: JSON.parse(JSON.stringify(this.chartsParams)), fn: this.props.getTrunklineStopNum },
    ]
  }
  componentDidMount = () => {

  }
  componentDidUpdate = (prevState) => {

  }
  // 转格式
  getFormData = (obj) => {
    const formData = new FormData()
    Object.keys(obj).forEach((item) => {
      formData.append(item, obj[item])
    })
    // console.log(formData)
    return formData
  }
  getIndicatorData = (names) => {
    console.log('查询..')
    this.setState({ isShowTree: null },() => {
      this.setState({ isShowTree: true })
    })
    // const indicator = this.indicators.find(item => item.names === names)
    // const chartsParams = resetParams(this.chartsParams)
    // // indicator.fn(chartsParams)
    // this.indicators.forEach((items) => {
    //   items.fn(chartsParams)
    // })
  }
  getCompareTime = (indicator, searchType) => {

    // const indicatorItem = this.indicators.find(item => item.names === indicator)
    // const { init_start_date, init_end_date } = this.chartsParams
    // const p = {
    //   start_date: init_start_date,
    //   end_date: init_end_date,
    //   type: searchType,
    // }
    // getHttp.post(`${requestUrl}${this.timeUrl}`, this.getFormData(p)).then((res) => {
    //   const { code, startDate, endDate } = res.data
    //   if (code === '1') {
    //     indicatorItem.params.compare_end_date = endDate
    //     indicatorItem.params.compare_start_date = startDate
    //     this.setState({
    //       startComDate: startDate,
    //       endComDate: endDate,
    //     })
    //     const chartsParams = resetParams(indicatorItem.params)
    //     // indicatorItem.fn(chartsParams)
    //     this.indicators.forEach((items) => {
    //       items.fn(chartsParams)
    //     })
    //   }
    // })
  }
  getNewParams = (indicator, paramsName, paramsValue) => {
    console.log(indicator, paramsName, paramsValue)
    this.chartsParams[paramsName] = paramsValue
  }
  // 图表放大查看
  handleZoomCharts = (e) => {
    const chartsName = e.currentTarget.getAttribute('chartsname')
    const dataName = e.currentTarget.getAttribute('dataname')
    console.log(dataName, this.state[dataName])
    this.setState({
      showZoomCharts: true,
      zoomChartsName: chartsName,
      zoomChartsData: this.state[dataName],
    })
  }
  handleHideZoomCharts = () => {
    this.setState({ showZoomCharts: false })
  }
  render() {
    const {  showZoomCharts, zoomChartsName, zoomChartsData, startComDate, endComDate, isShowTree } = this.state
    return (
      <div className={publics.evaluateWrapper}>
        {
          (showZoomCharts && zoomChartsData) &&
          <div className={publics.interContainer}>          
            <div className={publics.zoomChartsBox}>
              <div className={publics.zoomBox}>
                <div className={publics.itemTitle}>
                  {zoomChartsName}
                  <span className={publics.chartsRoom} onClick={this.handleHideZoomCharts}><ZoomOutOutlined /></span>
                </div>
                <LineCharts height="450px" chartsDatas={zoomChartsData} />
              </div>
            </div>
          </div>
        }
        <div className={publics.contentBox}>
          <div className={publics.title}>干线评价</div>
          <div className={publics.asideLeft}>
            <div className={publics.asideItem}>
              <div className={publics.itemContent} style={{ overflow: 'hidden' }}>
                <div className={publics.interSearch}>
                  <Select defaultValue="1">
                    <Option key="1" value="1">北京市</Option>
                  </Select>
                  <span className={publics.searchInput}>
                    <input type="text" className={publics.inputBox} placeholder="查询..." />
                    <SearchOutlined className={publics.searchIcon} />
                  </span>
                </div>
                <div className={publics.menuBox}>
                  <Menu
                    onClick={this.handleClick}
                    style={{ color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
                    mode="inline">
                    <SubMenu key="sub2" title="海淀区">
                      <SubMenu key="sub3" title="知春路拥堵应急">
                        <Menu.Item key="7">知春路与罗庄东路</Menu.Item>
                        <Menu.Item key="8">知春路与罗庄中路</Menu.Item>
                        <Menu.Item key="9">知春路与罗庄西路</Menu.Item>
                        <Menu.Item key="10">知春路与海淀黄庄路</Menu.Item>
                      </SubMenu>
                      <SubMenu key="sub3-2" title="万泉庄路"></SubMenu>
                    </SubMenu>
                    <SubMenu
                      key="sub4"
                      title="房山区"
                    >
                    </SubMenu>
                    <SubMenu
                      key="sub5"
                      title="通州区"
                    >
                    </SubMenu>
                    <SubMenu
                      key="sub6"
                      title="门头沟区"
                    >
                    </SubMenu>
                    <SubMenu
                      key="sub7"
                      title="中关村东路"
                    >
                    </SubMenu>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          <div className={publics.asideRight}>
            <h3 className={publics.interName}>当前干线 : 干线评价</h3>
            <InterMsg
              {...this.props}
              msgName="干线平均延误时间"
              getNewParams={this.getNewParams}
              getIndicatorData={this.getIndicatorData}
              getCompareTime={this.getCompareTime}
              startComDate={startComDate}
              endComDate={endComDate}
            />
            <div className={publics.interMsgBox}>
              <div className={publics.chartsWrapper}>
                <div className={publics.chartsItem} style={{minWidth:'49%'}}>
                  <div className={publics.itemTitle}>
                    干线平均延误时间
                    <span className={publics.chartsRoom} dataname="delayTimeData" chartsname="干线平均延误时间" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.delayTimeData && this.state.delayTimeData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.delayTimeData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem} style={{minWidth:'49%'}}>
                  <div className={publics.itemTitle}>
                    干线平均速度
                    <span className={publics.chartsRoom} dataname="avgspeedData" chartsname="干线平均速度" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.avgspeedData && this.state.avgspeedData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.avgspeedData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem} style={{minWidth:'49%'}}>
                  <div className={publics.itemTitle}>
                    干线停车次数
                    <span className={publics.chartsRoom} dataname="delayTimeData" chartsname="干线停车次数" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.stopnumData && this.state.stopnumData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.stopnumData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem} style={{minWidth:'49%'}}>
                  <div className={publics.itemTitle}>
                    干线行程时间
                    <span className={publics.chartsRoom} dataname="delayTimeData" chartsname="干线行程时间" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.travelTimeData && this.state.travelTimeData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.travelTimeData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Artery
