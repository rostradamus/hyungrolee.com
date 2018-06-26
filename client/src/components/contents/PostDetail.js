import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Header, Container, Divider, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './PostDetail.less';

class PostDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bIsAuthor: false
    };
  }

  componentDidMount() {
    this._getPostWithID(this.props.match.params.postId)
      .then(res => this.setState({
        post: res.data,
        isLoading: false,
        bIsAuthor: res.data.bIsAuthor
      }));
  }

  async _getPostWithID(id) {
    const res = await axios.get('/api/post/' + id);
    return res;
  }

  async _deletePost(id) {
    let res;
    try {
      res = await axios.delete("/api/post/delete", {
        params: { id }
      });
      if (res.status === 200) {
        window.location = "/post/list/";
      }
    } catch (err) {
      alert(err);
    }
  }

  renderContent(post) {
    if(!post) return null;
    const time = new Date(post.time).toLocaleString(navigator.language);
    return (
      <div>
        <Button
            as={ Link } 
            to={ `/post/edit/${post._id}` }
            disabled={ !this.state.bIsAuthor }
            animated='vertical'>
            <Button.Content hidden>Edit</Button.Content>
            <Button.Content visible>
              <Icon name='edit' />
            </Button.Content>
        </Button>
        <Button
          disabled={ !this.state.bIsAuthor }
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
      </div>
    );
  }

  render() {
    const post = this.state.post;
    return (
      <Segment className="postDetailSegment" loading={ this.state.isLoading }>
        { this.renderContent(post) }
      </Segment>
    );
  }
}

export default PostDetail;
