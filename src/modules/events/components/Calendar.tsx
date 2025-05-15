
import React from 'react';
import { Calendar as ReactCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { CalendarView, Event, CalendarProps } from '../types';
import { COLOR_MAP } from './ColorPicker';
import { cn } from '@/lib/utils';
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
    <div className={cn(
      "h-[600px] rounded-xl bg-card p-4 shadow-lg border border-border/20",
      "transition-all duration-200 ease-in-out hover:shadow-xl"
    )}>
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
          onView={() => {}}
          onSelectEvent={(event) => onEventSelect(event.resource)}
          onSelectSlot={({ start, end }) => onDateSelect({ start, end })}
          selectable
          className="custom-calendar"
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.resource?.color ? COLOR_MAP[event.resource.color] || "#9b87f5" : "#9b87f5",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: 500,
              padding: "2px 8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
              '&:hover': {
                transform: "translateY(-1px)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.15)"
              }
            },
          })}
          dayPropGetter={(date) => ({
            style: {
              backgroundColor: 'transparent',
              transition: 'background-color 0.2s ease',
            },
          })}
        />
      )}
    </div>
  );
};
