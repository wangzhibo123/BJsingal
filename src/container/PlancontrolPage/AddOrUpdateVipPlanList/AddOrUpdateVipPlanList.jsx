import React from 'react'
import { Select } from 'antd'
import axiosInstance from '../../utils/getInterfaceData'
import styles from './AddOrUpdateVipPlanList.module.scss'
// getDirectionList 所有方向

class LoadingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interval_time: this.props.interval_time,
      stage_id: this.props.stage_id,
      lock_time: this.props.lock_time,
      direction_entervalue: this.props.direction_entervalue,
      direction_exitvalue: this.props.direction_exitvalue,
      unit_order: this.props.unit_order
    }
  }
  componentDidMount = () => {

  }
  componentDidUpdate = (nextProps, nextState) => {
    const { interval_time, stage_id, lock_time, direction_entervalue, direction_exitvalue, unit_order } = this.props
    if (nextProps.interval_time !== interval_time) {
      this.setState({
        interval_time: this.props.interval_time,
      })
    }
    if (nextProps.stage_id !== stage_id) {
      this.setState({
        stage_id: this.props.stage_id,
      })
    }
    if (nextProps.lock_time !== lock_time) {
      this.setState({
        lock_time: this.props.lock_time,
      })
    }
    if (nextProps.direction_entervalue !== direction_entervalue) {
      this.setState({
        direction_entervalue: this.props.direction_entervalue,
      })
    }
    if (nextProps.direction_exitvalue !== direction_exitvalue) {
      this.setState({
        direction_exitvalue: this.props.direction_exitvalue,
      })
    }
    if (nextProps.unit_order !== unit_order) {
      this.setState({
        unit_order: this.props.unit_order,
      })
    }
  }
  render() {
    const { Option } = Select
    const { interval_time, stage_id, lock_time, direction_entervalue, direction_exitvalue, disabled } = this.state
    const { getDirectionList } = this.props
    return (
      <div className={styles.boxCjild}>
        <span></span>
        <div className={styles.linboxer}>
          {/* <p><span>关联路口：</span><input onChange={this.changeLoadRouteDirection} value={unit_id} intername='unit_id' type="text" className={styles.inputBox} placeholder="关联路口" /></p> */}
          <p><span>间隔时间：</span><input onChange={(e) => this.props.changeLoadRouteDirection(e, this.props.index)} value={interval_time} intername='interval_time' type="text" className={styles.inputBox} placeholder="间隔时间" /></p>
          <p><span>锁定阶段编号：</span><input onChange={(e) => this.props.changeLoadRouteDirection(e, this.props.index)} value={stage_id} intername='stage_id' type="text" className={styles.inputBox} placeholder="锁定阶段编号" /></p>
          <p><span>锁定时长：</span><input onChange={(e) => this.props.changeLoadRouteDirection(e, this.props.index)} value={lock_time} intername='lock_time' type="text" className={styles.inputBox} placeholder="锁定时长" /></p>
          {/* <div className={styles.boxStyle}>
            <span>入口方向：</span>
            <Select
              value={direction_entervalue}
              style={{ width: 160, height: 30 }}
              onChange={(e) => this.props.changeLoadRouteDirectionSelect(e, this.props.index, 'direction_entervalue')}
            >
              {
                getDirectionList && getDirectionList.map(item => <Option key={item.id} addeditname='direction_entervalue' intername='direction_enter' style={{ width: 160, height: 30 }} >{item.code_name}</Option>)
              }

            </Select>
          </div>
          <div className={styles.boxStyle}>
            <span>出口方向：</span>
            <Select
              value={direction_exitvalue}
              style={{ width: 160, height: 30 }}
              onChange={(e) => this.props.changeLoadRouteDirectionSelect(e, this.props.index, 'direction_exitvalue')}
            >
              {
                getDirectionList && getDirectionList.map(item => <Option key={item.id} addeditname='direction_exitvalue' intername='direction_exit' style={{ width: 160, height: 30 }} >{item.code_name}</Option>)
              }

            </Select>
          </div> */}
          {/* <p><span>入口方向：</span><input onChange={(e) => this.props.changeLoadRouteDirection(e, this.props.index)} value={direction_enter} intername='direction_enter' type="text" className={styles.inputBox} placeholder="入口方向" /></p> */}
          {/* <p><span>出口方向：</span><input onChange={(e) => this.props.changeLoadRouteDirection(e, this.props.index)} value={direction_exit} intername='direction_exit' type="text" className={styles.inputBox} placeholder="出口方向" /></p> */}
          {/* <p><span>路口顺序号：</span><input onChange={(e) => this.props.changeLoadRouteDirection(e, this.props.index)} value={unit_order} intername='unit_order' type="text" className={styles.inputBox} placeholder="路口顺序号" /></p> */}
          {/* <p><span>所属特勤任务：</span><input onChange={() => this.props.changeLoadRouteDirection(this.props.index)} value={vip_road_id} intername='vip_road_id' type="text" className={styles.inputBox} placeholder="所属特勤任务" /></p> */}
        </div>
      </div>
    )
  }
}

export default LoadingPage
