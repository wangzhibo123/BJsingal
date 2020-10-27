import React, { Component } from 'react'
import { Menu, Input, DatePicker, Button, Select, Switch, Modal } from 'antd'
import 'animate.css'
import { SearchOutlined, DoubleRightOutlined, DoubleLeftOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import './Region.scss'
import $ from 'jquery'
import mapConfiger from '../../utils/minemapConf'
import LineCharts from '../../../components/LineCharts/LineCharts'
import EchartsPage from '../../../components/ecahrtsPage/EchartsPage'
// import GraphCharts from '../../../components/GraphCharts/GraphCharts'
// import GreenWaveCharts from '../../../components/GreenWaveCharts/GreenWaveCharts'
import Optimize from './Optimize/optimize'
const { SubMenu } = Menu;
class RegionOpt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
      mainHomePage: false,
      Istitletops: true,
      IsddMessge: true,
      iconFlag: true,
      iconFlagR: true,
      areaOptStatus: null,
      faultCompare: {
        delay:[10, 20, 30, 40, 10, 25, 34, 25, 22, 33, 50, 60, 10, 15, 5, 20, 10, 10, 5, 20, 40, 22, 19, 14], 
        speed:[22, 19, 14, 33, 50, 60, 10, 15, 5, 20, 10, 10, 5, 20, 40, 10, 20, 30, 40, 10, 25, 34, 25, 22]
      },
      greenWaveData: [{"area_name":"观山湖区","lenAll":0,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"","execute_start_date":"","forward_phase_plan_name":"","forward_offset":"","reverse_offset":"","is_key_inter":0,"len":0,"inter_name":"龙泉苑街与福州街","forward_phase_plan_id":"","geohash":"w7w6nyvsds","reverse_phase_plan_name":"","id":"11LIA064210","lev":"4","lat":26.606790480941,"inter_id":"11LIA064210","lng":106.626958379295,"adcode":"460100","area_code":"460108","phaseList":[],"name":"龙泉苑街与福州街","cycle_time":"","forwordSpeed":"0.00"},{"area_name":"观山湖区","lenAll":490,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"","execute_start_date":"","forward_phase_plan_name":"","forward_offset":"","reverse_offset":"","is_key_inter":0,"len":490,"inter_name":"龙泉苑街与金源街","forward_phase_plan_id":"","geohash":"w7w6p1ym89","reverse_phase_plan_name":"","id":"11LM1063PG0","lev":"4","lat":26.6062457966819,"inter_id":"11LM1063PG0","lng":106.631725893128,"adcode":"460100","area_code":"460108","phaseList":[],"name":"龙泉苑街与金源街","cycle_time":"","forwordSpeed":"30.00"},{"area_name":"观山湖区","lenAll":900,"data_version":"20180630","reverseSpeed":"0.00","execute_end_date":"","reverse_phase_plan_id":"","execute_start_date":"","forward_phase_plan_name":"","forward_offset":"","reverse_offset":"","is_key_inter":0,"len":410,"inter_name":"龙泉苑街与兰州街交叉口","forward_phase_plan_id":"","geohash":"w7w6nmzbtk","reverse_phase_plan_name":"","id":"11LCE064040","lev":"4","lat":26.60803191562,"inter_id":"11LCE064040","lng":106.63519472168,"adcode":"460100","area_code":"460108","phaseList":[],"name":"龙泉苑街与兰州街交叉口","cycle_time":"","forwordSpeed":"30.00"}],
      totleDistance: 3000,
      showForwordWave: true,
      showReverseWave: true,
      delayTimeData: {"legend":["正向-对比","反向-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向-对比","type":"line","data":["75.70","0.00","48.56","0.00","0.00","0.00","79.57","0.00","0.00","0.00","0.00","0.00","0.00","21.41","41.14","123.19","44.32","88.62","48.86","81.92","42.84","67.28","63.84","92.66","75.50","76.34","98.47","0.00","42.29","128.68","35.62","40.10","105.44","136.92","104.33","135.33","114.47","54.72","77.90","76.05","48.49","72.63","61.02","58.15","66.78","31.63","41.40","92.18"],"itemStyle":{"normal":{"color":"#ff9d00"}}},{"name":"反向-对比","type":"line","data":["0.00","0.00","60.31","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","50.10","89.92","63.50","0.00","0.00","32.65","25.18","55.23","27.63","108.40","28.96","58.54","28.56","94.61","75.02","140.12","118.77","31.44","310.46","64.34","17.50","59.50","104.78","50.88","26.62","66.34","34.62","75.60","65.27","80.24","58.58","0.00","74.42"],"itemStyle":{"normal":{"color":"#0db4ff"}}}]},
      avgspeedData: {"legend":["正向-对比","反向-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向-对比","type":"line","data":["1.00","0.00","1.00","0.00","0.00","0.00","1.00","0.00","0.00","0.00","0.00","0.00","0.00","0.50","1.00","1.83","1.25","1.33","0.67","2.00","0.83","1.75","1.06","1.12","1.22","1.08","1.00","0.00","1.17","1.69","1.00","0.80","1.50","1.75","1.00","2.75","1.97","0.96","1.33","1.29","1.00","1.33","1.33","0.89","1.75","1.00","1.00","2.00"],"itemStyle":{"normal":{"color":"#ff9d00"}}},{"name":"反向-对比","type":"line","data":["0.00","0.00","2.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","1.00","1.00","1.00","0.00","0.00","1.08","1.00","0.92","1.00","1.22","1.00","1.00","0.50","1.50","1.00","1.50","1.78","1.00","3.00","1.25","0.75","0.67","1.33","1.08","0.42","1.11","0.50","1.00","0.89","1.00","1.53","0.00","1.00"],"itemStyle":{"normal":{"color":"#0db4ff"}}}]},
      stopnumData: {"legend":["正向-对比","反向-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向-对比","type":"line","data":["23.18","26.69","26.36","30.99","29.48","31.73","34.00","31.89","30.87","34.79","35.79","36.08","34.88","29.60","19.87","16.00","17.03","18.34","19.04","17.91","19.52","19.76","19.55","16.77","15.37","16.19","19.77","20.46","17.95","19.26","18.79","18.93","18.86","14.57","11.68","10.61","14.16","14.29","15.47","16.53","16.16","14.70","13.82","17.78","18.74","16.30","20.24","20.48"],"itemStyle":{"normal":{"color":"#ff9d00"}}},{"name":"反向-对比","type":"line","data":["24.89","25.84","28.57","27.22","26.27","33.29","36.49","33.47","32.53","39.37","34.27","39.69","37.16","32.11","18.67","16.37","16.35","17.61","20.28","19.42","19.65","21.25","17.83","18.64","17.99","18.22","19.58","22.88","21.35","19.35","18.71","15.49","17.66","17.16","15.28","14.60","15.48","16.84","16.60","16.03","15.41","16.04","17.86","18.98","19.38","16.17","20.81","23.60"],"itemStyle":{"normal":{"color":"#0db4ff"}}}]},
      travelTimeData: {"legend":["正向-对比","反向-对比"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向-对比","type":"line","data":["246.31","215.14","198.82","170.49","183.79","172.52","146.25","158.83","168.61","146.16","141.95","144.41","143.52","171.89","341.09","376.42","329.27","311.92","295.06","312.86","266.47","274.40","267.72","356.03","349.44","318.78","275.59","294.57","299.44","292.29","298.33","277.96","272.37","400.56","779.74","595.26","352.93","355.53","353.44","311.33","343.83","360.65","400.76","299.96","274.55","325.26","264.81","250.61"],"itemStyle":{"normal":{"color":"#ff9d00"}}},{"name":"反向-对比","type":"line","data":["206.32","210.16","189.87","279.86","212.19","157.64","134.35","154.16","156.69","122.39","153.25","121.60","130.62","157.13","383.47","368.15","356.89","320.26","282.64","306.54","275.00","240.86","306.35","298.67","365.06","313.10","278.90","234.56","255.01","299.39","295.36","389.04","323.41","378.56","501.96","446.00","438.93","326.33","311.26","327.76","345.69","336.69","292.73","288.17","284.92","322.55","268.68","230.34"],"itemStyle":{"normal":{"color":"#0db4ff"}}}]},
      isShowTree:true, // 临时变量, 用于查询
      showZoomCharts: false,
      zoomChartsData: null,
      zoomChartsName: null,
      speedDelayDatas1: {"data":["0.00","0.00","0.00","6.20","0.00","0.00","0.98","7.73","8.86","4.02","15.07","0.00","17.32","17.34","8.07","3.46","36.67","0.00","2.29","10.52","1.94","13.15","13.37","8.82","14.07","14.49","10.50","7.49","0.00","1.99","6.54","11.37","22.93","8.24","6.88","4.95","17.65","11.31","5.83","1.69","5.85","4.75","6.81","1.12","2.10","12.84","9.79","3.04","8.93","30.53","4.22","15.28","16.13","7.80","27.01","23.44","35.02","11.08","7.40","11.82","13.86","4.72","8.86","11.51","6.79","0.00","1.63","9.06","5.96","0.00","0.69","10.23","6.28","0.00","0.00","28.38","1.68","19.52","2.72","10.50","0.00","3.77","0.00","4.20","12.93","0.00","8.76","18.86","0.00","11.88","6.92","2.28","15.72","5.45","2.53","28.52","10.46","5.61","6.59","8.34","11.40","5.67","12.26","35.45","16.80","14.33","6.67","7.23","7.97","19.12","5.95","24.11","12.15","6.38","19.67","3.33","11.95","13.22","37.54","24.17","84.96","37.83","29.98","21.90","16.81","31.80","61.88","35.80","54.27","47.43","64.61","8.58","18.00","12.45","23.38","24.67","23.31","6.60","17.32","24.78","20.15","29.33","5.10","15.44","0.00","7.62","2.51","14.71","70.86","7.47","0.59","19.78","32.25","4.48","3.97","8.59","9.71","10.77","12.94","5.39","8.38","11.31","11.98","10.15","22.64","10.44","14.59","2.11","12.63","17.52","9.55","9.43","10.51","23.23","24.30","16.61","15.63","27.26","16.55","9.32","5.62","1.82","32.47","1.44","8.38","3.76","6.75","15.49","16.41","5.41","0.00","0.00","6.58","5.81","2.43","6.80","0.14","4.05","0.00","0.60","12.65","1.28","1.51"],"x":["06:00","06:05","06:10","06:20","06:25","06:30","06:35","06:40","06:50","06:55","07:05","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","18:00","18:05","18:10","18:15","18:20","18:25","18:30","18:35","18:40","18:45","18:50","18:55","19:00","19:05","19:10","19:15","19:20","19:25","19:30","19:35","19:40","19:45","19:50","19:55","20:00","20:05","20:10","20:15","20:20","20:25","20:30","20:35","20:40","20:45","20:50","20:55","21:00","21:05","21:10","21:15","21:25","21:30","21:35","21:40","21:45","21:50","21:55","22:00","22:05","22:10","22:15","22:20","22:25","22:30","22:35","22:40","22:45","22:50","22:55","23:00","23:05","23:10","23:15","23:20","23:30","23:35","23:45","23:50","23:55"]},
      speedDelayDatas2: {"data":["26.35","46.82","43.02","23.18","41.08","37.48","44.36","28.08","27.18","32.29","23.25","30.11","16.61","20.99","31.66","36.26","11.09","30.68","33.52","20.65","32.67","22.33","27.27","20.70","19.86","20.69","24.68","24.65","36.15","22.62","27.23","27.61","23.20","17.25","27.45","30.88","30.23","38.54","23.50","32.52","24.05","36.85","19.20","38.10","36.26","28.05","19.81","21.93","38.38","23.93","27.72","29.45","24.37","21.00","16.16","17.22","14.81","30.89","26.77","26.77","18.77","27.56","24.16","25.43","36.76","27.07","36.18","21.89","29.88","24.42","21.09","30.06","25.29","43.51","39.29","13.71","35.13","21.15","32.65","26.44","37.28","32.17","44.11","32.61","21.20","34.49","24.77","21.99","41.10","34.82","18.94","26.53","28.93","32.33","34.57","32.69","27.52","28.10","32.72","37.06","22.54","27.13","23.26","16.19","16.84","21.86","36.71","24.35","25.95","23.22","28.37","17.57","37.70","47.75","18.89","32.84","25.96","29.48","17.07","16.95","6.39","29.95","14.44","17.50","24.28","23.01","15.47","21.20","8.66","22.83","12.52","24.12","31.37","30.34","20.92","27.91","15.18","29.40","22.56","15.76","23.21","16.80","34.99","30.32","25.80","30.81","30.06","30.53","21.74","33.13","43.78","15.63","13.58","25.97","29.56","31.49","24.99","22.96","25.71","30.51","26.92","24.14","23.15","25.34","14.58","23.62","31.02","37.21","31.74","32.20","21.61","22.88","25.54","20.76","11.99","32.78","31.93","16.36","21.10","26.42","34.72","30.49","22.78","31.37","25.61","26.15","29.51","28.07","24.50","25.13","29.56","48.56","19.88","25.13","33.20","30.24","23.94","32.08","40.40","37.81","30.30","32.91","28.88"],"x":["06:00","06:05","06:10","06:20","06:25","06:30","06:35","06:40","06:50","06:55","07:05","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","18:00","18:05","18:10","18:15","18:20","18:25","18:30","18:35","18:40","18:45","18:50","18:55","19:00","19:05","19:10","19:15","19:20","19:25","19:30","19:35","19:40","19:45","19:50","19:55","20:00","20:05","20:10","20:15","20:20","20:25","20:30","20:35","20:40","20:45","20:50","20:55","21:00","21:05","21:10","21:15","21:25","21:30","21:35","21:40","21:45","21:50","21:55","22:00","22:05","22:10","22:15","22:20","22:25","22:30","22:35","22:40","22:45","22:50","22:55","23:00","23:05","23:10","23:15","23:20","23:30","23:35","23:45","23:50","23:55"]},
      speedDelayDatas: {"data":["0.00","0.00","0.00","6.20","0.00","0.00","0.98","7.73","8.86","4.02","15.07","0.00","17.32","17.34","8.07","3.46","36.67","0.00","2.29","10.52","1.94","13.15","13.37","8.82","14.07","14.49","10.50","7.49","0.00","1.99","6.54","11.37","22.93","8.24","6.88","4.95","17.65","11.31","5.83","1.69","5.85","4.75","6.81","1.12","2.10","12.84","9.79","3.04","8.93","30.53","4.22","15.28","16.13","7.80","27.01","23.44","35.02","11.08","7.40","11.82","13.86","4.72","8.86","11.51","6.79","0.00","1.63","9.06","5.96","0.00","0.69","10.23","6.28","0.00","0.00","28.38","1.68","19.52","2.72","10.50","0.00","3.77","0.00","4.20","12.93","0.00","8.76","18.86","0.00","11.88","6.92","2.28","15.72","5.45","2.53","28.52","10.46","5.61","6.59","8.34","11.40","5.67","12.26","35.45","16.80","14.33","6.67","7.23","7.97","19.12","5.95","24.11","12.15","6.38","19.67","3.33","11.95","13.22","37.54","24.17","84.96","37.83","29.98","21.90","16.81","31.80","61.88","35.80","54.27","47.43","64.61","8.58","18.00","12.45","23.38","24.67","23.31","6.60","17.32","24.78","20.15","29.33","5.10","15.44","0.00","7.62","2.51","14.71","70.86","7.47","0.59","19.78","32.25","4.48","3.97","8.59","9.71","10.77","12.94","5.39","8.38","11.31","11.98","10.15","22.64","10.44","14.59","2.11","12.63","17.52","9.55","9.43","10.51","23.23","24.30","16.61","15.63","27.26","16.55","9.32","5.62","1.82","32.47","1.44","8.38","3.76","6.75","15.49","16.41","5.41","0.00","0.00","6.58","5.81","2.43","6.80","0.14","4.05","0.00","0.60","12.65","1.28","1.51"],"x":["06:00","06:05","06:10","06:20","06:25","06:30","06:35","06:40","06:50","06:55","07:05","07:15","07:20","07:25","07:30","07:35","07:40","07:45","07:50","07:55","08:00","08:05","08:10","08:15","08:20","08:25","08:30","08:35","08:40","08:45","08:50","09:00","09:05","09:10","09:15","09:20","09:25","09:30","09:35","09:40","09:45","09:50","09:55","10:00","10:05","10:10","10:15","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00","11:05","11:10","11:15","11:20","11:25","11:30","11:35","11:40","11:45","11:50","11:55","12:00","12:05","12:10","12:15","12:20","12:25","12:30","12:35","12:40","12:45","12:50","12:55","13:00","13:05","13:10","13:15","13:20","13:25","13:30","13:35","13:40","13:45","13:50","13:55","14:00","14:05","14:10","14:15","14:20","14:25","14:35","14:40","14:45","14:50","14:55","15:00","15:05","15:10","15:15","15:20","15:25","15:40","15:45","15:50","15:55","16:00","16:05","16:10","16:15","16:20","16:25","16:30","16:35","16:40","16:45","16:50","16:55","17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","18:00","18:05","18:10","18:15","18:20","18:25","18:30","18:35","18:40","18:45","18:50","18:55","19:00","19:05","19:10","19:15","19:20","19:25","19:30","19:35","19:40","19:45","19:50","19:55","20:00","20:05","20:10","20:15","20:20","20:25","20:30","20:35","20:40","20:45","20:50","20:55","21:00","21:05","21:10","21:15","21:25","21:30","21:35","21:40","21:45","21:50","21:55","22:00","22:05","22:10","22:15","22:20","22:25","22:30","22:35","22:40","22:45","22:50","22:55","23:00","23:05","23:10","23:15","23:20","23:30","23:35","23:45","23:50","23:55"]},
    }
    this.btnList = [
      { id: 1, name: '区域平均延误' },
      { id: 2, name: '区域平均车速' },
    ]
    this.time = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    this.stylesH = `position:fixed;
      top:100px;
      left: 0px;
      width: 0;
      height:calc(100% - 100px);
      display: flex;   
      padding:0;   
      transition:all .5s;`

    this.stylesL = `
      position: fixed;
      top:100px;
      left: 0px;
      width: 300px;
      height:calc(100% - 100px);
      display: flex;
      transition:all .5s;
    `
    this.stylesRH = `position:fixed;
      top:100px;
      right: 0px;
      width: 260px;
      height:calc(100% - 100px);
      display: flex;   
      padding:0;   
      transition:all .5s;`

    this.stylesR = `
      position: fixed;
      top:100px;
      right: 0px;
      width: 690px;
      height:calc(100% - 100px);
      display: flex;
      transition:all .5s;
    `
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
    this.setState({

    })
  }
  btnRegion = (id) => { // 切点击区域
    this.setState({ num: id })
    if (id === 1) {
      this.setState({ speedDelayDatas: this.state.speedDelayDatas1 })
      // this.props.getAreaAvgDelayTime(this.firstCtlregionId)
    } else {
      this.setState({ speedDelayDatas: this.state.speedDelayDatas2 })
      // this.props.getAreaAvgSpeed(this.firstCtlregionId)
    }
  }
  // 左边栏的收起和展开
  handleLeftClick = (e) => {
    const _this = this;
    const styleLeft = 'left:0;transition:all .5s;'
    if (!this.state.iconFlag) {
      $(e.target).parent().attr('style', _this.stylesL)
      $(e.target).next().attr('style','')
      $(e.target).attr('title', '展开')
      this.setState({
        iconFlag: true,
      })
    } else {
      const styleLeftH = 'transition:all .5s;'
      $(e.target).parent().attr('style', _this.stylesH)
      $(e.target).next().attr('style', 'flex:0;overflow:hidden;')
      $(e.target).attr('title', '收起')
      this.setState({
        iconFlag: false,
      })

    }
  }
  // 右边栏的收起和展开
  handleRightClick = (e) => {
    const styleR = 'right:5px;transition:all .5s;'
    const _this = this;
    if (!this.state.iconFlagR) {
      $(e.target).parent().parent().attr('style', _this.stylesR)
      $(e.target).next().attr('style','flex:3')
      $(e.target).attr('title', '展开')
      this.setState({
        iconFlagR: true,
      })
    } else {
      const styleRH = 'transition:all .5s;'
      $(e.target).parent().parent().attr('style', _this.stylesRH)
      $(e.target).next().attr('style', 'display:none;')
      $(e.target).attr('title', '收起')
      this.setState({
        iconFlagR: false,
      })
    }
  }
  // 区域优化配置的显示与隐藏
  setAreaOpt = () => {
    this.setState({
      areaOptStatus: !this.state.areaOptStatus
    })
  }
    // 图表放大查看
    handleZoomCharts = (e) => {
      const chartsName = e.currentTarget.getAttribute('chartsname')
      const dataName = e.currentTarget.getAttribute('dataname')
      console.log(dataName, this.state[dataName])
      this.setState({
        showZoomCharts: true,
        zoomChartsName: chartsName,
        zoomChartsData: this.state[dataName],
      })
    }
    handleHideZoomCharts = () => {
      this.setState({ showZoomCharts: false })
    }
  render() {
    const { Option } = Select
    const { mainHomePage, iconFlag, iconFlagR, areaOptStatus, greenWaveData, totleDistance, showForwordWave, showReverseWave, isShowTree, showZoomCharts, zoomChartsName, zoomChartsData, speedDelayDatas, num } = this.state
    return (
      <div className='RegionBox'>
        {
          (showZoomCharts && zoomChartsData) &&
          <div className='interContainer'>          
            <div className='zoomChartsBox'>
              <div className='zoomBox'>
                <div className='itemTitle'>
                  {zoomChartsName}
                  <span className='chartsRoom' onClick={this.handleHideZoomCharts}><ZoomOutOutlined /></span>
                </div>
                <LineCharts height="450px" chartsDatas={zoomChartsData} />
              </div>
            </div>
          </div>
        }
        { areaOptStatus ?
          <Modal title="区域优化配置" centered visible={areaOptStatus} onCancel={() => this.setAreaOpt()} width='100%' >
            <div className='modalBox'>
            <div className='greenWrapper'>
              <div className='greenWave'>
                <Optimize {...this.props} showControlRecord={this.showControlRecord} />
              </div>
            </div>
              {/* <div className='modalContent'>
              <div className='chartsItem' style={{minWidth:'49%'}}>
                  <div className='itemTitle'>
                    干线平均延误时间曲线图
                    <span className='chartsRoom' dataname="delayTimeData" chartsname="干线平均延误时间曲线图" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.delayTimeData && this.state.delayTimeData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.delayTimeData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className='chartsItem' style={{minWidth:'49%'}}>
                  <div className='itemTitle'>
                    干线平均速度曲线图
                    <span className='chartsRoom' dataname="avgspeedData" chartsname="干线平均速度曲线图" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.avgspeedData && this.state.avgspeedData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.avgspeedData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className='chartsItem' style={{minWidth:'49%'}}>
                  <div className='itemTitle'>
                    干线停车次数曲线图
                    <span className='chartsRoom' dataname="delayTimeData" chartsname="干线停车次数曲线图" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.stopnumData && this.state.stopnumData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.stopnumData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
                <div className='chartsItem' style={{minWidth:'49%'}}>
                  <div className='itemTitle'>
                    干线行程时间曲线图
                    <span className='chartsRoom' dataname="delayTimeData" chartsname="干线行程时间曲线图" onClick={this.handleZoomCharts}><ZoomInOutlined /></span>
                  </div>
                  {
                    this.state.travelTimeData && this.state.travelTimeData.time.length > 0 ?
                      ( isShowTree ? <LineCharts isShowTree={this.state.isShowTree} chartsDatas={this.state.travelTimeData} /> : null) :
                      <div style={{ height: '300px', lineHeight: '300px', textAlign: 'center' }}>暂无数据</div>
                  }
                </div>
              </div> */}
            </div>
          </Modal> : null
        }
        <div className='sidebarLeft animated'>
          { iconFlag ? 
            <em className='iconDirection' title='收起' onClick={this.handleLeftClick}><DoubleLeftOutlined /></em> : 
            <em className='iconDirection' title='展开'onClick={this.handleLeftClick}><DoubleRightOutlined /></em>
          }
          <div className='asideItem'>
            <div className='itemContent' style={{ overflow: 'hidden' }}>
              <div className='interSearch'>
                <Select defaultValue="1">
                  <Option key="1" value="1">海淀区</Option>
                </Select>
                <span className='searchInput'>
                  <input type="text" className='inputBox' placeholder="查询..." />
                  <SearchOutlined className='searchIcon' />
                </span>
              </div>
              <div className='menuBox'>
                <Menu
                  onClick={this.handleClick}
                  style={{ width: 251, color: '#86b7fa', height: '100%', fontSize: '16px' }}
                  // defaultSelectedKeys={['7']}
                  // defaultOpenKeys={['sub2', 'sub3']}
                  mode="inline"

                >
                  <SubMenu key="sub2" title="海淀区">
                    {/* <Menu.Item key="5"></Menu.Item> */}
                    <SubMenu key="sub3" title="知春路拥堵应急">
                      <Menu.Item key="7">知春路与罗庄东路</Menu.Item>
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
          </div>
        </div>
        <div className='sidebarRight animated'>
          <div className='selectPopLayer'>
            <div className='selectItem'>协调路线：<Select defaultValue="1">
              <Option key="1" value="1">知春路</Option>
            </Select></div>
            <div className='selectItem'>协调记向切换：<Switch size="small" defaultChecked /></div>
            <div className='selectItem'>干线长度：580m</div>
            <div className='selectItem'>
              <span><i/>关键路口</span>
              <span><i/>常规路口</span>
            </div>
          </div>
          <div className='listLayer'>
            { iconFlagR ?  
              <em className='iconDirection' title='收起'onClick={this.handleRightClick}><DoubleRightOutlined /></em> :
              <em className='iconDirection' title='展开' onClick={this.handleRightClick}><DoubleLeftOutlined /></em>
            }
            <div className='asideItem' style={{flex:3}}>
              <div className='titleName'>知春路<span onClick={this.setAreaOpt}>区域优化配置</span></div>
              <div className='itemContent'>
                {
                [1,2,3,4].map((item)=>{
                  return <div className='itemFormBox'>
                    <div className='itemTit'><i/>知春路与***路</div>
                    <div className='itemForm'>
                      <dl>
                        <dd>实时相位差</dd>
                        <dd><input type="number" className='inputBox' defaultValue="30" /><em>秒</em></dd>
                      </dl>
                      <dl>
                        <dd>建议相位差</dd>
                        <dd><input type="number" className='inputBox' defaultValue="0" /><em>秒</em></dd>
                      </dl>
                      <dl>
                        <dd>偏移</dd>
                        <dd><input type="number" className='inputBox' defaultValue="20" /><em>秒</em></dd>
                      </dl>
                      <dl>
                        <dd>协调相位</dd>
                        <dd>
                        <Select defaultValue="1">
                          <Option key="1" value="1">A</Option>
                        </Select>
                        </dd>
                      </dl>
                      <div className='itemPic'/>
                    </div>
                  </div>
                })
              }
              </div>
            </div>
            <div className='asideItem'>
              {/* <div className='titleName'>区域运行整体指标</div> 
              <div className='itemContent'>
                  <div className='runRateCharts'>
                    <GraphCharts chartsDatas={this.state.faultCompare} times={this.time} />
                  </div>
              </div>*/}
              <div className='signaContainer_right_bom'>
                <div className='signaRB_top'>
                  {
                    this.btnList.map(item => <div onClick={() => this.btnRegion(item.id)} className={item.id === num ? 'active' : ''} key={item.id}>{item.name}</div>)
                  }
                </div>
                {
                  speedDelayDatas &&
                  <div className='signaRB_bom'>
                    <EchartsPage chartsDatas={speedDelayDatas} />
                  </div>
                }
              </div>
            </div> 
          </div>
        </div>
        <div className='container'>
          {
            !mainHomePage &&
            <div className='contentCenter'>
              <div className='title'>区域优化</div>
              <div id="mapContainer" className="map-container" style={{ height: 'calc(100% - 5px)' }}></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default RegionOpt