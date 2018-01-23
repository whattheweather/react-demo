import React, { Component } from 'react'
import { BrowserRouter as Router,Route, Link, Redirect } from 'react-router-dom'
import './App.css'
import CompanyDetail from './CompanyDetail.js'
import CompanyBrief from './CompanyBrief.js'
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

export default class App extends Component {
  constructor(props) {
    super(props)
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
          defaultSelectedKeys={['do']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="do">
            <Link to='/zcdw/do' className="nav-text">现有支撑单位</Link>
          </Menu.Item>
          <Menu.Item key="todo">
            <Link to='/zcdw/todo' className="nav-text">待申请单位</Link>
          </Menu.Item>
          <Menu.Item key="did">
            <Link to='/zcdw/did' className="nav-text">失效单位</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Route exact path='/' render={()=><Redirect to='/zcdw/do'/>}/>
          <Route exact path='/zcdw' render={()=><Redirect to='/zcdw/do'/>}/>
          <Route path='/zcdw/do' exact component={CompanyBrief}/>
          <Route path='/zcdw/todo' exact component={CompanyBrief}/>
          <Route path='/zcdw/did' exact component={CompanyBrief}/>
          <Route path='/zcdw/:path/:id/detail' exact component={CompanyDetail}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        China National Vulnerability Database of Information Security
      </Footer>
    </Layout></Router>
  }
}

