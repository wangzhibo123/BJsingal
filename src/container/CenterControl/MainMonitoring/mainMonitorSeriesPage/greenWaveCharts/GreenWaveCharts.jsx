import React from "react";
import $ from "jquery";
import "./GreenWaveCharts.css";

class GreenWaveCharts extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }


    render(){
        return (
            <div style={{width:"100%",height:"100%"}}>
                <div style={{position:"absolute"}}>
                    <svg style={{  zIndex: '1', opacity: '.8' }} width="1153px" height="771px" viewBox="0 0 1000 265">
                            <g key={1}>
                                <line x1="40" y1="400" x2="950" y2="400" style={{fill: 'none', stroke: '#144C96',strokeWidth:2}}/>
                            </g>
                            <g key={2}>
                                <line x1="40" y1="-400" x2="40" y2="400" style={{fill: 'none', stroke: '#144C96',strokeWidth:2}}/>
                            </g>
                    </svg>
                </div>
            </div>
        )
    }
}

export default GreenWaveCharts