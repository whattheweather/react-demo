import React, { Component } from 'react'
import { Upload, Button, Icon, Menu, Dropdown, message, Row, Col } from 'antd'
export default class HeaderOperations extends Component {
    constructor(props) {
        super(props)
        this.lot = ''
    }
    handleSelect({ key }) {
        this.lot = key
        this.props.onFilter(key)
    }
    render() {
        const props = {
            name: 'csv',
            accept: 'text/csv',
            action: this.props.url + '/csv',
            showUploadList: false,
            onChange(info) {
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
        const menu = <Menu
            selectable
            onSelect={({key})=>this.handleSelect({key})}>
            <Menu.Item key='all'>全部批次</Menu.Item>
            { this.props.lots.map(val => (<Menu.Item key={val}>{val}</Menu.Item>)) }
        </Menu>
        return <Row>
            <Col span={3} offset={1}>
                <Upload {...props} >
                    <Button icon="upload">上传到这张表</Button>
                </Upload>
            </Col>
            <Col span={5} offset={15}>
                <Dropdown overlay={menu} >
                    <Button style={{ marginRight: '10px' }}>
                        选择批次 <Icon type="down" />
                    </Button>
                </Dropdown>
                <Button type="primary" icon="download" onClick={()=>this.props.onExport(this.lot)}>导出这张表</Button>
            </Col>
        </Row>
    }
}    