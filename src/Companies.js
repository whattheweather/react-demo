// import React, { Component } from 'react';

// const doTable = ['单位名称', '级别', '批次', '联系人', '负责人', '领导', '其他联系人', '过期联系人', '贡献评级', '贡献详情',];
// const willTable = ['单位名称', '拟申请级别', '状态', '联系人', '负责人', '领导', '其他联系人', '过期联系人', '贡献评级', '贡献详情', '备注',];
// const didTable = ['单位名称', '级别', '批次', '联系人', '负责人', '领导', '其他联系人', '过期联系人', '贡献评级', '贡献详情', '备注',];
// import { Table, Input, Popconfirm } from 'antd';

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

// const EditableCell = ({ editable, value, onChange }) => (
//   <div>
//     {editable
//       ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
//       : value
//     }
//   </div>
// );

// class EditableTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.columns = [{
//       title: 'name',
//       dataIndex: 'name',
//       width: '25%',
//       render: (text, record) => this.renderColumns(text, record, 'name'),
//     }, {
//       title: 'age',
//       dataIndex: 'age',
//       width: '15%',
//       render: (text, record) => this.renderColumns(text, record, 'age'),
//     }, {
//       title: 'address',
//       dataIndex: 'address',
//       width: '40%',
//       render: (text, record) => this.renderColumns(text, record, 'address'),
//     }, {
//       title: 'operation',
//       dataIndex: 'operation',
//       render: (text, record) => {
//         const { editable } = record;
//         return (
//           <div className="editable-row-operations">
//             {
//               editable ?
//                 <span>
//                   <a onClick={() => this.save(record.key)}>Save</a>
//                   <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
//                     <a>Cancel</a>
//                   </Popconfirm>
//                 </span>
//                 : <a onClick={() => this.edit(record.key)}>Edit</a>
//             }
//           </div>
//         );
//       },
//     }];
//     this.state = { data };
//     this.cacheData = data.map(item => ({ ...item }));
//   }
//   renderColumns(text, record, column) {
//     return (
//       <EditableCell
//         editable={record.editable}
//         value={text}
//         onChange={value => this.handleChange(value, record.key, column)}
//       />
//     );
//   }
//   handleChange(value, key, column) {
//     const newData = [...this.state.data];
//     const target = newData.filter(item => key === item.key)[0];
//     if (target) {
//       target[column] = value;
//       this.setState({ data: newData });
//     }
//   }
//   edit(key) {
//     const newData = [...this.state.data];
//     const target = newData.filter(item => key === item.key)[0];
//     if (target) {
//       target.editable = true;
//       this.setState({ data: newData });
//     }
//   }
//   save(key) {
//     const newData = [...this.state.data];
//     const target = newData.filter(item => key === item.key)[0];
//     if (target) {
//       delete target.editable;
//       this.setState({ data: newData });
//       this.cacheData = newData.map(item => ({ ...item }));
//     }
//   }
//   cancel(key) {
//     const newData = [...this.state.data];
//     const target = newData.filter(item => key === item.key)[0];
//     if (target) {
//       Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
//       delete target.editable;
//       this.setState({ data: newData });
//     }
//   }
//   render() {
//     return <Table bordered dataSource={this.state.data} columns={this.columns} />;
//   }
// }

// ReactDOM.render(<EditableTable />, mountNode);
// export default class Companies extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selected: this.props.selected,
//         }
//         this.tableHeader = doTable;
//     }
//     componentWillReceiveProps(nextProps) {
//         if (nextProps.selected === 'do') {
//             this.tableHeader= doTable;
//         } else if (nextProps.selected === 'will') {
//             this.tableHeader= willTable;
//         } else if (nextProps.selected === 'did') {
//             this.tableHeader= didTable;
//         }
//     }
//     render() {
//             return <Table striped bordered hover>
//                 <thead >
//                     <tr style={{textAlign:'center'}}>
//                         {(() => {
//                             return this.tableHeader.map((value, index) => <th style={{textAlign:'center'}} key={index}>{value}</th>);
//                         })()}
//                         <th style={{textAlign:'center'}}>相关操作</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         {(() => {
//                             return this.tableHeader.map((value, index) => <td style={{textAlign:'center'}} key={index}>test</td>);
//                         })()}
//                         <td style={{textAlign:'center'}}>
//                             <Button bsStyle="warning"
//                                 onClick={event=>this.props.onEdit(event,this.tableHeader)}>修改</Button>
//                             <Button bsStyle="info"
//                                 onClick={event=>this.props.onMove(event)} style={{marginLeft:10}}>移动</Button>                        
//                         </td>
//                     </tr>
//                 </tbody>
//             </Table>
//     }
// }