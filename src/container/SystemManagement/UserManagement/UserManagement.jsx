import React, { Component } from 'react'
import styles from '../SystemManagement.module.scss'

class UserManagement extends Component {
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
            <div className={styles.listName}>用户管理</div>
            <div className={styles.listContent}>
              用户管理列表
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserManagement