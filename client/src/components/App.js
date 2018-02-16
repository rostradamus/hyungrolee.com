import React, { Component } from 'react';
import PostContainer from './PostContainer';
import { connect } from 'react-redux';
import Auth from './Auth';
import AuthExample from './AuthExample';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import './App.css';

class App extends Component {

	renderHome() {
		return (
			<div>
				<PostContainer />
			</div>
		)
	}

	renderNeedAuth() {
		return (
			<div>
				<AuthExample />
				<Auth />
			</div>
		)
	}

	render() {
		return this.props.user ? this.renderHome() : this.renderNeedAuth();	
	}
}

const mapStateToProps = state => ({user: state.auth})

export default connect(mapStateToProps)(App);
