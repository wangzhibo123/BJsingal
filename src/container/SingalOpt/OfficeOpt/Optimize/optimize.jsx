import React from 'react'
import { Select, DatePicker } from 'antd'
import './optimize.scss'

// import requestBaseUrl from '../../../../../utils/getRequestBaseUrl'
import GreenWaveCharts from '../../../../components/GreenWaveCharts/GreenWaveCharts'
import RoadCharts from './trankLineCharts'


const { Option } = Select

class Optimize extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rdchlList: [{"end_lat":26.60803191562,"data_version":"20180630","adcode":"460100","end_geohash":"w7w6p18vfn","inter_id_seq":"11LIA064210,11LM1063PG0,11LCE064040","start_inter_id":"11LIA064210","lnglat_seq":"106.626958379295,26.606790480941;106.631725893128,26.6062457966819;106.63519472168,26.60803191562","end_inter_id":"11LCE064040","road_type_no":1,"dt":"20190605","start_lng":106.626958379295,"start_geohash":"w7w6ngy6bp","len":0,"rdchl_id":"LongQuanYuanJie_1","road_dir_no":1,"is_valid":1,"name":"龙泉苑街路","start_lat":26.606790480941,"end_lng":106.63519472168,"id":1,"inter_name_seq":"龙泉苑街与福州街,龙泉苑街与金源街,龙泉苑街与兰州街交叉口"}],
      firstRdchl: '龙泉苑街路',
      doeDateList: [{"doe_date_type":99,"doe_date_name":"工作日"}],
      greenWaveDateList: [{"dt":"2018-06-30"}],
      timeList: [{"time":"00:00:00-07:00:00"},{"time":"07:00:00-09:00:00"},{"time":"09:00:00-16:00:00"},{"time":"16:00:00-19:00:00"},{"time":"19:00:00-23:00:00"},{"time":"23:00:00-23:59:59"}],
      planSetList: [],
      firstGreenWave: null,
      firstDoeData: '工作日',
      firstTime: '00:00:00-07:00:00',
      firstPlan: '',
      showGreenWave: true,
      showForwordWave: true,
      showReverseWave: false,
      showControlRecord: false,
      interDatas: {"area_name":"观山湖区","lenAll":0,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"6","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":0,"reverse_offset":0,"is_key_inter":0,"len":0,"inter_name":"龙泉苑街与福州街","forward_phase_plan_id":"6","geohash":"w7w6nyvsds","reverse_phase_plan_name":"A","id":"11LIA064210","lev":"4","lat":26.606790480941,"inter_id":"11LIA064210","lng":106.626958379295,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":1,"phase_name":"A","doe_date_type":99},{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":2,"phase_name":"B","doe_date_type":99},{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":18,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":3,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与福州街","cycle_time":64,"forwordSpeed":"0.00"},
      areaInters: [{"area_name":"观山湖区","lenAll":0,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"6","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":0,"reverse_offset":0,"is_key_inter":0,"len":0,"inter_name":"龙泉苑街与福州街","forward_phase_plan_id":"6","geohash":"w7w6nyvsds","reverse_phase_plan_name":"A","id":"11LIA064210","lev":"4","lat":26.606790480941,"inter_id":"11LIA064210","lng":106.626958379295,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":1,"phase_name":"A","doe_date_type":99},{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":2,"phase_name":"B","doe_date_type":99},{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":18,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":3,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与福州街","cycle_time":64,"forwordSpeed":"0.00"},{"area_name":"观山湖区","lenAll":490,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"1","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":53,"reverse_offset":53,"is_key_inter":0,"len":490,"inter_name":"龙泉苑街与金源街","forward_phase_plan_id":"1","geohash":"w7w6p1ym89","reverse_phase_plan_name":"A","id":"11LM1063PG0","lev":"4","lat":26.6062457966819,"inter_id":"11LM1063PG0","lng":106.631725893128,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LM1063PG0","offset":53,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":19,"phase_name":"A","doe_date_type":99},{"inter_id":"11LM1063PG0","offset":53,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":20,"phase_name":"B","doe_date_type":99},{"inter_id":"11LM1063PG0","offset":53,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":18,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":21,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与金源街","cycle_time":64,"forwordSpeed":"30.00"},{"area_name":"观山湖区","lenAll":900,"data_version":"20180630","reverseSpeed":"0.00","execute_end_date":"","reverse_phase_plan_id":"1","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":35,"reverse_offset":35,"is_key_inter":0,"len":410,"inter_name":"龙泉苑街与兰州街交叉口","forward_phase_plan_id":"1","geohash":"w7w6nmzbtk","reverse_phase_plan_name":"A","id":"11LCE064040","lev":"4","lat":26.60803191562,"inter_id":"11LCE064040","lng":106.63519472168,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LCE064040","offset":35,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":22,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":70,"phase_name":"A","doe_date_type":99},{"inter_id":"11LCE064040","offset":35,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":22,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":71,"phase_name":"B","doe_date_type":99},{"inter_id":"11LCE064040","offset":35,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":20,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":72,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与兰州街交叉口","cycle_time":64,"forwordSpeed":"30.00"}],
      greenWaveData: [{"area_name":"观山湖区","lenAll":0,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"6","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":0,"reverse_offset":0,"is_key_inter":0,"len":0,"inter_name":"龙泉苑街与福州街","forward_phase_plan_id":"6","geohash":"w7w6nyvsds","reverse_phase_plan_name":"A","id":"11LIA064210","lev":"4","lat":26.606790480941,"inter_id":"11LIA064210","lng":106.626958379295,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":1,"phase_name":"A","doe_date_type":99},{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":2,"phase_name":"B","doe_date_type":99},{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":18,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":3,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与福州街","cycle_time":64,"forwordSpeed":"0.00"},{"area_name":"观山湖区","lenAll":490,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"1","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":53,"reverse_offset":53,"is_key_inter":0,"len":490,"inter_name":"龙泉苑街与金源街","forward_phase_plan_id":"1","geohash":"w7w6p1ym89","reverse_phase_plan_name":"A","id":"11LM1063PG0","lev":"4","lat":26.6062457966819,"inter_id":"11LM1063PG0","lng":106.631725893128,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LM1063PG0","offset":53,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":19,"phase_name":"A","doe_date_type":99},{"inter_id":"11LM1063PG0","offset":53,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":20,"phase_name":"B","doe_date_type":99},{"inter_id":"11LM1063PG0","offset":53,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":18,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":21,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与金源街","cycle_time":64,"forwordSpeed":"30.00"},{"area_name":"观山湖区","lenAll":900,"data_version":"20180630","reverseSpeed":"0.00","execute_end_date":"","reverse_phase_plan_id":"1","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":35,"reverse_offset":35,"is_key_inter":0,"len":410,"inter_name":"龙泉苑街与兰州街交叉口","forward_phase_plan_id":"1","geohash":"w7w6nmzbtk","reverse_phase_plan_name":"A","id":"11LCE064040","lev":"4","lat":26.60803191562,"inter_id":"11LCE064040","lng":106.63519472168,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LCE064040","offset":35,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":22,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":70,"phase_name":"A","doe_date_type":99},{"inter_id":"11LCE064040","offset":35,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":22,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":71,"phase_name":"B","doe_date_type":99},{"inter_id":"11LCE064040","offset":35,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":20,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":72,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与兰州街交叉口","cycle_time":64,"forwordSpeed":"30.00"}],
      SpeedChartsData: {"legend":["正向","反向","正向","反向"],"time":["00:00","00:05","00:10","00:15","00:20","00:25","00:30","00:35","00:40","00:45","00:50","00:55","01:00","01:05","01:10","01:15","01:20","01:25","01:30","01:35","01:40","01:45","01:50","01:55","02:00","02:05","02:10","02:15","02:20","02:25","02:30","02:35","02:40","02:45","02:50","02:55","03:00","03:05","03:10","03:15","03:20","03:25","03:30","03:35","03:40","03:45","03:50","03:55"],"series":[{"name":"正向","type":"line","data":[25.3324344722222,24.6866420833333,23.4139714166667,25.2238814166667,26.9528870833333,27.87686975,25.9248539166667,29.6276119166667,29.9628490833333,30.8806708333333,27.6330755833333,35.0260481666667,29.07717325,25.0512931666667,20.684653,20.5340255833333,21.54677125,22.6637271666667,21.2621165833333,20.4254074166667,20.69164375,21.03143525,21.2917544166667,20.3102923333333,20.71706675,21.8696038333333,21.34210125,22.76892525,20.015746,19.9020960833333,19.6262359166667,18.8614440833333,19.1974818333333,16.8275880833333,13.9507941666667,12.7022125833333,10.8265964166667,14.78611825,15.25768125,17.7674209166667,19.6110756666667,20.1367211666667,20.582936,19.76761275,21.0555205833333,21.5727374166667,23.4299001666667,23.4698931574074],"itemStyle":{"normal":{"color":"#55adff "}}},{"name":"反向","type":"line","data":[25.8529546111111,27.5283258333333,26.9237141666667,28.0431489166667,31.7092314166667,25.2902203333333,28.2858963333333,28.9394613333333,31.5959273333333,30.3091721666667,32.6069605,26.7162773333333,25.1126968333333,27.2082584166667,19.1460624166667,18.0894268333333,19.15446425,20.6666215833333,20.5287980833333,19.7843078333333,19.55829975,20.1485974166667,19.6891660833333,19.6020048333333,22.1058240833333,23.4109246666667,24.1868039166667,23.3879299166667,20.4760515833333,17.6139289166667,15.1395918333333,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"itemStyle":{"normal":{"color":"#c9c9c9"}}}]},
      delayChartsData: {"legend":["正向","反向","正向","反向"],"time":["00:00","00:05","00:10","00:15","00:20","00:25","00:30","00:35","00:40","00:45","00:50","00:55","01:00","01:05","01:10","01:15","01:20","01:25","01:30","01:35","01:40","01:45","01:50","01:55","02:00","02:05","02:10","02:15","02:20","02:25","02:30","02:35","02:40","02:45","02:50","02:55","03:00","03:05","03:10","03:15","03:20","03:25","03:30","03:35","03:40","03:45","03:50","03:55"],"series":[{"name":"正向","type":"line","data":[65.8711327561328,68.3535714285714,66.9064814814815,48.9884230769231,37.495,61.74,57.8463333333333,30.44,24.54,35.2853571428571,42.9688888888889,27.906,61.3277777777778,87.2997962962963,60.3686994949495,91.0022151853994,82.3384445565203,68.465125,75.0246542995995,91.1505212669683,72.5177830989673,79.6531298522987,75.313242561532,76.7057464615969,76.6033520645591,93.5348761393835,100.98383251634,87.4371437809267,95.0672691086691,86.7095169357537,96.9434533827026,109.199200170635,95.677213480283,198.803439119522,241.874923213482,250.472785426731,245.391244619708,211.672815319253,294.729991261825,104.358314279795,59.1573152575876,66.3443910380244,65.8473550989774,69.0159067460317,69.5320127266954,59.9311275585726,51.6036279461279,67.5138437208217],"itemStyle":{"normal":{"color":"#55adff "}}},{"name":"反向","type":"line","data":[119.025634920635,46.0529761904762,58.4856313131313,54.87425,67.7,45.4633333333333,85.1298333333333,14.2825,53.35,29.14,63.6219365079365,107.987333333333,94.065,59.6191746031746,106.454049145299,213.060489137224,244.703404652352,175.691087301587,160.764066106408,257.42194252004,252.160747833149,180.46217538932,206.359148698346,130.46121399816,118.252393871878,109.738618873087,88.5887866762867,111.859744758371,178.403169427421,315.196632791879,355.058483716183,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"itemStyle":{"normal":{"color":"#c9c9c9"}}}]},
      StopChartsData: {"legend":["正向","反向","正向","反向"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向","type":"line","data":[1.97186147186147,1.71349206349206,1.39814814814815,0.956837606837607,0.916666666666667,1,1.1,0.944444444444444,0.75,0.821428571428571,0.833333333333333,0.725,1.37962962962963,1.43703703703704,1.29217171717172,1.09062319259688,1.7891600368044,1.30169082125604,1.47885428249624,2.01800402212167,1.58219302627197,1.619079871946,1.69640233061286,1.27403554515212,1.27942638716633,1.58010110804228,1.95328578799941,1.52073007401955,1.8475641025641,1.60507483557686,1.96632205513784,2.05897009308774,1.77142811913453,2.93621964455298,3.3505439929008,3.41235909822866,3.41529698371804,2.69191396689041,3.32564133397467,1.70145771840818,1.44950561769784,1.87638285199137,1.32525956155987,1.47718253968254,1.85839124755533,1.49820134858835,1.19304812834225,1.72284080298786],"itemStyle":{"normal":{"color":"#55adff "}}},{"name":"反向","type":"line","data":[1.79100529100529,0.93968253968254,0.975589225589225,0.7,0.777777777777778,1.05555555555556,0.966666666666667,0.5,1,0.5,0.828571428571428,1.24444444444444,1.25,1.03253968253968,1.90356125356125,2.31840305663835,2.75780036388732,2.00952380952381,2.07412382938699,2.92650988303162,2.96701561539023,2.2486235986236,2.37569446751032,1.90763630089717,1.93081548928231,1.54623558690055,1.20414301747635,1.5436360212797,2.23754894228578,3.43261482977151,3.7122144346253,2.45167918501252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"itemStyle":{"normal":{"color":"#c9c9c9"}}}]},
      TimeChartsData: {"legend":["正向","反向","正向","反向"],"time":["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"],"series":[{"name":"正向","type":"line","data":[231.372748888889,238.579973666667,249.433275333333,237.189443333333,221.825372,223.910485666667,226.377718666667,200.898447333333,202.541708666667,193.640155666667,222.276991666667,176.731947333333,213.860056666667,262.094100666667,309.519872666667,321.373729,295.347550666667,274.338088,286.622442333333,290.195291333333,294.144061333333,286.094611,282.193192666667,293.208927666667,286.882520666667,275.786980666667,276.523352,267.969915,301.942904,303.143823,302.671028666667,310.442839333333,324.366745,415.829295666667,552.495536666667,615.893153666667,625.357871666667,551.159837666667,595.521299666667,384.871606333333,304.111439,296.736357666667,291.556477,307.334853666667,288.044750333333,279.550146666667,265.180342,249.968238444444],"itemStyle":{"normal":{"color":"#55adff "}}},{"name":"反向","type":"line","data":[258.690937,233.825283666667,241.272258666667,234.666003666667,226.283894333333,271.203064666667,240.689455666667,246.007807666667,215.969982333333,201.770963333333,205.133579333333,258.961922333333,266.507202333333,240.982571,342.142437,430.129718333333,458.486048666667,407.182312666667,358.145637333333,455.552143,444.845365333333,362.608158666667,408.420061,356.838544,304.541926,286.391276333333,278.534538333333,292.066556666667,352.402301333333,526.169016,571.701542666667,383.544835,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"itemStyle":{"normal":{"color":"#c9c9c9"}}}]},
    }
    this.colorAry = ['#55adff ', '#c9c9c9', '#c88c75', '#ffb4b4 ', ' #00c3c1 ', '#fbffb4 ', ' #63eeff', '#ffa5fe ', '#c8cc52', ' #ff719c']
    // this.optSelectUrl = `${requestBaseUrl}/dws/evlregionOpt/getEvlregionOptSetSelect`
    // this.optDataUrl = `${requestBaseUrl}/dws/evlregionOpt/getRdchlOptData`
    // this.timeoffset = `${requestBaseUrl}/dws/evlregionOpt/getTimeoffset_d`
    // this.typeoffset = `${requestBaseUrl}/dws/evlregionOpt/getTypeoffset_d`
    // this.addOptPlanUrl = `${requestBaseUrl}/dws/evlregionOpt/addEvlregionOptPlan`
    // this.delayDurUrl = `${requestBaseUrl}/dws/AreaOptimization/getSpeed_Delaydur`
    // this.stopTimeUrl = `${requestBaseUrl}/dws/AreaOptimization/getStop_Time`
    this.planSelParams = {
      evlregion_id: 'LongQuanYuanJie',
      rdchl_id: 'LongQuanYuanJie_1',
      dir: '2',
    }
    this.interSignalParams = { inter_ids: '' }
    this.submitParams = {
      ctlregion_id: '',
      ctlregion_name: '',
      rdchl_id: '',
      offset_dt: '',
      plan_index: '',
      plan_name: '',
      doe_date_type: '',
      time: '',
      data: '',
    }
    this.optDataParams = {
      doeDate: '99',
      evlregion_id: 'LongQuanYuanJie',
      greenWaveDate: '2018-06-30',
      plan_index: '1',
      rdchl_id: 'LongQuanYuanJie_1',
      time: '16:30:00-19:30:00',
    }
    this.planSentParams = {
      'data.ctlregion_id': 'LongQuanYuanJie',
      'data.plan_index': 1,
      'data.rdchl_id': 'LongQuanYuanJie_1',
    }
    this.typeoffsetP = {
      dt: '',
    }
    this.timeoffsetP = {
      ctlregion_id: 'LongQuanYuanJie',
      doe_date_type: '',
      dt: '',
    }
  }
  componentDidMount = () => {
    // this.getEvlregionOptSetSelect()
    // this.getStopTime()
    // this.getSpeedDelaydur()
  }
  // getDoeDataLists = (firstDoe = '', fitstDoeType = '', timeFirst = '') => {
  //   $.ajax({
  //     url: this.typeoffset,
  //     type: 'post',
  //     data: this.typeoffsetP,
  //     success: (res) => {
  //       res = JSON.parse(res)
  //       if (res.code === '1') {
  //         this.setState({
  //           firstDoeData: firstDoe || res.data[0].doe_date_name,
  //           doeDateList: res.data,
  //         })
  //         this.submitParams.doe_date_type = fitstDoeType || res.data[0].doe_date_type
  //         this.optDataParams.doeDate = fitstDoeType || res.data[0].doe_date_type
  //         this.timeoffsetP.doe_date_type = fitstDoeType || res.data[0].doe_date_type
  //         $.ajax({
  //           url: this.timeoffset,
  //           type: 'post',
  //           data: this.timeoffsetP,
  //           success: (result) => {
  //             result = JSON.parse(result)
  //             if (result.code === '1') {
  //               this.setState({
  //                 timeList: result.data,
  //                 firstTime: timeFirst || result.data[0].time
  //               }, () => {
  //                 this.submitParams.time = this.state.firstTime
  //                 this.optDataParams.time = this.state.firstTime
  //               })
  //             }
  //           },
  //         })
  //       }
  //     },
  //   })
  // }
  // // 获取优化配置路口数据
  // getRdchlOptData = () => {
  //   this.setState({ greenWaveData: null })
  //   $.ajax({
  //     url: this.optDataUrl,
  //     type: 'post',
  //     data: this.optDataParams,
  //     success: (result) => {
  //       result = JSON.parse(result)
  //       if (result.code === '1') {
  //         const inters = result.data
  //         this.rdchlOptData = inters
  //         this.submitParams.data = JSON.stringify(this.rdchlOptData)
  //         const forwardOffset = inters[0].forward_offset
  //         const reverseOffset = inters[0].reverse_offset
  //         const forwardPhasePlanName = inters[0].forward_phase_plan_name
  //         const reversePhasePlanName = inters[0].reverse_phase_plan_name
  //         const phaseList = inters[0].phaseList
  //         const interIds = []
  //         let totleDistance = 0
  //         inters.forEach((item) => {
  //           totleDistance += item.len
  //           interIds.push(item.inter_id)
  //         })
  //         this.interSignalParams.inter_ids = interIds.join(',')
  //         this.setState({
  //           greenWaveData: inters,
  //           totleDistance,
  //           interDatas: inters[0],
  //           forwardOffset,
  //           reverseOffset,
  //           forwardPhasePlanName,
  //           reversePhasePlanName,
  //           forwordValue: forwardOffset !== '' ? forwardOffset : phaseList.length > 0 ? phaseList[0].offset : '',
  //           reverseValue: reverseOffset !== '' ? reverseOffset : phaseList.length > 0 ? phaseList[0].offset : '',
  //           forwordDiffer: forwardPhasePlanName !== '' ? forwardPhasePlanName : phaseList.length > 0 ? phaseList[0].phase_name : '',
  //           reverseDiffer: reversePhasePlanName !== '' ? reversePhasePlanName : phaseList.length > 0 ? phaseList[0].phase_name : '',
  //           areaInters: inters,
  //         })
  //         console.log(JSON.stringify(inters), 'hello')
  //       }
  //     }
  //   })
  // }
  // // 获取优化数据下拉列表
  // getEvlregionOptSetSelect = () => {
  //   $.ajax({
  //     url: this.optSelectUrl,
  //     type: 'post',
  //     data: this.planSelParams,
  //     success: (result) => {
  //       result = JSON.parse(result)
  //       if (result.code === '1') {
  //         const data = result.data
  //         const isPlan = data.planSetList.length > 0
  //         this.planSentParams['data.plan_index'] = isPlan ? data.planSetList[0].plan_index : ''
  //         this.optSelectData = data
  //         this.typeoffsetP.dt = isPlan ? data.planSetList[0].offset_dt : data.greenWaveDateList[0].dt
  //         this.timeoffsetP.dt = isPlan ? data.planSetList[0].offset_dt : data.greenWaveDateList[0].dt
  //         this.getDoeDataLists(isPlan ? data.planSetList[0].doe_date_name : '', isPlan ? data.planSetList[0].doe_date_type : '', isPlan ? data.planSetList[0].time : '')
  //         this.setState({
  //           // doeDateList: data.doeDateList,
  //           greenWaveDateList: data.greenWaveDateList,
  //           rdchlList: data.rdchlList,
  //           // timeList: data.timeList,
  //           planSetList: data.planSetList,
  //           firstRdchl: data.rdchlList[0].name,
  //           firstGreenWave: isPlan ? data.planSetList[0].offset_dt : data.greenWaveDateList[0].dt,
  //           // firstDoeData: isPlan ? data.planSetList[0].doe_date_name : data.doeDateList[0].doe_date_name,
  //           // firstTime: isPlan ? data.planSetList[0].time : data.timeList[0].time,
  //           firstPlan: isPlan ? data.planSetList[0].plan_name : '',
  //         }, () => {
  //           this.submitParams.plan_name = isPlan ? data.planSetList[0].plan_name : ''
  //           this.submitParams.plan_index = isPlan ? data.planSetList[0].plan_index : ''
  //           this.submitParams.offset_dt = this.state.firstGreenWave
  //           // this.submitParams.doe_date_type = isPlan ? data.planSetList[0].doe_date_type : data.doeDateList[0].doe_date_type
  //           // this.submitParams.time = this.state.firstTime
  //           // this.optDataParams.doeDate = isPlan ? data.planSetList[0].doe_date_type : data.doeDateList[0].doe_date_type
  //           this.optDataParams.greenWaveDate = this.state.firstGreenWave
  //           this.optDataParams.plan_index = isPlan ? data.planSetList[0].plan_index : ''
  //           // this.optDataParams.time = this.state.firstTime
  //           this.optDataParams.rdchl_id = data.rdchlList.length > 0 && data.rdchlList[0].rdchl_id
  //           console.log(this.submitParams)
  //           setTimeout(() => {
  //             this.getRdchlOptData()
  //           }, 500)
  //         })
  //       }
  //     },
  //   })
  // }
  // // 获取延误和速度
  // getSpeedDelaydur = () => {
  //   $.ajax({
  //     url: this.delayDurUrl,
  //     type: 'post',
  //     data: this.planSelParams,
  //     success: (result) => {
  //       result = JSON.parse(result)
  //       if (result.code === '1') {
  //         const forwordData = []
  //         const rewordData = []
  //         const Timeforword = new Array(result.xs.length).fill(0)
  //         const Timereword = new Array(result.xs.length).fill(0)
  //         const Stopforword = new Array(result.xs.length).fill(0)
  //         const Stopreword = new Array(result.xs.length).fill(0)
  //         if (result.data.length > 0) {
  //           result.data.forEach((item, index) => {
  //             if (item.dir === '0') {
  //               forwordData.push(item)
  //             } else {
  //               rewordData.push(item)
  //             }
  //           })
  //           forwordData.forEach((item, index) => {
  //             const _index = result.xs.indexOf(item.time)
  //             if (_index !== -1) {
  //               Timeforword.splice(_index, 1, item.Speed)
  //               Stopforword.splice(_index, 1, item.delay)
  //             }
  //           })
  //           rewordData.forEach((item, index) => {
  //             const _index = result.xs.indexOf(item.time)
  //             if (_index !== -1) {
  //               Timereword.splice(_index, 1, item.Speed)
  //               Stopreword.splice(_index, 1, item.delay)
  //             }
  //           })
  //           const timeDataObj = { '正向': Timeforword, '反向': Timereword }
  //           const stopDataObj = { '正向': Stopforword, '反向': Stopreword }
  //           const legend = []
  //           const Timeseries = []
  //           const Stopseries = []
  //           Object.keys(timeDataObj).forEach((item, index) => {
  //             legend.push(item)
  //             const obj = {}
  //             obj.name = item
  //             obj.type = 'line'
  //             obj.data = timeDataObj[item]
  //             obj.itemStyle = {
  //               normal: {
  //                 color: this.colorAry[index],
  //               }
  //             }
  //             Timeseries.push(obj)
  //           })
  //           Object.keys(stopDataObj).forEach((item, index) => {
  //             legend.push(item)
  //             const obj = {}
  //             obj.name = item
  //             obj.type = 'line'
  //             obj.data = stopDataObj[item]
  //             obj.itemStyle = {
  //               normal: {
  //                 color: this.colorAry[index],
  //               }
  //             }
  //             Stopseries.push(obj)
  //           })
  //           const SpeedChartsData = { legend, time: result.xs, series: Timeseries }
  //           const delayChartsData = { legend, time: result.xs, series: Stopseries }
  //           this.setState({
  //             SpeedChartsData,
  //             delayChartsData,
  //           })
  //         } else {
  //           const SpeedChartsData = { legend: [], time: [], series: [] }
  //           const delayChartsData = { legend: [], time: [], series: [] }
  //           this.setState({
  //             SpeedChartsData,
  //             delayChartsData,
  //           })
  //         }
  //       } else {
  //         const SpeedChartsData = { legend: [], time: [], series: [] }
  //         const delayChartsData = { legend: [], time: [], series: [] }
  //         this.setState({
  //           SpeedChartsData,
  //           delayChartsData,
  //         })
  //       }
  //     }
  //   })
  // }
  // // 获取停车和行程时间
  // getStopTime = () => {
  //   $.ajax({
  //     url: this.stopTimeUrl,
  //     type: 'post',
  //     data: this.planSelParams,
  //     success: (result) => {
  //       result = JSON.parse(result)
  //       if (result.code === '1') {
  //         const forwordData = []
  //         const rewordData = []
  //         const Timeforword = new Array(result.xs.length).fill(0)
  //         const Timereword = new Array(result.xs.length).fill(0)
  //         const Stopforword = new Array(result.xs.length).fill(0)
  //         const Stopreword = new Array(result.xs.length).fill(0)
  //         if (result.data.length > 0) {
  //           result.data.forEach((item, index) => {
  //             if (item.dir === '0') {
  //               forwordData.push(item)
  //             } else {
  //               rewordData.push(item)
  //             }
  //           })
  //           forwordData.forEach((item, index) => {
  //             const _index = result.xs.indexOf(item.time)
  //             if (_index !== -1) {
  //               Timeforword.splice(_index, 1, item.travelTime)
  //               Stopforword.splice(_index, 1, item.stopCar)
  //             }
  //           })
  //           rewordData.forEach((item, index) => {
  //             const _index = result.xs.indexOf(item.time)
  //             if (_index !== -1) {
  //               Timereword.splice(_index, 1, item.travelTime)
  //               Stopreword.splice(_index, 1, item.stopCar)
  //             }
  //           })
  //           const timeDataObj = { '正向': Timeforword, '反向': Timereword }
  //           const stopDataObj = { '正向': Stopforword, '反向': Stopreword }
  //           const legend = []
  //           const Timeseries = []
  //           const Stopseries = []
  //           Object.keys(timeDataObj).forEach((item, index) => {
  //             legend.push(item)
  //             const obj = {}
  //             obj.name = item
  //             obj.type = 'line'
  //             obj.data = timeDataObj[item]
  //             obj.itemStyle = {
  //               normal: {
  //                 color: this.colorAry[index],
  //               }
  //             }
  //             Timeseries.push(obj)
  //           })
  //           Object.keys(stopDataObj).forEach((item, index) => {
  //             legend.push(item)
  //             const obj = {}
  //             obj.name = item
  //             obj.type = 'line'
  //             obj.data = stopDataObj[item]
  //             obj.itemStyle = {
  //               normal: {
  //                 color: this.colorAry[index],
  //               }
  //             }
  //             Stopseries.push(obj)
  //           })
  //           const TimeChartsData = { legend, time: result.xs, series: Timeseries }
  //           const StopChartsData = { legend, time: result.xs, series: Stopseries }
  //           this.setState({
  //             TimeChartsData,
  //             StopChartsData,
  //           })
  //         } else {
  //           const TimeChartsData = { legend: [], time: [], series: [] }
  //           const StopChartsData = { legend: [], time: [], series: [] }
  //           this.setState({
  //             TimeChartsData,
  //             StopChartsData,
  //           })
  //         }
  //       } else {
  //         const TimeChartsData = { legend: [], time: [], series: [] }
  //         const StopChartsData = { legend: [], time: [], series: [] }
  //         this.setState({
  //           TimeChartsData,
  //           StopChartsData,
  //         })
  //       }
  //     }
  //   })
  // }
  // // 保存
  // addOptPlan = () => {
  //   $.ajax({
  //     url: this.addOptPlanUrl,
  //     type: 'post',
  //     data: this.submitParams,
  //     success: (result) => {
  //       result = JSON.parse(result)
  //       if (result.code === '1') {
  //         this.openNotification('保存成功！')
  //       } else {
  //         this.openNotification('保存失败！')
  //       }
  //     }
  //   })
  // }
  // // 优化数据下拉选择事件
  // handleSearchItems = (value, options) => {
  //   const dataName = options.props.dataname
  //   const dataId = options.key
  //   this.optDataParams[dataName] = dataId
  //   if (dataName === 'doeDate') {
  //     this.setState({ firstDoeData: value })
  //     this.submitParams.doe_date_type = dataId
  //     this.timeoffsetP.doe_date_type = dataId
  //     $.ajax({
  //       url: this.timeoffset,
  //       type: 'post',
  //       data: this.timeoffsetP,
  //       success: (result) => {
  //         result = JSON.parse(result)
  //         if (result.code === '1') {
  //           this.setState({
  //             timeList: result.data,
  //             firstTime: result.data[0].time
  //           }, () => {
  //             this.submitParams.time = this.state.firstTime
  //             this.optDataParams.time = this.state.firstTime
  //           })
  //         }
  //       }
  //     })
  //   } else if (dataName === 'greenWaveDate') {
  //     this.setState({ firstGreenWave: value })
  //     this.submitParams.offset_dt = dataId
  //     this.optDataParams.greenWaveDate = dataId
  //     this.getDoeDataLists()
  //   } else if (dataName === 'rdchl_id') {
  //     this.isChangeRdchil = true
  //     this.setState({ firstRdchl: value })
  //     this.planSelParams.rdchl_id = dataId
  //     this.submitParams.rdchl_id = dataId
  //     this.optDataParams.rdchl_id = dataId
  //     this.getPlanSelect()
  //   } else if (dataName === 'time') {
  //     this.setState({ firstTime: value })
  //     this.submitParams.time = dataId
  //     this.optDataParams.time = dataId
  //   } else if (dataName === 'plan') {
  //     this.planSentParams['data.plan_index'] = this.state.firstPlan = dataId
  //     const planSet = this.state.planSetList.filter(item => item.plan_index === Number(dataId))
  //     const { doe_date_name, offset_dt, time, doe_date_type } = planSet[0]
  //     this.setState({
  //       firstPlan: value,
  //       firstDoeData: doe_date_name,
  //       firstGreenWave: offset_dt,
  //       firstTime: time,
  //     })
  //     this.submitParams.doe_date_type = doe_date_type
  //     this.submitParams.offset_dt = offset_dt
  //     this.submitParams.time = time
  //     this.submitParams.plan_index = dataId
  //     this.submitParams.plan_name = value
  //     this.optDataParams.doeDate = doe_date_type
  //     this.optDataParams.greenWaveDate = offset_dt
  //     this.optDataParams.time = time
  //     this.optDataParams.plan_index = dataId
  //     console.log(this.submitParams)
  //   }
  // }
  // // 优化配置选择路口
  // handleAreaInterChange = (value, options) => {
  //   const interId = options.key
  //   const thisInter = this.state.areaInters.filter(item => item.inter_id === interId)
  //   const forwordValue = thisInter[0].forward_offset
  //   const reverseValue = thisInter[0].reverse_offset
  //   const forwardPhasePlanName = thisInter[0].forward_phase_plan_name
  //   const reversePhasePlanName = thisInter[0].reverse_phase_plan_name
  //   const phaseList = thisInter[0].phaseList
  //   this.setState({
  //     interDatas: thisInter[0],
  //     forwordValue: forwordValue !== '' ? forwordValue : phaseList.length > 0 ? phaseList[0].offset : '',
  //     reverseValue: reverseValue !== '' ? reverseValue : phaseList.length > 0 ? phaseList[0].offset : '',
  //     forwordDiffer: forwardPhasePlanName !== '' ? forwardPhasePlanName : phaseList.length > 0 ? phaseList[0].phase_name : '',
  //     reverseDiffer: reversePhasePlanName !== '' ? reversePhasePlanName : phaseList.length > 0 ? phaseList[0].phase_name : '',
  //   })
  // }
  // // 正反向速度修改
  // handleSpeedChange = (e) => {
  //   if (this.speedTimer) {
  //     clearTimeout(this.speedTimer)
  //     this.speedTimer = null
  //   }
  //   const inputEle = e.target
  //   const interId = inputEle.getAttribute('interid')
  //   const direction = inputEle.getAttribute('direction')
  //   const value = inputEle.value
  //   const interData = this.rdchlOptData.filter(item => item.inter_id === interId)
  //   const _interData = this.state.greenWaveData.filter(item => item.inter_id === interId)
  //   interData[0][direction] = value
  //   _interData[0][direction] = value
  //   this.submitParams.data = JSON.stringify(this.rdchlOptData)
  //   this.speedTimer = setTimeout(() => {
  //     this.setState({ greenWaveData: this.state.greenWaveData })
  //   }, 2000)
  // }
  // // 查询绿波数据
  // handleSearchGreenWave = () => {
  //   if (this.realTimer) {
  //     clearInterval(this.realTimer)
  //     this.realTimer = null
  //   }
  //   this.setState({
  //     showGreenWave: true,
  //     isBlock: 'none',
  //   }, () => {
  //     this.getRdchlOptData()
  //   })
  // }
  // // 修改执行时间
  // handleActionTime = (moment, value, type, id) => {
  //   const interData = this.rdchlOptData.filter(item => item.inter_id === id)
  //   interData[type] = value
  //   this.submitParams.data = JSON.stringify(this.rdchlOptData)
  // }
  // // 修改相位差
  // handlePhaseDifferChange = (e, direction) => {
  //   if (this.phaseDifferTimer) {
  //     clearTimeout(this.phaseDifferTimer)
  //     this.phaseDifferTimer = null
  //   }
  //   const inputEle = e.target
  //   const interId = inputEle.getAttribute('interid')
  //   const phaseName = inputEle.getAttribute('phasename')
  //   const interData = this.rdchlOptData.filter(item => item.inter_id === interId)
  //   if (direction === 'forword') {
  //     this.setState({ forwordValue: inputEle.value })
  //     interData[0].forward_offset = inputEle.value
  //     interData[0].reverse_offset = inputEle.value
  //   } else {
  //     interData[0].reverse_offset = inputEle.value
  //   }
  //   this.phaseDifferTimer = setTimeout(() => {
  //     this.submitParams.data = JSON.stringify(this.rdchlOptData)
  //     this.setState({ greenWaveData: this.state.greenWaveData })
  //   }, 1800)
  // }
  // // 修改相位
  // handlePhaseNameChange = (value, options, direction) => {
  //   const interId = options.props.interid
  //   const phaseId = options.props.phaseid
  //   const interData = this.rdchlOptData.filter(item => item.inter_id === interId)
  //   if (direction === 'forword') {
  //     this.setState({ forwordDiffer: value, reverseDiffer: value })
  //     interData[0].forward_phase_plan_name = value
  //     interData[0].forward_phase_plan_id = phaseId
  //     interData[0].reverse_phase_plan_name = value
  //     interData[0].reverse_phase_plan_id = phaseId
  //   } else {
  //     this.setState({ reverseDiffer: value })
  //     interData[0].reverse_phase_plan_name = value
  //     interData[0].reverse_phase_plan_id = phaseId
  //   }
  //   this.submitParams.data = JSON.stringify(this.rdchlOptData)
  //   this.setState({ greenWaveData: this.state.greenWaveData })
  // }
  // handleShowControlRecord = () => {
  //   this.props.showControlRecord()
  // }
  // handleForwordWave = () => {
  //   this.setState({ showForwordWave: !this.state.showForwordWave })
  // }
  // handleReverseWave = () => {
  //   this.setState({ showReverseWave: !this.state.showReverseWave })
  // }
  render() {
    return (
      <div className="optimization_box">
        <div className="optimizationFlex">
          <div className="configure_left">
            <div className="searchItems">
              <span>干线 </span>
              {
                this.state.rdchlList &&
                <Select value={this.state.firstRdchl} onChange={this.handleSearchItems}>
                  {
                    this.state.rdchlList.map((item, index) => {
                      return (
                        <Option value={item.name} dataname="rdchl_id" key={item.rdchl_id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              }
              <span>优化方案 </span>
              {
                this.state.planSetList &&
                <Select value={this.state.firstPlan} onChange={this.handleSearchItems}>
                  {
                    this.state.planSetList.map((item, index) => {
                      return (
                        <Option value={item.plan_name} dataname="plan" key={item.plan_index}>{item.plan_name}</Option>
                      )
                    })
                  }
                </Select>
              }
              <span>时间段 </span>
              {
                this.state.firstTime &&
                <Select value={this.state.firstTime} onChange={this.handleSearchItems}>
                  {
                    this.state.timeList.map((item, index) => {
                      return (
                        <Option value={item.time} dataname="time" key={item.time}>{item.time}</Option>
                      )
                    })
                  }
                </Select>
              }
              <span>绿波时间 </span>
              {
                this.state.greenWaveDateList &&
                <Select value={this.state.firstGreenWave} onChange={this.handleSearchItems}>
                  {
                    this.state.greenWaveDateList.map((item, index) => {
                      return (
                        <Option value={item.dt} dataname="greenWaveDate" key={item.dt}>{item.dt}</Option>
                      )
                    })
                  }
                </Select>
              }
              <span>工作类型 </span>
              {
                this.state.doeDateList &&
                <Select value={this.state.firstDoeData} onChange={this.handleSearchItems}>
                  {
                    this.state.doeDateList.map((item, index) => {
                      return (
                        <Option value={item.doe_date_name} dataname="doeDate" key={item.doe_date_type}>{item.doe_date_name}</Option>
                      )
                    })
                  }
                </Select>
              }
              <span>优化目标 </span>
              <Select value="全向带宽最大">
                <Option value="全向带宽最大" key="全向带宽最大">全向带宽最大</Option>
              </Select>
              <span className="searchBtn" onClick={this.handleSearchGreenWave}>查询</span>
              {/* <span className="openDetectionBtn" onClick={this.handleRealTimeDetection}>开启实时干线检测</span> */}
            </div>
            <div className="greenWaveItems">
              <div className="itemsBox"><span className="itemsIcon white"></span>主协调时长</div>
              <div className="itemsBox"><span className="itemsIcon red"></span>红灯时长</div>
              <div className="itemsBox" style={{ cursor: 'pointer', opacity: this.state.showForwordWave ? 1 : .4 }} onClick={this.handleForwordWave}>
                <span className="itemsIcon greenF"></span>正向绿波
              </div>
              <div className="itemsBox" style={{ cursor: 'pointer', opacity: this.state.showReverseWave ? 1 : .4 }} onClick={this.handleReverseWave}>
                <span className="itemsIcon greenR"></span>反向绿波
              </div>
            </div>
            <div style={{ width: '100%', height: '403px' }}>
              <div style={{ width: '1000px', height: '400px', padding: '15px 0 40px 0', margin: '0 auto' }}>
                {
                  this.state.greenWaveData && this.state.showGreenWave ?
                    <GreenWaveCharts
                      chartsData={this.state.greenWaveData}
                      totleDistance={900}
                      showForwordWave={this.state.showForwordWave}
                      showReverseWave={this.state.showReverseWave}
                      key={this.state.totleDistance + this.state.showForwordWave}
                    /> : null
                }
              </div>
            </div>
          </div>
          <div className="configure_right" style={{ position: 'relative', padding: '10px' }}>
            <div style={{ zIndex: 2, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: this.state.isBlock }} />
            {
              this.state.interDatas &&
              <div>
                <div className="interSpeed">
                  <div className="areaInter">
                    <span>区域路口</span>
                    {
                      this.state.areaInters &&
                      <Select defaultValue={this.state.interDatas.inter_name} onChange={this.handleAreaInterChange} key={this.state.interDatas.inter_name}>
                        {
                          this.state.areaInters.map((item, index) => {
                            return (
                              <Option value={item.inter_name} key={item.inter_id}>{item.inter_name}</Option>
                            )
                          })
                        }
                      </Select>
                    }
                  </div>
                  <div className="speedBox">
                    <div>正向通行速度</div>
                    <div className="speed">
                      <input
                        key={this.state.interDatas.inter_id + this.state.interDatas.forwordSpeed}
                        type="text"
                        interid={this.state.interDatas.inter_id}
                        direction="forwordSpeed"
                        defaultValue={this.state.interDatas.forwordSpeed}
                        onChange={(e) => { this.handleSpeedChange(e) }}
                      />
                      <span className="unit">千米/小时</span>
                    </div>
                  </div>
                  <div className="speedBox">
                    <div>反向通行速度</div>
                    <div className="speed">
                      <input
                        key={this.state.interDatas.inter_id + this.state.interDatas.reverseSpeed}
                        type="text"
                        interid={this.state.interDatas.inter_id}
                        direction="reverseSpeed"
                        defaultValue={this.state.interDatas.reverseSpeed}
                        onChange={(e) => { this.handleSpeedChange(e) }}
                      />
                      <span className="unit">千米/小时</span>
                    </div>
                  </div>
                </div>
                <div style={{ paddingBottom: '15px', borderBottom: '1px solid #4c5366' }}>
                  <div className="optBox">
                    <div className="left">
                      <div className="top">相位</div>
                      <div className="bottom">相位时间(秒)</div>
                    </div>
                    <div className="center">
                      {
                        this.state.interDatas.phaseList.map((item, index) => {
                          return (
                            <div className="centerBox" key={item.phase_name}>
                              <div className="top">{item.phase_name}</div>
                              <div className="bottom">
                                {/*<div className="editDiv" contentEditable={this.state.contentEdit} suppressContentEditableWarning={true} dataname={item.name} datavalue={item.value} onKeyUp={(e) => {this.handleKeyDown(e)}}>{item.value}</div>*/}
                                <input type="text" dataname={item.phase_name} key={item.phase_name + item.split_time} defaultValue={item.split_time} readOnly />
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="left">
                      <div className="top">周期</div>
                      <div className="bottom">{this.state.interDatas.phaseList.length > 0 ? this.state.interDatas.phaseList[0].cycle_time : ''}</div>
                    </div>
                  </div>
                </div>
                <div className="phaseDif">
                  {/* <div className="phasebox"> */}
                  <div className="phaseDirective" style={{ flex: 1 }}>
                    <span className="textBox">正向主协调相位</span>
                    <Select
                      key={this.state.interDatas.inter_id + this.state.forwordDiffer}
                      defaultValue={this.state.forwordDiffer}
                      onChange={(value, options) => { this.handlePhaseNameChange(value, options, 'forword') }}
                    >
                      {
                        this.state.interDatas.phaseList.map((item, index) => {
                          return (
                            <Option value={item.phase_name} key={item.phase_name + this.state.interDatas.inter_id} phaseid={item.phase_plan_id} interid={this.state.interDatas.inter_id}>{item.phase_name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div className="phasegap" style={{ flex: 1 }}>
                    <span className="textBox">相位差</span>&nbsp;
                    <input
                      key={this.state.forwordValue + this.state.interDatas.inter_id}
                      type="text"
                      interid={this.state.interDatas.inter_id}
                      phasename={this.state.forwordDiffer}
                      defaultValue={this.state.forwordValue}
                      onChange={(e) => { this.handlePhaseDifferChange(e, 'forword') }}
                    />
                  </div>
                </div>
                <div className="timeSelectBox">
                  <div className="timeFrame">
                    <div className="timeBox">
                      <div className="textname">子区ID</div>
                      <div className="textTimeBox"><span className="textTime" title={this.props.ctrlregionId}>{this.props.ctrlregionId}</span></div>
                    </div>
                    <div className="timeBox">
                      <div className="textname">方案时间段</div>
                      <div className="textTimeBox"><span className="textTime" title={this.state.firstTime}>{this.state.firstTime}</span></div>
                    </div>
                    <div className="timeBox">
                      <div className="textname">执行日期</div>
                      <div className="textTimeBox"><span className="textTime" title={this.state.firstDoeData}>{this.state.firstDoeData}</span></div>
                    </div>
                  </div>
                  <div className="timeSelect"></div>
                </div>
                <div className="executionTime">
                  <span>执行开始时间</span><DatePicker onChange={(moment, value) => { this.handleActionTime(moment, value, 'execute_start_date', this.state.interDatas.inter_id) }} />
                  <span>执行结束时间</span><DatePicker onChange={(moment, value) => { this.handleActionTime(moment, value, 'execute_end_date', this.state.interDatas.inter_id) }} />
                </div>
                <div className="activeBtns">
                  <div className="btnBox" onClick={this.handleShowControlRecord}>下发方案管理</div>
                  <div className="btnBox" onClick={this.handleSubIntervalPlanSent}>子区方案下发</div>
                  <div className="btnBox" onClick={this.addOptPlan}>保存</div>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="rdchlChartsBox scrollBox">
          <div className="chartsBoxItems">
            <div className="chartsWrapper">
              {
                !!this.state.SpeedChartsData &&
                <RoadCharts chartsData={this.state.SpeedChartsData} title="干线平均速度曲线图" key="干线平均速度曲线图" />
              }
            </div>
            <div className="chartsWrapper">
              {
                !!this.state.delayChartsData &&
                <RoadCharts chartsData={this.state.delayChartsData} title="干线平均延误曲线图" key="干线平均延误曲线图" />
              }
            </div>
          </div>
          <div className="chartsBoxItems">
            <div className="chartsWrapper">
              {
                !!this.state.StopChartsData &&
                <RoadCharts chartsData={this.state.StopChartsData} title="干线平均停车次数曲线图" key="干线平均停车次数曲线图" />
              }
            </div>
            <div className="chartsWrapper">
              {
                !!this.state.TimeChartsData &&
                <RoadCharts chartsData={this.state.TimeChartsData} title="干线行程时间曲线图" key="干线行程时间曲线图" />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Optimize
