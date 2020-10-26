import React from 'react'
import { Select, Menu } from 'antd'
import { SearchOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons'
import InterMsg from './InterMsg/InterMsg'
import LineCharts from '../../../components/LineCharts/LineCharts'
import publics from '../Evaluate.module.scss'
const { Option } = Select
const { SubMenu } = Menu

class Inter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interTree: null,
      expendskey: [],
      currentInterName: null,
      flowChartsData: {"legend":["路口","路口-对比"],"time":["07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55"],"series":[{"name":"路口","type":"line","data":["","","","","","","","","","","",""],"itemStyle":{"normal":{"color":"#44f0ff"}}},{"name":"路口-对比","type":"line","data":["203","183","215","205","177","201","205","196","201","174","191","203"],"itemStyle":{"normal":{"color":"#ff9d00"}}}]},
      interqueueData: {"legend":["路口","路口-对比"],"time":["07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55"],"series":[{"name":"路口","type":"line","data":["","","","","","","","","","","",""],"itemStyle":{"normal":{"color":"#44f0ff"}}},{"name":"路口-对比","type":"line","data":["72.77","97.47","90.87","101.62","95.85","105.10","73.65","114.87","95.62","90.52","94.60","121.00"],"itemStyle":{"normal":{"color":"#ff9d00"}}}]},
      intersatuationData: {"legend":["路口","路口-对比"],"time":["07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55"],"series":[{"name":"路口","type":"line","data":["","","","","","","","","","","",""],"itemStyle":{"normal":{"color":"#44f0ff"}}},{"name":"路口-对比","type":"line","data":["45.52","42.59","46.77","49.68","43.11","58.28","45.64","50.92","48.41","47.04","49.90","44.86"],"itemStyle":{"normal":{"color":"#ff9d00"}}}]},
      interstopnumData: {"legend":["路口","路口-对比"],"time":["07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55"],"series":[{"name":"路口","type":"line","data":["","","","","","","","","","","",""],"itemStyle":{"normal":{"color":"#44f0ff"}}},{"name":"路口-对比","type":"line","data":["0.68","0.57","0.76","0.66","0.59","0.89","0.77","0.80","0.66","0.68","0.72","0.56"],"itemStyle":{"normal":{"color":"#ff9d00"}}}]},
      interDelayTimeData: {"legend":["路口","路口-对比"],"time":["07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55"],"series":[{"name":"路口","type":"line","data":["","","","","","","","","","","",""],"itemStyle":{"normal":{"color":"#44f0ff"}}},{"name":"路口-对比","type":"line","data":["38.70","35.71","39.87","42.80","36.26","51.45","38.78","44.02","41.55","40.19","42.96","37.95"],"itemStyle":{"normal":{"color":"#ff9d00"}}}]},
      interratioData: {"legend":["路口","路口-对比"],"time":["07:00","07:05","07:10","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55"],"series":[{"name":"路口","type":"line","data":["","","","","","","","","","","",""],"itemStyle":{"normal":{"color":"#44f0ff"}}},{"name":"路口-对比","type":"line","data":["8.60","9.50","8.80","10.40","11.10","6.80","8.10","7.90","7.80","9.10","7.90","9.00"],"itemStyle":{"normal":{"color":"#ff9d00"}}}]},
      isShowTree: true, // 临时变量, 用于查询
      showZoomCharts: false,
      zoomChartsName: null,
      zoomChartsData: null,
      exportChartsDatas: null,
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
    // const chartsParams = this.resetParams(indicator.params) || ''
    // // indicator.fn(chartsParams) 单个指标查询
    // this.indicators.forEach((items) => {
    //   items.fn(chartsParams)
    // })
    // this.getNewExportDatas(indicator.params)
  }
  getNewExportDatas = (params) => {
    const { compare_start_date, init_start_date, inter_id } = params
    this.newExportParams.compare_start_date = compare_start_date
    this.newExportParams.init_start_date = init_start_date
    this.newExportParams.inter_id = inter_id
    // getHttp.post(`${this.newExportUrl}${this.resetParams(this.newExportParams)}`).then((res) => {
    //   console.log(res)
    //   const { code, data, maxMin } = res.data
    //   if (code === '1') {
    //     this.setState({ exportChartsDatas: data })
    //     this.maxMin = maxMin
    //     Object.keys(data).forEach((item) => {
    //       this.setExportParams[item] = { upDwon: data[item].upDown }
    //     })
    //     console.log(this.setExportParams)
    //   }
    // })
  }
  getCompareTime = (indicator, searchType) => {
    console.log('查询..')

    // const indicatorItem = this.indicators.find(item => item.names === indicator)
    // const { init_start_date, init_end_date } = indicatorItem.params
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
    //     const chartsParams = this.resetParams(indicatorItem.params)
    //     // indicatorItem.fn(chartsParams) 单个指标查询
    //     this.indicators.forEach((items) => {
    //       items.fn(chartsParams)
    //     })
    //   }
    // })
  }
  getNewParams = (indicator, paramsName, paramsValue) => {
    const indicatorItem = this.indicators.find(item => item.names === indicator)
    const resetVal = paramsValue === '按路口统计' ? 'inter' :
      paramsValue === '按方向统计' ? 'dir' :
        paramsValue === '按转向统计' ? 'turn' : paramsValue
    indicatorItem.params[paramsName] = resetVal
  }
  getExportData = (names) => {
    console.log('导出..')
    // const exportP = { picBase64Info: '' }
    // const obj = { ...this.setExportParams, ...{ interId: this.newExportParams.inter_id, maxMin: this.maxMin } }
    // exportP.picBase64Info = obj
    // getHttp.post(this.downUrl, exportP).then((res) => {
    //   const { code, docUrl } = res.data
    //   if (code === '1') {
    //     window.location.href = docUrl
    //   } else {
    //     message.info('导出失败')
    //   }
    // })
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
          <div className={publics.title}>路口评价</div>
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
            <h3 className={publics.interName}>当前路口 : 路口名称</h3>
            <InterMsg
              {...this.props}
              getNewParams={this.getNewParams}
              getIndicatorData={this.getIndicatorData}
              getCompareTime={this.getCompareTime}
              getExportData={this.getExportData}
              startComDate={startComDate}
              endComDate={endComDate}
              msgName="路口流量"
            />
            <div className={publics.interMsgBox}>
              <div className={publics.chartsWrapper}>
                <div className={publics.chartsItem}>
                  <div className={publics.itemTitle}>
                    路口流量
                    <span className={publics.chartsRoom} dataname="flowChartsData" chartsname="路口流量" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.flowChartsData && this.state.flowChartsData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.flowChartsData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem}>
                  <div className={publics.itemTitle}>
                    路口延误时间
                    <span className={publics.chartsRoom} dataname="interDelayTimeData" chartsname="路口延误时间" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.interDelayTimeData && this.state.interDelayTimeData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.interDelayTimeData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem}>
                  <div className={publics.itemTitle}>
                    路口停车次数
                    <span className={publics.chartsRoom} dataname="interstopnumData" chartsname="路口停车次数" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.interstopnumData && this.state.interstopnumData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.interstopnumData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem}>
                  <div className={publics.itemTitle}>
                    路口排队长度
                    <span className={publics.chartsRoom} dataname="interqueueData" chartsname="路口排队长度" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.interqueueData && this.state.interqueueData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.interqueueData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem}>
                  <div className={publics.itemTitle}>
                    路口旅行时间
                    <span className={publics.chartsRoom} dataname="intersatuationData" chartsname="路口饱和度" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.intersatuationData && this.state.intersatuationData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.intersatuationData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className={publics.chartsItem}>
                  <div className={publics.itemTitle}>
                    路口平均速度
                    <span className={publics.chartsRoom} dataname="interratioData" chartsname="路口平均速度" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.interratioData && this.state.interratioData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.interratioData} /> : null) :
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

export default Inter
