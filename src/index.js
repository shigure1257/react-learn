import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppHeader from "./components/AppHeader/";
import PageList from "./container/List/";
import Detail from "./container/Detail/";
import Vip from './container/Vip';
import Login from "./components/login/"
import 'antd/dist/antd.css';
import "./style.css";

const { Header, Footer, Content } = Layout;
class App extends Component {
  render () {
    return(
      <BrowserRouter>
        <Layout style={{minWidth:1300,height:'100%'}}>
            <Header className="header">
              <AppHeader />
            </Header>
            <Content className="content">
              <Login />
              <Switch>
                <Route path='/vip' component={Vip} />
                <Route path='/Detail/:id' component={Detail} />
                <Route path='/:id?' component={PageList}/>
              </Switch>
            </Content>
            <Footer className="footer">copyright 2021 shigure</Footer>
      </Layout>
    </BrowserRouter>
    )
  }
}
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

