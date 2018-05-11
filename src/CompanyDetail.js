import React, { Component } from 'react'
import { Get } from './Service.js'
import { Row, Col, Upload, Button, message, List } from 'antd'
import echarts from 'echarts'

export default class CompanyDetail extends Component {
    constructor(props) {
        super(props)
        this.items = ['应急响应支撑', '未公开漏洞支撑', '安全报告支撑',
            '厂商漏洞修复与销控情况', 'CNNVD数据使用', '沟通配合情况', '会议活动支撑',
            '宣传推广支撑', '产品试用', '技术交流支撑']
        this.fullDetail = {}
        this.state = { 
            name: '',
            detail: {},
            showMore: {},
        }
    }
    componentDidMount() {
        Get(`/api${this.props.match.url}`).then(res => res.json())
            .then(res => {
                this.sliceDetail(res.detail)
                this.setState({ name: res.name })
            })
    }
    componentDidUpdate() {
        let data = []
        for (let item of this.items)
            this.state.detail[item]
                // && this.state.detail[item].length
                && data.push({
                    name: item,
                    value: this.state.detail[item].length
                })
        echarts.init(document.getElementById('main')).setOption({
            series: {
                type: 'pie',
                data: data,
            },
            tooltip : {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
        })
    }
    sliceDetail(data) {
        this.fullDetail = data
        let tmpDetail = {}
        let showMore = {}
        for (let [key, value] of Object.entries(data))
            if (value.length > 10) {
                tmpDetail[key] = value.slice(0, 10)
                showMore[key] = true
            }
        let detail = {...this.fullDetail, ...tmpDetail}
        this.setState({
            detail,
            showMore,
        })
    }
    upload(info) {
        if (info.file.status === 'done')
            this.sliceDetail(info.file.response)
        else if (info.file.status === 'error')
            message.error(`${info.file.name} 上传失败`)
    }
    showAll(type) {
        let detail = {...this.state.detail, ...{ [type]: this.fullDetail[type] }}
        let showMore = {...this.state.showMore, ...{ [type]: false }}
        this.setState({
            detail,
            showMore,
        })
    }
    render() {
        const uploadProps = {
            name: 'detail',
            accept: 'text/csv',
            action: `/api${this.props.match.url}`,
            showUploadList: false,
        }
        let display = []
        const { name, detail, showMore } = this.state
        let count = 0
        for (let type of this.items) {
            let idx = 1
            display.push(<div key={count++}>
                <h3 style={{margin:'16px 0'}}>{type}</h3>
                <List
                    bordered
                    dataSource={detail[type]}
                    renderItem={item=>(<List.Item>
                        <i>{idx++}</i>&nbsp;&nbsp;{item}
                    </List.Item>)}
                >
                {
                    showMore[type]
                    ? <List.Item>
                        <div style={{textAlign:'center',height:32,lineHeight: '32px'}}>
                            <Button onClick={()=>this.showAll(type)}>
                                显示全部
                            </Button>
                        </div>
                    </List.Item>
                    : null
                }
                </List>
            </div>)
        }
        return <div>
            <Row>
                <Col offset={1}>
                    <h1 style={{
                        display:'inline',
                        marginRight: '16px',
                        position: 'relative',
                        top: '4px',
                    }}>{name}</h1>
                    <Upload {...uploadProps} onChange={info=>this.upload(info)}>
                        <Button icon="upload">导入 xlsx 文件</Button>
                    </Upload>
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={1}>
                    {display}
                    <h3 style={{margin: '16px 0'}}>PIE</h3>
                    <div id="main" style={{
                        width: '700px',
                        height:'400px',
                    }}></div>
                </Col>
            </Row>
        </div>
    }
}