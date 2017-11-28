import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'; 
import Companies from './Companies.js'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


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
    // return <Grid style={{margin:'40px 0',}}>
    //   <Modal show={this.state.editModal}>
    //     <Modal.Body>
    //       <Form inline>
    //         {(() => {
    //           return this.editData.map((value, index) =>
    //             <FormControl style={{margin:'10px 5px'}} key={index} type="text" defaultValue={value}/>)
    //         })()}
    //       </Form>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button bsStyle="success" onClick={()=>this.saveEdit()}>保存</Button>
    //       <Button onClick={()=>this.closeModal()}>取消</Button>
    //     </Modal.Footer>
    //   </Modal>
    //   <Modal show={this.state.moveModal}>
    //     <Modal.Body>
    //       <h4>将这条数据移动到</h4>
    //       <ButtonGroup>
    //           {(() => {
    //             if (this.state.selected !== 'do')
    //               return <Button value={'do'}>现有支撑单位</Button>
    //           })()}
    //           {(() => {
    //             if (this.state.selected !== 'will')
    //               return <Button value={'will'}>待申请单位</Button>
    //           })()}
    //           {(() => {
    //             if (this.state.selected !== 'did')
    //               return <Button value={'do'}>失效单位</Button>
    //           })()}
    //     </ButtonGroup>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button bsStyle="success" onClick={()=>this.saveMove()}>保存</Button>
    //       <Button onClick={()=>this.closeModal()}>取消</Button>
    //     </Modal.Footer>
    //   </Modal>
    //   <Row>
    //     <Col xs={2} md={2} lg={2}>
    //     <Nav
    //       bsStyle="pills"
    //       style={{textAlign: 'center'}}
    //       activeKey={this.state.selected}
    //       onSelect={(selectedKey) => this.handleSelect(selectedKey)}
    //     >
    //       <NavItem eventKey={'do'}>现有支撑单位</NavItem>
    //       <NavItem eventKey={'will'}>待申请单位</NavItem>
    //       <NavItem eventKey={'did'}>失效单位</NavItem>
    //     </Nav>
    //     </Col>
    //     <Col xs={10} md={10} lg={10}>
    //     <Content
    //       selected={this.state.selected}
    //       onEdit={(event,tableHeader)=>this.handleEdit(event,tableHeader)}
    //       onMove={event=>this.handleMove(event)}
    //     />
    //     </Col>
    //   </Row>
    // </Grid>
    return <Layout>
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['do']}
          onSelect={({item,key,selectedKeys})=>this.handleSelect({item,key,selectedKeys})}
        >
          <Menu.Item key="do">
            <span className="nav-text">现有支撑单位</span>
          </Menu.Item>
          <Menu.Item key="todo">
            <span className="nav-text">待申请单位</span>
          </Menu.Item>
          <Menu.Item key="did">
            <span className="nav-text">失效单位</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {/* <Companies style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            
          </Companies> */}
        </Content>
      </Layout>
    </Layout>
  }
}

