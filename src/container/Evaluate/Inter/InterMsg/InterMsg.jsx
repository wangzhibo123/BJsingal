import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { DatePicker, Select } from 'antd'

import LineCharts from '../../../../components/LineCharts/LineCharts'

import styles from './InterMsg.module.scss'

class InterMsg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchName: 'search',
      groupType: 'inter',
    }
    this.directions = [{ name: '左转', num: '1' }, { name: '直行', num: '2' }, { name: '右转', num: '3' }, { name: '掉头', num: '4' }]
    this.dirMsg = [{ name: '北', num: '1' }, { name: '东', num: '2' }, { name: '南', num: '3' }, { name: '西', num: '4' }, { name: '东北', num: '5' }, { name: '东南', num: '6' }, { name: '西南', num: '7' }, { name: '西北', num: '8' }]
  }
  componentDidMount = () => {

  }
  handleTimeChange = (options, value, indicator, pname) => {
    this.props.getNewParams(indicator, pname, value)
  }
  handleSearchCharts = (e) => {
    const searchName = e.target.getAttribute('searchname')
    const indicatorName = e.target.getAttribute('indicatorname')
    this.setState({ searchName })
    if (searchName.endsWith('Loop')) {
      return
    }
    if (searchName === 'search') {
      this.props.getIndicatorData(indicatorName)
    } else if (searchName === 'export') {
      this.props.getExportData(indicatorName)
    } else {
      this.props.getCompareTime(indicatorName, searchName)
    }
  }
  handleDropChange = (value, options) => {
    if (options instanceof Array) {
      const values = options.map(item => item.key)
      const { indicatorname, pname } = options[0].props
      this.props.getNewParams(indicatorname, pname, values.join(','))
    } else {
      const { indicatorname, pname } = options.props
      this.props.getNewParams(indicatorname, pname, value)
      if (pname === 'group_type') {
        this.setState({ groupType: options.key })
      }
    }
  }
  handleCompareChange = (value, options) => {
    console.log(value, options)
    const { indicatorname } = options.props
    const searchName = options.key
    if (searchName.endsWith('Loop') || searchName === '0') {
      return
    }
    this.props.getCompareTime(indicatorname, options.key)
  }
  render() {
    const { Option } = Select
    const { searchName, groupType } = this.state
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
            pname="compare_end_date"
            style={{ minWidth: '100px' }}
            format="YYYY-MM-DD"
            defaultValue={moment(endComDate)}
            onChange={(options, value) => { this.handleTimeChange(options, value, msgName, 'compare_end_date') }}
          />
          <span style={{ marginLeft: '10px' }}>时间间隔：</span>
          <Select defaultValue="5mi" style={{ width: '90px', height: '30px', marginLeft: '5px' }} onChange={this.handleDropChange}>
            <Option key="5mi" value="5mi" indicatorname={msgName} pname="tp">5分钟</Option>
            {/* <Option key="5mi" value="10mi" indicatorname={msgName} pname="tp">10分钟</Option>
            <Option key="5mi" value="15mi" indicatorname={msgName} pname="tp">15分钟</Option> */}
          </Select>
          <Select defaultValue="对比选择" style={{ width: '100px', height: '30px', marginLeft: '5px' }} onChange={this.handleCompareChange}>
            <Option key="0" value="对比选择" indicatorname={msgName}>对比选择</Option>
            <Option key="week" value="上周同比" indicatorname={msgName}>上周同比</Option>
            <Option key="month" value="上月同比" indicatorname={msgName}>上月同比</Option>
            <Option key="year" value="去年同比" indicatorname={msgName}>去年同比</Option>
            <Option key="weekLoop" value="上周环比" indicatorname={msgName}>上周环比</Option>
            <Option key="monthLoop" value="上月环比" indicatorname={msgName}>上月环比</Option>
            <Option key="yearLoop" value="去年环比" indicatorname={msgName}>去年环比</Option>
          </Select>
          <span style={{ marginLeft: '10px' }}>统计类型：</span>
          <Select defaultValue="按路口统计" onChange={this.handleDropChange} disabled={msgName === '路口饱和度'}>
            <Option value="按路口统计" key="inter" indicatorname={msgName} pname="group_type">按路口统计</Option>
            <Option value="按方向统计" key="dir" indicatorname={msgName} pname="group_type">按方向统计</Option>
            <Option value="按转向统计" key="turn" indicatorname={msgName} pname="group_type">按转向统计</Option>
          </Select>
          {/* <div
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
          >上月同比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'year' })}
            searchname="year"
            indicatorname={msgName}
            onClick={this.handleSearchCharts}
          >去年同比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'weekLoop' })}
            searchname="weekLoop"
            onClick={this.handleSearchCharts}
            indicatorname={msgName}
          >上周环比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'monthLoop' })}
            searchname="monthLoop"
            onClick={this.handleSearchCharts}
            indicatorname={msgName}
          >上月环比
          </div>
          <div
            className={classNames({ [styles.searchBtn]: true, [styles.searchActive]: searchName === 'yearLoop' })}
            searchname="yearLoop"
            indicatorname={msgName}
            onClick={this.handleSearchCharts}
          >去年环比
          </div> */}
        </div>
        <div className={styles.chartsSearch}>
          {/* <span>统计类型：</span>
          <Select defaultValue="按路口统计" onChange={this.handleDropChange} disabled={msgName === '路口饱和度'}>
            <Option value="按路口统计" key="inter" indicatorname={msgName} pname="group_type">按路口统计</Option>
            <Option value="按方向统计" key="dir" indicatorname={msgName} pname="group_type">按方向统计</Option>
            <Option value="按转向统计" key="turn" indicatorname={msgName} pname="group_type">按转向统计</Option>
          </Select> */}
          {
            groupType !== 'inter' &&
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {
                (groupType === 'dir' || groupType === 'turn') &&
                <React.Fragment>
                  <span style={{ marginLeft: '10px' }}>方向：</span>
                  <Select
                    defaultValue={['北', '东', '南', '西', '东北', '东南', '西南', '西北']}
                    mode="multiple"
                    style={{ width: '470px', height: '30px', marginLeft: '5px' }}
                    onChange={this.handleDropChange}
                  >
                    {
                      this.dirMsg.map((items) => {
                        return (
                          <Option value={items.name} key={items.num} indicatorname={msgName} pname="ft_dir_8_no">{items.name}</Option>
                        )
                      })
                    }
                  </Select>
                </React.Fragment>
              }
              {
                groupType === 'turn' &&
                <React.Fragment>
                  <span style={{ marginLeft: '10px' }}>转向：</span>
                  <Select
                    defaultValue={['左转', '直行', '右转', '掉头']}
                    mode="multiple"
                    style={{ width: '300px', height: '30px', marginLeft: '5px' }}
                    onChange={this.handleDropChange}
                  >
                    {
                      this.directions.map((items) => {
                        return (
                          <Option value={items.name} key={items.num} indicatorname={msgName} pname="turn_dir_no">{items.name}</Option>
                        )
                      })
                    }
                  </Select>
                </React.Fragment>
              }
            </div>
          }
          <div style={{justifyContent:"flex-end",display:"flex",flex:1,paddingRight:"357px"}}>
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
          
        </div>
        {/* <LineCharts {...this.props} chartsDatas={this.props.chartsDatas} /> */}
      </div>
    )
  }
}

export default InterMsg
