import React, { Component } from 'react';
import PostContainer from './PostContainer';
import { connect } from 'react-redux';
import Auth from './Auth';
import Header from './Header';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import userActions from '../actions/userActions';
// import './App.css';

class App extends Component {
	componentWillMount() {
		this.props.fetch();
	}

	render() {
		console.log(this.props);
		return (
			<Router>
				{ this.props.user ? this._renderHome() : this._renderNeedAuth() }
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

export default connect(mapStateToProps, userActions)(App);
