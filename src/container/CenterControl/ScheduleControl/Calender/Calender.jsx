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
                                <Radio value={2} style={{ color: "#fff", marginLeft: "15px" }}>公历</Radio>
                            </div>
                            <div className="lunarCalendar">
                                <Radio value={3} style={{ color: "#fff", marginLeft: "15px" }}>农历</Radio>
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
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
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
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                    {
                        gregorianCalendarShow && <div style={{ width: "100%", height: "100%" }}>
                            <table style={{ width: "100%", height: "100%", background: "#032443" }} border>
                                <tbody>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }} rowSpan="2">月</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>1</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>2</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>3</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>4</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>5</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>6</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>7</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>8</td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        {/* <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td> */}
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>7</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>8</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>9</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>10</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>11</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>12</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }} rowSpan="4">日</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>1</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>2</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>3</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>4</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>5</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>6</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>7</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>8</td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        {/* <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td> */}
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>9</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>10</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>11</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>12</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>13</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>14</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>15</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>16</td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        {/* <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td> */}
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>17</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>18</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>19</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>20</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>21</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>22</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>23</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>24</td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        {/* <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td> */}
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>25</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>26</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>27</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>28</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>29</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>30</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>31</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                    {
                        lunarCalendarShow && <div style={{ width: "100%", height: "100%" }}>
                            <table style={{ width: "100%", height: "100%", background: "#032443" }} border>
                                <tbody>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }} rowspan="2">月</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>1</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>2</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>3</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>4</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>5</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>6</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>7</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>8</td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        {/* <td style={{ border: "1px solid #015681", verticalAlign: "middle", colspan: "2" }}></td> */}
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>7</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>8</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>9</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>10</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>11</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>12</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }} rowSpan="4">日</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>初一</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>初二</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>初三</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>初四</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>初五</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>初六</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>初七</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle", background: "#016194" }}>初八</td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        {/* <td style={{ border: "1px solid #015681", verticalAlign: "middle", rowspan: "2" }}></td> */}
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>初九</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>初十</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>十一</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>十二</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>十三</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>十四</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>十五</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>十六</td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        {/* <td style={{ border: "1px solid #015681", verticalAlign: "middle", rowspan: "2" }}></td> */}
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>十七</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>十八</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>十九</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿十</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿一</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿二</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿三</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿四</td>
                                    </tr>
                                    <tr style={{ height: 30, textAlign: "center" }}>
                                        {/* <td style={{ border: "1px solid #015681", verticalAlign: "middle", rowspan: "2" }}></td> */}
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿五</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿六</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿七</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿八</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>廿九</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}>三十</td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                        <td style={{ border: "1px solid #015681", verticalAlign: "middle" }}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
