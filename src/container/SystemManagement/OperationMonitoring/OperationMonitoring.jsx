import React, { Component } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import styles from '../SystemManagement.module.scss'

class OperationMonitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: null,
      isUpdate: null,
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
  // 回到首页
  comeBackHomePage = () => {
      this.setState({ activeIndex: null })
    }
  // 显示分中心
    handleShowBranchCenter = (activeIndex) => {
      this.setState({ activeIndex })
    }
  componentDidMount = () => {
    document.addEventListener('click', (e) => {
      console.log(e.currentTarget, this.domBox)
    })
  }
  render() {
    const { activeIndex, isUpdate } = this.state
    return (
      <div className={styles.WrapperContent}>
        {
          isUpdate ? 
          <div className={styles.updatePopLayer}>
            <div className={styles.updateTit}>一键更新<CloseOutlined title='关闭' onClick={(e) => this.updatePopLayer(e)} className={styles.closeIcon} /></div>
            <div className={styles.updateCon}></div>
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
                <div className={styles.centerHomeBox}>
                  <img src={require('../../imgs/centerPic.png')} />
                </div>
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