import React from 'react'
import { Select, Menu } from 'antd'
import { SearchOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons'
import InterMsg from '../InterMsg/InterMsg'
import LineCharts from '../../../components/LineCharts/LineCharts'
import publics from '../Evaluate.module.scss'
const { Option } = Select
const { SubMenu } = Menu

class Area extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interTree: null,
      expendskey: [],
      congestionTimeData: {"legend":["区域平均拥堵延时","区域平均拥堵延时-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"区域平均拥堵延时","type":"line","data":["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],"itemStyle":{"normal":{"color":"#44f0ff"}}},{"name":"区域平均拥堵延时-对比","type":"line","data":["1.20","1.16","1.05","1.10","1.11","1.13","0.98","1.01","0.91","1.14","1.47","1.13","1.19","1.16","1.23","1.20","1.24","1.17","1.18","1.18","1.25","1.28","1.21","1.24","1.24","1.19","1.16","1.11","1.17","1.15","1.16","1.19","1.21","1.17","1.27","1.31","1.47","1.26","1.29","1.35","1.33","1.38","1.35","1.34","1.29","1.31","1.21","1.25"],"itemStyle":{"normal":{"color":"#ff9d00"}}}]},
      areadelaytimeData: {"legend":["区域平均延误时间","区域平均延误时间-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"区域平均延误时间","type":"line","data":["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],"itemStyle":{"normal":{"color":"#44f0ff"}}},{"name":"区域平均延误时间-对比","type":"line","data":["9.89","7.19","6.45","4.43","7.27","6.81","4.63","14.21","0.00","5.78","19.25","7.34","12.41","15.41","23.07","15.24","19.18","17.39","21.39","17.77","21.35","31.04","21.37","19.81","19.76","13.68","12.56","8.68","18.57","12.75","13.71","16.21","17.70","18.12","23.13","31.60","33.68","23.89","21.92","29.28","29.73","30.44","23.44","24.99","27.68","26.92","15.50","25.23"],"itemStyle":{"normal":{"color":"#ff9d00"}}}]},
      areaAvgspeedData: {"legend":["区域平均速度","区域平均速度-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"区域平均速度","type":"line","data":["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],"itemStyle":{"normal":{"color":"#44f0ff"}}},{"name":"区域平均速度-对比","type":"line","data":["30.83","32.48","32.75","33.60","34.67","33.23","36.22","29.73","46.50","32.29","23.38","35.44","29.37","30.43","27.24","27.99","26.43","27.38","25.55","27.65","25.36","23.65","26.63","26.91","27.19","28.25","29.25","31.42","27.76","28.06","28.97","27.02","27.04","26.69","25.24","22.77","22.50","24.39","24.43","23.69","22.95","22.94","24.92","24.86","24.64","24.16","28.06","24.51"],"itemStyle":{"normal":{"color":"#ff9d00"}}}]},
      circularDatas: null,
      ctlregionName: null,
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
      { names: '路口流量', params: JSON.parse(JSON.stringify(this.chartsParams)), fn: this.props.getInterFlow, exportUrl: '/dws//appExtend/getInterexport' }, // exportExcel/getInterFlow
      { names: '路口延误时间', params: JSON.parse(JSON.stringify(this.chartsParams)), fn: this.props.getInterDelayTime, exportUrl: '/dws/exportExcel/getInterDelayTime' },
      { names: '路口停车次数', params: JSON.parse(JSON.stringify(this.chartsParams)), fn: this.props.getInterStopNum, exportUrl: '/dws/exportExcel/getInterStopNum' },
      { names: '路口排队', params: JSON.parse(JSON.stringify(this.chartsParams)), fn: this.props.getInterQueue, exportUrl: '/dws/exportExcel/getInterQueueLenth' },
      { names: '路口旅行时间', params: JSON.parse(JSON.stringify(this.chartsParams)), fn: this.props.getInterSaturation, exportUrl: '/dws/exportExcel/getInterSaturation' },
      { names: '路口平均速度', params: JSON.parse(JSON.stringify(this.chartsParams)), fn: this.props.getInterRatio, exportUrl: '/dws/exportExcel/getInterRatio' },
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
          <div className={publics.title}>区域评价</div>
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
            <h3 className={publics.interName}>当前区域 : 区域评价</h3>
            <InterMsg
              {...this.props}
              msgName="区域平均拥堵延时"
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
                    区域平均拥堵延时
                    <span className={publics.chartsRoom} dataname="congestionTimeData" chartsname="区域平均拥堵延时" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.congestionTimeData && this.state.congestionTimeData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.congestionTimeData} /> : null ) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem} style={{minWidth:'49%'}}>
                  <div className={publics.itemTitle}>
                    区域平均延误时间
                    <span className={publics.chartsRoom} dataname="areadelaytimeData" chartsname="区域平均延误时间" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.areadelaytimeData && this.state.areadelaytimeData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.areadelaytimeData} /> : null ) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem}>
                  <div className={publics.itemTitle}>
                    区域平均速度
                    <span className={publics.chartsRoom} dataname="areaAvgspeedData" chartsname="区域平均速度" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.areaAvgspeedData && this.state.areaAvgspeedData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.areaAvgspeedData} /> : null ) :
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

export default Area
