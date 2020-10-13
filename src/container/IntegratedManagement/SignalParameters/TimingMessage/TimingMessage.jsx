import React, { Component } from 'react'
import { Modal } from 'antd'
import styles from './TimingMessage.module.scss'

class TimingMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteConfirm: false, // 确认删除弹窗
    }
  }
  componentDidMount() {
  }
  // 显示提示框
  deleteList() {
    console.log(123)
    this.setState({
      deleteConfirm: true,
    })
  }
  // 确定删除
  deleteOks = () => {

  }
  // 取消删除
  deleteCancel = () => {
    this.setState({
      deleteConfirm: false,
    })
  }
  render() {
    const { deleteConfirm } = this.state
    return (
      <div className={styles.mountingTable}>
        <div className={styles.mountingThead}>
          <div className={styles.mountingTh} />
          <div className={styles.mountingTh}>方案号</div>
          <div className={styles.mountingTh}>方案名称</div>
          <div className={styles.mountingTh}>周期(s)</div>
          <div className={styles.mountingTh}>协调相位号</div>
          <div className={styles.mountingTh}>协调相位差(秒)</div>
          <div className={styles.mountingTh}>开始时间</div>
          <div className={styles.mountingTh}>结束时间</div>
          <div className={`${styles.mountingTh} ${styles.mountingThs}`}>关联接段</div>
          <div className={styles.mountingTh}>操作</div>
        </div>
        <div className={styles.mountingTbody}>
          <div className={styles.mountingTr}>
            <div className={styles.mountingTd}>01</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={`${styles.mountingTd} ${styles.mountingThs}`}>
              <dl>
                <dt>1</dt>
                <dd>30</dd>
              </dl>
              <dl>
                <dt>1</dt>
                <dd>30</dd>
              </dl>
              <dl>
                <dt>1</dt>
                <dd>30</dd>
              </dl>
              <dl>
                <dt>1</dt>
                <dd>30</dd>
              </dl>
            </div>
            <div className={styles.mountingTd}>
              <span className={styles.deviceMsg}>修改</span>
              <span onClick={() => this.deleteList()} className={styles.deviceMsg}>删除</span>
            </div>
          </div>
          <div className={styles.mountingTr}>
            <div className={styles.mountingTd}>01</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={`${styles.mountingTd} ${styles.mountingThs}`}>
              <dl>
                <dt>2</dt>
                <dd>30</dd>
              </dl>
              <dl>
                <dt>2</dt>
                <dd>30</dd>
              </dl>
              <dl>
                <dt>2</dt>
                <dd>30</dd>
              </dl>
              <dl>
                <dt>2</dt>
                <dd>30</dd>
              </dl>
            </div>
            <div className={styles.mountingTd}>
              <span className={styles.deviceMsg}>修改</span>
              <span onClick={() => this.deleteList()} className={styles.deviceMsg}>删除</span>
            </div>
          </div>
          <div className={styles.mountingTr}>
            <div className={styles.mountingTd}>01</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={styles.mountingTd}>****</div>
            <div className={`${styles.mountingTd} ${styles.mountingThs}`}>
              <dl>
                <dt>2</dt>
                <dd>30</dd>
              </dl>
              <dl>
                <dt>2</dt>
                <dd>30</dd>
              </dl>
              <dl>
                <dt>2</dt>
                <dd>30</dd>
              </dl>
              <dl>
                <dt>2</dt>
                <dd>30</dd>
              </dl>
            </div>
            <div className={styles.mountingTd}>
              <span className={styles.deviceMsg}>修改</span>
              <span onClick={() => this.deleteList()} className={styles.deviceMsg}>删除</span>
            </div>
          </div>
        </div>
        <Modal
          title="确定删除?"
          visible={deleteConfirm}
          onOk={this.deleteOks}
          onCancel={this.deleteCancel}
        />
      </div>
    )
  }
}

export default TimingMessage