import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { fetchDiaries } from "Actions/DiaryActions";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class DiaryCalendar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDiaries();
  }

  render() {
    const { diaries, onSelectSlot } = this.props;
    return (
      <Calendar
        selectable
        views = {["month"]}
        defaultView = "month"
        localizer={ momentLocalizer(moment) }
        events={ diaries.items }
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={ onSelectSlot }
        style={{ height: 750 }} />
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
