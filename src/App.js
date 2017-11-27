import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <Grid>
    <Row>
      <Col xs={4} md={3} style={{background:'red'}}>fas</Col>
      <Col xs={16} md={9} style={{background:'blue'}}>fdsa</Col>
    </Row>
  </Grid>
)

export default App;
