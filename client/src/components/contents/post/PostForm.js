import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, TextArea } from "semantic-ui-react";
import { PostActions } from "Actions";
import { Editor } from "slate-react";
import { Value } from "slate";
import "./PostForm.less";

class PostForm extends Component {

  constructor(props) {
    super(props);
    if (props.match.params.postId) {
      this._getFormContent(props.match.params.postId);
    }
    const initialValue = Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'A line of text in a paragraph.',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    this.state = {
      title: "",
      author: props.user,
      content: "",
      attachment: "",
      value: initialValue
    };
  }

  _submitHandler() {
    const data = this.state,
      history = this.props.history,
      postId = this.props.match.params.postId;
    postId ? this.props.editPost(data, history) : this.props.createPost(data, history);
  }

  _onChangeInputHandler(e) {
    const key = e.target.name;
    this.setState({
      [key]: e.target.value
    });
  }

  _onKeyDown(e, change) {
    if (!e.ctrlKey) return;
    e.preventDefault();

    switch(e.key) {
      case "b": {
        change.addMark("bold");
        return true;
      }
    }
  }

  _renderMark(props) {
    switch(props.mark.type) {
      case "bold":
        return <strong>{ props.children }</strong>;
    }
  }

  async _getFormContent(postId) {
    await this.props.selectPost(postId);
    if (!this.props.posts.selected.bIsAuthor) {
      this.props.history.goBack();
      return;
    }
    this.setState(this.props.posts.selected);
  }

  render() {

    // TODO: DELETE <div>
    // Create our initial value...


    return (
      <div>
        <Editor
          value= { this.state.value }
          onChange = { ({ value }) => this.setState({ value }) }
          onKeyDown = { this._onKeyDown.bind(this) }
          renderMark = { this._renderMark.bind(this) }
          />
        <Form
          inverted
          className="post-form"
          onSubmit={ this._submitHandler.bind(this) }
          loading= { this.props.posts.isFetching }>
        <Form.Field className="post-form-field-title">
          <label className="field-label">Title</label>
          <input
            name="title"
            placeholder="Title"
            value={ this.state.title }
            onChange = { this._onChangeInputHandler.bind(this) } />
        </Form.Field>
        <Form.Field className="post-form-field-content">
          <label className="field-label">Contents</label>
          <TextArea
            className="content-text-area"
            name="content"
            placeholder="Please enter your input"
            value={ this.state.content }
            onChange = { this._onChangeInputHandler.bind(this) } />
        </Form.Field>
        <Button type="submit">Submit</Button>
        </Form>
      </div>
      );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  user: state.auth.userName
});
const mapDispatchToProps = dispatch => ({
  editPost: (data, history) => {
    dispatch(PostActions.editPost(data, history));
  },
  createPost: (data, history) => {
    dispatch(PostActions.createPost(data, history));
  },
  selectPost: async postId => {
    await dispatch(PostActions.selectPost(postId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
