import React, { Component } from 'react';
import { Table, Input } from 'antd';

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

export default class DoCompanies extends Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.count = 1;
    this.columns = [{
      title: '#',
      dataIndex: 'key',
      render: (text, record) => <div>
        {this.count++}
      </div>,
    }, {
      title: '单位名称',
      key: 'name',
      dataIndex: 'name',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '级别',
      dataIndex: 'rate',
      render: (text, record) => this.renderColumns(text, record, 'rate'),
    }, {
      title: '批次',
      dataIndex: 'lot',
      render: (text, record) => this.renderColumns(text, record, 'lot'),
    }, {
      title: '联系人',
      dataIndex: 'contact',
      render: (text, record) => this.renderColumns(text, record, 'contact'),
    }, {
      title: '负责人',
      dataIndex: 'charge',
      render: (text, record) => this.renderColumns(text, record, 'charge'),
    }, {
      title: '领导',
      dataIndex: 'leader',
      render: (text, record) => this.renderColumns(text, record, 'leader'),
    }, {
      title: '其他联系人',
      dataIndex: 'other',
      render: (text, record) => this.renderColumns(text, record, 'other'),
    }, {
      title: '过期联系人',
      dataIndex: 'expire',
      render: (text, record) => this.renderColumns(text, record, 'expire'),
    }, {
      title: '贡献评级',
      dataIndex: 'contribution',
      render: (text, record) => this.renderColumns(text, record, 'contribution'),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>保存</a>
                  &nbsp;|&nbsp;
                  <a onClick={() => this.cancel(record.key)}>取消</a>
                </span>
              : <span>
                  <a onClick={() => this.edit(record.key)}>编辑</a>
                  &nbsp;|&nbsp;
                  <a onClick={() => this.remove(record.key)}>删除</a>
                </span>
            }
          </div>
        );
      },
    }];
    this.state = { data: [] };
    this.cacheData = [];
  }
  componentWillMount() {
    fetch('/do', {
      method: "POST",
    }).then(res => res.json()).then(res => {
      this.setState({ data: res});
      this.cacheData = res.map(item => ({ ...item }));
    })
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    console.log(key);
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    target && fetch('/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(target),
    }).then(res => {
      if (res.status === 200) {
        delete target.editable;
        this.setState({ data: newData });
        this.cacheData = newData.map(item => ({ ...item }));
      }
    });
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  remove(key) {
    const newData = [...this.state.data];
    for (let i = 0; i < newData.length; i ++) {
      if (key === newData[i].key) {
        fetch('/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: '_id=' + newData[i]._id,
        }).then(res => {
          if (res.status === 200)
            newData.splice(i, 1);
        })
        break;
      }
    }
    this.setState({ data:newData }, () => { this.count = 1 });
  }
  render() {
    return <Table rowKey="_id" bordered dataSource={this.state.data} columns={this.columns} />;
  }
}
