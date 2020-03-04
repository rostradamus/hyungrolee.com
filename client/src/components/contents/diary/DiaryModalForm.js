import React, { Component } from "react";
import { Modal, Form } from "semantic-ui-react";

class DiaryModalForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, onClose } = this.props;
    return (
      <Modal closeIcon className="diary-modal-form"
        style={{ minHeight: 500 }}
        onClose={ onClose } open={ isOpen }>
        <Modal.Header>
          New Diary
        </Modal.Header>
        <Modal.Content>
          <Form className="diary-form-content">

          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default DiaryModalForm;
