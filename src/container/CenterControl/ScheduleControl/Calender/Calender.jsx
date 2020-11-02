import React, { Component } from 'react'
import "./Calender.scss"
import { Radio, Select,Calendar, Col, Row } from "antd"
import { LeftOutlined,RightOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Group, Button } = Radio;
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
    onPanelChange(value, mode) {
        console.log(value, mode);
    }
    dateFullCellRender(){
        
    }
    monthFullCellRender(){
        console.log(11)
        return `一，二，三，四，五，六，日`
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
                        gregorianCalendarShow && <div style={{ width: "100%", height: "100%"}}>
                            <div style={{ width: "100%",height:"100%", border: '1px solid #015681', borderRadius: 4}}>
                                <Calendar
                                monthFullCellRender={this.monthFullCellRender}
                                style={{background:"#032443"}}
                                fullscreen={false}
                                headerRender={({ value, type, onChange, onTypeChange }) => {
                                    const start = 0;
                                    const end = 12;
                                    const monthOptions = [];
                                    const current = value.clone();
                                    const localeData = value.localeData();
                                    const months = [];
                                    for (let i = 0; i < 12; i++) {
                                    current.month(i);
                                    months.push(localeData.monthsShort(current));
                                    }

                                    for (let index = start; index < end; index++) {
                                    monthOptions.push(
                                        <Select.Option className="month-item" key={`${index}`}>
                                        {months[index]}
                                        </Select.Option>,
                                    );
                                    }
                                    const month = value.month();

                                    const year = value.year();
                                    const options = [];
                                    for (let i = year - 10; i < year + 10; i += 1) {
                                    options.push(
                                        <Select.Option key={i} value={i} className="year-item">
                                        {i}年
                                        </Select.Option>,
                                    );
                                    }
                                    return (
                                    <div style={{ padding: 10}}>
                                        <Row type="flex" justify="space-between">
                                        <Col style={{display:"flex"}}>
                                            <div style={{width:"32px",height:"32px",border:"1px solid  #00A0EE",textAlign:"center",lineHeight:'32px',color:"#fff",cursor:"pointer"}}>
                                                <LeftOutlined />
                                            </div>
                                            <Select
                                            size="middle"
                                            dropdownMatchSelectWidth={false}
                                            className="my-year-select"
                                            onChange={newYear => {
                                                const now = value.clone().year(newYear);
                                                onChange(now);
                                            }}
                                            value={String(year)}
                                            style={{width:"115px"}}
                                            >
                                            {options}
                                            </Select>
                                            <div style={{width:"32px",height:"32px",border:"1px solid  #00A0EE",textAlign:"center",lineHeight:'32px',color:"#fff",cursor:"pointer"}}>
                                                <RightOutlined />
                                            </div>
                                        </Col>
                                        <Col style={{display:"flex"}}>
                                            <div style={{width:"32px",height:"32px",border:"1px solid  #00A0EE",textAlign:"center",lineHeight:'32px',color:"#fff",cursor:"pointer"}}>
                                                <LeftOutlined />
                                            </div>
                                            <Select
                                            size="middle"
                                            dropdownMatchSelectWidth={false}
                                            value={String(month)}
                                            onChange={selectedMonth => {
                                                const newValue = value.clone();
                                                newValue.month(parseInt(selectedMonth, 10));
                                                onChange(newValue);
                                            }}
                                            style={{width:"115px"}}
                                            >
                                            {monthOptions}
                                            </Select>
                                            <div style={{width:"32px",height:"32px",border:"1px solid  #00A0EE",textAlign:"center",lineHeight:'32px',color:"#fff",cursor:"pointer"}}>
                                                <RightOutlined />
                                            </div>
                                        </Col>
                                        <Col>
                                            <Select size="middle" style={{width:"115px"}} value="放假安排">
                                                <Option>放假安排</Option>
                                            </Select>
                                            <Group size="middle" onChange={e => onTypeChange(e.target.value)} value={type}>
                                                <Button style={{background:"#032443",borderColor:"#00A0EE",color:"#fff"}}>返回今天</Button>
                                            </Group>
                                        </Col>
                                        </Row>
                                    </div>
                                    );
                                }}
                                onPanelChange={this.onPanelChange}
                                fullscreen={false}
                                monthFullCellRender={this.monthFullCellRender}
                                monthFullCellRender={this.monthFullCellRender}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
