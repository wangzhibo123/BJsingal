import React,{Component} from "react";
import "./mainMonitorSeriesPage.scss";
import SeriesMessage from "./seriesMessage/seriesMessage";
import GreenWaveCharts from "../../../utils/GreenWaveCharts/GreenWaveCharts"
import {Select,Button} from "antd";
const {Option} =Select;
export default class MainMonitorSeriesPage extends Component{
    constructor(props){
        super(props)
        this.state={
            chartsData: [{"area_name":"观山湖区","lenAll":0,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"6","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":0,"reverse_offset":0,"is_key_inter":0,"len":0,"inter_name":"龙泉苑街与福州街","forward_phase_plan_id":"6","geohash":"w7w6nyvsds","reverse_phase_plan_name":"A","id":"11LIA064210","lev":"4","lat":26.606790480941,"inter_id":"11LIA064210","lng":106.626958379295,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":1,"phase_name":"A","doe_date_type":99},{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":2,"phase_name":"B","doe_date_type":99},{"inter_id":"11LIA064210","offset":0,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":18,"phase_plan_id":"6","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":3,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与福州街","cycle_time":64,"forwordSpeed":"0.00"},{"area_name":"观山湖区","lenAll":490,"data_version":"20180630","reverseSpeed":"30.00","execute_end_date":"","reverse_phase_plan_id":"1","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":53,"reverse_offset":53,"is_key_inter":0,"len":490,"inter_name":"龙泉苑街与金源街","forward_phase_plan_id":"1","geohash":"w7w6p1ym89","reverse_phase_plan_name":"A","id":"11LM1063PG0","lev":"4","lat":26.6062457966819,"inter_id":"11LM1063PG0","lng":106.631725893128,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LM1063PG0","offset":53,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":19,"phase_name":"A","doe_date_type":99},{"inter_id":"11LM1063PG0","offset":53,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":23,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":20,"phase_name":"B","doe_date_type":99},{"inter_id":"11LM1063PG0","offset":53,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":18,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":21,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与金源街","cycle_time":64,"forwordSpeed":"30.00"},{"area_name":"观山湖区","lenAll":900,"data_version":"20180630","reverseSpeed":"0.00","execute_end_date":"","reverse_phase_plan_id":"1","execute_start_date":"","forward_phase_plan_name":"A","forward_offset":35,"reverse_offset":35,"is_key_inter":0,"len":410,"inter_name":"龙泉苑街与兰州街交叉口","forward_phase_plan_id":"1","geohash":"w7w6nmzbtk","reverse_phase_plan_name":"A","id":"11LCE064040","lev":"4","lat":26.60803191562,"inter_id":"11LCE064040","lng":106.63519472168,"adcode":"460100","area_code":"460108","phaseList":[{"inter_id":"11LCE064040","offset":35,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":22,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":70,"phase_name":"A","doe_date_type":99},{"inter_id":"11LCE064040","offset":35,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":22,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":71,"phase_name":"B","doe_date_type":99},{"inter_id":"11LCE064040","offset":35,"data_version":"20180630","adcode":"400000","stat_date":"1","end_time":"07:00:00","task_id":"1","split_time":20,"phase_plan_id":"1","offset_type_no":1,"dt":"20180630","start_time":"00:00:00","ctlregion_id":"LongQuanYuanJie","cyclesplit_source":1,"update_frequency":1,"cycle_time":64,"id":72,"phase_name":"C","doe_date_type":99}],"name":"龙泉苑街与兰州街交叉口","cycle_time":64,"forwordSpeed":"30.00"}],
            showGreenWave: true,
            showForwordWave: true,
            showReverseWave: false,
            showControlRecord: false,
            totleDistance: 3000,
        }
    }
    render(){
        return (
            <div className="mainMonitorSeriesHome">
                <div className="mainMonitorSeriesList">
                    <div className="mainMonitorSeriesListHead">
                        <div className="mainMonitorSeriesInfo">
                            <div className="infoChild">子区详细信息<span></span></div>
                        </div>
                        <div className="mainMonitorSeriesMark">
                            <span>子区号:</span>
                            <span style={{color:'#40EBF3',fontSize:"18px",marginLeft:"15px"}}>254</span>
                        </div>
                        <div className="mainMonitorSeriesName">
                            <span>子区名称:</span>
                            <span style={{color:'#40EBF3',fontSize:"18px",marginLeft:"15px"}}>平安大街</span>
                        </div>
                    </div>
                    <div className="mainMonitorSeriesHomeBody">
                        <SeriesMessage/>
                    </div>
                </div>
                <div className="mainMonitorSeriesDrawingHome">
                    <div className="mainMonitorSeriesHead">
                        <Select defaultValue="请输入子区名称进行搜索" size="middle">
                            <Option value="1" key="1">年</Option>
                        </Select>
                        <Button type="primary">搜索</Button>
                    </div>
                    <div className="mainMonitorSeriesDrawing">
                        <GreenWaveCharts {...this.state}/>
                    </div>
                </div>
            </div>
        )
    }
}