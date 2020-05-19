import React, { Component } from "react";
import { Modal, Form, Button, Icon } from "semantic-ui-react";
import DefaultTextEditor from "Shared/components/DefaultTextEditor";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addDiary } from "Actions/DiaryActions";
import { serializeTextValue } from "Utils/TextEditorUtils";

const initialState = {
  title: "",
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
    this.onClose = this.onClose.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  setTextValue(value) {
    this.setState({textValue: value});
  }

  onClose() {
    this.setState(initialState);
    this.props.onClose();
  }

  onSave() {
    const { selectedCalendarData } = this.props;
    const serializedTextValue = this.state.textValue.reduce((acc, curr) => acc + serializeTextValue(curr), "");

    this.props.addDiary({
      title: this.state.title,
      start: selectedCalendarData.start,
      end: selectedCalendarData.end,
      content: serializedTextValue,
      allDay: true
    });

    this.onClose();
  }

  render() {
    const { selectedCalendarData } = this.props;
    const isOpen = selectedCalendarData !== null;
    return (
      <Modal className="diary-modal-form" closeOnDimmerClick={ false }
        onClose={ this.onClose } open={ isOpen }>
        <Modal.Header>
          New Diary
        </Modal.Header>
        <Modal.Content>
          <Form className="diary-form-content">
            <Form.Input
              placeholder="Title"
              onChange={ (_, data) => this.setState({title: data.value}) }
            />
            <DefaultTextEditor
              value={ this.state.textValue }
              onChange={ this.setTextValue.bind(this) }/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button content="Close" onClick={ this.onClose } />
            <Button.Or />
            <Button color="red" onClick={ this.onSave }>
              <Icon name="heart" />
              Save
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addDiary
}, dispatch);

export default connect(null, mapDispatchToProps)(DiaryModalForm);

