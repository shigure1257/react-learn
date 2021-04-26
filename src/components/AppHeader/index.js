import { Menu } from 'antd';
import React ,{ Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "../../image/logo.png";
import "./style.css";

class AppHeader extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: []
        };
    }
    getmenuitems () {
        return this.state.list.map(item => {
                return (
                    <Menu.Item key={item.id}>
                        <Link to={`/${item.id}`}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            })
    }
    componentDidMount () {
        axios.get('http://www.dell-lee.com/react/api/header.json').then(res => {
            this.setState({
                list: res.data.data
            })
        })

    }
    render () {
        return (
            <Fragment>
                <Link to="/">
                    <img src={logo} className='app-header-logo' alt='logo'/>
                </Link>
                <Menu mode="horizontal" className="app-header-menu">
                    {this.getmenuitems()}
                </Menu>
            </Fragment>
        )
    }
}
export default AppHeader;