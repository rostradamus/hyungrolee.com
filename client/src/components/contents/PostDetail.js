import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Container, Divider, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './PostDetail.less';
import CommentForm from "./comment/CommentForm";
import { PostActions } from 'Actions';

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
    this.props.selectPost(postId);
  }

  async _deletePost(postId) {
    await this.props.deletePost(postId, this.props.history);
  }

  renderContent(post) {
    const time = new Date(post.time).toLocaleString(navigator.language);
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
        <Header.Subheader content={ time } />
        <Header.Subheader content={ "by " + post.author } />
        <Divider />
        <Container text className="postDetailContent" content={ post.content } />
        <CommentForm />
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
  comment: state.comment
});

const mapDispatchToProps = dispatch => ({
  selectPost: async postId => {
    await dispatch(PostActions.selectPost(postId));
  },
  deletePost: async (postId, history) => {
    await dispatch(PostActions.deletePost(postId, history));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);