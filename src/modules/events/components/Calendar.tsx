
import React from 'react';
import { Calendar as ReactCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { CalendarView, Event, CalendarProps } from '../types';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Initialize localizer
const localizer = momentLocalizer(moment);

// Map our view types to react-big-calendar view types
const viewMap: Record<CalendarView, string> = {
  month: Views.MONTH,
  week: Views.WEEK,
  day: Views.DAY,
  agenda: Views.AGENDA,
};

export const Calendar: React.FC<CalendarProps> = ({
  events,
  view,
  date,
  onDateChange,
  onEventSelect,
  onDateSelect,
  loading
}) => {
  // Map events to format expected by react-big-calendar
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.startDateTime || event.startDate || ''),
    end: new Date(event.endDateTime || event.endDate || ''),
    allDay: event.allDay,
    resource: event
  }));

  return (
    <div className="h-[600px]">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      ) : (
        <ReactCalendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          view={viewMap[view]}
          date={date}
          onNavigate={onDateChange}
          onView={(newView) => {}} // This prop is required but not used
          onSelectEvent={(event) => onEventSelect(event.resource)}
          onSelectSlot={({ start, end }) => onDateSelect({ start, end })}
          selectable
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.resource.color || '#3182ce',
            },
          })}
        />
      )}
    </div>
  );
};
