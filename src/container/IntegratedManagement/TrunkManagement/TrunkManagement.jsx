import React, { Component } from 'react'
import { Menu, Input, DatePicker, Button, Select } from 'antd'
import { EditOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import './TrunkManagement.scss'
import mapConfiger from '../../utils/minemapConf'
import messageBac from '../../imgs/messageBac.png'
const { SubMenu } = Menu;
class TrunkManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
      clickNum: '',
      rights: -300,
      stateSelect: [
        {
          name: "海淀区",
          id: "1",
          children: []
        },
        {
          name: "朝阳区",
          id: "2",
          children: []
        },
        {
          name: "上地",
          id: "3",
          children: []
        },
        {
          name: "三里屯",
          id: "4",
          children: []
        }
      ],
    }
    this.clickOperation = [
      {
        id: 1,
        name: '新增干线',
      },
      {
        id: 2,
        name: '删除干线',
      },
      {
        id: 3,
        name: '切换视图',
      }
    ]
  }
  componentDidMount = () => {
    this.renderMap()
  }
  ClickMessge = () => {
    var popupOption = {
      closeOnClick: false,
      closeButton: false,
      // anchor: "bottom-left",
      offset: [-20, 35]
    }
    // <img width="36px" height="36px" src="${}" />
    this.popup = new window.mapabcgl.Popup(popupOption)
      .setLngLat(new window.mapabcgl.LngLat(116.38384768997417, 39.92253455638905))
      .setHTML(`<div style="width: 310px; font-size:12px;height: 165px;background:url(${messageBac}) no-repeat;background-size: 100% 100%; ">
      <div style="height:32px;line-height:32px; text-align:right"><span style="color:#599FE0">车农庄大街与车公庄北街路口</span></div>
      <div>
      <p style="height:32px;margin-bottom:0;line-height:32px;padding-left:40px"><span>路口名称 ：</span>车农庄大街与车公庄北街路口</p>
      <p style="height:32px;margin-bottom:0;line-height:32px;padding-left:40px"><span>路口编号 ：</span>120461</p>
      <p style="height:32px;margin-bottom:0;line-height:32px;padding-left:40px"><span>所属类型 ：</span>十字路口</p>
      <p style="height:32px;margin-bottom:0;line-height:32px;padding-left:40px"><span>所属区域 ：</span>西城区</p>
      </div>
      
    </div>`)
      .addTo(this.map);
  }
  addMarker = () => {
    if (this.map) {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'green'
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        this.ClickMessge()
      })
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
      window.onbeforeunload = function (e) {
        map.removeLayerAndSource('icon');
      };
    })
    map.on('click', () => {
      if (this.popup) {
        this.popup.remove()
      }
    })
    this.map = map
  }
  // renderMap = () => {
  //   mapConfiger.zoom = 11
  //   const map = new window.mapabcgl.Map(mapConfiger)
  //   this.map = map
  //   map.addControl(new window.mapabcgl.NavigationControl());
  //   const options = {
  //     minzoom: 1, // 路况显示的最小级别(1-24)
  //     maxzoom: 24, // 路况显示的最大级别(1-24)
  //     type: 'vector', // 路况图层类型:vector(矢量),raster(栅格)
  //     refresh: 30 * 1000, // 路况图层刷新时间，毫秒
  //     // before:'roads-symbol-49' 
  //   };
  //   map.on('load', () => {
  //     map.trafficLayer(true, options);
  //     this.addMarker()
  //     map.addControl(new window.mapabcgl.NavControl({ showCompass: true, position: 'bottom-right' }));
  //     map.loadImage('http://map.mapabc.com:35001/mapdemo/apidemos/sourceLinks/img/dir.png', function (error, image) {
  //       map.addImage('arrowImg', image); // 添加3d指南针
  //     });
  //   })
  // }
  handleClick = e => {
    console.log('click ', e);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  // handleClckMessge = () => {
  //   this.setState({

  //   })
  // }
  clickOperationNum = (id) => {
    if (id === 1) {
      this.setState({
        rights: 0
      })
    } else {
      this.setState({
        rights: -300
      })
    }
    this.setState({
      clickNum: id
    })
  }
  render() {
    const { Option } = Select
    const { mainHomePage, stateSelect, clickNum, Istitletops, IsddMessge, rights } = this.state
    return (
      <div className='TrunkManagementBox'>
        <div className='sildeRight' style={{ right: `${rights}px` }}>
          <div className='addMainLine'>
            <div className='newLine'>新增干线</div>
            <div className='operationLine'><span>保存</span><span>取消</span></div>
          </div>
          <p><span>干线名称：</span><input type="text" className='inputBox' placeholder="干线名称" /></p>
          <p><span>干线编号：</span><input type="text" className='inputBox' placeholder="干线编号" /></p>
          <div className='lineBox'>
            <div className="lineBoxLeft"></div>
            <div className="lineBoxRight">
              <p><input type="text" className='inputBox' placeholder="搜索地图或点击地图选中" /></p>
              <p><input type="text" className='inputBox' placeholder="搜索路口或点击地图选中" /></p>
              <p><input type="text" className='inputBox' placeholder="搜索路口或点击地图选中" /></p>
              <p><input type="text" className='inputBox' placeholder="搜索路口或点击地图选中" /></p>
            </div>
          </div>
        </div>
        <div className='sidebarLeft'>
          <div className='tabLeft'>
            {
              this.clickOperation.map(item => <span className={clickNum === item.id ? 'active' : ''}
                onClick={() => this.clickOperationNum(item.id)} key={item.id}>{item.name}</span>)
            }
          </div>
          <div className="topNavMon">
            <div className="selectNav">
              <Select
                defaultValue="海淀区"
                style={{ width: 100, height: 30 }}
              >
                {
                  stateSelect && stateSelect.map((item, index) => {
                    return (
                      <Option value={index} style={{ width: 100, height: 30 }} key={index}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className="iptSearchNav">
              <input type="text" placeholder="查询…" className="inptNavMon" />
              <div className="MagBox">
                <SearchOutlined />
              </div>
            </div>
          </div>
          <div className='sidebarLeftBox'>
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

        </div>
        <div className='container'>
          {
            !mainHomePage &&
            <div className='contentCenter'>
              <div className='title'>干线管理</div>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div >
    )
  }
}

export default TrunkManagement