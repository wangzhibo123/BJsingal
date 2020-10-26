import React, { Component } from 'react'
import styles from './TimeTableMessage.module.scss'
class TimingMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.mountingTable}>
        <div className={styles.mountingThead}>
          <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"16px"}}>序号</div>
          <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"16px"}}>日期类型</div>
          <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"16px"}}>时间</div>
          <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"16px"}}>功能</div>
          <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"16px"}}>方案</div>
          <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"16px"}}>方案描述</div>
          <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"16px"}}>优先级</div>
        </div>
        <div className={styles.mountingTbody}>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
          <div className={styles.mountingTr}>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
            <div style={{display:"flex",flex:2,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>周一，周二，周三，周四，周五，周六，周日</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>00：01</div>
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案调用</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>方案一</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>描述</div>
            <div style={{display:"flex",flex:0.8,justifyContent:"center",alignItems:"center",fontSize:"15px"}}>1</div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default TimingMessage