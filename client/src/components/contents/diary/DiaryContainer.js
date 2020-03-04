import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router-dom";
import DiaryCalendar from "./DiaryCalendar";
import DiaryModalForm from "./DiaryModalForm";

class DiaryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalFormOpen: false
    };
  }

  openDiaryModalForm() {
    this.setState({
      isModalFormOpen: true
    });
  }

  closeDiaryModalForm() {
    this.setState({
      isModalFormOpen: false
    });
  }

  render() {
    return (
      <Grid className="diary-container" columns={1} >
        <Grid.Column>
          <Route
            key="diary_calendar" exact path="/diaries"
            component={ () => <DiaryCalendar onSelectSlot={ this.openDiaryModalForm.bind(this) }/> } />
        </Grid.Column>
        <DiaryModalForm
          isOpen={ this.state.isModalFormOpen }
          onClose= { this.closeDiaryModalForm.bind(this) } />
      </Grid>
    );
  }
}

export default DiaryContainer;
