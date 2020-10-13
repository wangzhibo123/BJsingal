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
            </div>
        )
    }
}
