import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import Companies from './Companies.js';
import CompanyDetail from './CompanyDetail.js';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'do',
      editModal: false,
      moveModal: false,
    }
    this.editData = [];
    this.moveData = {};
  }
  handleSelect({item,key,selectedKeys}) {
    this.setState({ selected: selectedKeys[0] });
  }
  handleEdit(event, tableHeader) {
    let data = [];
    let trParent = event.target.parentNode.parentNode;
    for (let i = 0; i < trParent.cells.length - 1; i ++)
      data[i] = trParent.cells[i].innerHTML;
    this.editData = data;
    this.setState({ editModal: true, });
  }
  handleMove(event) {
    this.setState({ moveModal: true, })
  }
  closeModal() {
    this.setState({
      editModal: false,
      moveModal: false,
    })
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
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="do">
            <Link to='/supportcompanies/do' className="nav-text">现有支撑单位</Link>
          </Menu.Item>
          <Menu.Item key="todo">
            <Link to='/supportcompanies/todo' className="nav-text">待申请单位</Link>
          </Menu.Item>
          <Menu.Item key="did">
            <Link to='/supportcompanies/did' className="nav-text">失效单位</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Route exact path='/' render={()=><Redirect to='/supportcompanies/do'/>}/>
          <Route exact path='/supportcompanies' render={()=><Redirect to='/supportcompanies/do'/>}/>
          <Route path='/supportcompanies/do' exact component={Companies}/>
          <Route path='/supportcompanies/todo' exact component={Companies}/>
          <Route path='/supportcompanies/did' exact component={Companies}/>
          <Route path='/supportcompanies/:path/:id' component={CompanyDetail}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        China National Vulnerability Database of Information Security
      </Footer>
    </Layout></Router>
  }
}

