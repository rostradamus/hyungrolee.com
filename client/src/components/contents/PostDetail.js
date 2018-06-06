import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Header, Container, Divider } from 'semantic-ui-react';
import './PostDetail.less';

class PostDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this._getPostWithID(this.props.match.params.postId)
      .then(res => this.setState({ post: res.data[0], isLoading: false }));
  }

  async _getPostWithID(id) {
    const res = await axios.get('/api/post/' + id);
    return res;
  }

  renderContent(post) {
    if(!post) return null;
    const time = new Date(post.time).toLocaleString(navigator.language);
    return (
      <div>
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
