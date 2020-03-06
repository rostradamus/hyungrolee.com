import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { fetchDiaries } from "Actions/DiaryActions";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "semantic-ui-react";
import DiaryModalForm from "./DiaryModalForm";
import "./DiaryCalendar.less";

class DiaryCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCalendarData: null
    };
  }

  componentDidMount() {
    this.props.fetchDiaries();
  }

  openDiaryModalForm(data) {
    this.setState({
      selectedCalendarData: data
    });
  }

  openDiaryContent(data) {
    this.props.history.push(`diaries/${data._id}`);
  }

  closeDiaryModalForm() {
    this.setState({
      selectedCalendarData: null
    });
  }

  render() {
    const { diaries } = this.props;
    const { selectedCalendarData } = this.state;
    return (
      <Container id="diary-calendar-container">
        <Calendar
          selectable
          views = {["month"]}
          defaultView = "month"
          localizer={ momentLocalizer(moment) }
          events={ diaries.items }
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={ this.openDiaryModalForm.bind(this) }
          onSelectEvent={ this.openDiaryContent.bind(this) }
          style={{ height: 750 }} />
        <DiaryModalForm
          selectedCalendarData={ selectedCalendarData }
          onClose= { this.closeDiaryModalForm.bind(this) } />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  diaries: state.diaries
});
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDiaries
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiaryCalendar);
