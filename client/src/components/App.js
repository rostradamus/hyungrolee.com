import React, { Component } from 'react';
import PostList from './PostList';
import { connect } from 'react-redux';
import Auth from './Auth';
import { Header, SlideBar } from './frames';
import PostForm from './PostForm';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import authActions from '../actions/authActions';
import './App.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideBarVisible: false
    }
  }

  componentWillMount() {
    if (!this.props.user)
      this.props.fetchUser();
  }

  _sendToggleToSlideBar() {
    this.setState({
      slideBarVisible: !this.state.slideBarVisible
    });
  }

  render() {
    const segment = (this.props.user && this.props.user._id) ? this._renderHome() : this._renderNeedAuth();
    return (
      <Router>
        <div className='App'>
          <Header toggleHandler={ this._sendToggleToSlideBar.bind(this) } />
          <SlideBar pusher={ segment } visible={ this.state.slideBarVisible } />
        </div>
      </Router>
      );
  }

  _renderHome() {
    const routes = [
        <Route key='post_list' path="/post/list" component={PostList}/>,
        <Route key='post_form' path="/post/form" component={PostForm}/>
      ];
    return routes;
  }

  _renderNeedAuth() {
    return (
        <Auth />
      );
  }
}

const mapStateToProps = state => ({user: state.auth});

export default connect(mapStateToProps, authActions)(App);
