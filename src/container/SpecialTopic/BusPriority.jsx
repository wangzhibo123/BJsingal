import React, { Component } from 'react'
import { Menu, Select, Switch, Modal } from 'antd'
import { SearchOutlined, DoubleRightOutlined, DoubleLeftOutlined, ZoomOutOutlined } from '@ant-design/icons';
import './Region.scss'
import $ from 'jquery'
import mapConfiger from '../utils/minemapConf'
import Graph from './Graph/Graph'
import Histogram from './Histogram/Histogram'
import Pie from './Pie/Pie'
const { SubMenu } = Menu;
class BusPriority extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
      iconFlag: true,
      iconFlagR: true,
      faultCompare: {
        delay:[10, 20, 30, 40, 10, 25, 34, 25, 22, 33, 50, 60, 10, 15, 5, 20, 10, 10, 5, 20, 40, 22, 19, 14], 
        speed:[22, 19, 14, 33, 50, 60, 10, 15, 5, 20, 10, 10, 5, 20, 40, 10, 20, 30, 40, 10, 25, 34, 25, 22]
      },
      greenWaveData: [{"area_name":"观山湖区","lenAll":0,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"","execute_start_date":"","forward_phase_plan_name":"","forward_offset":"","reverse_offset":"","is_key_inter":0,"len":0,"inter_name":"龙泉苑街与福州街","forward_phase_plan_id":"","geohash":"w7w6nyvsds","reverse_phase_plan_name":"","id":"11LIA064210","lev":"4","lat":26.606790480941,"inter_id":"11LIA064210","lng":106.626958379295,"adcode":"460100","area_code":"460108","phaseList":[],"name":"龙泉苑街与福州街","cycle_time":"","forwordSpeed":"0.00"},{"area_name":"观山湖区","lenAll":490,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"","execute_start_date":"","forward_phase_plan_name":"","forward_offset":"","reverse_offset":"","is_key_inter":0,"len":490,"inter_name":"龙泉苑街与金源街","forward_phase_plan_id":"","geohash":"w7w6p1ym89","reverse_phase_plan_name":"","id":"11LM1063PG0","lev":"4","lat":26.6062457966819,"inter_id":"11LM1063PG0","lng":106.631725893128,"adcode":"460100","area_code":"460108","phaseList":[],"name":"龙泉苑街与金源街","cycle_time":"","forwordSpeed":"30.00"},{"area_name":"观山湖区","lenAll":900,"data_version":"20180630","reverseSpeed":"0.00","execute_end_date":"","reverse_phase_plan_id":"","execute_start_date":"","forward_phase_plan_name":"","forward_offset":"","reverse_offset":"","is_key_inter":0,"len":410,"inter_name":"龙泉苑街与兰州街交叉口","forward_phase_plan_id":"","geohash":"w7w6nmzbtk","reverse_phase_plan_name":"","id":"11LCE064040","lev":"4","lat":26.60803191562,"inter_id":"11LCE064040","lng":106.63519472168,"adcode":"460100","area_code":"460108","phaseList":[],"name":"龙泉苑街与兰州街交叉口","cycle_time":"","forwordSpeed":"30.00"}],
      totleDistance: 3000,
      showForwordWave: true,
      showReverseWave: true,
      isShowTree:true, // 临时变量, 用于查询
      zoomChartsData: null,
      zoomChartsName: null,
      speedDelayDatas1: {"data":["0.00","0.00","0.00","6.20","0.00","0.00","0.98","7.73","8.86","4.02","15.07","0.00","17.32","17.34","8.07","3.46","36.67","0.00","2.29","10.52","1.94","13.15","13.37","8.82","14.07","14.49","10.50","7.49","0.00","1.99","6.54","11.37","22.93","8.24","6.88","4.95","17.65","11.31","5.83","1.69","5.85","4.75","6.81","1.12","2.10","12.84","9.79","3.04","8.93","30.53","4.22","15.28","16.13","7.80","27.01","23.44","35.02","11.08","7.40","11.82","13.86","4.72","8.86","11.51","6.79","0.00","1.63","9.06","5.96","0.00","0.69","10.23","6.28","0.00","0.00","28.38","1.68","19.52","2.72","10.50","0.00","3.77","0.00","4.20","12.93","0.00","8.76","18.86","0.00","11.88","6.92","2.28","15.72","5.45","2.53","28.52","10.46","5.61","6.59","8.34","11.40","5.67","12.26","35.45","16.80","14.33","6.67","7.23","7.97","19.12","5.95","24.11","12.15","6.38","19.67","3.33","11.95","13.22","37.54","24.17","84.96","37.83","29.98","21.90","16.81","31.80","61.88","35.80","54.27","47.43","64.61","8.58","18.00","12.45","23.38","24.67","23.31","6.60","17.32","24.78","20.15","29.33","5.10","15.44","0.00","7.62","2.51","14.71","70.86","7.47","0.59","19.78","32.25","4.48","3.97","8.59","9.71","10.77","12.94","5.39","8.38","11.31","11.98","10.15","22.64","10.44","14.59","2.11","12.63","17.52","9.55","9.43","10.51","23.23","24.30","16.61","15.63","27.26","16.55","9.32","5.62","1.82","32.47","1.44","8.38","3.76","6.75","15.49","16.41","5.41","0.00","0.00","6.58","5.81","2.43","6.80","0.14","4.05","0.00","0.60","12.65","1.28","1.51"],"x":["06:00","06:05","06:10","06:20","06:25","06:30","06:35","06:40","06:50","06:55","07:05","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","18:00","18:05","18:10","18:15","18:20","18:25","18:30","18:35","18:40","18:45","18:50","18:55","19:00","19:05","19:10","19:15","19:20","19:25","19:30","19:35","19:40","19:45","19:50","19:55","20:00","20:05","20:10","20:15","20:20","20:25","20:30","20:35","20:40","20:45","20:50","20:55","21:00","21:05","21:10","21:15","21:25","21:30","21:35","21:40","21:45","21:50","21:55","22:00","22:05","22:10","22:15","22:20","22:25","22:30","22:35","22:40","22:45","22:50","22:55","23:00","23:05","23:10","23:15","23:20","23:30","23:35","23:45","23:50","23:55"]},
      speedDelayDatas2: {"data":["26.35","46.82","43.02","23.18","41.08","37.48","44.36","28.08","27.18","32.29","23.25","30.11","16.61","20.99","31.66","36.26","11.09","30.68","33.52","20.65","32.67","22.33","27.27","20.70","19.86","20.69","24.68","24.65","36.15","22.62","27.23","27.61","23.20","17.25","27.45","30.88","30.23","38.54","23.50","32.52","24.05","36.85","19.20","38.10","36.26","28.05","19.81","21.93","38.38","23.93","27.72","29.45","24.37","21.00","16.16","17.22","14.81","30.89","26.77","26.77","18.77","27.56","24.16","25.43","36.76","27.07","36.18","21.89","29.88","24.42","21.09","30.06","25.29","43.51","39.29","13.71","35.13","21.15","32.65","26.44","37.28","32.17","44.11","32.61","21.20","34.49","24.77","21.99","41.10","34.82","18.94","26.53","28.93","32.33","34.57","32.69","27.52","28.10","32.72","37.06","22.54","27.13","23.26","16.19","16.84","21.86","36.71","24.35","25.95","23.22","28.37","17.57","37.70","47.75","18.89","32.84","25.96","29.48","17.07","16.95","6.39","29.95","14.44","17.50","24.28","23.01","15.47","21.20","8.66","22.83","12.52","24.12","31.37","30.34","20.92","27.91","15.18","29.40","22.56","15.76","23.21","16.80","34.99","30.32","25.80","30.81","30.06","30.53","21.74","33.13","43.78","15.63","13.58","25.97","29.56","31.49","24.99","22.96","25.71","30.51","26.92","24.14","23.15","25.34","14.58","23.62","31.02","37.21","31.74","32.20","21.61","22.88","25.54","20.76","11.99","32.78","31.93","16.36","21.10","26.42","34.72","30.49","22.78","31.37","25.61","26.15","29.51","28.07","24.50","25.13","29.56","48.56","19.88","25.13","33.20","30.24","23.94","32.08","40.40","37.81","30.30","32.91","28.88"],"x":["06:00","06:05","06:10","06:20","06:25","06:30","06:35","06:40","06:50","06:55","07:05","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","18:00","18:05","18:10","18:15","18:20","18:25","18:30","18:35","18:40","18:45","18:50","18:55","19:00","19:05","19:10","19:15","19:20","19:25","19:30","19:35","19:40","19:45","19:50","19:55","20:00","20:05","20:10","20:15","20:20","20:25","20:30","20:35","20:40","20:45","20:50","20:55","21:00","21:05","21:10","21:15","21:25","21:30","21:35","21:40","21:45","21:50","21:55","22:00","22:05","22:10","22:15","22:20","22:25","22:30","22:35","22:40","22:45","22:50","22:55","23:00","23:05","23:10","23:15","23:20","23:30","23:35","23:45","23:50","23:55"]},
      speedDelayDatas: {"data":["0.00","0.00","0.00","6.20","0.00","0.00","0.98","7.73","8.86","4.02","15.07","0.00","17.32","17.34","8.07","3.46","36.67","0.00","2.29","10.52","1.94","13.15","13.37","8.82","14.07","14.49","10.50","7.49","0.00","1.99","6.54","11.37","22.93","8.24","6.88","4.95","17.65","11.31","5.83","1.69","5.85","4.75","6.81","1.12","2.10","12.84","9.79","3.04","8.93","30.53","4.22","15.28","16.13","7.80","27.01","23.44","35.02","11.08","7.40","11.82","13.86","4.72","8.86","11.51","6.79","0.00","1.63","9.06","5.96","0.00","0.69","10.23","6.28","0.00","0.00","28.38","1.68","19.52","2.72","10.50","0.00","3.77","0.00","4.20","12.93","0.00","8.76","18.86","0.00","11.88","6.92","2.28","15.72","5.45","2.53","28.52","10.46","5.61","6.59","8.34","11.40","5.67","12.26","35.45","16.80","14.33","6.67","7.23","7.97","19.12","5.95","24.11","12.15","6.38","19.67","3.33","11.95","13.22","37.54","24.17","84.96","37.83","29.98","21.90","16.81","31.80","61.88","35.80","54.27","47.43","64.61","8.58","18.00","12.45","23.38","24.67","23.31","6.60","17.32","24.78","20.15","29.33","5.10","15.44","0.00","7.62","2.51","14.71","70.86","7.47","0.59","19.78","32.25","4.48","3.97","8.59","9.71","10.77","12.94","5.39","8.38","11.31","11.98","10.15","22.64","10.44","14.59","2.11","12.63","17.52","9.55","9.43","10.51","23.23","24.30","16.61","15.63","27.26","16.55","9.32","5.62","1.82","32.47","1.44","8.38","3.76","6.75","15.49","16.41","5.41","0.00","0.00","6.58","5.81","2.43","6.80","0.14","4.05","0.00","0.60","12.65","1.28","1.51"],"x":["06:00","06:05","06:10","06:20","06:25","06:30","06:35","06:40","06:50","06:55","07:05","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","18:00","18:05","18:10","18:15","18:20","18:25","18:30","18:35","18:40","18:45","18:50","18:55","19:00","19:05","19:10","19:15","19:20","19:25","19:30","19:35","19:40","19:45","19:50","19:55","20:00","20:05","20:10","20:15","20:20","20:25","20:30","20:35","20:40","20:45","20:50","20:55","21:00","21:05","21:10","21:15","21:25","21:30","21:35","21:40","21:45","21:50","21:55","22:00","22:05","22:10","22:15","22:20","22:25","22:30","22:35","22:40","22:45","22:50","22:55","23:00","23:05","23:10","23:15","23:20","23:30","23:35","23:45","23:50","23:55"]},
      cloudSource: null,
    }
    this.btnList = [
      { id: 1, name: '区域平均延误' },
      { id: 2, name: '区域平均车速' },
    ]
    this.time = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  }
  componentDidMount = () => {
    this.renderMap()
    const cloudSource = {"list":[{"district_name":"检测数","memory":45,"harddisk":76},{"district_name":"请求数","memory":85,"harddisk":60}]}
    const areaList = []
    const harddisks = []
    const memeries = []
    cloudSource.list.forEach((item) => {
      areaList.push(item.district_name)
      harddisks.push(item.harddisk)
      memeries.push(item.memory)
    })
    this.setState({ cloudSource: { xData: areaList, harddisks, memeries } }) 
  }
  addMarker = () => {
    if (this.map) {
      const el = document.createElement('div')
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'green'
      new window.mapabcgl.Marker(el)
        .setLngLat([116.33372103894942, 39.976474739839944])
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
    map.on('click', (e) => {
      console.log('地图信处',e)
    })
    map.setZoom(15)
    map.setCenter([116.33861338819071,39.97636785900676])
    this.map = map
  }
  handleClick = e => {
    console.log('click ', e);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  handleClckMessge = () => {
  }

  render() {
    const { Option } = Select
    const { mainHomePage, cloudSource } = this.state
    return (
      <div className='specialTopicBox'>
        <div className='sidebarLeft'>
          <div className='asideItem'>
            <div className='itemContent' style={{ overflow: 'hidden' }}>
            <div className='leftTit'>公交优先路线</div>
              <div className='menuBox'>
                <Menu
                  onClick={this.handleClick}
                  style={{ width: 251, color: '#86b7fa', height: '100%', fontSize: '16px' }}
                  defaultSelectedKeys={['0']}
                  defaultOpenKeys={['sub2', 'sub3']}
                  mode="inline">
                  <SubMenu key="sub2" title="安立路">
                    <SubMenu key="sub3-0" title="安立路与立军路"></SubMenu>
                    <SubMenu key="sub3-1" title="安立路与北苑路"></SubMenu>
                    <SubMenu key="sub3-2" title="安立路与双营路"></SubMenu>
                    <SubMenu key="sub3-3" title="安立路与清林路"></SubMenu>
                    <SubMenu key="sub3-4" title="安立路与仰山路"></SubMenu>
                    <SubMenu key="sub3-5" title="安立路与北五环"></SubMenu>
                    <SubMenu key="sub3-6" title="安立路与科荟路"></SubMenu>
                  </SubMenu>
                  <SubMenu key="sub4" title="中轴路"></SubMenu>
                  <SubMenu key="sub5" title="朝阜路"></SubMenu>
                  <SubMenu key="sub6" title="朝阳北路"></SubMenu>
                  <SubMenu key="sub7" title="平安大街"></SubMenu>
                  <SubMenu key="sub8" title="中关村大街"></SubMenu>
                  <SubMenu key="sub9" title="两广咱"></SubMenu>
                  <SubMenu key="sub10" title="阜外大街"></SubMenu>
                  
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div className='sidebarRight'>
          <div className="asideItem">
            <div className="title">公交优先统计次数</div>
            <div className="itemContent">
              <div className="faultRate">
                <Graph />
              </div>
            </div>
          </div>
          <div className="asideItem">
            <div className="title">优先信号柱状图</div>
            <div className="itemContent">
              <div className="faultRate">
                {
                  cloudSource &&
                  <Histogram chartsDatas={cloudSource} />
                }
              </div>
            </div>
          </div>
          <div className="asideItem">
            <div className="title">优先运行饼状图</div>
            <div className="itemContent">
              <div className="faultRate">
                <Pie />
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          {
            !mainHomePage &&
            <div className='contentCenter'>
              <div className='title'>公交优先</div>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default BusPriority