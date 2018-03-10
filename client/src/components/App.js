import React, { Component } from 'react';
import PostContainer from './PostContainer';
import { connect } from 'react-redux';
import Auth from './Auth';
import Header from './Header';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import authActions from '../actions/authActions';

class App extends Component {
    componentDidMount() {
        if (!this.props.user)
            this.props.fetch();
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
            <div>
                <Header />
                <PostContainer />
            </div>
        );
    }

    _renderNeedAuth() {
        return (
            <div>
                <Header />
                <Auth />
            </div>
        );
    }
}

const mapStateToProps = state => ({user: state.auth});

export default connect(mapStateToProps, authActions)(App);
