import React, { Component } from 'react'
import { Select, Tabs, Tree, Pagination } from 'antd';
import { SearchOutlined, CarryOutOutlined,PlusOutlined, MinusOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from '../SystemManagement.module.scss'
const { TabPane } = Tabs;
const { Option } = Select
const treeData = [
  {
    title: '北京市交通管理局',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '科信处',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-0-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-0-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-0-0-2', icon: <CarryOutOutlined /> },
        ],
      }
    ],
  },
  {
    title: '东城交通支队',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '东城科信处',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-1-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-1-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-1-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '西城交通支队',
    key: '0-2',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '西城科信处',
        key: '0-2-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-2-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-2-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-2-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '朝阳交通支队',
    key: '0-3',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '朝阳科信处',
        key: '0-3-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-3-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-3-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-3-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '海淀交通支队',
    key: '0-4',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '海淀科信处',
        key: '0-4-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-4-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-4-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-4-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '丰台交通支队',
    key: '0-5',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '丰台科信处',
        key: '0-5-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-5-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-5-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-5-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '石景山交通支队',
    key: '0-6',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '石景山科信处',
        key: '0-6-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-6-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-6-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-6-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '房山交通支队',
    key: '0-7',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '房山科信处',
        key: '0-7-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-7-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-7-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-7-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '通州交通支队',
    key: '0-8',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '通州科信处',
        key: '0-8-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-8-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-8-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-8-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '昌平交通支队',
    key: '0-9',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '昌平科信处',
        key: '0-9-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-9-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-9-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-9-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '开发区交通支队',
    key: '0-10',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '开发区科信处',
        key: '0-10-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-10-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-10-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-10-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '门头沟交通支队',
    key: '0-11',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '门头沟科信处',
        key: '0-11-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-11-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-11-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-11-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
  {
    title: '大兴交通支队',
    key: '0-12',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '大兴科信处',
        key: '0-12-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '控制科', key: '0-12-0-0', icon: <CarryOutOutlined /> },
          { title: '检测科', key: '0-12-0-1', icon: <CarryOutOutlined /> },
          { title: '通信科', key: '0-12-0-2', icon: <CarryOutOutlined /> },
        ],
      },
    ]
  },
];
class UserManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detachmentData: ['东城交通支队',
        '西城交通支队',
        '朝阳交通支队',
        '海淀交通支队',
        '丰台交通支队',
        '石景山交通支队',
        '房山交通支队',
        '通州交通支队',
        '昌平交通支队',
        '开发区交通支队',
        '门头沟交通支队',
        '大兴交通支队'],
      treeData: [
        {
          title: '北京市交通管理局',
          key: '0-0',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '科信处',
              key: '0-0-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-0-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-0-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-0-0-2', icon: <CarryOutOutlined /> },
              ],
            }
          ],
        },
        {
          title: '东城交通支队',
          key: '0-1',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '东城科信处',
              key: '0-1-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-1-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-1-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-1-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '西城交通支队',
          key: '0-2',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '西城科信处',
              key: '0-2-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-2-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-2-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-2-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '朝阳交通支队',
          key: '0-3',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '朝阳科信处',
              key: '0-3-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-3-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-3-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-3-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '海淀交通支队',
          key: '0-4',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '海淀科信处',
              key: '0-4-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-4-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-4-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-4-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '丰台交通支队',
          key: '0-5',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '丰台科信处',
              key: '0-5-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-5-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-5-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-5-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '石景山交通支队',
          key: '0-6',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '石景山科信处',
              key: '0-6-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-6-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-6-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-6-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '房山交通支队',
          key: '0-7',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '房山科信处',
              key: '0-7-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-7-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-7-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-7-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '通州交通支队',
          key: '0-8',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '通州科信处',
              key: '0-8-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-8-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-8-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-8-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '昌平交通支队',
          key: '0-9',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '昌平科信处',
              key: '0-9-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-9-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-9-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-9-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '开发区交通支队',
          key: '0-10',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '开发区科信处',
              key: '0-10-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-10-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-10-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-10-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '门头沟交通支队',
          key: '0-11',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '门头沟科信处',
              key: '0-11-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-11-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-11-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-11-0-2', icon: <CarryOutOutlined /> },
              ],
            },
          ]
        },
        {
          title: '大兴交通支队',
          key: '0-12',
          icon: <CarryOutOutlined />,
          children: [
            {
              title: '大兴科信处',
              key: '0-12-0',
              icon: <CarryOutOutlined />,
              children: [
                { title: '控制科', key: '0-12-0-0', icon: <CarryOutOutlined /> },
                { title: '检测科', key: '0-12-0-1', icon: <CarryOutOutlined /> },
                { title: '通信科', key: '0-12-0-2', icon: <CarryOutOutlined /> },
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
    const { detachmentData } = this.state
    return (
      <div className={styles.WrapperContent}>
        <div className={styles.contentBox}>
          <div className={styles.title}></div>
          <div className={styles.content} style={{height:'100%'}}>
            <div className={styles.listName}>用户管理</div>
            <div className={styles.listContent} style={{padding:'0 20px 20px',position: 'absolute',top:'50px',right:0,bottom:'20px',left:0 }}>
            <div className={styles.treeLeft}>
              <Tree
                showLine={"checked"}
                showIcon={false}
                defaultExpandedKeys={['0-0','0-0-0']}
                onSelect={this.onSelectTree}
                treeData={treeData}
              />
            </div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="组织架构" key="1">
                <div className={styles.searchContent} style={{width:'calc(100% - 310px)',position:'absolute',right:'20px', top:'65px'}}>
                  <div className={styles.searchItem}>
                    <div className={styles.searchInput}>
                      交通支队：<Select defaultValue="0">
                                <Option key="1" value="0">请选择</Option>
                                { detachmentData && detachmentData.map((item, i) => {
                                  return <Option key={"detachmentData" + i} value={item}>{item}</Option>
                                })}
                              </Select>
                    </div>
                    <div className={styles.searchInput}>
                    关键词：<input type="text" className={styles.inputBox} placeholder="请输入" />
                        <SearchOutlined className={styles.searchIcon} />
                    </div>
                  </div>
                  <div className={styles.searchItem}>
                    <div className={styles.searchBtn}>撤销</div>
                    <div className={styles.searchBtn}>导出</div>
                  </div>
                </div>
                <div className={styles.listRight}>
                  <div className={styles.listThead}>
                    <span>一级部门</span>
                    <span>二级部门</span>
                    <span>三级部门</span>
                    <span>四级部门</span>
                    <span>系统负责人</span>
                    <span>联系方式</span>
                    <span>说明</span>
                    <span>编辑时间</span>
                    <span>操 作</span>
                  </div>
                  <div className={styles.listItem}>
                    <span>北京市交通管理局</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div>
                  <div className={styles.listItem}>
                    <span></span>
                    <span>科信处</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div>
                  <div className={styles.listItem}>
                    <span></span>
                    <span></span>
                    <span>控制科</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div>
                  <div className={styles.listItem}>
                    <span></span>
                    <span></span>
                    <span>检测科</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div>
                  <div className={styles.listItem}>
                    <span></span>
                    <span></span>
                    <span>通信科</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div>
                  <div className={styles.listItem}>
                    <span></span>
                    <span>东城交通支队</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div>
                  <div className={styles.listItem}>
                    <span></span>
                    <span>东城交通支队</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div>
                  <div className={styles.listItem}>
                    <span></span>
                    <span>西城交通支队</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div>
                  <div className={styles.listItem}>
                    <span></span>
                    <span>朝阳交通支队</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div>
                  <div className={styles.listItem}>
                    <span></span>
                    <span>海淀交通支队</span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span><s>编辑</s></span>
                  </div> 
                  <div className={styles.listItem}>
                    <span><PlusOutlined title='加载更多' /></span>
                  </div>                  
                </div>
                <div className={styles.pagination} style={{left:'unset', right:'20px'}}>
                  <div className={styles.page}>
                    <PlusOutlined title='新增' />
                    <MinusOutlined title='删除' />
                    <ArrowUpOutlined title='上移' />
                    <ArrowDownOutlined title='下移' />
                    <ArrowLeftOutlined title='升级' />
                    <ArrowRightOutlined title='降级' />
                  </div>
                </div>
              </TabPane>
              <TabPane tab="人员管理" key="2">
                {/* <div className={styles.treeLeft}>
                  <Tree
                    showLine={"checked"}
                    showIcon={false}
                    defaultExpandedKeys={['0-0','0-0-0']}
                    onSelect={this.onSelectTree}
                    treeData={treeData}
                  />
                </div> */}
                <div className={styles.searchContent} style={{width:'calc(100% - 310px)',position:'absolute',right:'20px', top:'65px'}}>
                  <div className={styles.searchItem}>
                    <div className={styles.searchInput}>
                    编号：<input type="text" className={styles.inputBox} placeholder="请输入" />
                    </div>
                    <div className={styles.searchInput}>
                    姓名：<input type="text" className={styles.inputBox} placeholder="请输入" />
                    </div>
                    <div className={styles.searchInput}>
                    电话：<input type="text" className={styles.inputBox} placeholder="请输入" />
                    </div>
                    <div className={styles.searchInput}>
                    关键词：<input type="text" className={styles.inputBox} placeholder="请输入" />
                        <SearchOutlined className={styles.searchIcon} />
                    </div>
                  </div>
                  <div className={styles.searchItem}>
                    <div className={styles.searchBtn}>查询</div>
                    <div className={styles.searchBtn}>导出</div>
                  </div>
                </div>
                <div className={styles.listRight}>
                  <div className={styles.listThead}>
                    <span>用户名</span>
                    <span>人员编号</span>
                    <span>姓名</span>
                    <span>姓别</span>
                    <span>电话</span>
                    <span>单位</span>
                    <span>部门</span>
                    <span>职位</span>
                    <span>角色</span>
                    <span style={{flex:1.3}}>创建时间</span>
                    <span>操 作</span>
                  </div>
                  {
                    [0,1,2,3,4,5,6,7,8,9].map(()=>{
                      return <div className={styles.listItem}>
                                <span>DH201820200001</span>
                                <span>DH201820200001</span>
                                <span>小明</span>
                                <span>男</span>
                                <span>13512345678</span>
                                <span>市局</span>
                                <span>科信处</span>
                                <span>处长</span>
                                <span>系统管理员</span>
                                <span style={{flex:1.3}}>2020-11-04 14:20:22</span>
                                <span><s>锁定</s><s>编辑</s><s>删除</s></span>
                              </div>
                    })
                  }    
                  <div className={styles.listItem}>
                    <span><PlusOutlined title='新增' /></span>
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