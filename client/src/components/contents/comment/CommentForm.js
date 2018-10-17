import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from "semantic-ui-react";

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ""
		};
	}

	_onSubmitComment() {
		// const content = this.state.content;

	}

	render() {
		return (
			<Form className="comment-form" onSubmit={ this._onSubmitComment.bind(this) } >
				<Form.Input 
					name="comment-content"
					placeholder="Leave a comment"
					value= { this.state.content }
					onChange = {(_, newValue) => this.setState({content:newValue.value})} />
				<Button type="submit" content="submit" size="tiny"/>
			</Form>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth
});

export default connect(mapStateToProps)(CommentForm);