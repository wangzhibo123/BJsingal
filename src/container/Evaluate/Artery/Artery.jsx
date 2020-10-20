import React from 'react'
import { Select, Menu } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import InterMsg from '../InterMsg/InterMsg'
import publics from '../Evaluate.module.scss'
const { Option } = Select
const { SubMenu } = Menu

class Artery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interTree: null,
      expendskey: [],
      delayTimeData: null,
      avgspeedData: null,
      stopnumData: null,
      travelTimeData: null,
      rdchlName: null,
      isShowTree: true,
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
  getCompareTime = (indicator, searchType) => {
    const indicatorItem = this.indicators.find(item => item.names === indicator)
    const { init_start_date, init_end_date } = indicatorItem.params
    const p = {
      start_date: init_start_date,
      end_date: init_end_date,
      type: searchType,
    }
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
  render() {
    const { startComDate, endComDate } = this.state
    return (
      <div className={publics.evaluateWrapper}>
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
          </div>
        </div>
      </div>
    )
  }
}

export default Artery
