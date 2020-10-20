import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { DatePicker, Select } from 'antd'

import styles from './InterMsg.module.scss'

class InterMsg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchName: 'search',
    }
  }
  componentDidMount = () => {

  }
  handleTimeChange = (options, value, indicator, pname) => {
    this.props.getNewParams(indicator, pname, value)
  }
  handleDropChange = (value, options) => {
    const { indicatorname, pname } = options.props
    this.props.getNewParams(indicatorname, pname, value)
  }
  handleSearchCharts = (e) => {
    const searchName = e.target.getAttribute('searchname')
    const indicatorName = e.target.getAttribute('indicatorname')
    this.setState({ searchName })
    if (searchName === 'search') {
      this.props.getIndicatorData(indicatorName)
    } else if (searchName === 'export') {
      // this.props.getExportData(indicatorName)
    } else {
      this.props.getCompareTime(indicatorName, searchName)
    }
  }
  render() {
    const { Option } = Select
    const { searchName } = this.state
    const { msgName, startComDate, endComDate } = this.props
    return (
      <div className={styles.interMsgWrapper}>
        {/* <div className={styles.chartsTitle}>{this.props.msgName}</div> */}
        <div className={styles.chartsSearch}>
          <span>初始条件：</span>
          <DatePicker
            indicatorname={msgName}
            style={{ minWidth: '150px' }}
            showTime
            format="YYYY-MM-DD HH:mm"
            defaultValue={moment('2020-07-11 00:00')}
            onChange={(options, value) => { this.handleTimeChange(options, value, msgName, 'init_start_date') }}
          /> -
          <DatePicker
            indicatorname={msgName}
            style={{ minWidth: '150px' }}
            showTime
            format="YYYY-MM-DD HH:mm"
            defaultValue={moment('2020-07-11 23:59')}
            onChange={(options, value) => { this.handleTimeChange(options, value, msgName, 'init_end_date') }}
            suffixIcon={null}
          />
          <span style={{ marginLeft: '10px' }}>对比时间：</span>
          <DatePicker
            key={startComDate}
            indicatorname={msgName}
            style={{ minWidth: '100px' }}
            format="YYYY-MM-DD"
            defaultValue={moment(startComDate)}
            onChange={(options, value) => { this.handleTimeChange(options, value, msgName, 'compare_start_date') }}
          /> -
          <DatePicker
            key={endComDate + 'compare'}
            indicatorname={msgName}
            style={{ minWidth: '100px' }}
            format="YYYY-MM-DD"
            defaultValue={moment(endComDate)}
            onChange={(options, value) => { this.handleTimeChange(options, value, msgName, 'compare_end_date') }}
          />
          <span style={{ marginLeft: '10px' }}>时间间隔：</span>
          <Select defaultValue="30mi" style={{ width: '90px', height: '30px', marginLeft: '5px' }} onChange={this.handleDropChange}>
            <Option key="30mi" value="30mi" indicatorname={msgName} pname="tp">30分钟</Option>
          </Select>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'week' })}
            searchname="week"
            onClick={this.handleSearchCharts}
            indicatorname={msgName}
          >上周同比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'month' })}
            searchname="month"
            onClick={this.handleSearchCharts}
            indicatorname={msgName}
          >上月环比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'year' })}
            searchname="year"
            indicatorname={msgName}
            onClick={this.handleSearchCharts}
          >去年同比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'export' })}
            searchname="export"
            indicatorname={msgName}
            onClick={this.handleSearchCharts}
          >导出
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'search' })}
            searchname="search"
            onClick={this.handleSearchCharts}
            indicatorname={msgName}
          >查询
          </div>
        </div>
        {/* <LineCharts {...this.props} chartsDatas={this.props.chartsDatas} /> */}
      </div>
    )
  }
}

export default InterMsg
