import React, { Component } from "react";
// import { Grid } from "semantic-ui-react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import { Route } from "react-router-dom";
import NoteContent from "./NoteContent";
import NoteEditor from "./NoteEditor";
import { fetchNote } from "Actions/NoteActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NoteStarter from "./NoteStarter";

class NoteContainer extends Component {
  constructor(props) {
    super(props);
    this.props.fetchNote();
  }

  render() {
    const { isFetching, isNew } = this.props.note;
    const routes = [
      <Route
        key="note_content" exact path="/note"
        component={ NoteContent } />,
      <Route
        key="note_editor" exact path="/note/editor"
        component={ NoteEditor } />
    ];
    return (
      <Dimmer.Dimmable as={Segment} className="note-container"  style={{ backgroundColor: "#002b36", height: "100%" }} blurring dimmed={isFetching}>
        <Dimmer active={isFetching}>
          <Loader content='Loading' />
        </Dimmer>
        {isNew ? <NoteStarter /> : routes}
      </Dimmer.Dimmable>
    );
  }
}

const mapStateToProps = ({ note }) => ({
  note: note
});

const mapDispatchtoProps = dispatch => bindActionCreators({
  fetchNote
}, dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(NoteContainer);
