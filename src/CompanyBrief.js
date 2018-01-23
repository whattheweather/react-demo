import React, { Component } from 'react'
import HeaderOperations from './HeaderOperations'
import { Get, Put, Delete } from './Service.js'
import Download from 'downloadjs'
import { message, Table, Input } from 'antd'
import { Link } from 'react-router-dom'

const EditableCell = ({ editable, value, onChange }) => (
    <div>
    {
        editable
            ? <Input style={{margin:'-5px 0'}} value={value} onChange={e=>onChange(e.target.value)}/>
            : value
    }
    </div>
)
export default class CompanyBrief extends Component {
    constructor(props) {
        super(props)
        this.lots = []
        this.count = 1
        this.url = this.props.match.url
        let path = this.url.split('/')
        this.path = path[path.length - 1]
        this.selectedLot = 'all'
        this.columns = [{ // 0
            title: '#',
            dataIndex: this.count,
            render: (text, record) => {
            return <div>
                {this.count++}
            </div>
            },
        }, { // 1
            title: '单位名称',
            dataIndex: 'name',
            render: (text, record) => this.renderColumns(text, record, 'name'),
        }, { // 2
            title: '级别',
            dataIndex: 'rate',
            render: (text, record) => this.renderColumns(text, record, 'rate'),
        }, { // 3
            title: '批次',
            dataIndex: 'lot',
            render: (text, record) => this.renderColumns(text, record, 'lot'),
        }, { // 4
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => this.renderColumns(text, record, 'status'),
        }, { // 5
            title: '联系人',
            dataIndex: 'contact',
            render: (text, record) => this.renderColumns(text, record, 'contact'),
        }, { // 6
            title: '负责人',
            dataIndex: 'charge',
            render: (text, record) => this.renderColumns(text, record, 'charge'),
        }, { // 7
            title: '领导',
            dataIndex: 'leader',
            render: (text, record) => this.renderColumns(text, record, 'leader'),
        }, { // 8
            title: '其他联系人',
            dataIndex: 'others',
            render: (text, record) => this.renderColumns(text, record, 'others'),
        }, { // 9
            title: '过期联系人',
            dataIndex: 'expire',
            render: (text, record) => this.renderColumns(text, record, 'expire'),
        }, { // 10
            title: '贡献评级',
            dataIndex: 'contribution',
            render: (text, record) => this.renderColumns(text, record, 'contribution'),
        }, { // 11
            title: '备注',
            dataIndex: 'remark',
            render: (text, record) => this.renderColumns(text, record, 'remark'),
        }, { // 12
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
            const { editable } = record
            return (
                <div className="editable-row-operations">
                {
                    editable
                        ? <span>
                            <a onClick={()=>this.save(record._id)}>保存</a>
                            &nbsp;|&nbsp;
                            <a onClick={()=>this.cancel(record._id)}>取消</a>
                        </span>
                        : <span>
                            <a onClick={()=>this.edit(record._id)}>编辑</a>
                            &nbsp;|&nbsp;
                            <Link to={this.url+'/'+record._id+'/detail'}>贡献详情</Link>
                        </span>
                }
                </div>
            )
            },
        }]
        switch (this.path) {
            case 'do':
                this.columns.splice(11, 1)
                this.columns.splice(4, 1)
                break
            default:
                this.columns.splice(3, 1)
                break
        }
        this.state = {
            data: [],
            selectedRows: [],
            lots: [],
        }
    }
    getData(lot, callback) {
        callback = callback || (() => {})
        Get(this.url, { lot }).then(res => res.json())
            .then(data => {
                this.cacheData = data.map(item => ({ ...item }))
                this.setState({ data }, () => callback())
            })
    }
    updateLots() {
        const newData = [...this.state.data]
        let lots = {}
        newData.forEach(element => {
            let lot = element['lot']
            !lots[lot] && (lots[lot] = true)
        })
        this.setState({ lots: Object.keys(lots) })
    }
    deleteSelected() {
        let newData = [...this.state.data]
        for (let id of this.state.selectedRows)
            newData.forEach((value, index) => {
                (id === value._id) && newData.splice(index, 1)
            })
        this.setState({
            data: newData,
            selectedRows: [],
        })
        this.cacheData = newData.map(item => ({ ...item }))            
    }
    componentDidMount() {
        this.getData(this.selectedLot, () => { this.updateLots() })
    }
    componentWillUpdate() {
        this.count = 1
    }
    componentDidUpdate() {    
        this.count = 1
    }
    renderColumns(text, record, column) {
        return <EditableCell
            editable={record.editable}
            value={text}
            onChange={value=>this.inputChange(value,record._id,column)}/>
    }
    inputChange(value, key, column) {
        const newData = [...this.state.data]
        const target = newData.filter(item => key === item._id)[0]
        if (target) {
            target[column] = value
            this.setState({ data: newData })
        }
    }
    edit(key) {
        const newData = [...this.state.data]
        const target = newData.filter(item => key === item._id)[0]
        if (target) {
            target.editable = true
            this.setState({ data: newData })
        }
    }
    save(key) {
        const newData = [...this.state.data]
        const target = newData.filter(item => key === item._id)[0]
        target && Put(this.url + '/' + key, target).then(res => {
            if (res.statusText === 'OK') {
                delete target.editable
                this.setState({ data: newData })
                this.cacheData = newData.map(item => ({ ...item }))
            }
        })
    }
    cancel(key) {
        const newData = [...this.state.data]
        const target = newData.filter(item => key === item._id)[0]
        console.log(this.cacheData)
        if (target) {
            let oldTarget = this.cacheData.filter(item => key === item._id)[0]
            let oldKeys = Object.keys(oldTarget)
            let keys = Object.keys(target)
            let diff = {}
            if (oldKeys.length < keys.length)
                for (let key of keys)
                    oldKeys.indexOf(key) === -1 && (diff[key] = '')
            console.log(diff)
            Object.assign(target, diff, oldTarget)
            delete target.editable
            this.setState({ data: newData })
        }
    }
    move() {
        let to = this.path === 'do' ? 'did' : 'do'
        Put(this.url, { ids: this.state.selectedRows, to })
            .then(res => {
                if (res.statusText === 'OK')           
                    this.deleteSelected()
                else
                    message.error('删除失败，服务器出错了')
            })
    }
    delete() {
        Delete(this.url, { ids: this.state.selectedRows }).then(res => {
            if (res.statusText === 'OK')           
                this.deleteSelected()
            else
                message.error('删除失败，服务器出错了')
        })
    }
    download() {
        Get(this.url + '/csv', { lot: this.selectedLot })
            .then(res => res.blob()).then(blob => {
                let name
                switch (this.path) {
                    case 'do':
                        name = '现有支撑单位.csv'
                        break
                    case 'todo':
                        name = '待申请单位.csv'
                        break
                    case 'did':
                        name = '失效单位.csv'
                        break
                    default:
                }
                Download(blob, name)
            })
    }
    render() {
        const rowSelection = {
            selectedRowKeys: this.state.selectedRows,
            onChange: keys=>this.setState({selectedRows:keys}),
        }
        return <div>
            <HeaderOperations
                url={this.url}
                path={this.path}
                lots={this.state.lots}
                selectedRows={this.state.selectedRows}
                onDelete={()=>this.delete()}
                onMove={()=>this.move()}
                onDownload={()=>this.download()}
                onUpload={()=>this.getData('all',()=>{this.updateLots()})}
                onSelect={lot=>this.getData(lot,()=>{this.selectedLot=lot})}/>
            <Table style={{marginTop:'24px'}}
                rowSelection={rowSelection}
                rowKey="_id"
                bordered
                dataSource={this.state.data}
                columns={this.columns}
                pagination={false}/>
        </div>
    }
}