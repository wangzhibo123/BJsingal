import React, { Component } from 'react'
import { Select } from 'antd';
import "./TimeTable.scss"
import TimeTableMessage from "./TimeTableMessage/TimeTableMessage"
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
                            <TimeTableMessage/>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
