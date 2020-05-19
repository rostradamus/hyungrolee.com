import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import DefaultTextEditor from "Shared/components/DefaultTextEditor";
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

export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  setTextValue(value) {
    this.setState({textValue: value});
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
    return (
      <Form className="note-editor-form">
        <Form.Input
          placeholder="Title"
          onChange={ (_, data) => this.setState({title: data.value}) } />
        <DefaultTextEditor
          value={ this.state.textValue }
          onChange={ this.setTextValue.bind(this) }/>
      </Form>
    );
  }
}
