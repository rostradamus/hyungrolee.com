import React, { Component } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import DefaultTextEditor from "Shared/components/DefaultTextEditor";

const initialState = {
  textValue: [
    {
      type: "paragraph",
      children: [
        { text: "" }
      ]
    }
  ]
};

class DiaryModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  setTextValue(value) {
    this.setState({textValue: value});
  }

  onClose() {
    this.setState(initialState);
    this.props.onClose();
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Modal closeIcon className="diary-modal-form"
        onClose={ this.onClose.bind(this) } open={isOpen}>
        <Modal.Header>
          New Diary
        </Modal.Header>
        <Modal.Content>
          <Form className="diary-form-content">
            <Form.Field>
              <input placeholder='Title' />
            </Form.Field>
            <DefaultTextEditor
              value={ this.state.textValue }
              onChange={ this.setTextValue.bind(this) }/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DiaryModalForm;
