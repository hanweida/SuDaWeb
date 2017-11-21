import React from 'react';
import ReactDom from 'react-dom';
import Component1 from './components/Components1.jsx';
import Component2 from './components/Components2.jsx'
import Component3 from './components/Components3.jsx'
import {BrowserRouter, Route,HashRouter,Link} from 'react-router-dom'

export default class SliderComponent extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        return(

            <div className="wapper">
                <div className="main">
                    <div className="leftMenu">
                        <Link to="/index">index</Link>
                        <Link to="/table">tab</Link>
                        <Link to="/form">form</Link>
                    </div>
                </div>
                <div className="rightContent">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const Home = () => (
    <div>
        <h2>首页</h2>
    </div>
)

const About = () => (
    <div>
        <h2>关于</h2>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>主题列表</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    使用 React 渲染
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    组件
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    属性 v. 状态
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
      <h3>请选择一个主题。</h3>
    )}/>
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

ReactDom.render((
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/about">关于</Link></li>
                    <li><Link to="/topics">主题列表</Link></li>
                </ul>

                <hr/>

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
            </div>
        </BrowserRouter>),
    document.getElementById("content")
);