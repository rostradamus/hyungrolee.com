import React, { Component } from 'react';
import PostList from './PostList';
import { connect } from 'react-redux';
import Auth from './Auth';
import Header from './Header';
import PostForm from './PostForm';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import authActions from '../actions/authActions';
import './App.less';

class App extends Component {
    componentDidMount() {
        if (!this.props.user)
            this.props.fetchUser();
    }

    render() {
        return (
            <Router>
                { (this.props.user && this.props.user._id) ? this._renderHome() : this._renderNeedAuth() }
            </Router>
        );
    }

    _renderHome() {
        return (
            <div className='App'>
                <Header />
                <div className='Wrapper'>
                    <Route path="/post/list" component={PostList}/>
                    <Route path="/post/form" component={PostForm}/>
                </div>
            </div>
        );
    }

    _renderNeedAuth() {
        return (
            <div className='App'>
                <Header />
                <div className='Wrapper'>
                    <Auth />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({user: state.auth});

export default connect(mapStateToProps, authActions)(App);
