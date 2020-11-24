import React, { Component } from 'react'
import { message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './Login.scss'

import axiosInstance from '../utils/getInterfaceData'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
  handleLogin = () => {
    this.props.history.push('/home')
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
              <span className="inputBox"><UserOutlined className="inputIcon" /><input type="text" placeholder="请输入登录ID" /></span>
            </div>
            <div className="userBox">
              <span className="inputBox"><LockOutlined className="inputIcon" /><input type="password" placeholder="请输入密码" /></span>
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
