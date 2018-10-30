import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment } from "semantic-ui-react";
import TimeUtils from "Utils/TimeUtils";

class CommentItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { author, content, created_at } = this.props.comment;
		// <Comment.Avatar src= { tempSrc } />
		return (
			<Comment>
				<Comment.Content>
					<Comment.Author as='a' content={ author.userName }/>
					<Comment.Metadata content={ TimeUtils.makeTimeToLocalString(created_at)} />
					<Comment.Text content={ content } />
					<Comment.Actions>
						<Comment.Action>Reply</Comment.Action>
					</Comment.Actions>
				</Comment.Content>
			</Comment>
		);
	}
}

const mapStateToProps = state => ({
	comments: state.comments
});

export default connect(mapStateToProps)(CommentItem);