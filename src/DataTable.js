import React, { Component } from 'react'
import { Table, Input, Popconfirm } from 'antd'
import { Link } from 'react-router-dom';

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{margin:'-5px 0'}} value={value} onChange={e=>onChange(e.target.value)}/>
      : value
    }
  </div>
)

export default class DataTable extends Component {
  constructor(props) {
    super(props)
    this.count = 1
    let path = this.props.url.split('/')
    this.path = path[path.length - 1]
    this.columns = [{
      // 0
      title: '#',
      dataIndex: this.count,
      render: (text, record) => {
        return <div>
          {this.count++}
        </div>
      },
    }, {
      // 1
      title: '单位名称',
      dataIndex: 'name',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      // 2
      title: '级别',
      dataIndex: 'rate',
      render: (text, record) => this.renderColumns(text, record, 'rate'),
    }, {
      // 3
      title: '批次',
      dataIndex: 'lot',
      render: (text, record) => this.renderColumns(text, record, 'lot'),
    }, {
      // 4
      title: '状态',
      dataIndex: 'status',
      render: (text, record) => this.renderColumns(text, record, 'status'),
    }, {
      // 5
      title: '联系人',
      dataIndex: 'contact',
      render: (text, record) => this.renderColumns(text, record, 'contact'),
    }, {
      // 6
      title: '负责人',
      dataIndex: 'charge',
      render: (text, record) => this.renderColumns(text, record, 'charge'),
    }, {
      // 7
      title: '领导',
      dataIndex: 'leader',
      render: (text, record) => this.renderColumns(text, record, 'leader'),
    }, {
      // 8
      title: '其他联系人',
      dataIndex: 'others',
      render: (text, record) => this.renderColumns(text, record, 'others'),
    }, {
      // 9
      title: '过期联系人',
      dataIndex: 'expire',
      render: (text, record) => this.renderColumns(text, record, 'expire'),
    }, {
      // 10
      title: '贡献评级',
      dataIndex: 'contribution',
      render: (text, record) => this.renderColumns(text, record, 'contribution'),
    }, {
      // 11
      title: '备注',
      dataIndex: 'remark',
      render: (text, record) => this.renderColumns(text, record, 'remark'),
    }, {
      // 12
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record._id)}>保存</a>
                  &nbsp;|&nbsp;
                  <a onClick={() => this.cancel(record._id)}>取消</a>
                </span>
              : <span>
                  <a onClick={() => this.edit(record._id)}>编辑</a>
                  &nbsp;|&nbsp;
                  <a onClick={() => this.move(record._id)}>移动至失效单位</a>
                  &nbsp;|&nbsp;
                  <Link to={this.props.url+'/'+record._id+'/detail'}>贡献详情</Link>
                  &nbsp;|&nbsp;
                  <Popconfirm title="确认删除吗？" onConfirm={()=>this.delete(record._id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
            }
          </div>
        )
      },
    }, {
      // 13
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record._id)}>保存</a>
                  &nbsp;|&nbsp;
                  <a onClick={() => this.cancel(record._id)}>取消</a>
                </span>
              : <span>
                  <a onClick={() => this.edit(record._id)}>编辑</a>
                  &nbsp;|&nbsp;
                  <a onClick={() => this.move(record._id)}>移动至现有支持单位</a>
                  &nbsp;|&nbsp;
                  <Link to={this.props.url+'/'+record._id+'/detail'}>贡献详情</Link>
                  &nbsp;|&nbsp;
                  <Popconfirm title="确认删除吗？" onConfirm={()=>this.delete(record._id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
            }
          </div>
        )
      },
    }, {
      // 14
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record._id)}>保存</a>
                  &nbsp;|&nbsp;
                  <a onClick={() => this.cancel(record._id)}>取消</a>
                </span>
              : <span>
                  <a onClick={() => this.edit(record._id)}>编辑</a>
                  &nbsp;|&nbsp;
                  <Link to={this.props.url+'/'+record._id+'/detail'}>贡献详情</Link>
                  &nbsp;|&nbsp;
                  <Popconfirm title="确认删除吗？" onConfirm={()=>this.delete(record._id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
            }
          </div>
        )
      },
    }]
    switch (this.path) {
      case 'do':
        this.columns.splice(13, 2)
        this.columns.splice(11, 1)
        this.columns.splice(4, 1)
        break
      case 'todo':
        this.columns.splice(14, 1)
        this.columns.splice(12, 1)
        this.columns.splice(3, 1)    
        break
      case 'did':
        this.columns.splice(12, 2)
        this.columns.splice(3, 1)
        break
      default:
    }
    this.state = { selectedRowKeys: [] }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.selectedRows.length)
      this.setState({ selectedRowKeys: [] })
  }
  componentWillUpdate() {
    this.count = 1
  }
  componentDidUpdate() {    
    this.count = 1
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value=>this.handleChange(value, record._id, column)}
      />
    )
  }
  handleChange(value, _id, column) {
    const newData = [...this.props.data]
    const target = newData.filter(item => _id === item._id)[0]
    if (target) {
      target[column] = value
      this.props.onRefresh(newData)
    }
  }
  edit(_id) {
    const newData = [...this.props.data]
    const target = newData.filter(item => _id === item._id)[0]
    if (target) {
      target.editable = true
      this.props.onRefresh(newData)
    }
  }
  save(_id) {
    const newData = [...this.props.data]
    const target = newData.filter(item => _id === item._id)[0]
    target && this.props.onSave(target, _id).then(res => {
      if (res.status === 200) {
        delete target.editable
        this.props.onRefresh(newData, newData.map(item => ({ ...item })))
      }
    })
  }
  cancel(_id) {
    const newData = [...this.props.data]
    const target = newData.filter(item => _id === item._id)[0]
    if (target) {
    Object.assign(target, this.props.cacheData.filter(item => _id === item._id)[0])
      delete target.editable
      this.props.onRefresh(newData)
    }
  }
  move(_id) {
    const newData = [...this.props.data]
    newData.forEach((value, index) => {
      if (_id === value._id) {
        value.type = this.path === 'do' ? 2 : 0
        this.props.onSave(value, _id).then(res => {
          if(res.status === 200) {
            newData.splice(index, 1)
            this.props.onRefresh(newData, newData.map(item => ({ ...item })))
          }
        })
      }
    })
  }
  delete(_id) {
    const newData = [...this.props.data]
    newData.forEach((value, index) => {
      if (_id === value._id) {
        this.props.onDelete(_id).then(res => {
          if(res.status === 200) {
            newData.splice(index, 1)
            this.props.onRefresh(newData, newData.map(item => ({ ...item })))
          }
        })
      }
    })
  }
  onSelectChange(selectedRowKeys) {
    this.props.onSelect(selectedRowKeys)
    this.setState({ selectedRowKeys });
  }
  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: keys => this.onSelectChange(keys),
    };
    return <Table
      rowSelection={rowSelection}
      rowKey="_id"
      bordered
      dataSource={this.props.data}
      columns={this.columns}
      pagination={false}
      onChange={this.handleTableChange}/>
    }
}
