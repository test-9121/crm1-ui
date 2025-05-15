
import { api } from "@/modules/common/services/api";
import { Event, EventFormValues } from "../types";
import { toast } from "@/components/ui/sonner";

export const eventService = {
  getAll: async (): Promise<Event[]> => {
    try {
      const response = await api.get('/api/calendar/');
      return response.data.events || [];
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("An error occurred. Please try again.");
      throw error;
    }
  },
  
  getByMonthAndYear: async (month: number, year: number): Promise<Event[]> => {
    try {
      const response = await api.get(`/api/calendar/month/${year}/${month}`);
      return response.data.events || [];
    } catch (error) {
      console.error(`Error fetching events for ${month}/${year}:`, error);
      throw error;
    }
  },
  
  getById: async (id: string): Promise<Event> => {
    try {
      const response = await api.get(`/api/calendar/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      throw error;
    }
  },
  
  create: async (eventData: EventFormValues): Promise<Event> => {
    try {
      // Transform the data to include both full objects and IDs
      const payload = {
        ...eventData,
        // Handle user relationship using userId
        user: eventData.userId ? { id: eventData.userId } : undefined,
        
        // Handle lead relationship using leadId
        lead: eventData.leadId ? { id: eventData.leadId } : undefined,
      };
      
      const response = await api.post('/api/calendar/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },
  
  update: async (id: string, eventData: EventFormValues): Promise<Event> => {
    try {
      // Transform the data to include both full objects and IDs
      const payload = {
        ...eventData,
        // Handle user relationship using userId
        user: eventData.userId ? { id: eventData.userId } : undefined,
        
        // Handle lead relationship using leadId
        lead: eventData.leadId ? { id: eventData.leadId } : undefined,
      };
      
      const response = await api.put(`/api/calendar/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error(`Error updating event with ID ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/calendar/${id}`);
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      throw error;
    }
  }
};
