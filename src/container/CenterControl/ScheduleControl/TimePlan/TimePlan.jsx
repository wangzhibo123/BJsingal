import React, { Component } from 'react'
import "./TimePlan.scss"
export default class TimePlan extends Component {
    render() {
        return (
            <div className="timePlanHome">
                <div className="timePlanHeader">
                    <div>配时方案</div>
                </div>
                <div className="timePlanContent">
                    <div className="timePlanDirection">
                        <div className="timePlanItem">
                            <div className="timePlanIcon">
                                图标
                            </div>
                            <div className="timePlanNum">
                                40
                            </div>
                            <div className="timePlanChange">
                                上下
                            </div>
                        </div>
                        <div className="timePlanItem">
                            <div className="timePlanIcon">
                                图标
                            </div>
                            <div className="timePlanNum">
                                40
                            </div>
                            <div className="timePlanChange">
                                上下
                            </div>
                        </div>
                        <div className="timePlanItem">
                            <div className="timePlanIcon">
                                图标
                            </div>
                            <div className="timePlanNum">
                                40
                            </div>
                            <div className="timePlanChange">
                                上下
                            </div>
                        </div>
                        <div className="timePlanItem">
                            <div className="timePlanIcon">
                                图标
                            </div>
                            <div className="timePlanNum">
                                40
                            </div>
                            <div className="timePlanChange">
                                上下
                            </div>
                        </div>
                        <div className="timePlanItem">
                            <div className="timePlanIcon">
                                图标
                            </div>
                            <div className="timePlanNum">
                                40
                            </div>
                            <div className="timePlanChange">
                                上下
                            </div>
                        </div>
                    </div>
                    <div className="timePlanExecute">
                        <div className="timePlanAllShow">
                            <div>方案:4</div>
                            <div>周期:200</div>
                        </div>
                        <div className="timePlanExecute">
                            <div className="timePlanExecuteNext">
                                <div className="timePlanExecuteTextFirst">立即</div>
                                <div className="timePlanExecuteTextNext">执行</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
