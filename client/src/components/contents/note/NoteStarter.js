import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Form, Segment, Button, Header } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { initNote } from "Actions/NoteActions";

const NoteStarter = props =>{
  const [title, setTitle] = useState("");
  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100%" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header inverted as="h2" content="First Time to Note?" />
        <Form size="large" autoComplete="on" onSubmit={ () => props.initNote({ title }) }>
          <Segment stacked>
            <Header as="h4" content="Try Note Feature by Adding a New One !" />
            <Form.Input
              fluid
              icon="edit"
              iconPosition="left"
              placeholder="Title"
              onChange = {(_, { value }) => setTitle(value)} />
            <Button
              fluid
              primary
              content="Create a Note"
              type="submit" />
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ note }) => ({
  note: note
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initNote
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NoteStarter);

