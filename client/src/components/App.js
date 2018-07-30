import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Auth, PostList, PostForm, PostDetail, Register, PageNotFound } from './contents';
import { Header, SlideBar } from './frames';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import authActions from 'Actions/authActions';
import './App.less';

const LOGIN_PATH = "/login";
const REGISTER_PATH = "/register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideBarVisible: false
    };
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchUser();
    }
    else if (this._shouldRedirectToLogin()) {
      window.location = "/login";
    }
  }

  _sendToggleToSlideBar() {
    this.setState({
      slideBarVisible: !this.state.slideBarVisible
    });
  }

  render() {
    const segment = (this.props.user && this.props.user._id) ? this._renderRoutes() : this._renderAuthRoutes();
    return (
      <Router>
        <div className='App'>
          <Header toggleHandler={ this._sendToggleToSlideBar.bind(this) } />
          <SlideBar 
            pusher={ <Container className="appBody"> {segment} </Container> } 
            visible={ this.state.slideBarVisible } />
        </div>
      </Router>
      );
  }

  _renderRoutes() {
    return (
        <Switch>
          <Route key='post_list' path="/post/list" component={PostList} />
          <Route key='post_form' exact path="/post/new/" component={PostForm} />
          <Route key='post_edit' path="/post/edit/:postId" component={PostForm} />
          <Route key='post_detail' path="/post/detail/:postId" component={PostDetail} />
          <Route key="page_404" path="*" component= { PageNotFound } />
        </Switch>
      );
  }

  _renderAuthRoutes() {
    return (
        <Switch>
          <Route key="register" path={ REGISTER_PATH } component={ Register } />
          <Route key="login" path={ LOGIN_PATH } component={ Auth } />
          <Route key="page_404" path="*" component= { PageNotFound } />
        </Switch>
      );
  }

  _shouldRedirectToLogin() {
    const bIsAuthPage = window.location.pathname === LOGIN_PATH || window.location.pathname === REGISTER_PATH;
    return !this.props.user && !bIsAuthPage;
  }
}

const mapStateToProps = state => ({user: state.auth});

export default connect(mapStateToProps, authActions)(App);