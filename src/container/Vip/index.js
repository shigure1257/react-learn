import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router-dom";

import "./style.css"

class Vip extends Component {
    constructor (props) {
        super(props);
        this.state = {
            login:true,
            fetchfinsh: false
        }
    }
    render () {
        if (this.state.login) {
            if (this.state.fetchfinsh) {
                return (
                    <div className="vip">Vip</div>
                )
            } else {
                return <div className="vip">正在检查登录状态</div>
            }
        } else {
            return <Redirect to="/" />
        }
    }
    componentDidMount () {
        axios.get("http://www.dell-lee.com/react/api/isLogin.json",{
            withCredentials:true
        }).then(res=>{
            const login = res.data.data.login;
            this.setState({
                login,
                fetchfinsh:true
            })
        })
    }
}

export default Vip;