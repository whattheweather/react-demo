import React, { Component } from 'react'
import { BrowserRouter as Router,Route, Link, Redirect } from 'react-router-dom'
import './App.css'
import CompanyDetail from './CompanyDetail.js'
import CompanyBrief from './CompanyBrief.js'
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

export default class App extends Component {
  componentWillMount() {
    let href = window.location.pathname
    if (href.indexOf('/did') > -1)
      this.default = ['did']
    else if (href.indexOf('/todo') > -1)
      this.default = ['todo']
    else
      this.default = ['do']
  }
  render() {
    return <Router><Layout className="layout">
      <Header>
        <h1 style={{
          float: 'left',
          color: '#fff',
          paddingRight: '30px',
          lineHeight: '59px',
        }}>CNNVD 支撑单位管理系统</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={this.default}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="do">
            <Link to='/do' className="nav-text">现有支撑单位</Link>
          </Menu.Item>
          <Menu.Item key="todo">
            <Link to='/todo' className="nav-text">待申请单位</Link>
          </Menu.Item>
          <Menu.Item key="did">
            <Link to='/did' className="nav-text">失效单位</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Route path='/' exact render={()=><Redirect to='/do'/>}/>
          <Route path='/do' exact component={CompanyBrief}/>
          <Route path='/todo' exact component={CompanyBrief}/>
          <Route path='/did' exact component={CompanyBrief}/>
          <Route path='/:path/:id/detail' exact component={CompanyDetail}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        China National Vulnerability Database of Information Security
      </Footer>
    </Layout></Router>
  }
}

