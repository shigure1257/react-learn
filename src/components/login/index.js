import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Modal, Button, Input, message } from 'antd';
import axios from "axios";

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            login: false,
            isModalVisible:false,
            username:'',
            password:''
        }
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.userChange = this.userChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.checklogin = this.checklogin.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    showModal () {
        this.setState ({
            isModalVisible:true
        })
    }
    handleCancel () {
        this.setState ({
            isModalVisible:false
        })
    }
    userChange(e) {
        this.setState({
            username:e.target.value
        })
    }
    passwordChange(e) {
        this.setState({
            password:e.target.value
        })
    }
    checklogin () {
        const {username, password} = this.state;
        axios.get(`http://www.dell-lee.com/react/api/login.json?user=${username}&password=${password}`,{
            withCredentials: true
        }).then(res=>{
            const check = res.data.data.login;
            if (check) {
                message.success('登录成功');
                this.setState({
                    login: true,
                    isModalVisible: false
                })
            } else {
                message.error("无该用户");
            }
        })
    }
    logOut () {
        axios.get("http://www.dell-lee.com/react/api/logout.json",{
            withCredentials: true
        }).then(res=>{
            const logout = res.data.data.logout;
            if (logout) {
                this.setState({
                    login:false
                })
                this.props.history.push("/");
            }
        })
    }
    render () {
        const {login,isModalVisible,username,password} = this.state;
        return (
            <div>
                {
                    login ?
                    <Button 
                        type="primary" 
                        style={{ marginBottom:20 }}
                        onClick={this.logOut}
                    >
                        退出
                    </Button> :
                    <Button 
                    type="primary" 
                    style={{ marginBottom:20 }}
                    onClick={this.showModal}
                    >
                        登录
                    </Button>
                }
                <Link to="/vip">
                    <Button 
                        type="primary" 
                        style={{ marginBottom:20,marginLeft:20 }}
                    >
                        Vip
                    </Button>
                </Link>
                <Modal title="Basic Modal" 
                    visible={isModalVisible} 
                    onOk={this.checklogin} 
                    onCancel={this.handleCancel}
                >
                    <Input 
                        placeholder="请输入用户名"
                        style={{marginBottom: 10}}
                        value={username}
                        onChange={this.userChange}
                    />
                    <Input.Password 
                        placeholder="input password"
                        value={password}
                        onChange={this.passwordChange}
                    />
                </Modal>
            </div>
        )
    }
    componentDidMount () {
        axios.get("http://www.dell-lee.com/react/api/isLogin.json",{
            withCredentials:true
        }).then(res=>{
            const login = res.data.data.login;
            this.setState ({
                login
            })
        })
    }
}

export default withRouter(Login);