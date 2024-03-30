import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import MeetingDialog from '../MeetingDialog/MeetingDialog';
import './Calendar.css';
import { convertToEuropeDateFormat } from '../../utils/convertToEuropeTimeFormat';

function MeetingDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🗓️' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function Calendar({meetings}) {
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [value, setValue] = React.useState(dayjs());
  const [currentMonth, setCurrentMonth] = React.useState(value.month() + 1);
  const [currentYear, setCurrentYear] = React.useState(value.year());
  const [open, setOpen] = React.useState(false);
  const [dayMeetings, setDayMeetings] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMonthChange = (date) => {
    setCurrentMonth(date.month()+1);
    if(dayjs().month() !== date.month()) {
        return setValue(date);
    }

    return setValue(dayjs());
  };

  const handleYearChange = (date) => {
    setCurrentYear(date.year());
    if(dayjs().year() !== date.year()) {
        return setValue(date);
    }

    return setValue(dayjs());
  };

  React.useEffect(() => {
    if (meetings) {
      const days = meetings.filter((meeting) => {
        const start = dayjs(meeting.start);
        return (currentMonth === start.month()+1 && currentYear === start.year())
      });
      console.log(days.map((day) => dayjs(day.start)));
      setHighlightedDays(
        days.map((day) => dayjs(day.start).date())
        );
    }
  }, [currentMonth, currentYear, meetings]);

  const handleMeetingDayClick = (date) => {
    const key = convertToEuropeDateFormat(date);
    const dayMeetings = {
        [key]: meetings.filter(meeting => {
            const start = dayjs(meeting.start);
            return (start.date() === date.date() && start.month() === date.month() && start.year() === date.year());
        })
    }
    if(dayMeetings[key].length) {
      setOpen(true);
      setDayMeetings(dayMeetings);
    }
  };

  return (
      <React.Fragment>
        <DateCalendar
            sx={{ width: 1 }}
            value={value}
            onChange={(newValue) => handleMeetingDayClick(newValue)}
            onYearChange={handleYearChange}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            className={value.format('DD/MM/YYYY') !== dayjs().format('DD/MM/YYYY') ? "hide-today" : ""}
            slots={{
            day: MeetingDay,
            }}
            fullWidth
            slotProps={{
            day: {
                highlightedDays,
                textField: { fullWidth: true }
            },
            }}
        />
        <MeetingDialog meetings={dayMeetings} open={open} handleClose={handleClose} day={Object.keys(dayMeetings)[0]}/>
      </React.Fragment>
  );
}
