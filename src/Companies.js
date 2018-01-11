import React, { Component } from 'react'
import HeaderOperations from './HeaderOperations'
import { Get, Put, Delete } from './Service.js'
import DataTable from './DataTable.js'
import Download from 'downloadjs'
export default class Companies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      cacheData: [],
    }
    this.lots = []
    this.url = this.props.match.url
  }
  componentDidMount() {
    Get(this.url).then(res => res.json()).then(res => {
      let hash = {}
      res.forEach(element => {
        let lot = element['lot']
        if (!hash[lot]) {
          this.lots.push(lot)
          hash[lot] = true
        }
      })
      this.setState({
        data: res,
        cacheData: res.map(item => ({ ...item }))
      })
    })
  }
  handleExport(lot) {
    Get(this.url + '/csv', { lot: lot })
      .then(res => res.blob()).then(blob => {
        let name
        let tmp = this.url.split('/')
        let path = tmp[tmp.length - 1]
        switch (path) {
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
  handleFilter(key) {
    Get(this.url, { lot: key }).then(res => res.json()).then(res => {
      this.setState({ data: res })
    })
  }
  handleRefresh(...data) {
    if (data.length === 1) {
      this.setState({ data: data[0] })
    } else if (arguments.length === 2) {
      this.setState({
        data: data[0],
        cacheData: data[1],
      })
    }
  }
  handleSave(target) {
    return Put(this.url, target)
  }
  handleDelete(id) {
    return Delete(this.url + '/' + id)
  }
  render() {
    return <div>
      <HeaderOperations
        url={this.url}
        lots={this.lots}
        onExport={lot=>this.handleExport(lot)}
        onFilter={e=>this.handleFilter(e)} />
      <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
        <DataTable
          data={this.state.data}
          cacheData={this.state.cacheData}
          lots={this.lots}
          url={this.url}
          onRefresh={(...data)=>this.handleRefresh(...data)}
          onSave={(target,id)=>this.handleSave(target,id)}
          onDelete={id=>this.handleDelete(id)}
        />
      </div>
    </div>
  }
}