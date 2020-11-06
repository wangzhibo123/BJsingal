import React, { Component } from 'react'
import { Switch, Select, Checkbox, Tree } from 'antd';
import { CarryOutOutlined, CloseOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';
import styles from '../SystemManagement.module.scss'
const { Option } = Select
const { TreeNode } = Tree;
const treeData = [
  {
    title: '实时监视',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '主中心监视',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
      },
      {
        title: '分中心监视',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
      }
    ],
  },
  {
    title: '中心控制',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '路口监控',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: '路口控制', key: '0-1-0-0', icon: <CarryOutOutlined /> },
          { title: '基础信息', key: '0-1-0-1', icon: <CarryOutOutlined /> },
          { title: '信号参数', key: '0-1-0-2', icon: <CarryOutOutlined /> },
          { title: '一口一档', key: '0-1-0-3', icon: <CarryOutOutlined /> },
          { title: '中心时间表', key: '0-1-0-4', icon: <CarryOutOutlined /> }
        ],
      },
      {
        title: '干线监控',
        key: '0-1-1',
        icon: <CarryOutOutlined />
      },
      {
        title: '子区监控',
        key: '0-1-2',
        icon: <CarryOutOutlined />
      },
      {
        title: '中心时间表',
        key: '0-1-3',
        icon: <CarryOutOutlined />
      }
    ]
  },
  {
    title: '控制预案',
    key: '0-2',
    icon: <CarryOutOutlined />
  },
  {
    title: '控制优化',
    key: '0-3',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '路口优化',
        key: '0-3-0',
        icon: <CarryOutOutlined />
      },
      {
        title: '干线优化',
        key: '0-3-1',
        icon: <CarryOutOutlined />
      }
    ]
  },
  {
    title: '视频监控',
    key: '0-4',
    icon: <CarryOutOutlined />
  }
];
const treeDataR = [
  {
    title: '效果评价',
    key: '0-5',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: '评价主页',
        key: '0-5-0',
        icon: <CarryOutOutlined />
      },
      {
        title: '路口评价',
        key: '0-5-1',
        icon: <CarryOutOutlined />
      },
      {
        title: '干线评价',
        key: '0-5-2',
        icon: <CarryOutOutlined />
      },
      {
        title: '区域评价',
        key: '0-5-3',
        icon: <CarryOutOutlined />
      },
      {
        title: '舆情评价',
        key: '0-5-4',
        icon: <CarryOutOutlined />
      },
    ]
  },
  {
    title: '运维管理',
    key: '0-6',
    icon: <CarryOutOutlined />
  },
  {
    title: '运行管理',
    key: '0-7',
    icon: <CarryOutOutlined />
  },
  {
    title: '综合管理',
    key: '0-8',
    icon: <CarryOutOutlined />
  },
  {
    title: '系统管理',
    key: '0-9',
    icon: <CarryOutOutlined />
  },
  
];
class AuthManagement extends Component {
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
        areaDatas: [
          '东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '顺义区', '通州区',
          '大兴区', '房山区', '门头沟区', '昌平区', '平谷区', '密云区', '怀柔区', '延庆区'
        ],
        powerOptions: ['查看', '编辑'],
        leftTreeChecked: ['0-0-0','0-0-1','0-1','0-1-0','0-1-0-0','0-1-0-1','0-1-0-2','0-1-0-3','0-1-0-4','0-1-1','0-1-2','0-1-3','0-3-0','0-3-1','0-4'],
        rightTreeChecked: ['0-5-0','0-5-1','0-5-2','0-5-3','0-5-4','0-6','0-7','0-8','0-9'],  
        checkedOptionsResult: null, //选中后数据联动用   
        checkedOptions: {
          '0-0-0':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-0-1':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1-0':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1-0-0':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1-0-1':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1-0-2':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1-0-3':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1-0-4':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1-1':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1-2':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-1-3':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-2':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-3-0':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-3-1':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-4':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-5-0':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-5-1':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-5-2':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-5-3':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-5-4':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-6':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-7':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-8':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
          '0-9':[
            { label: '查看', value: 'look' },
            { label: '编辑', value: 'edit' },
          ],
        }, //数据源默认值显示              
    }
  }
  componentDidMount = () => {
    this.initPower()
  }
  // 初始化权限：回显角色权限或未设置的空权限
  initPower = () => {
    const indexArr = this.state.leftTreeChecked.concat(this.state.rightTreeChecked) //集合tree的所有下标
    const checkedOptionsResult = JSON.parse(JSON.stringify(this.state.checkedOptions))
    for (let i = 0; i< indexArr.length; i++) {
      if (i % 2 === 0) {
        checkedOptionsResult[indexArr[i]] = ['look']
      } else {
        checkedOptionsResult[indexArr[i]] = ['edit']
      }
    }
    console.log(JSON.stringify(checkedOptionsResult))
    this.setState({
      checkedOptionsResult
    })
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  onChange = (checkedValues, key) => {
    const checkedOptionsResult = JSON.parse(JSON.stringify(this.state.checkedOptionsResult))
    checkedOptionsResult[key] = checkedValues;
    this.setState({
      checkedOptionsResult
    }, () => {
      console.log('现在的值：',this.state.checkedOptionsResult)
    })
    console.log('checked = ', checkedValues);
  }
  onSelect = (keys, event) => {
    console.log('Trigger Select', keys, event);
  };

  onExpand = (CheckedData, name) => {
    console.log('onExpand', CheckedData);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      [name]:CheckedData
    });
  };
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
          
        );
      }
      return <TreeNode key={item.key} {...item} title={this.titleRender(item)} />;
    });
    titleRender = (item) =>{
      if (this.state.checkedOptions[item.key]) {
        return <div className={styles.checkBoxStyle}>
          {item.title}<em/><Checkbox.Group onChange={(v) => this.onChange(v, item.key)} options={this.state.checkedOptions[item.key]} defaultValue={this.state.checkedOptionsResult ? this.state.checkedOptionsResult[item.key] : []} onClick={(e) => {e.stopPropagation()}}>
            <Checkbox value={this.state.checkedOptions[item.key][0].value}>{this.state.checkedOptions[item.key][0].label}</Checkbox>
            <Checkbox value={this.state.checkedOptions[item.key][1].value}>{this.state.checkedOptions[item.key][1].label}</Checkbox>
          </Checkbox.Group>
        </div>
      }
    }
  render() {
    const { detachmentData, areaDatas, powerOptions, leftTreeChecked, rightTreeChecked } = this.state
    return (
      <div className={styles.WrapperContent}>
        <div className={styles.contentBox}>
          <div className={styles.title}></div>
          <div className={styles.powerBox}>
            <div className={styles.content}>
              <div className={styles.listName}>角色管理
                <div className={styles.searchItem}>
                  交通支队：<Select defaultValue="0">
                            <Option key="1" value="0">请选择</Option>
                            { detachmentData && detachmentData.map((item, i) => {
                              return <Option key={"detachmentData" + i} value={item}>{item}</Option>
                            })}
                          </Select>
                </div>
              </div>
              <div className={styles.listContent}>
                <div className={styles.listThead}>
                  <span>角色名称</span>
                  <span>职位描述</span>
                  <span>创建时间</span>
                  <span>操作</span>
                  <span>是否启用</span>
                </div>
                <div className={styles.itemBody} style={{height:'690px'}}>
                {
                  [1,2,3].map((item, i)=>{
                    return <div key={'list'+ i}> 
                              <div className={styles.listItem}>
                                <span>系统管理员</span>
                                <span>******</span>
                                <span>2020-11-04 15:10:00</span>
                                <span><s>编辑</s></span>
                                <span>
                                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                                </span>
                              </div>
                              <div className={styles.listItem}>
                                <span>运维人员</span>
                                <span>******</span>
                                <span>2020-11-04 15:10:00</span>
                                <span><s>编辑</s></span>
                                <span>
                                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                                </span>
                              </div>
                              <div className={styles.listItem}>
                                <span>大队长</span>
                                <span>******</span>
                                <span>2020-11-04 15:10:00</span>
                                <span><s>编辑</s></span>
                                <span>
                                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                                </span>
                              </div>
                              <div className={styles.listItem}>
                                <span>支队长</span>
                                <span>******</span>
                                <span>2020-11-04 15:10:00</span>
                                <span><s>编辑</s></span>
                                <span>
                                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                                </span>
                              </div>
                              <div className={styles.listItem}>
                                <span>支队长</span>
                                <span>******</span>
                                <span>2020-11-04 15:10:00</span>
                                <span><s>编辑</s></span>
                                <span>
                                  <Switch size="small" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
                                </span>
                              </div>
                          </div>
                  })
                }
                </div>
                <div className={styles.listItem}><span><PlusOutlined title='加载更多' /></span></div>
                </div>
            </div>
            <div className={styles.content}>
              <div className={styles.listName}>角色权限</div>
              <div className={styles.listContent} style={{marginBottom:'5px'}}>
                <div className={styles.listThead}>
                  <span style={{textAlign:'left', paddingLeft:'15px'}}>数据权限</span>
                </div>
                <div className={styles.searchItem}>
                  <span>区域：<Select
                            mode="multiple"
                            allowClear
                            placeholder="请选择"
                            defaultValue={['东城区', '西城区']}
                            onChange={this.handleChange}
                          >
                            {areaDatas && areaDatas.map((item, i) =>{
                              return <Option key={"detachmentData" + i} value={item}>{item}</Option>
                            })}
                        </Select>
                  </span>
                  <span className={styles.alignCenter}><Checkbox.Group options={powerOptions} defaultValue={['Apple']} onChange={this.onChange} /></span>
                </div>
              </div>
              <div className={styles.listContent} style={{height:'668px'}}>
                <div className={styles.listThead}>
                  <span style={{textAlign:'left', paddingLeft:'15px'}}>功能权限</span>
                </div>
                <div className={styles.powerBox} style={{alignItems:'flex-start'}}>
                  <div className={styles.powerTreeLeft}>
                    <Tree
                      showLine={true}
                      showIcon={false}
                      onExpand={(e) => this.onExpand(e, 'leftTreeChecked')}
                      expandedKeys={this.state.leftTreeChecked}>
                      {this.renderTreeNodes(treeData)}
                    </Tree>
                  </div>
                  <div className={styles.powerTreeLeft}>
                    <Tree
                      showLine={true}
                      showIcon={false}
                      onExpand={(e) => this.onExpand(e, 'rightTreeChecked')}
                      expandedKeys={this.state.rightTreeChecked}>
                      {this.renderTreeNodes(treeDataR)}
                    </Tree>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
export default AuthManagement