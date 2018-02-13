import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions';

class PostContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    	const posts = this.props.posts.map(post => {
    		return (
    			<div key={ post.title }>
    				{ post.content }
    			</div>
    		)
    	})

        return (
            <div>{ posts }</div>
        );
    };
}

const mapStateToProps = state => ({
	posts: state.posts
})

export default connect(mapStateToProps, getPosts)(PostContainer);
