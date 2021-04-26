import { Component } from "react";
import { Link } from "react-router-dom";
import { List } from 'antd';
import axios from 'axios';

class PageList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount () {
        const id = this.props.match.params.id;
        let url = 'http://www.dell-lee.com/react/api/list.json';
        if (id) {
            url += '?id=' +id;
        }
        axios.get(url).then(res => {
            this.setState({
                data:res.data.data
            });
        })
    }
    render () {
        return (
            <List
                style={{backgroundColor:'#ffffff'}}
                bordered
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item>
                        <Link to={`/detail/${item.id}`}>
                            {item.title}
                        </Link>
                    </List.Item>
                )}
            />
        )
    }
    componentWillReceiveProps (nextProps) {
        const id = nextProps.match.params.id;
        let url = 'http://www.dell-lee.com/react/api/list.json?id='+id;
        axios.get(url).then(res => {
            this.setState({
                data:res.data.data
            });
        })
    }
}
export default PageList;