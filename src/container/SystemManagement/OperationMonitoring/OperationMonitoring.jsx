import React, { Component } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import styles from '../SystemManagement.module.scss'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

class OperationMonitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: null,
      isUpdate: null,
      switchingCenterFlag: true,
    }
    this.confItems =[
      { confname: '主中心平台', id: null }, 
      { confname: '房山分中心', id: null },
      { confname: '通州分中心', id: null }, 
      { confname: '昌平分中心', id: null }, 
      { confname: '门头沟分中心', id: null },
      { confname: '大兴分中心', id: null },
      { confname: '顺义分中心', id: null },
      { confname: '怀柔分中心', id: null },
      { confname: '平谷分中心', id: null },
      { confname: '密云分中心', id: null },
      { confname: '延庆分中心', id: null }
    ]
  }
  updatePopLayer = (e) => {
    e.stopPropagation()
    this.setState({ isUpdate: !this.state.isUpdate })
  }
  tabsCallback = (key) => {
    console.log(key);
  }
  // 回到首页
  comeBackHomePage = () => {
      this.setState({ activeIndex: null, switchingCenterFlag: true })
    }
  // 显示分中心
    handleShowBranchCenter = (activeIndex) => {
      this.setState({ activeIndex, switchingCenterFlag: null })
    }
  componentDidMount = () => {
    document.addEventListener('click', (e) => {
      if(e.target !== this.domBox){
        this.setState({
          isUpdate:null
        })
      }
    })
  }
  render() {
    const { activeIndex, isUpdate, switchingCenterFlag } = this.state
    return (
      <div className={styles.WrapperContent}>
        {
          isUpdate ? 
          <div className={styles.updatePopLayer}>
            <div className={styles.updateTit}>一键更新<CloseOutlined title='关闭' onClick={(e) => this.updatePopLayer(e)} className={styles.closeIcon} /></div>
            <div className={styles.updateCon}>
              <span>
              已发现可更新系统，当前系统版本号为：<br />
              主中心：V2.11<br />
              分中心：V2.11<br />
              上次更新时间：2020-10-18 12:00:00
              </span>
              <span style={{padding:'10px 0 0 70px'}}>
                <i className={styles.updateIcon} />
                版本号：V2.12<br />
                更新范围：主中心及分中心<br />
                发布时间：2020-10-25 12:00:00
              </span>
              <span style={{textAlign:'right',paddingTop:'36px'}}><em onClick={(e) => this.updatePopLayer(e)}>取消更新</em><em onClick={(e) => this.updatePopLayer(e)}>立即更新</em></span>
            </div>
          </div> : null
        }
        <div className={styles.contentBox}>
          <div className={styles.title}>运行监控</div>
          <div className={styles.content} style={{margin:'0 10px',height:'calc(100% - 60px)',background:'#041639'}}>
            <div className={styles.listContent} style={{border:'none',display:'flex', justifyContent:'center', flexWrap:'wrap',height:'calc(100% - 35px)'}}>
              <div className={styles.confList}>
                <div className={`${styles.confTitle} ${activeIndex === null ? styles.currentTitle : ''}`} onClick={this.comeBackHomePage}>北京市公安局交通管理局<span className={styles.innterBorder} /></div>
                <ul className={styles.confUl}>
                  {
                    this.confItems.map((item, i) => (
                      <li className={`${styles.confLi} ${activeIndex === i ? styles.currentLi : ''}`} key={item.confname} onClick={() => this.handleShowBranchCenter(i)}>{item.confname}<span className={styles.innterBorder} /></li>
                    ))
                  }
                </ul>
              </div>
              <div className={styles.rightListContent}>
                <div className={styles.redTitle}>主中心——接口服务器接口服务异常;通州分中心——控制优化CPU平均利用率已达60%</div>
                {
                  switchingCenterFlag ? 
                  <div className={styles.centerHomeBox}>
                    <img src={require('../../imgs/centerPic.png')} />
                  </div> : 
                  <div className={styles.centerHomeBox} style={{flexDirection:'column'}}>
                    <div className={styles.centerCpuBox}>
                      <div className={styles.cpuItem}>
                        <dl className={styles.dlPos}>
                          <dt>CPU：</dt>
                          <dt>硬盘：</dt>
                          <dt>内存：</dt>
                          <dt>网络：</dt>
                        </dl>
                        <div className={styles.dlRel}>
                          <dl>
                              <dd className={styles.ddImg}>
                                <img src={require('../../imgs/error.png')} />
                              </dd>
                              <dd>xx服务器</dd>
                              <dd>192.168.101.102</dd>
                            </dl>
                          {[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,9,9,0].map(item => {
                            return <dl>
                              <dd className={styles.ddImg}>
                                <img src={require('../../imgs/success.png')} />
                              </dd>
                              <dd>xx服务器</dd>
                              <dd>192.168.101.102</dd>
                            </dl>
                            })
                          }
                        </div>
                      </div>
                    </div>
                    <div className={styles.centerCpuBox}>
                    <Tabs defaultActiveKey="1" onChange={this.tabsCallback}>
                      <TabPane tab="程序" key="1">
                        <div className={styles.tabListBox}>1</div>
                      </TabPane>
                      <TabPane tab="性能" key="2">
                        <div className={styles.tabListBox}>2</div>
                      </TabPane>
                      <TabPane tab="用户" key="3">
                        <div className={styles.tabListBox}>3</div>
                      </TabPane>
                    </Tabs>
                    </div>
                  </div>
                }
                <div className={styles.versionUpdateBox}>系统当前版本：V1.00.120401，系统更新版本：V1.00.120401，<em ref={(input) => { this.domBox = input}} onClick={(e) => this.updatePopLayer(e)}>立即更新</em></div>
              </div>
            </div>
            <div style={{width:'100%',height:'35px',borderTop:'1px solid rgba(0, 141, 250, 0.2)'}}></div>
          </div>
        </div>
      </div>
    )
  }
}
export default OperationMonitoring