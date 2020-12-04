import React, { Component } from 'react'
import { message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './Login.scss'

import axiosInstance from '../utils/getInterfaceData'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.userName = null
    this.passWord = null
    this.trackerImgurl = '/control-application-front/file/getTrackerUrl'
  }
  componentDidMount = () => {
    this.getTrackerImgUrl()
  }
  getTrackerImgUrl = () => {
    axiosInstance.get(this.trackerImgurl).then((res) => {
      const { code, data } = res.data
      if (code === 200) {
        localStorage.setItem('ImgUrl', data)
      } else {
        message.error(res.data.message)
      }
    })
  }
  getUserLoginMsg = () => {
    if (!this.userName) {
      message.warning('请输入用户名')
    } else if (!this.passWord) {
      message.warning('请输入密码')
    }
    return this.passWord && this.userName
  }
  handleUserInput = (e) => {
    const { value } = e.target
    const pname = e.target.getAttribute('pname')
    if (pname === 'username') {
      this.userName = value
    } else {
      this.passWord = value
    }
  }
  handleLogin = () => {
    const hasUsermsg = this.getUserLoginMsg()
    if (hasUsermsg) {
      const path = this.passWord === '2' ? '/branchhome' : '/home'
      this.props.history.push(path)
    }
  }
  render() {
    return (
      <div className="loginWrapper">
        <div className="loginTitle">
          <div className="title" />
        </div>
        <div className="loginContent">
          <div className="content">
            <div className="userBox">
              <span className="inputBox">
                <UserOutlined className="inputIcon" />
                <input type="text" placeholder="请输入登录ID" pname="username" onChange={this.handleUserInput} />
              </span>
            </div>
            <div className="userBox">
              <span className="inputBox">
                <LockOutlined className="inputIcon" />
                <input type="password" placeholder="请输入密码" pname="password" onChange={this.handleUserInput} />
              </span>
            </div>
            <div className="btnBox">
              <div className="forgotpwd">
                <span className="text">忘记密码</span>
              </div>
            </div>
            <div className="btnBox">
              <div className="loginBtn" onClick={this.handleLogin}>登录</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
