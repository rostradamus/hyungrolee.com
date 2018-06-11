import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { postActions } from 'Actions';
import axios from 'axios';
import './PostForm.less';

class PostForm extends Component {

  constructor(props) {
    super(props);
    const bIsEditMode = props.match.params.postId ? true : false;
    if (bIsEditMode) {
      this._getFormContent(props.match.params.postId);
    }
    this.state = {
      title: "",
      author: props.user,
      content: "",
      attachment: "",
      isLoading: bIsEditMode
    };
  }

  _submitHandler() {
    const data = this.state;
    this.props.submitPost(data);
  }

  _onChangeInputHandler(e) {
    const key = e.target.name;
    this.setState({
      [key]: e.target.value
    });
  }

  async _getFormContent(sPostId) {
    const { data } = await axios.get('/api/post/' + sPostId);
    console.log(data);
    this.setState(Object.assign({...data}, {isLoading: false}));
  }

  render() {
    return (
      <Form className="postForm" onSubmit={ this._submitHandler.bind(this) } loading= { this.state.isLoading }>
      <Form.Field>
        <label>Title</label>
        <input 
          name='title' 
          placeholder='Title'
          value={ this.state.title }
          onChange = { this._onChangeInputHandler.bind(this) } />
      </Form.Field>
      <Form.Field>
        <label>Contents</label>
        <TextArea 
          className='contentTextArea'
          name='content' 
          placeholder='Please enter your input' 
          value={ this.state.content }
          onChange = { this._onChangeInputHandler.bind(this) } />
      </Form.Field>
      <Button type='submit'>Submit</Button>
      </Form>
      );
  }
}

const mapStateToProps = state => ({
  user: state.auth.username
});

export default connect(mapStateToProps, postActions)(PostForm);