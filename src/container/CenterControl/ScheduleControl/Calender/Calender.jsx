import React, { Component } from 'react'
import "./Calender.scss"
import { Radio, Select} from "antd"
import CalendarPublic from "./calender/calender"
const { Option } = Select;
export default class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 2,
            calenderShow: {
                weekShow: false,
                gregorianCalendarShow: true,
            }
        }
    }
    onChange = e => {
        const changeE = e.target.value;
        if (changeE === 1) {
            this.setState({
                value: changeE,
                calenderShow: {
                    weekShow: true,
                    gregorianCalendarShow: false,
                    lunarCalendarShow: false
                }
            });
        } else if (changeE === 2) {
            this.setState({
                value: changeE,
                calenderShow: {
                    weekShow: false,
                    gregorianCalendarShow: true,
                    lunarCalendarShow: false
                }
            });
        } else if (changeE === 3) {
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
    onPanelChange(value, mode) {
        console.log(value, mode);
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
                                <Radio value={1} style={{ color: "#fff", marginLeft: "15px" }}>星期</Radio>
                            </div>
                            <div className="gregorianCalendar">
                                <Radio value={2} style={{ color: "#fff", marginLeft: "15px" }}>日历</Radio>
                            </div>
                        </Radio.Group>
                    </div>
                    <div className="calenderSelect">
                        <Select defaultValue="优先级" onChange={this.handleChange} size="middle">
                            <Option value="1">优先级</Option>
                            <Option value="2">最优</Option>
                        </Select>
                    </div>
                </div>
                <div className="calenderContent">
                    {
                        weekShow && <div style={{ width: "100%", height: "100%" }}>
                            <table style={{ width: "100%", height: "100%", background: "#032443" }}>
                                <tbody>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>序号</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>星期一</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>星期二</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>星期三</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>星期四</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>星期五</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>星期六</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>星期日</td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>1</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#00A0EA" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>2</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>3</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#00A0EA" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#F9B552" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#F9B552"}}></td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>4</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#00A0EA" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>5</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>6</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>7</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>8</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#00A0EA"}}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#00A0EA" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#00A0EA" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#00A0EA" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#00A0EA" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                    {
                        gregorianCalendarShow && <div style={{ width: "100%", height: "100%"}}>
                            <CalendarPublic/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
