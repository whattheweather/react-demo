import React, { Component } from 'react'
import { Get, Put, Delete } from './Service.js'
import { Card, Form, Input, Button, message, Upload, Popconfirm } from 'antd';
import Download from 'downloadjs'
const FormItem = Form.Item;

export default class CompanyDetail extends Component {
    constructor(props) {
        super(props)
        this.state = { detail: {} }
        this.data = { detail: {} }
    }
    componentDidMount() {
        Get(this.props.match.url).then(res => res.json()).then(res => {
            let detail = res.detail ? res.detail : {}
            let report = res.report ? res.report : {}
            let emergency = res.emergency ? res.emergency : {}
            let other = res.other ? res.other : {}
            this.setState({
                detail: detail,
                name: res.name,
                report: report.filename,
                emergency: emergency.filename,
                other: other.filename,
            })
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        Put(this.props.match.url, { detail: this.state.detail })
            .then(res => {
                if (res.status === 200) { message.success('保存成功') }
                else { message.error('保存失败') }
            })
    }
    handleChange(e) {
        let newObj = this.state.detail
        newObj[e.target.id] = e.target.value
        this.setState({ detail: newObj })
    }
    handleUpload(info, type) {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`)
            let obj = this.state
            obj[type] = info.file.name
            this.setState(obj)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`)
        }
    }
    handleDownload(type) {
        Get(this.props.match.url + '/detail/pdf/' + type)
            .then(res => res.blob()).then(blob => {
                console.log(this.state)
                let name = this.state[type]
                console.log(this.state[type])
                Download(blob, name)
            })
    }
    handleDelete(type) {
        Delete(this.props.match.url + '/detail/pdf/' + type)
            .then(res => {
                if (res.status !== 200) {
                    message.error('删除失败')
                    return
                }
                message.success('删除成功')
                let newObj = this.state
                newObj[type] = ''
                this.setState(newObj)
            })
    }
    render() {
        const props = {
            // accept: 'application/pdf',
            showUploadList: false,
            onChange(info) {
                console.log(info.file.status)
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    // message.success(`${info.file.name} 上传成功`)
                    window.location.reload();
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败`)
                }
            },
        }
        return <Card title={this.state.name+" 贡献详情"}>
            <Form onSubmit={e=>this.handleSubmit(e)}>
                <FormItem label="未公开漏洞提交">
                    <Input id="undisclosed" onChange={e=>this.handleChange(e)} value={this.state.detail.undisclosed}/>
                </FormItem>
                <FormItem label="CNNVD 数据使用">
                    <Input id="ussage" onChange={e=>this.handleChange(e)} value={this.state.detail.ussage}/>
                </FormItem>
                <FormItem label="漏洞修复和消控工作协助">
                    <Input id="assistant" onChange={e=>this.handleChange(e)} value={this.state.detail.assistant}/>
                </FormItem>
                <FormItem label="沟通配合">
                    <Input id="communication" onChange={e=>this.handleChange(e)} value={this.state.detail.communication}/>
                </FormItem>
                <FormItem label="会议活动支撑">
                    <Input id="meeting" onChange={e=>this.handleChange(e)} value={this.state.detail.meeting}/>
                </FormItem>
                <FormItem label="宣传推广支撑">
                    <Input id="publicity" onChange={e=>this.handleChange(e)} value={this.state.detail.publicity}/>
                </FormItem>
                <FormItem label="产品试用支撑">
                    <Input id="trial" onChange={e=>this.handleChange(e)} value={this.state.detail.trial}/>
                </FormItem>
                <FormItem label="重大漏洞/安全事件应急响应">
                    <a onClick={()=>this.handleDownload('emergency')}>{this.state.emergency}</a>
                    {(()=>{
                        if(this.state.emergency)
                            return <Popconfirm title="确认删除吗？" onConfirm={() => this.handleDelete('emergency')}>
                                &nbsp;&nbsp;<a>删除</a>&nbsp;&nbsp;
                            </Popconfirm> 
                    })()}
                    <Upload name="emergency" onChange={info=>this.handleUpload(info,'emergency')}
                        action={this.props.match.url+'/detail/pdf/emergency'} showUploadList={false}>
                        <Button icon="upload">上传附件</Button>
                    </Upload>
                </FormItem>
                <FormItem label="安全报告提交">
                    <a onClick={()=>this.handleDownload('report')}>{this.state.report}</a>
                    {(()=>{
                        if(this.state.report)
                            return <Popconfirm title="确认删除吗？" onConfirm={() => this.handleDelete('report')}>
                                &nbsp;&nbsp;<a>删除</a>&nbsp;&nbsp;
                            </Popconfirm> 
                    })()}
                    <Upload name="report" onChange={info=>this.handleUpload(info,'report')}
                        action={this.props.match.url+'/detail/pdf/report'} showUploadList={false}>
                        <Button icon="upload">上传附件</Button>
                    </Upload>
                </FormItem>
                <FormItem label="其他支撑">
                    <a onClick={()=>this.handleDownload('other')}>{this.state.other}</a>
                    {(()=>{
                        if(this.state.other)
                            return <Popconfirm title="确认删除吗？" onConfirm={() => this.handleDelete('other')}>
                                &nbsp;&nbsp;<a>删除</a>&nbsp;&nbsp;
                            </Popconfirm> 
                    })()}
                    <Upload name="other" onChange={info=>this.handleUpload(info,'other')}
                        action={this.props.match.url+'/detail/pdf/other'} showUploadList={false}>
                        <Button icon="upload">上传附件</Button>
                    </Upload>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        </Card>
    }
}