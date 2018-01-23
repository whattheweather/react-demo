import React, { Component } from 'react'
import { Upload, Button, Icon, Menu, Dropdown, message, Row, Col } from 'antd'
export default class HeaderOperations extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let uploadProps = {
            name: 'csv',
            accept: 'text/csv',
            action: this.props.url + '/csv',
            showUploadList: false,
            onChange: info=>{
                if (info.file.status === 'done')
                    this.props.onUpload()
                else if (info.file.status === 'error')
                    message.error(`${info.file.name} 上传失败`)
            }
        }
        let buttonDisable = this.props.selectedRows.length === 0
        let lotMenu = <Menu
            selectable
            onSelect={({key})=>this.props.onSelect(key)}>
            <Menu.Item key='all'>全部批次</Menu.Item>
            { this.props.lots.map(val => (<Menu.Item key={val}>{val}</Menu.Item>)) }
        </Menu>
        return <Row type="flex" justify="space-between">
            <Col>
                {
                    this.props.path === 'did' ? null
                    : <Button
                        style={{marginRight:'10px'}}
                        disabled={buttonDisable}
                        onClick={()=>this.props.onMove()}>
                        {
                            this.props.path === 'do'
                            ? '移动至失效单位'
                            : '移动至现有支撑单位'
                        }
                    </Button>
                }
                <Button
                    type="danger"
                    disabled={buttonDisable}
                    onClick={()=>this.props.onDelete()}>
                    删除
                </Button>
            </Col>
            <Col>
                <Upload {...uploadProps}>
                    <Button icon="upload">上传 csv 文件到这张表</Button>
                </Upload>
                <Dropdown overlay={lotMenu} >
                    <Button style={{marginLeft:'10px',marginRight:'10px'}}>
                        选择批次 <Icon type="down" />
                    </Button>
                </Dropdown>
                <Button type="primary" icon="download"
                    onClick={()=>this.props.onDownload()}>
                    导出当前表为 csv 文件
                </Button>
            </Col>
        </Row>
    }
}    