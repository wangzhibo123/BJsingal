import React, { Component } from 'react'
import "./TimePlan.scss"
import upDown from "../../../imgs/03.png"
import leftUpUp from "../../../imgs/11.png"
import leftUpRightDown from "../../../imgs/04.png"
import leftRight from "../../../imgs/01.png"
import upRightDownLeft from "../../../imgs/02.png"

import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
export default class TimePlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timePlanState: [{
                id: 1,
                img: upDown,
                num: 40,
            },
            {
                id: 2,
                img: leftUpUp,
                num: 40,
            },
            {
                id: 3,
                img: leftUpRightDown,
                num: 40,
            },
            {
                id: 4,
                img: leftRight,
                num: 40,
            },
            {
                id: 5,
                img: upRightDownLeft,
                num: 40,
            }]
        }
    }
    timePlanUpButton = (index) => {
    }
    timePlanDownButton = (index) => {
    }
    render() {
        const { timePlanState } = this.state;
        return (
            <div className="timePlanHome">
                <div className="timePlanHeader">
                    <div>配时方案</div>
                </div>
                <div className="timePlanContent">
                    <div className="timePlanDirection">
                        {
                            timePlanState.map((item, index) => {
                                return (
                                    <div className="timePlanItem" key={index}>
                                        <div className="timePlanIcon">
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className="timePlanNum">
                                            {item.num}
                                        </div>
                                        <div className="timePlanChange">
                                            <div className="CaretUpOutlined">
                                                <CaretUpOutlined onClick={() => this.timePlanUpButton(index)} />
                                            </div>
                                            <div className="CaretDownOutlined" onClick={() => this.timePlanDownButton(index)}>
                                                <CaretDownOutlined />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="timePlanExecuteHome">
                        <div className="timePlanAllShow">
                            <div className="scheme">方案: <div className="schemeNum">4</div></div>
                            <div className="period">周期: <div className="periodNum">200</div> </div>
                        </div>
                        <div className="timePlanExecute">
                            <div className="timePlanExecuteNext">
                                <div className="timePlanExecuteBox">
                                    <div>
                                        立即
                                    </div>
                                    <div>
                                        执行
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
