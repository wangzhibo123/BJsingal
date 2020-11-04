import React from 'react'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axiosInstance from '../../container/utils/getInterfaceData'
import styles from './CustomTree.module.scss'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getUnitTree } from '../../reactRedux/actions/publicActions'
// import { getRegionNum } from '../../reactRedux/actions/equipmentManagement'

class CustomTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expendsKey: [],
      visible: 0, // 右键菜单
      treeChecked: null,
    }

  }
  componentDidMount = () => {
    this.getDataList()
  }
  getDataList = () => {
    axiosInstance.post(this.loadRouteTree).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        console.log(123456)
        this.setState({
          treeList,
        })
      }
    })
  }
  getDataListChild = (id) => {
    axiosInstance.post(`${this.loadRouteTree}?id=${id}`).then(res => {
      const { code, treeList } = res.data
      if (code === '1') {
        // this.setState({
        //   treeList,
        // })
      }
    })
  }
  btns = (id) => {
    // console.log(id)
    const index = this.state.expendsKey.indexOf(id)
    if (index >= 0) {
      this.state.expendsKey.splice(index, 1)
    } else {
      this.state.expendsKey.push(id)
    }
    this.setState({ expendsKey: this.state.expendsKey })
  }
  handleTreeSelect = (e, name, code) => {
    e.stopPropagation()
    e.preventDefault()
    const id = Number(e.currentTarget.getAttribute('id'))
    const index = this.state.expendsKey.indexOf(id)
    if (index >= 0) {
      console.log(123456)
      this.state.expendsKey.splice(index, 1)
      if (this.state.expendsKey.length < 1) {
        const objs = {
          codeName: '',
          dictCode: '',
        }
        this.getDataListChild(code)
      }
    } else {
      this.state.expendsKey.push(id)
      if (name) {
        const objs = {
          codeName: name,
          dictCode: code,
        }
        this.getDataListChild(code)
      }
    }
    if (!this.props.rightDownNone) {
      this.props.visibleShowLeft('', '', false)
    }
    this.setState({ expendsKey: this.state.expendsKey })
    // this.props.getSelectTreeId(id)
  }
  handleTreeChildSelect = (e) => {
    e.stopPropagation()
    const id = Number(e.currentTarget.getAttribute('id'))
    const lng = Number(e.currentTarget.getAttribute('lng'))
    const lat = Number(e.currentTarget.getAttribute('lat'))
    if (id) {
      this.props.getSelectChildId(id, lng, lat)
    }
  }
  rightDown = (e, id, boolean, objs) => { // 鼠标右击
    e.stopPropagation()
    if (this.props.rightDownNone) return false
    e.stopPropagation()
    e.preventDefault()
    const { visibleShowLeft } = this.props
    if (!boolean) {
      const top = e.pageY
      if (e.button === 2) {
        console.log(top, id, true, objs, '1111111')
        visibleShowLeft(top, id, true, objs)
      }
    } else {
      visibleShowLeft('', '', false)
    }
  }
  noShow = (e) => { // 禁止默认右键菜单
    e.stopPropagation()
    e.preventDefault()
  }
  render() {
    const { expendsKey, treeChecked, treeList } = this.state
    const loop = data => (
      data.map((item, index) => {
        const isOpen = expendsKey.indexOf(item.id) >= 0
        if (item.units && item.units.length) {
          return (
            <li className={styles.childLi} key={item.id} id={item.id} onClick={this.handleTreeSelect}>
              <span className={styles.childIcon}>
                {
                  isOpen ? <MinusCircleOutlined /> : <PlusCircleOutlined />
                }
              </span>
              <span className={styles.childNode}>{item.codeName}</span>
              {
                isOpen &&
                <ul className={styles.childTree}>
                  {loop(item.units)}
                </ul>
              }
            </li>
          )
        }
        return (
          <li
            className={styles.childLi}
            onMouseDown={(e) => { this.rightDown(e, item.id, false, item) }}
            key={item.id}
            id={item.id}
            lng={item.lng}
            lat={item.lat}
            onClick={(e) => { this.handleTreeChildSelect(e) }}
          >
            <span className={styles.childIcon}>
              {
                isOpen ? <MinusCircleOutlined /> : <PlusCircleOutlined />
              }
            </span>
            <span title={item.interName} className={styles.childNode}>{item.interName}</span>
          </li>
        )
      })
    )
    return (
      <div className={styles.treeWrapper}>
        <ul className={styles.treeList}>
          {
            treeList && treeList.map((item, i) => {
              const isOpen = expendsKey.indexOf(item.id) >= 0
              return (
                <li className={styles.treeLi} key={item.id} id={item.id} onContextMenu={this.noShow} onClick={e => this.handleTreeSelect(e, item.route_name, item.route_code, i)}>
                  <span className={styles.treeIcon}>
                    <span className={styles.childIcon}>
                      {
                        isOpen ? <MinusCircleOutlined /> : <PlusCircleOutlined />
                      }
                    </span>
                  </span>
                  <span title={item.codeName} onClick={() => this.btns(item.id)} onMouseDown={e => this.rightDown(e, '', true)} className={styles.childNode}>{item.route_name}</span>
                  {
                    isOpen &&
                    <ul className={styles.childTree} key={item.id}>
                      {loop(item.units)}
                    </ul>
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     data: { ...state.publicData },
//   }
// }
// const mapDisPatchToProps = (dispatch) => {
//   return {
//     getUnitTree: bindActionCreators(getUnitTree, dispatch),
//     getRegionNum: bindActionCreators(getRegionNum, dispatch),
//   }
// }
export default CustomTree
// export default connect(mapStateToProps, mapDisPatchToProps)(CustomTree)
