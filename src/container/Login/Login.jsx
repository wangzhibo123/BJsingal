import React, { Component } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './Login.scss'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleLogin = () => {
        this.props.history.push('/home')
        setTimeout(() => {
            React.globalvarUrl = '12345665343212'
        }, 1000)
    }
    render() {
        return (
            <div className="loginWrapper">
                <div className="loginTitle">
                    <div className="title" />
                </div>
                <div className="loginContent">
                    <div className="left">
                        <div className="content" />
                    </div>
                    <div className="right">
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
            </div>
        )
    }
}

export default Login
