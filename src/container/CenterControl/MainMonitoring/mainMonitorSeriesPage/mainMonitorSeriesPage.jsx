import React,{Component} from "react";
import "./mainMonitorSeriesPage.scss";
import SeriesMessage from "./seriesMessage/seriesMessage";
import GreenWave from "../../../utils/GreenWaveCharts/GreenWaveCharts";
import {Select,Button} from "antd";
const {Option} =Select;
export default class MainMonitorSeriesPage extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="mainMonitorSeriesHome">
                <div className="mainMonitorSeriesList">
                    <div className="mainMonitorSeriesListHead">
                        <div className="mainMonitorSeriesInfo">
                            <div className="infoChild">子区详细信息</div>
                        </div>
                        <div className="mainMonitorSeriesMark">
                            <span>子区号:</span>
                            <span style={{color:'#3AC7D8',fontSize:"18px",marginLeft:"15px"}}>254</span>
                        </div>
                        <div className="mainMonitorSeriesName">
                            <span>子区名称:</span>
                            <span style={{color:'#3AC7D8',fontSize:"18px",marginLeft:"15px"}}>平安大街</span>
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
                        <GreenWave/>
                    </div>
                </div>
            </div>
        )
    }
}