import React , {Component} from "react";
import "./MainMonitoring.scss"
import Main3D from "./mainMonitor3DPage/mainMonitor3DPage";
import Main2D from "./mainMonitor2DPage/mainMonitor2DPage";
import MainConcise from "./mainMonitorConcisePage/mainMonitorConcisePage"
import MainSeries from "./mainMonitorSeriesPage/mainMonitorSeriesPage"
export default class MainMonitoring extends Component{
  constructor(props){
    super(props);
    this.state={
      displayPage:"4" ,   //3d => 1  2d =>  2  简洁 => 3  时序 => 4
      displayStrip:true,  //展示条
    }
  }
  render(){
    const {displayPage,displayStrip} =this.state;
      return (
        <div className="Main">
            {/* 3D */}
            {
              displayPage==="1"&&<div className="main3d">
                <Main3D/>
              </div>
            }
            {/* 2D */}
            {
              displayPage==="2"&&<div className="main2d">
                <Main2D/>
              </div>
            }
            {/* 简洁 */}
            {
              displayPage==="3"&&<div className="mainConcise">
              <MainConcise/>
            </div>
            }
            {/* 时序 */}
            {
              displayPage==="4"&&<div className="mainSeries">
              <MainSeries/>
            </div>
            }
            {
              displayStrip&&<div className="mainStrip">
                <span onClick={()=>this.setState({displayPage:"1"})}>3D</span>
                <span onClick={()=>this.setState({displayPage:"2"})}>2D</span>
                <span onClick={()=>this.setState({displayPage:"3"})}>简洁</span>
                <span onClick={()=>this.setState({displayPage:"4"})}>时序图</span>
              </div>
            }
        </div>
      )
  }
}