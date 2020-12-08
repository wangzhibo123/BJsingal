import React, { Component } from 'react'
import { Select, Modal, message } from 'antd'

import axiosInstance from '../../../../utils/getInterfaceData'

const { Option } = Select
class DetectorPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dispatchList: null,
      isAdd: false,
      defaultNo: null,
      editIndex: null,
    }
    this.levels = [1,2,3,4,5,6,7,8,9,10]
    this.weeks = [
      { week: '周一', id: 1, }, { week: '周二', id: 2, }, { week: '周三', id: 3, }, { week: '周四', id: 4, }, { week: '周五', id: 5, }, { week: '周六', id: 6, }, { week: '周日', id: 7, },
    ]
    this.interId = this.props.interId
    this.listUrl = `/control-application-front/signal/config/schedule/listSchedule?unitId=${this.interId}`
    this.saveUrl = '/control-application-front/signal/config/schedule/saveSchedule'
    this.deleteUrl = '/control-application-front/signal/config/schedule/removeSchedule'
    this.saveParams = null
  }
  componentDidMount = () => {
    console.log(this.props)
    this.getDispatchPlanList()
  }
  getDispatchPlanList = () => {
    axiosInstance.get(this.listUrl).then((res) => {
      console.log(res)
      const { code, data } = res.data
      if (code === 200 && data) {
        this.setState({ dispatchList: data })
      } else {
        this.setState({ dispatchList: null })
      }
    })
  }
  handleSaveAddPlan = () => {
    axiosInstance.post(this.saveUrl, this.saveParams).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.getDispatchPlanList()
        this.setState({ isAdd: false, editIndex: null })
      }
      message.info(res.data.message)
    })
  }
  // 添加
  handleAddPlan = () => {
    this.saveParams = {
      dailyplanno: 1,
      days: '',
      id: 0,
      months: '',
      priority: 1,
      scheduleno: 0,
      scheduletype: 3,
      unitId: this.interId,
      weeks: '',
    }
    const { dispatchList } = this.state
    const listLen = dispatchList ? dispatchList.length : 0
    const defaultNo = listLen > 0 ? dispatchList[listLen - 1].scheduleno + 1 : 1
    this.saveParams.scheduleno = defaultNo
    this.setState({ isAdd: true, defaultNo })
  }
  handleCancelAdd = () => {
    this.setState({ isAdd: false })
  }
  // 开始编辑
  handleEditList =  (e) => {
    const indexs = parseInt(e.target.getAttribute('indexs'))
    this.saveParams = this.state.dispatchList[indexs]
    this.setState({ editIndex: indexs })
  }
  handleCancelEdit = () => {
    this.setState({ editIndex: null })
  }
  handleSaveNo = (e) => {
    this.saveParams.scheduleno = e.target.value
  }
  // 编辑修改
  handleEditChange = (value, options) => {
    this.saveParams[options.pname] = value
  }
  // 删除
  handleDelete = (e) => {
    const id = e.target.getAttribute('id')
    const { confirm } = Modal
      const selfThis = this
      confirm({
        title: '确定要删除吗？',
        className: 'confirmBox',
        onOk() {
          selfThis.handleRemovePlan(id)
        },
      })
  }
  handleRemovePlan = (id) => {
    axiosInstance.post(`${this.deleteUrl}?id=${id}`).then((res) => {
      const { code } = res.data
      if (code === 200) {
        this.getDispatchPlanList()
      }
      message.info(res.data.message)
    })
  }
  render() {
    const { dispatchList, isAdd, defaultNo, editIndex } = this.state
    return (
      <div className="paramsTable">
        <span className="addBtn" onClick={this.handleAddPlan}>新增方案</span>
        <div className="paramsThead">
          <div className="paramsTh">调度方案编号</div>
          <div className="paramsTh">调度类型</div>
          <div className="paramsTh">优先级</div>
          <div className="paramsTh">调度时间</div>
          <div className="paramsTh">日计划编号</div>
          <div className="paramsTh">操作</div>
        </div>
        <div className="paramsTbody">
          {
            dispatchList &&
            dispatchList.map((item, index) => {
              return (
                <div className="paramsTr" key={item.id}>
                  <div className="paramsTd">
                    {
                      editIndex === index ? <input type="text" defaultValue={item.scheduleno} onChange={this.handleSaveNo} /> : <span>{item.scheduleno}</span>
                    }
                  </div>
                  <div className="paramsTd">
                    {
                      editIndex === index ?
                      <Select defaultValue={item.scheduletype} onChange={this.handleEditChange}>
                        <Option key={1} value={1} pname="scheduletype">日期</Option>
                        <Option key={3} value={3}>星期</Option>
                      </Select> : <span>{item.scheduletype === 3 ? '星期' : '日期'}</span>
                    }
                  </div>
                  <div className="paramsTd">
                    {
                      editIndex === index ?
                      <Select defaultValue={item.priority} onChange={this.handleEditChange}>
                        {
                          this.levels.map(item => <Option key={item} vlaue={item} pname="priority">{item}</Option>)
                        }
                      </Select> : <span>{item.priority}</span>
                    }
                  </div>
                  <div className="paramsTd">{item.scheduletype === 3 ? item.weeks : item.days}</div>
                  <div className="paramsTd">{item.dailyplanno}</div>
                  <div className="paramsTd">
                    {
                      editIndex === index ?
                      <>
                        <span className="editBtn" onClick={this.handleSaveAddPlan}>保存</span>
                        <span className="editBtn" onClick={this.handleCancelEdit}>取消</span>
                      </> :
                      <>
                        <span className="editBtn" indexs={index} onClick={this.handleEditList}>编辑</span>
                        <span className="editBtn" id={item.id} onClick={this.handleDelete}>删除</span>
                      </>
                    }
                  </div>
                </div>
              )
            })
          }
          {
            isAdd &&
            <div className="paramsTr">
              <div className="paramsTd"><input type="text" className="addNo" defaultValue={defaultNo} onChange={this.handleSaveNo} /></div>
              <div className="paramsTd">
                <Select defaultValue={3} onChange={this.handleEditChange}>
                  <Option key={1} value={1} pname="scheduletype">日期</Option>
                  <Option key={3} value={3} pname="scheduletype">星期</Option>
                </Select>
              </div>
              <div className="paramsTd">
                <Select defaultValue={1} onChange={this.handleEditChange}>
                  {
                    this.levels.map(item => <Option key={item} vlaue={item} pname="priority">{item}</Option>)
                  }
                </Select>
              </div>
              <div className="paramsTd">
                <span className="innerSelect">
                  <Select defaultValue={1} onChange={this.handleEditChange}>
                    {
                      this.weeks.map(item => (<Option key={item.id} value={item.id} pname="weeks">{item.week}</Option>))  
                    }
                  </Select>
                </span>
              </div>
              <div className="paramsTd">
                <Select defaultValue="1">
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="paramsTd">
                <span className="editBtn" onClick={this.handleSaveAddPlan}>保存</span>
                <span className="editBtn" onClick={this.handleCancelAdd}>取消</span>
              </div>
            </div>
          }
          
        </div>
      </div>
    )
  }
}

export default DetectorPlan
