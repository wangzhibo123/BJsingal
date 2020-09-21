import React, { Component } from 'react'
import './Header.scss'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="headerWrapper">
                <div className="header" />
                <div className="headNav">
                    <div className="navItem">
                        <div className="nav">实时监视</div>
                        <div className="nav">中心控制</div>
                        <div className="nav">预案控制</div>
                        <div className="nav">信号优化</div>
                    </div>
                    <div className="navItem itemRight">
                        <div className="nav">效果评价</div>
                        <div className="nav">运维管理</div>
                        <div className="nav">综合管理</div>
                        <div className="nav">系统管理</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
