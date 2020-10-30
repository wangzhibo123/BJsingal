import React, { Component } from 'react'
import { Tabs, Tree, Pagination } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';
import styles from '../SystemManagement.module.scss'
const { TabPane } = Tabs;
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-0-0-1', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
];
class UserManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData:[
        {
          title: 'parent 1',
          key: '0-0',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: 'parent 1-0',
              key: '0-0-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
                { title: 'leaf', key: '0-0-0-1', icon: <CarryOutOutlined /> },
                { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
              ],
            },
            {
              title: 'parent 1-1',
              key: '0-0-1',
              icon: <CarryOutOutlined />,
              children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
            },
            {
              title: 'parent 1-2',
              key: '0-0-2',
              icon: <CarryOutOutlined />,
              children: [
                { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
                {
                  title: 'leaf',
                  key: '0-0-2-1',
                  icon: <CarryOutOutlined />,
                },
              ],
            },
          ],
        },
        {
          title: 'parent 2',
          key: '0-1',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: 'parent 2-0',
              key: '0-1-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
                { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
      ],
    }
  }
  componentDidMount = () => {
    
  }
  callback = (key) => {
    console.log(key);
  }
  onSelectTree = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  render() {
    return (
      <div className={styles.WrapperContent}>
        <div className={styles.contentBox}>
          <div className={styles.title}></div>
          <div className={styles.content} style={{height:'100%'}}>
            <div className={styles.listName}>用户管理</div>
            <div className={styles.listContent} style={{padding:'0 20px 20px',position: 'absolute',top:'50px',right:0,bottom:'20px',left:0 }}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="组织架构" key="1">
                <div className={styles.treeLeft}>
                  <Tree
                    showLine={"checked"}
                    showIcon={false}
                    defaultExpandedKeys={['0-0']}
                    onSelect={this.onSelectTree}
                    treeData={treeData}
                  />
                </div>
                <div className={styles.listRight}>
                  <div className={styles.listThead}>
                    <span>组织编号</span>
                    <span>姓 名</span>
                    <span>性 别</span>
                    <span>电 话</span>
                    <span>部 门</span>
                    <span>职 位</span>
                    <span>创建时间</span>
                    <span>操 作</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                </div>
                <div className={styles.pagination} style={{left:'unset', right:'20px'}}>
                  <div className={styles.page}><span className={styles.count}>当前共{100}条，每页显示10条</span><Pagination showQuickJumper defaultCurrent={1} total={100} onChange={this.onPageChange} /></div>
                </div>
              </TabPane>
              <TabPane tab="人员管理" key="2">
              <div className={styles.treeLeft}>
                  <Tree
                    showLine={"checked"}
                    showIcon={false}
                    defaultExpandedKeys={['0-0']}
                    onSelect={this.onSelectTree}
                    treeData={treeData}
                  />
                </div>
                <div className={styles.listRight}>
                  <div className={styles.listThead}>
                    <span>员工编号</span>
                    <span>姓 名</span>
                    <span>性 别</span>
                    <span>电 话</span>
                    <span>部 门</span>
                    <span>职 位</span>
                    <span>创建时间</span>
                    <span>操 作</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                    <span>******</span>
                  </div>
                </div>
                <div className={styles.pagination} style={{left:'unset', right:'20px'}}>
                  <div className={styles.page}><span className={styles.count}>当前共{100}条，每页显示10条</span><Pagination showQuickJumper defaultCurrent={1} total={100} onChange={this.onPageChange} /></div>
                </div>
              </TabPane>
            </Tabs>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserManagement