import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, TextArea } from 'semantic-ui-react';
import { postActions } from 'Actions';

class PostForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: props.user,
      content: "",
      attachment: ""
    }
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


  render() {
    return (
      <Form onSubmit={ this._submitHandler.bind(this) }>
      <Form.Field>
        <label>Title</label>
        <input 
          name='title' 
          placeholder='Title' 
          onChange = { this._onChangeInputHandler.bind(this) } />
      </Form.Field>
      <Form.Field>
        <label>Contents</label>
        <TextArea 
          name='content' 
          placeholder='Please enter your input' 
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