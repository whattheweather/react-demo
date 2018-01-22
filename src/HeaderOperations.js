import React, { Component } from 'react'
import { Upload, Button, Icon, Menu, Dropdown, message, Row, Col } from 'antd'
export default class HeaderOperations extends Component {
    constructor(props) {
        super(props)
        this.lot = ''
    }
    handleMove() {

    }
    changeUpload(info) {
        if (info.file.status === 'done') {
            // message.success(`${info.file.name} 上传成功`)
            window.location.reload();
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`)
        }
    }
    selectLot({ key }) {
        this.lot = key
        this.props.onFilter(key)
    }
    render() {
        const hasSelected = this.props.selectedRows.length > 0
        const props = {
            name: 'csv',
            accept: 'text/csv',
            action: this.props.url + '/csv',
            showUploadList: false,
        }
        const menu = <Menu
            selectable
            onSelect={({key})=>this.selectLot({key})}>
            <Menu.Item key='all'>全部批次</Menu.Item>
            { this.props.lots.map(val => (<Menu.Item key={val}>{val}</Menu.Item>)) }
        </Menu>
        return <Row type="flex" justify="space-between">
            <Col>
                <Button
                    type="danger"
                    disabled={!hasSelected}
                    onClick={()=>this.props.onBatchDelete()}
                >
                    删除
                </Button>
                <Button
                    style={{marginLeft:'10px'}}
                    type="danger"
                    disabled={!hasSelected}
                >
                    删除
                </Button>
            </Col>
            <Col>
                <Upload {...props} onChange={info=>this.changeUpload(info)}>
                    <Button icon="upload">上传 csv 文件到这张表</Button>
                </Upload>
                <Dropdown overlay={menu} >
                    <Button style={{marginLeft:'10px',marginRight:'10px'}}>
                        选择批次 <Icon type="down" />
                    </Button>
                </Dropdown>
                <Button type="primary" icon="download"
                    onClick={()=>this.props.onExport(this.lot)}>
                    导出当前表为 csv 文件
                </Button>
            </Col>
        </Row>
    }
}    