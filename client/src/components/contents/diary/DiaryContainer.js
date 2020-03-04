import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router-dom";
import DiaryCalendar from "./DiaryCalendar";

class DiaryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid className="diary-container" columns={1} >
        <Grid.Column>
          <Route key="diary_calendar" exact path="/diaries" component={ DiaryCalendar } />
        </Grid.Column>
      </Grid>
    );
  }
}

export default DiaryContainer;
