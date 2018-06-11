import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postActions } from 'Actions';
import PostCard from './PostCard';
import { Button, Divider, Card, Menu, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PostList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const posts = this.props.posts.map(post => <PostCard key={post._id} post={post} />);
    return (
      <div>
        <Menu secondary>
          <Menu.Item>
            <Button
              size='tiny'
              inverted
              as={ Link } 
              to='/post/new'
              animated='vertical'>
              <Button.Content hidden>Create</Button.Content>
              <Button.Content visible>
                <Icon name='add' />
              </Button.Content>
          </Button>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        
        <Divider />
        <Card.Group itemsPerRow='4' >
          { posts }
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, postActions)(PostList);