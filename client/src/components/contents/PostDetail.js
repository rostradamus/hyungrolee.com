import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Container, Divider, Button, Icon, Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './PostDetail.less';
import CommentForm from "./comment/CommentForm";
import CommentItem from "./comment/CommentItem";
import { PostActions, CommentActions } from 'Actions';
import TimeUtils from "Utils/TimeUtils";

class PostDetail extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const postId = this.props.match.params.postId,
      isSelectedSamePostId = this.props.posts.selected._id
        && this.props.posts.selected._id === postId;
    if (isSelectedSamePostId || this.props.posts.isFetching)
      return;
    Promise.all([this.props.selectPost(postId), this.props.getComments(postId)]);
  }

  async _deletePost(postId) {
    await this.props.deletePost(postId, this.props.history);
  }

  _renderComments() {
    return this.props.comments.items.map(comment => 
      <CommentItem key={comment._id} comment={comment} />);
  }

  renderContent(post) {
    return (
      <div>
        <Button
            as={ Link } 
            to={ `/post/edit/${post._id}` }
            disabled={ !post.bIsAuthor }
            animated='vertical'>
            <Button.Content hidden>Edit</Button.Content>
            <Button.Content visible>
              <Icon name='edit' />
            </Button.Content>
        </Button>
        <Button
          disabled={ !post.bIsAuthor }
          onClick = { this._deletePost.bind(this, post._id) }
          animated='vertical'>
          <Button.Content hidden>Delete</Button.Content>
          <Button.Content visible>
            <Icon name='trash' />
          </Button.Content>
        </Button>
        <Header content={ post.title }/>
        <Header.Subheader content={ TimeUtils.makeTimeToLocalString(post.time) } />
        <Header.Subheader content={ "by " + post.author } />
        <Divider />
        <Container text className="postDetailContent" content={ post.content } />
        <Divider />
        <CommentForm />
        <Comment.Group> { this._renderComments() } </Comment.Group>
      </div>
    );
  }

  render() {
    return (
      <Segment className="postDetailSegment" loading={ this.props.posts.isFetching }>
        { this.renderContent(this.props.posts.selected) }
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  selectPost: async postId => {
    dispatch(PostActions.selectPost(postId));
  },
  deletePost: async (postId, history) => {
    await dispatch(PostActions.deletePost(postId, history));
  },
  getComments: async postId => {
    dispatch(CommentActions.getComments(postId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);