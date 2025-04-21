
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../services/eventService";
import { EventFormValues } from "../types";
import { toast } from "@/hooks/use-toast";

export const useEvents = () => {
  const queryClient = useQueryClient();

  const allEvents = useQuery({
    queryKey: ["events"],
    queryFn: eventService.getAll,
  });

  const getEventsByMonth = (month: number, year: number) => {
    return useQuery({
      queryKey: ["events", "month", year, month],
      queryFn: () => eventService.getByMonthAndYear(month, year),
    });
  };

  const getEventById = (id: string) => {
    return useQuery({
      queryKey: ["event", id],
      queryFn: () => eventService.getById(id),
      enabled: !!id && id !== "new",
    });
  };

  const createEvent = useMutation({
    mutationFn: (eventData: EventFormValues) => {
      return eventService.create(eventData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Event created",
        description: "Event has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create event",
        description: "There was an error creating the event.",
        variant: "destructive",
      });
    },
  });

  const updateEvent = useMutation({
    mutationFn: ({id, eventData}: {id: string, eventData: EventFormValues}) => {
      return eventService.update(id, eventData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", variables.id] });
      toast({
        title: "Event updated",
        description: "Event has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update event",
        description: "There was an error updating the event.",
        variant: "destructive",
      });
    },
  });

  const deleteEvent = useMutation({
    mutationFn: (id: string) => {
      return eventService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Event deleted",
        description: "Event has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete event",
        description: "There was an error deleting the event.",
        variant: "destructive",
      });
    },
  });

  return {
    allEvents,
    getEventsByMonth,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
