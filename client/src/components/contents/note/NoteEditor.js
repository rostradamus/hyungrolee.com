import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import DefaultTextEditor from "Shared/components/DefaultTextEditor";
import { serializeTextValue } from "Utils/TextEditorUtils";
import { editNote } from "Actions/NoteActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

class NoteEditor extends Component {
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

const mapStateToProps = ({ note }) => ({
  note: note
});

const mapDispatchToProps = dispatch => bindActionCreators({
  editNote
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor);
