import React, { Component } from 'react'
import { Get, Put, Delete } from './Service.js'
import Download from 'downloadjs'
import { Upload, Table, Input, Button, Icon,
    Menu, Dropdown, message, Row, Col } from 'antd'
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
            title: '序号',
            width: '52px',
            dataIndex: this.count,
            render: (text, record) => {
            return <div>
                {this.count++}
            </div>
            },
        }, { // 1
            title: '批次',
            dataIndex: 'lot',
            render: (text, record) => this.renderColumns(text, record, 'lot'),
        }, { // 2
            title: '单位名称',
            dataIndex: 'name',
            render: (text, record) => this.renderColumns(text, record, 'name'),
        }, { // 3
            title: '级别',
            dataIndex: 'rate',
            render: (text, record) => this.renderColumns(text, record, 'rate'),
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
        // }, { // 9
        //     title: '过期联系人',
        //     dataIndex: 'expire',
        //     render: (text, record) => this.renderColumns(text, record, 'expire'),
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
            width: '169px',
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
                            <Link to={this.url+'/'+record._id+'/detail'}>详情</Link>
                        </span>
                }
                </div>
            )
            },
        }]
        switch (this.path) {
            case 'do':
                // this.columns.splice(11, 1)
                this.columns.splice(10, 1)
                this.columns.splice(4, 1)
                break
            case 'todo':
                this.columns[2].title = '拟申请级别'
                this.columns.splice(3, 1)
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
    componentDidMount() {
        this.getData(this.selectedLot, () => { this.updateLots() })
    }
    componentWillUpdate() {
        this.count = 1
    }
    componentDidUpdate() {    
        this.count = 1
    }
    getData(lot, callback) {
        callback = callback || (() => {})
        Get(`/api${this.url}`, { lot }).then(res => res.json())
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
        target && Put(`/api${this.url}/${key}`, target).then(res => {
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
        if (target) {
            let oldTarget = this.cacheData.filter(item => key === item._id)[0]
            let oldKeys = Object.keys(oldTarget)
            let keys = Object.keys(target)
            let diff = {}
            if (oldKeys.length < keys.length)
                for (let key of keys)
                    oldKeys.indexOf(key) === -1 && (diff[key] = '')
            Object.assign(target, diff, oldTarget)
            delete target.editable
            this.setState({ data: newData })
        }
    }
    move() {
        let to = this.path === 'do' ? 'did' : 'do'
        Put(`/api${this.url}`, { ids: this.state.selectedRows, to })
            .then(res => {
                if (res.statusText === 'OK')           
                    this.deleteSelected()
                else
                    message.error('删除失败，服务器出错了')
            })
    }
    delete() {
        Delete(`/api${this.url}`, { ids: this.state.selectedRows }).then(res => {
            if (res.statusText === 'OK')           
                this.deleteSelected()
            else
                message.error('删除失败，服务器出错了')
        })
    }
    download() {
        Get(`/api${this.url}/csv`, { lot: this.selectedLot })
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
        let { selectedRows, lots } = this.state
        let rowSelection = {
            selectedRowKeys: selectedRows,
            onChange: keys=>this.setState({selectedRows:keys}),
        }
        let uploadProps = {
            name: 'csv',
            accept: 'text/csv',
            action: `/api/${this.url}/csv`,
            showUploadList: false,
            onChange: info=>{
                if (info.file.status === 'done')
                    this.getData('all', () => { this.updateLots() })
                else if (info.file.status === 'error')
                    message.error(`${info.file.name} 上传失败`)
            }
        }
        let buttonDisable = selectedRows.length === 0
        let lotMenu = <Menu
            selectable
            onSelect={({key})=>this.getData(key,()=>{this.selectedLot=key})}>
            <Menu.Item key='all'>全部批次</Menu.Item>
            { lots.map(val => (<Menu.Item key={val}>{val}</Menu.Item>)) }
        </Menu>
        return <div><Row type="flex" justify="space-between">
                <Col>
                {
                    this.path === 'did'
                    ? null
                    : <Button
                        style={{marginRight:'10px'}}
                        disabled={buttonDisable}
                        onClick={()=>this.move()}>
                        {
                            this.path === 'do'
                            ? '移动至失效单位'
                            : '移动至现有支撑单位'
                        }
                    </Button>
                }
                    <Button
                        type="danger"
                        disabled={buttonDisable}
                        onClick={()=>this.delete()}>
                        删除
                    </Button>
                </Col>
                <Col>
                    <Upload {...uploadProps}>
                        <Button icon="upload">上传 csv 文件到这张表</Button>
                    </Upload>
                    {
                        this.path === 'todo'
                        ? null
                        : <Dropdown overlay={lotMenu} >
                            <Button style={{marginLeft:'10px'}}>
                                选择批次 <Icon type="down" />
                            </Button>
                        </Dropdown>
                    }
                    <Button type="primary" icon="download"
                        style={{marginLeft:'10px'}}
                        onClick={()=>this.download()}>
                        导出当前表为 csv 文件
                    </Button>
                </Col>
            </Row>
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