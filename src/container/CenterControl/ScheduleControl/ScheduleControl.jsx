import React, { Component } from 'react'
import "./ScheduleControl.scss"
import TimeTable from "./TimeTable/TimeTable"
import TimePlan from "./TimePlan/TimePlan"
import Calender from "./Calender/Calender"
import MinMap from "./MinMap/MinMap"
export default class ScheduleControl extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="scheduleHome">
                <div className="scheduleHomePage">
                        <div className="timeTable">
                            <TimeTable />
                        </div>
                        <div className="timePlan">
                            <TimePlan />
                        </div>
                    <div className="mapCalender">
                        <div className="calender">
                            <Calender />
                        </div>
                        <div className="minMap">
                            <MinMap />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
