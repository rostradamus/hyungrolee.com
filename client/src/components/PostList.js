import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postActions } from '../actions';
import PostCard from './PostCard';

class PostList extends Component {

    componentWillMount() {
        this.props.getPosts();
    }

    render() {
        const posts = this.props.posts.map(post => 
            <PostCard key={post._id} post={post} />
            );
        return posts;
    }
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps, postActions)(PostList);