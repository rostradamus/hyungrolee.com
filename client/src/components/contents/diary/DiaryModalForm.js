import React, { Component } from "react";
import { Modal } from "semantic-ui-react";

class DiaryModalForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, onClose } = this.props;
    return (
      <Modal className="diary-modal-form" closeIcon onClose={ onClose } open={ isOpen }>
        Hello
      </Modal>
    );
  }
}

export default DiaryModalForm;
