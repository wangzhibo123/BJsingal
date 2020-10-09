import React, { Component } from 'react'
import { Menu, Input, DatePicker, Button, Select } from 'antd'
import { EditOutlined, } from '@ant-design/icons';
import styles from './PlancontrolPage.module.scss'
import mapConfiger from '../utils/minemapConf'
const { SubMenu } = Menu;
class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
    }
  }
  componentDidMount = () => {
    this.renderMap()
  }
  addMarker = () => {
    if (this.map) {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'green'
      const marker = new window.mapabcgl.Marker(el)
        .setLngLat([116.391, 39.911])
        .addTo(this.map);
    }
  }
  gettitletops = (isShow) => {
    this.setState({
      Istitletops: isShow,
    })
  }
  renderMap = () => {
    mapConfiger.zoom = 11
    const map = new window.mapabcgl.Map(mapConfiger)
    map.addControl(new window.mapabcgl.NavigationControl());
    const options = {
      minzoom: 1, // 路况显示的最小级别(1-24)
      maxzoom: 24, // 路况显示的最大级别(1-24)
      type: 'vector', // 路况图层类型:vector(矢量),raster(栅格)
      refresh: 30 * 1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on('load', () => {
      map.trafficLayer(true, options);
      this.addMarker()
    })
    this.map = map
  }
  handleClick = e => {
    console.log('click ', e);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const { Option } = Select
    const { mainHomePage, Istitletops } = this.state
    return (
      <div className={styles.PlancontrolPageWrapper}>
        <div className={styles.reserveplan}>
          <div />
          <span>添加预案</span>
        </div>
        <div className={`${styles.reserveplan} ${styles.reserveplanTwo}`}>
          <div />
          <span>添加预案</span>
        </div>
        <div className={styles.addMessge}>
          <div className={styles.syetem_top}>
            <div className={styles.syetem_item}>
              <span className={styles.item}>勤务名称:</span>
              <div className={styles.inSle}><Input onChange={this.handleKeyWordChange} /></div>
            </div>
            <div className={styles.syetem_item}>
              <span className={styles.item}>备注描述:</span>
              <div className={styles.inSle}><Input onChange={this.handleKeyWordChange} /></div>
            </div>
            <div className={styles.syetem_item}>
              <span className={styles.item}>计划时间:</span>
              <div className={styles.inSle}><DatePicker showTime onChange={this.handleStartTimeChange} /></div>
              <span style={{ margin: '0 10px' }}>-</span>
              <div className={styles.inSle}><DatePicker showTime onChange={this.handleEndTimeChange} /></div>
            </div>
            {/* <span className={styles.searchBtn} onClick={this.handleSearchLogList}>查询</span> */}
          </div>
          <div className={styles.addroadBox}>
            <div className={styles.addroad}>
              <div className={styles.headerTop}>
                勤务路口
                <Button size='small' type="primary">添加路口</Button>
              </div>
              <div className={styles.headerBox}>
                <div className={styles.headerList}>
                  <div className={styles.headerTitle}>
                    <span>青秀中新(ip:45.6.218.114)</span>
                    <span>X</span>
                  </div>
                  <div className={styles.headercenter}>
                    <div className={styles.imgBox}>
                      <div className={styles.imgBoxer}>

                      </div>
                    </div>
                    <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                  </div>
                  <div className={styles.headerBom}>
                    <span>预设勤务阶段:</span>
                    <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                    <Button size='small' type="primary">保存</Button>
                  </div>
                </div>
                <div className={styles.headerList}>
                  <div className={styles.headerTitle}>
                    <span>青秀中新(ip:45.6.218.114)</span>
                    <span>X</span>
                  </div>
                  <div className={styles.headercenter}>
                    <div className={styles.imgBox}>
                      <div className={styles.imgBoxer}>

                      </div>
                    </div>
                    <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                  </div>
                  <div className={styles.headerBom}>
                    <span>预设勤务阶段:</span>
                    <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                    <Button size='small' type="primary">保存</Button>
                  </div>
                </div>
                <div className={styles.headerList}>
                  <div className={styles.headerTitle}>
                    <span>青秀中新(ip:45.6.218.114)</span>
                    <span>X</span>
                  </div>
                  <div className={styles.headercenter}>
                    <div className={styles.imgBox}>
                      <div className={styles.imgBoxer}>

                      </div>
                    </div>
                    <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                  </div>
                  <div className={styles.headerBom}>
                    <span>预设勤务阶段:</span>
                    <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                    <Button size='small' type="primary">保存</Button>
                  </div>
                </div>
                <div className={styles.headerList}>
                  <div className={styles.headerTitle}>
                    <span>青秀中新(ip:45.6.218.114)</span>
                    <span>X</span>
                  </div>
                  <div className={styles.headercenter}>
                    <div className={styles.imgBox}>
                      <div className={styles.imgBoxer}>

                      </div>
                    </div>
                    <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                  </div>
                  <div className={styles.headerBom}>
                    <span>预设勤务阶段:</span>
                    <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                    <Button size='small' type="primary">保存</Button>
                  </div>
                </div>
                <div className={styles.headerList}>
                  <div className={styles.headerTitle}>
                    <span>青秀中新(ip:45.6.218.114)</span>
                    <span>X</span>
                  </div>
                  <div className={styles.headercenter}>
                    <div className={styles.imgBox}>
                      <div className={styles.imgBoxer}>

                      </div>
                    </div>
                    <div className={styles.imgSize}>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                        <div className={styles.imgSizeBox}>
                          <div className={styles.phaseImg}>

                          </div>
                          <span>紧急序号1</span>
                        </div>
                      </div>
                  </div>
                  <div className={styles.headerBom}>
                    <span>预设勤务阶段:</span>
                    <Select defaultValue="lucy" style={{ width: 120, height: 25 }}>
                      <Option value="lucy">Lucy</Option>
                    </Select>
                    <Button size='small' type="primary">保存</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.addroadname}></div>
          </div>

        </div>
        <div className={styles.sidebarLeft}>
          <div className={styles.titletops}>
            <span onClick={() => this.gettitletops(true)} className={Istitletops ? styles.titletopsActive : ''}>活动</span>
            <span onClick={() => this.gettitletops(false)} className={!Istitletops ? styles.titletopsActive : ''}>应急</span>
          </div>
          <Menu
            onClick={this.handleClick}
            style={{ width: 251, color: '#86b7fa', height: '100%', overflowY: 'auto', fontSize: '16px' }}
            // defaultSelectedKeys={['7']}
            // defaultOpenKeys={['sub2', 'sub3']}
            mode="inline"

          >
            <SubMenu key="sub2" title="海淀区">
              {/* <Menu.Item key="5"></Menu.Item> */}
              <SubMenu key="sub3" title="知春路拥堵应急">
                <Menu.Item key="7">知春路与罗庄东路<EditOutlined /></Menu.Item>
                <Menu.Item key="8">知春路与罗庄中路</Menu.Item>
                <Menu.Item key="9">知春路与罗庄西路</Menu.Item>
                <Menu.Item key="10">知春路与海淀黄庄路</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3-2" title="万泉庄路"></SubMenu>
            </SubMenu>
            <SubMenu
              key="sub4"
              title="房山区"
            >
              {/* <Menu.Item key="1-2-9">Option 9</Menu.Item> */}
            </SubMenu>
            <SubMenu
              key="sub5"
              title="通州区"
            >
            </SubMenu>
            <SubMenu
              key="sub6"
              title="门头沟区"
            >
            </SubMenu>
            <SubMenu
              key="sub7"
              title="中关村东路"
            >
            </SubMenu>
          </Menu>
        </div>
        <div className={styles.container}>
          {
            !mainHomePage &&
            <div className={styles.contentCenter}>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div >
    )
  }
}

export default Homepage
