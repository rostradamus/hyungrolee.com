import React, { Component } from 'react';
import axios from 'axios';
import { Dimmer, Loader } from 'semantic-ui-react';

class PostDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    this._getPostWithID(this.props.match.params.postId)
    .then(res => this.setState({ post: res.data[0] }));
  }

  async _getPostWithID(id) {
    const res = await axios.get('/api/post/' + id);
    return res;
  }

  render() {
    const post = this.state.post;
    if (!post) 
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    return (
      <div>
        { post._id }
        { post.title }
        { post.content }
        { post.time }
        { post.author }
      </div>
    );
  }
}

export default PostDetail;
