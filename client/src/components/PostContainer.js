import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postActions } from '../actions';
import PostComponent from './PostComponent';
import { Card } from 'semantic-ui-react';

class PostContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getPosts();
    }

    render() {
        const posts = this.props.posts.map(post => {
            return (
                <Card key={ post._id }>
                    { post.content }
                </Card>
            );
        });

        return (
            <div>{ posts }</div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps, postActions)(PostContainer);
