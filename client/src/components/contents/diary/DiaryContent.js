import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Container, Divider, Item } from "semantic-ui-react";

class DiaryContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const targetId = parseInt(this.props.match.params.id);
    const { title, content } = this.props.diaries.items.find(({ id }) => id === targetId);
    return (
      <Container>
        <Header
          inverted
          content={ title }
        />
        <Divider />
        <Item>
          <div dangerouslySetInnerHTML={{__html: content}} />
        </Item>
        <Divider />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  diaries: state.diaries
});

export default connect(mapStateToProps)(DiaryContent);
