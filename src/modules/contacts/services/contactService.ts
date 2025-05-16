
import { api } from "@/modules/common/services/api";
import { Contact, ContactFormValues, ContactNote, ContactTask, ContactInteraction } from "../types";

export const contactService = {
  // Contacts
  getContacts: async (params?: any) => {
    const response = await api.get('/api/contacts', { params });
    return response.data;
  },
  
  getContactById: async (id: string) => {
    const response = await api.get(`/api/contacts/${id}`);
    return response.data;
  },
  
  createContact: async (data: ContactFormValues) => {
    const response = await api.post('/api/contacts', data);
    return response.data;
  },
  
  updateContact: async (id: string, data: ContactFormValues) => {
    const response = await api.put(`/api/contacts/${id}`, data);
    return response.data;
  },
  
  deleteContact: async (id: string) => {
    const response = await api.delete(`/api/contacts/${id}`);
    return response.data;
  },
  
  // Notes
  getContactNotes: async (contactId: string) => {
    const response = await api.get(`/api/contacts/${contactId}/notes`);
    return response.data;
  },
  
  createContactNote: async (contactId: string, content: string) => {
    const response = await api.post(`/api/contacts/${contactId}/notes`, { content });
    return response.data;
  },
  
  updateContactNote: async (contactId: string, noteId: string, content: string) => {
    const response = await api.put(`/api/contacts/${contactId}/notes/${noteId}`, { content });
    return response.data;
  },
  
  deleteContactNote: async (contactId: string, noteId: string) => {
    const response = await api.delete(`/api/contacts/${contactId}/notes/${noteId}`);
    return response.data;
  },
  
  // Tasks
  getContactTasks: async (contactId: string) => {
    const response = await api.get(`/api/contacts/${contactId}/tasks`);
    return response.data;
  },
  
  createContactTask: async (contactId: string, task: Omit<ContactTask, 'id'|'createdDateTime'|'createdBy'>) => {
    const response = await api.post(`/api/contacts/${contactId}/tasks`, task);
    return response.data;
  },
  
  updateContactTask: async (contactId: string, taskId: string, task: Partial<ContactTask>) => {
    const response = await api.put(`/api/contacts/${contactId}/tasks/${taskId}`, task);
    return response.data;
  },
  
  deleteContactTask: async (contactId: string, taskId: string) => {
    const response = await api.delete(`/api/contacts/${contactId}/tasks/${taskId}`);
    return response.data;
  },
  
  // Interactions
  getContactInteractions: async (contactId: string) => {
    const response = await api.get(`/api/contacts/${contactId}/interactions`);
    return response.data;
  },
  
  createContactInteraction: async (contactId: string, interaction: Omit<ContactInteraction, 'id'|'createdDateTime'|'createdBy'>) => {
    const response = await api.post(`/api/contacts/${contactId}/interactions`, interaction);
    return response.data;
  },
  
  updateContactInteraction: async (contactId: string, interactionId: string, interaction: Partial<ContactInteraction>) => {
    const response = await api.put(`/api/contacts/${contactId}/interactions/${interactionId}`, interaction);
    return response.data;
  },
  
  deleteContactInteraction: async (contactId: string, interactionId: string) => {
    const response = await api.delete(`/api/contacts/${contactId}/interactions/${interactionId}`);
    return response.data;
  }
};
