import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Container, Divider, Item } from "semantic-ui-react";
import { fetchDiaryById, unmountSelected } from "Actions/DiaryActions";
import { bindActionCreators } from "redux";

class DiaryContent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const diaryId = this.props.match.params.id;
    this.props.fetchDiaryById(diaryId);
  }

  componentWillUnmount() {
    this.props.unmountSelected();
  }

  render() {
    if (!this.props.diary) {
      return (
        <Container />
      );
    }
    const { title, content, created_at, author } = this.props.diary;
    return (
      <Container>
        <Header
          inverted
          content={ title }
        />
        <Header.Subheader content={ created_at.format("LLLL") } />
        <Header.Subheader content={ "by " + author.userName } />
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
  diary: state.diaries.selected
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDiaryById,
  unmountSelected
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiaryContent);
