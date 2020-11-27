import React, { Component } from 'react'
import { Select } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './InterRelation.scss'

const { Option } = Select
class InterRelation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      relationList: null,
    }
  }
  componentDidMount = () => {
    this.getInterRelationList()
  }
  getInterRelationList = () => {
    const { primitiveInfo } = this.props.data
    this.setState({ relationList: primitiveInfo.UnitConnector })
  }
  render() {
    const { relationList } = this.state
    return (
      <>
        <div className="confTable">
          <div className="confThead">
            <div className="confTh">路口方向</div>
            <div className="confTh">流向id</div>
            <div className="confTh">流向方向</div>
            <div className="confTh">道路长度</div>
            <div className="confTh" style={{ flex: 1.3 }}>道路描述</div>
            <div className="confTh">操作</div>
          </div>
          <div className="confTbody">
            {
              relationList &&
              relationList.map((item, index) => {
                const { id, roadDetail, unitDirectionValue, unitDirection } = item.unitConnector
                return (
                  <div className="confTr" key={item.id}>
                    <div className="confTd">{unitDirection}</div>
                    <div className="confTd">{id}</div>
                    <div className="confTd">{unitDirectionValue}</div>
                    <div className="confTd">{unitDirection}</div>
                    <div className="confTd" style={{ flex: 1.3 }}>{roadDetail}</div>
                    <div className="confTd">
                      <EditOutlined className="activeIcon" />
                      <DeleteOutlined className="activeIcon" />
                    </div>
                  </div>
                )
              })
            }
            <div className="confTr">
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
              <div className="confTd">
                <Select defaultValue="0">
                  <Option key="0" vlaue="0">请选择</Option>
                  <Option key="1" vlaue="1">1</Option>
                </Select>
              </div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
              <div className="confTd"><input className="relationInput" type="text" /></div>
            </div>
          </div>
        </div>
        {/* <div className="actionBtnBox">
          <div className="saveBtn">取消</div>
          <div className="saveBtn">保存</div>
        </div> */}
      </>
    )
  }
}

export default InterRelation

