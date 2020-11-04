import React ,{Component} from "react";
import "./calender.scss"
import {Select} from "antd"
import {LeftOutlined,RightOutlined} from "@ant-design/icons"
const {Option} =Select
export default class CalenderPublic extends Component {
    constructor(props){
        super(props)
        this.state={}
    }

    render(){
        return (
            <div className="calenderPublicHome">
                <div className="calenderHeaderPublic">
                    {/* 年份 */}
                    <div className="calenderHeaderYear">
                        <div className="YearLeftBtn">
                            <LeftOutlined/>
                        </div>
                        <div className="YearSelect">
                            <Select style={{width:"100%"}} defaultValue="2018">
                                <Option value="2018">2018年</Option>
                                <Option value="2019">2019年</Option>
                            </Select>
                        </div>
                        <div className="YearRightBtn">
                        <RightOutlined />
                        </div>
                    </div>

                    {/* 月份 */}
                    <div className="calenderHeaderMonth">
                        <div className="MonthLeftBtn">
                        <LeftOutlined />
                        </div>
                        <div className="MonthSelect">
                            <Select defaultValue="1" style={{width:"100%"}} >
                                <Option value="1" name="1">1月</Option>
                                <Option value="2" name="2">2月</Option>
                            </Select>
                        </div>
                        <div className="MonthRightBtn">
                        <RightOutlined />
                        </div>
                    </div>
                    {/* 放假安排 */}
                    <div className="holidayArr"><Select style={{width:'95%', height:"95%"}} value="放假安排"><Option>放假安排</Option></Select></div>
                    {/* 返回今天 */}
                    <div className="backDay"><div className="backToDay">返回今天</div></div>
                </div>
                {/* 日期类 */}
                <div className="calenderContent">
                    <div className="calenderContentTable">
                        <div className="calenderContentTHead">
                            <div className="calenderContentTh">
                                一
                            </div>
                            <div className="calenderContentTh">
                                二
                            </div>
                            <div className="calenderContentTh">
                                三
                            </div>
                            <div className="calenderContentTh">
                                四
                            </div>
                            <div className="calenderContentTh">
                                五
                            </div>
                            <div className="calenderContentTh">
                                六
                            </div>
                            <div className="calenderContentTh">
                                日
                            </div>
                        </div>
                        <div className="calenderContentTBody">
                            <div className="calenderContentTD">
                                <div>1</div>
                                <div>建党节</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}