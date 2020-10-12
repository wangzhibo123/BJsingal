import React, { Component } from 'react'
import { Pagination } from 'antd';
import styles from '../SystemManagement.module.scss'

class OperationLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount = () => {
    
  }
  onPageChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  }
  render() {
    return (
      <div className={styles.WrapperContent}>
        <div className={styles.contentBox}>
          <div className={styles.title}></div>
          <div className={styles.content}>
            <div className={styles.listName}>操作日志</div>
            <div className={styles.searchContent}>
              <div className={styles.searchItem}>
                <div className={styles.searchInput}>
                  关键词：<input type="text" className={styles.inputBox} placeholder="请输入" />
                </div>
                <div className={styles.searchInput}>
                  功能模块：<input type="text" className={styles.inputBox} placeholder="请输入" />
                </div>
                <div className={styles.searchInput}>
                  操作时间：<input type="text" className={styles.inputBox} placeholder="请输入" /> 至 <input type="text" className={styles.inputBox} placeholder="请输入" />
                </div>
              </div>
              <div className={styles.searchItem}>
                <div className={styles.searchBtn}>查询</div>
              </div>
            </div>
            <div className={styles.exportBtn}><span>导出数据表</span></div>
            <div className={styles.listContent}>
              <div className={styles.listThead}>
                <span>操作模块</span>
                <span>操作内容</span>
                <span>操作时间</span>
                <span>操作用户</span>
                <span>操作用户机IP</span>
                <span>故障描述</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
            </div>
            <div className={styles.pagination}>
              <div className={styles.page}><span className={styles.count}>当前共{100}条，每页显示10条</span><Pagination showQuickJumper defaultCurrent={1} total={100} onChange={this.onPageChange} /></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default OperationLog