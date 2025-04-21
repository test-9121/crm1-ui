
import React from 'react';
import { Calendar as ReactCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { CalendarView, Event, CalendarProps } from '../types';
import { COLOR_MAP } from './ColorPicker'; // Import our color map
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
    start: new Date(event.startDate || ''),
    end: new Date(event.endDate || ''),
    allDay: event.allDay,
    resource: event
  }));

  return (
    <div className="h-[600px] bg-[#f8f9fb] rounded-lg p-2 shadow-sm">
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
          style={{ height: '100%', background: "#f8f9fb", borderRadius: 16, border: "none" }}
          view={viewMap[view]}
          date={date}
          onNavigate={onDateChange}
          onView={() => {}}
          onSelectEvent={(event) => onEventSelect(event.resource)}
          onSelectSlot={({ start, end }) => onDateSelect({ start, end })}
          selectable
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.resource?.color ? COLOR_MAP[event.resource.color] || "#9b87f5" : "#9b87f5",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontWeight: 600,
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
              padding: "0 6px"
            },
          })}
          // (Optional) enhance modern look further via components prop if needed
        />
      )}
    </div>
  );
};

