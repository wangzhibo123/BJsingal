import React, { Component } from 'react'
import { Select } from 'antd';
import "./TimeTable.scss"
const { Option } = Select
export default class TimeTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div className="timeTablePage">
                <div className="timeTableHeader">
                    <div>时间表</div>
                </div>
                <div className="timeTableContent">
                    <div className="timeTableSelect">
                        <div className="selectTimeType">
                            <Select
                                defaultValue="搜索日期类型"
                                size="middle"
                            >
                                <Option value="1" style={{ width: 100, height: 30 }} key="1">年</Option>
                            </Select>
                        </div>
                        <div className="selectTime">
                            <Select
                                defaultValue="搜索日期"
                                size="middle"
                            >
                                <Option value="2" style={{ width: 100, height: 30 }} key="2">10.1</Option>
                            </Select>
                        </div>
                        <div className="timeTableButton">
                            <div className="timeTableBtn">
                                <div className="addTable">增加</div>
                                <div className="updateTable">修改</div>
                                <div className="saveTable">保存</div>
                            </div>
                        </div>
                    </div>
                    <div className="timeTableList">
                        <div className="tableList" style={{overflowY:"auto"}}>
                            <table className="tableName" style={{ textAlign: "center", width: "100%", fontSize: "16px" }} >
                                <tbody>
                                    <tr className="tableTh" style={{ width: "50%", height: 40, background: "#162E52", lineHeight: "40px"}}>
                                        <th>序号</th>
                                        <th>日期类型</th>
                                        <th>时间</th>
                                        <th>功能</th>
                                        <th>方案</th>
                                        <th>方案描述</th>
                                        <th>优先级</th>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }} >
                                        <td>1</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>2</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>3</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>4</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>5</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>6</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>7</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>8</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>9</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>10</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                    <tr className="tableTd" style={{ height: 50, lineHeight: "50px" }}>
                                        <td>10</td>
                                        <td>周一、周二、周三、周四、周五、周六、周日</td>
                                        <td>00:01</td>
                                        <td>方案调用</td>
                                        <td>方案一</td>
                                        <td>描述</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
