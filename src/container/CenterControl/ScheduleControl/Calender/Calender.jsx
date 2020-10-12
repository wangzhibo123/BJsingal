import React, { Component } from 'react'
import "./Calender.scss"
import { Radio, Select } from "antd"
const { Option } = Select;
export default class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            calenderShow: {
                weekShow: true,
                gregorianCalendarShow: false,
                lunarCalendarShow: false
            }
        }
    }
    onChange = e => {
        const changeE = e.target.value;
        if (changeE == 1) {
            this.setState({
                value: changeE,
                calenderShow: {
                    weekShow: true,
                    gregorianCalendarShow: false,
                    lunarCalendarShow: false
                }
            });
        } else if (changeE == 2) {
            this.setState({
                value: changeE,
                calenderShow: {
                    weekShow: false,
                    gregorianCalendarShow: true,
                    lunarCalendarShow: false
                }
            });
        } else if (changeE == 3) {
            this.setState({
                value: changeE,
                calenderShow: {
                    weekShow: false,
                    gregorianCalendarShow: false,
                    lunarCalendarShow: true
                }
            });
        }

    };
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        const { value, calenderShow } = this.state;
        const { weekShow, gregorianCalendarShow, lunarCalendarShow } = calenderShow;
        return (
            <div className="calenderHome">
                <div className="calenderHeader">
                    <div>知春路与中关村东路路口</div>
                </div>
                <div className="calenderNav">
                    <div className="calenderTab">
                        <Radio.Group onChange={this.onChange} value={value}>
                            <div className="week">
                                <Radio value={1} style={{ color: "#fff" }}>星期</Radio>
                            </div>
                            <div className="gregorianCalendar">
                                <Radio value={2} style={{ color: "#fff" }}>公历</Radio>
                            </div>
                            <div className="lunarCalendar">
                                <Radio value={3} style={{ color: "#fff" }}>农历</Radio>
                            </div>
                        </Radio.Group>
                    </div>
                    <div className="calenderSelect">
                        <Select defaultValue="优先级" onChange={this.handleChange} size="small">
                            <Option value="1">优先级</Option>
                            <Option value="2">最优</Option>
                        </Select>
                    </div>
                </div>
                <div className="calenderContent">
                    {
                        weekShow && <div style={{ width: "100%", height: "100%" }}>
                            <table style={{ width: "100%", height: "100%" }}>
                                <tbody>
                                    <tr style={{ height: '40px', textAlign: "center", lineHeight: '40px' }}>
                                        <th>序号</th>
                                        <th>星期一</th>
                                        <th>星期二</th>
                                        <th>星期三</th>
                                        <th>星期四</th>
                                        <th>星期五</th>
                                        <th>星期六</th>
                                        <th>星期日</th>
                                    </tr>
                                    <tr style={{ height: 40, textAlign: "center", lineHeight: "40px" }}>
                                        <td>1</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr style={{ height: 40, textAlign: "center", lineHeight: "40px" }}>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr style={{ height: 40, textAlign: "center", lineHeight: "40px" }}>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr style={{ height: 40, textAlign: "center", lineHeight: "40px" }}>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr style={{ height: 40, textAlign: "center", lineHeight: "40px" }}>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr style={{ height: 40, textAlign: "center", lineHeight: "40px" }}>
                                        <td>6</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                    {
                        gregorianCalendarShow && <div>
                            456
                        </div>
                    }
                    {
                        lunarCalendarShow && <div>
                            789
                        </div>
                    }
                </div>
            </div>
        )
    }
}
