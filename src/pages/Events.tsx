import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { CalendarView, Event } from '@/modules/events/types';
import { useEvents } from '@/modules/events/hooks/useEvents';
import { Calendar } from '@/modules/events/components/Calendar';
import { EventModal } from '@/modules/events/components/EventModal';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FetchErrorState } from '@/components/shared/FetchErrorState';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { PremiumFeatureCard } from "@/components/dashboard/PremiumFeatureCard";

export default function Events() {
  const { allEvents, createEvent, updateEvent, deleteEvent } = useEvents();
  const [view, setView] = useState<CalendarView>('month');
  const [date, setDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleDateSelect = (selectInfo: { start: Date; end: Date }) => {
    setSelectedEvent(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleCreateEvent = async (eventData: any) => {
    await createEvent.mutateAsync(eventData);
    setIsModalOpen(false);
  };

  const handleUpdateEvent = async (id: string, eventData: any) => {
    await updateEvent.mutateAsync({ id, eventData });
    setIsModalOpen(false);
  };

  const handleDeleteEvent = async (id: string) => {
    await deleteEvent.mutateAsync(id);
    setIsModalOpen(false);
  };

  const mappedEvents = Array.isArray(allEvents.data) ? allEvents.data.map(event => ({
    ...event,
    startDate: event.startDate || event.startDate,
    endDate: event.endDate || event.endDate
  })) : [];

  if (allEvents.isError) {
    return (
      <DashboardLayout>
        <FetchErrorState 
          message="Failed to load events data. Please try again later." 
          onRetry={() => allEvents.refetch()} 
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <Button className="gap-2" onClick={() => {
            setSelectedEvent(null);
            setIsCreating(true);
            setIsModalOpen(true);
          }}>
            <Plus className="h-4 w-4" />
            <span>New Event</span>
          </Button>
        </div>

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Calendar</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>{view.charAt(0).toUpperCase() + view.slice(1)} View</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">{format(date, 'MMMM yyyy')}</h2>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {
              setDate(new Date());
            }}>
              Today
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setView('month')}>Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView('week')}>Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView('day')}>Day</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView('agenda')}>Agenda</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Calendar 
            events={mappedEvents}
            view={view}
            date={date}
            onDateChange={setDate}
            onEventSelect={handleSelectEvent}
            onDateSelect={handleDateSelect}
            loading={allEvents.isLoading}
          />
        </div>

        <div className="flex justify-end items-center">
          <div style={{ width: 360 }}>
            <PremiumFeatureCard />
          </div>
        </div>

        {isModalOpen && (
          <EventModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            event={selectedEvent}
            isCreating={isCreating}
            onCreateEvent={handleCreateEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
