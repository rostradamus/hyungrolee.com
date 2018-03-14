import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postActions } from '../actions';
import PostCard from './PostCard';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PostList extends Component {

    componentWillMount() {
        this.props.getPosts();
    }

    render() {
        const posts = this.props.posts.map(post => <PostCard key={post._id} post={post} />);
        return (
            <div>
                <Link to='/post/form'>
                    <Button primary>
                        + Create
                    </Button>
                </Link>
                { posts }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps, postActions)(PostList);