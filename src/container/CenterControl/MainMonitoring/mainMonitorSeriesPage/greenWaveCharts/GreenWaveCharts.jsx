import React from "react";
import $ from "jquery";
import "./GreenWaveCharts.css";

class GreenWaveCharts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            initValueX: 70,   //起始点X坐标
            initValueY:400,
            spaceX:47,
            spaceY:57,
            waveX:[{numX:0},{numX:50},{numX:100},{numX:150},{numX:200},{numX:250},{numX:300},{numX:350},{numX:400},{numX:450},{numX:500},{numX:550},{numX:600},{numX:650},{numX:700},{numX:750},{numX:800},{numX:850},{numX:900},{numX:"时间/s"}],
            waveY:[{titleY:""},{titleY:"张自忠路"},{titleY:"段祺瑞执政府"},{titleY:"剪子巷"},{titleY:"宽街"},{titleY:"北河沿"},{titleY:"锣鼓巷"},{titleY:"东板桥胡同"},{titleY:"地安门"},{titleY:"北海后门"},{titleY:"郭沫若故居"}],
            waveStrip:[{},{},{},{},{},{},{}],
            waveStripCopy:[{},{},{},{},{},{},{},{},{},{}],
        }
    }
    
    calWave(x){
        let onePoint=[x,0]
        let twoPoint=[x+100,0]
        let numThere=Math.cos(500/300)
        let therePoint=[]
        console.log(numThere)
    }
    render(){
        const {initValueX,initValueY,spaceX,spaceY,waveX,waveY,waveStrip,waveStripCopy} =this.state;
        return (
            <div style={{width:"100%",height:"100%"}}>
                <div style={{position:"absolute"}}>
                    <svg style={{  zIndex: '1', opacity: '.8' }} width="1153px" height="771px" viewBox="0 0 1000 265">
                             <polygon points="70,286 150,286 170,343 90,343" style={{fill:"rgba(10 ,139, 49,.7)",strokeWidth:1}}/>
                             {/* 70,286 150,286 170,343 90,343 */}
                             <polygon points=" 110,286 170,286 150,343 90,343" style={{fill:"rgba(44, 170, 211,.4)",strokeWidth:1}}/>

                             <polygon points="215,286 295,286 315,343 235,343" style={{fill:"rgba(10 ,139, 49,.7)",strokeWidth:1}}/>
                             {/* 70,286 150,286 170,343 90,343 */}
                             <polygon points=" 255,286 315,286 295,343 235,343" style={{fill:"rgba(44, 170, 211,.4)",strokeWidth:1}}/>v
                            <g key={1}>
                                <line x1={initValueX} y1={initValueY} x2="1000" y2={initValueY} style={{fill: 'none', stroke: 'rgb(0,0,255)',strokeWidth:2}}/>
                            </g>
                            <g key={2}>
                                <line x1={initValueX} y1="-400" x2={initValueX} y2="400" style={{fill: 'none', stroke: 'rgb(0,0,255)',strokeWidth:2}}/>
                            </g>
                            {
                                waveX.map((item,index)=>{
                                    return (
                                        <g key={index}>
                                            <line x1={initValueX + spaceX * index} y1="400" x2={ initValueX + spaceX * index}  y2="410" style={{fill: 'none', stroke: 'rgb(0,0,255)',strokeWidth:2}}/>
                                            <text x={initValueX + spaceX * index - 10} y="425" fill="#00E7F1" style={{fontSize:"12px"}}>{item.numX}</text>
                                        </g>
                                    )
                                })
                            }
                            {
                                waveY.map((item,index)=>{
                                    return (
                                        <g key={index}>
                                            <line x1={initValueX} y1={initValueY - spaceY * index} x2={initValueX-10}  y2={initValueY - spaceY * index} style={{fill: 'none', stroke: 'rgb(0,0,255)',strokeWidth:2}}/>
                                            <text x={initValueX - 70} y={initValueY - spaceY * index} fill="#00E7F1" style={{fontSize:"10px",dominantBaseline:"middle"}}>{item.titleY}</text>
                                        </g>
                                    )
                                })
                            }
                            {
                                waveStripCopy.map((item,key)=>{
                                    let newKey=key+1;
                                    return (
                                        <g key={key}>
                                            {
                                                waveStrip.map((item,index)=>{
                                                    let newIndex=index+1;
                                                    return (
                                                        <g key={index}>
                                                            <rect x={initValueX + 145 * index} y={initValueY -spaceY * newKey-5} width="100" height="10" style={{fill:"#01E935",strokeWidth:1}} id="1" />
                                                            <rect x={initValueX + 145 * index+100} y={initValueY -spaceY * newKey-5 } width="45" height="10" style={{fill:"#FB0000",strokeWidth:1}}/>
                                                        </g>
                                                    )
                                                })
                                            }
                                        </g>
                                    )
                                })
                            }
                    </svg>
                </div>
            </div>
        )
    }
}

export default GreenWaveCharts