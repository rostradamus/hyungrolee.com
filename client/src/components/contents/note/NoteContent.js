import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button, Header, Divider, Item, Icon } from "semantic-ui-react";
import TimeUtils from "Utils/TimeUtils";

const NoteContent = props => {
  const { title, content, author, updated_at } = props.note;
  const { userName } = author;
  return (
    <Container className="post-content">
      <Button.Group floated="right">
        <Button
          as={ Link }
          to="note/editor"
          animated="vertical">
          <Button.Content hidden>Edit</Button.Content>
          <Button.Content visible>
            <Icon name="edit" />
          </Button.Content>
        </Button>
        <Button
          animated="vertical">
          <Button.Content hidden>Archive</Button.Content>
          <Button.Content visible>
            <Icon name="trash" />
          </Button.Content>
        </Button>
      </Button.Group>
      <Header
        inverted
        size="huge"
        className="post-content-title"
        content={ title }/>
      <Header sub inverted content={ "Last Edited at " + TimeUtils.makeTimeToLocalString(updated_at) } />
      <Header sub inverted content={ `by ${userName}` } />
      <Divider />
      <Item className="post-content-text" content={ content } />
      <Divider />
    </Container>
  );
};

const mapStateToProps = ({ note }) => ({
  note: note
});


export default connect(mapStateToProps)(NoteContent);
