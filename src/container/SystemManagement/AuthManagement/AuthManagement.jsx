import React, { Component } from 'react'
import { Pagination, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import styles from '../SystemManagement.module.scss'

class AuthManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount = () => {
    
  }
  render() {
    return (
      <div className={styles.WrapperContent}>
        <div className={styles.contentBox}>
          <div className={styles.title}></div>
          <div className={styles.content}>
            <div className={styles.listName}>授权管理</div>
            <div className={styles.listContent}>
              <div className={styles.listThead}>
                <span>职位描述</span>
                <span>功能权限</span>
                <span>创建时间</span>
                <span>操作</span>
                <span>是否启用</span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
              </div>
              <div className={styles.listItem}>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>******</span>
                <span>
                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                </span>
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
export default AuthManagement