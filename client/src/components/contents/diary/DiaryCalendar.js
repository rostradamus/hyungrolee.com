import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

class DiaryCalendar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Calendar
        views = {['month']}
        defaultView = "month"
        localizer={ momentLocalizer(moment) }
        events={ [] }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 750 }} />
    );
  }
}

export default DiaryCalendar;
