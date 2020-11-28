import React, { Component } from 'react'
import { Pagination, Button, Input } from 'antd'
import {
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import styles from './SignalParameters.module.scss'
import TimingMessage from './TimingMessage/TimingMessage'


class SignalParameters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nowNumber: '',
    }
  }
  componentDidMount() {
  }
  // 改变关键字内容
  changeFont = (e) => {
    console.log(e.target.value)
  }
  // 改变所属区域内容
  changeRegion = () => {

  }
  // 改变路口内容
  changeIntersection = () => {

  }
  // 改变信号机控制系统内容
  changeSignal = () => {

  }
  // 点击查询
  btnSearth = () => {

  }
  // 点击分页器
  pageChange = (page, pageSize) => {

  }
  // 点击打开下拉列表
  btnOpen = () => {

  }
  render() {
    const { nowNumber } = this.state
    return (
      <div className={styles.timingWrapper}>
        <div className={styles.timingcontainer}>
          <div className={styles.titles}></div>
          <div className={styles.title}>设备管理</div>
          <div className={styles.searchBox}>
            <div><span>关键字：</span><Input onChange={this.changeFont} placeholder="" /></div>
            <div><span>所属路口：</span><Input onChange={this.changeRegion} placeholder="" /></div>
            <div><span>所属区域：</span><Input onChange={this.changeIntersection} placeholder="" /></div>
            <div><span>信号控制系统：</span><Input onChange={this.changeSignal} placeholder="" /></div>
            <div><span>设备类型：</span><Input onChange={this.changeSignal} placeholder="" /></div>
            <div><Button onClick={this.btnSearth} type="primary">查询</Button></div>
          </div>
          <div className={styles.goExcal}>
            <span>新增设备</span>
            <span>批量导入</span>
            <span>导出excel</span>
          </div>
          <div className={styles.mountingManage}>
            <div className={styles.mountingTable}>
              <div className={styles.mountingThead}>
                <div className={`${styles.mountingTh} ${styles.company}`}>所属路口</div>
                <div className={styles.mountingTh}>所属区域</div>
                <div className={styles.mountingTh}>设备编号</div>
                <div className={styles.mountingTh}>设备名称</div>
                <div className={styles.mountingTh}>设备类型</div>
                <div className={styles.mountingTh}>信号控制系统</div>
                <div className={styles.mountingTh}>设备型号</div>
                <div className={styles.mountingTh}>出厂编号</div>
                <div className={`${styles.mountingTh} ${styles.company}`}>生厂厂家</div>
                <div className={styles.mountingTh}>厂家联系电话</div>
                <div className={styles.mountingTh}>出厂日期</div>
                <div className={styles.mountingTh}>操作</div>
              </div>
              <div className={styles.mountingTbody}>
                <div>
                  <div className={styles.mountingTr}>
                    {/* <div className={styles.mountingTd}><span>{!nowNumber ? <MinusOutlined /> : <PlusOutlined />}</span></div> */}
                    <div className={`${styles.mountingTd} ${styles.company}`}>朝阳门内大街与大通胡同</div>
                    <div className={styles.mountingTd}>东城区</div>
                    <div className={styles.mountingTd}>11044</div>
                    <div className={styles.mountingTd}>相位</div>
                    <div className={styles.mountingTd}>信号机</div>
                    <div className={styles.mountingTd}>hicon</div>
                    <div className={styles.mountingTd}>sc6101</div>
                    <div className={styles.mountingTd}>10081</div>
                    <div className={`${styles.mountingTd} ${styles.company}`}>海信网络科技股份有限公司</div>
                    <div className={styles.mountingTd}>400-618-0811</div>
                    <div className={styles.mountingTd}>2019-08-12</div>
                    <div className={styles.mountingTd}>
                      <span className={styles.deviceMsg}>修改</span>
                      <span className={styles.deviceMsg}>删除</span>
                    </div>
                  </div>
                  {/* <div className={styles.mountingTrbox}>
                    <TimingMessage />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.paginationBox}>
            <Pagination size="small" onChange={this.pageChange} total={50} showQuickJumper />
            <span>共50条</span>
            <span>15条/页</span>
          </div>
        </div>
      </div>
    )
  }
}

export default SignalParameters