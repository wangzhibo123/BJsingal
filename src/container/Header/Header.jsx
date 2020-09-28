import React, { Component } from 'react'
import './Header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      innerHeight: 0,
      navKey: null,
    }
    this.navItems = [
      { name: '实时监视', id: '0-1', children: [] },
      {
        name: '中心控制', id: '0-2',
        children: [{ name: '路口监控', id: '1-2', path: '' }, { name: '干线监控', id: '2-2', path: '' }, { name: '子区监控', id: '3-2', path: '' }, { name: '时间表控制', id: '4-2', path: '' }]
      },
      { name: '预案控制', id: '0-3', children: [] },
      {
        name: '信号优化', id: '0-4',
        children: [{ name: '局信号优化', id: '1-4', path: '' }, { name: '区信号优化', id: '2-4', path: '' }, { name: '路口优化', id: '3-4', path: '' }, { name: '区域优化', id: '4-4', path: '' }]
      },
      { name: '效果评价', id: '0-5', children: [] },
      { name: '运维管理', id: '0-6', children: [] },
      { name: '综合管理', id: '0-7', children: [] },
      { name: '系统管理', id: '0-8', children: [] },
    ]
  }
  handleEnterNav = (currentNav) => {
    this.setState({
      innerHeight: currentNav.children.length * 30,
      navKey: currentNav.id,
    })
  }
  handleLeaveNav = () => {
    this.setState({ innerHeight: 0, navIndex: null, })
  }
  render() {
    const { innerHeight, navKey } = this.state
    return (
      <div className="headerWrapper">
        <div className="header" />
        <div className="headNav">
          <div className="navItem">
            {
              this.navItems.map((item, index) => {
                if (index < 4) {
                  return (
                    <div className="nav" key={item.id} onMouseEnter={() => this.handleEnterNav(item)} onMouseLeave={this.handleLeaveNav}>
                      {item.name}
                      {
                        item.children.length ?
                        <div className="innerNav" style={{ height: navKey === item.id ? innerHeight + 'px' : 0 }}>
                          {
                            item.children.map(items => (<div className="innerItem" key={items.id}>{items.name}</div>))
                          }
                        </div> : null
                      }
                    </div>
                  )
                }
              })
            }
          </div>
          <div className="navItem itemRight">
            {
              this.navItems.map((item, index) => {
                if (index > 3) {
                  return (
                    <div className="nav" key={item.id}>
                      {item.name}
                      {
                        item.children.length ?
                        <div className="innerNav">
                          {
                            item.children.map(items => (<div className="innerItem" key={items.id}>{items.name}</div>))
                          }
                        </div> : null
                      }
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Header
