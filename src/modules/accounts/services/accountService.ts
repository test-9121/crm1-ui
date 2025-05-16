
import { api } from "@/modules/common/services/api";
import { Account, AccountFormValues, AccountNote, AccountActivity } from "@/modules/contacts/types";

export const accountService = {
  // Accounts
  getAccounts: async (params?: any) => {
    const response = await api.get('/api/accounts', { params });
    return response.data;
  },
  
  getAccountById: async (id: string) => {
    const response = await api.get(`/api/accounts/${id}`);
    return response.data;
  },
  
  createAccount: async (data: AccountFormValues) => {
    const response = await api.post('/api/accounts', data);
    return response.data;
  },
  
  updateAccount: async (id: string, data: AccountFormValues) => {
    const response = await api.put(`/api/accounts/${id}`, data);
    return response.data;
  },
  
  deleteAccount: async (id: string) => {
    const response = await api.delete(`/api/accounts/${id}`);
    return response.data;
  },
  
  // Notes
  getAccountNotes: async (accountId: string) => {
    const response = await api.get(`/api/accounts/${accountId}/notes`);
    return response.data;
  },
  
  createAccountNote: async (accountId: string, content: string) => {
    const response = await api.post(`/api/accounts/${accountId}/notes`, { content });
    return response.data;
  },
  
  updateAccountNote: async (accountId: string, noteId: string, content: string) => {
    const response = await api.put(`/api/accounts/${accountId}/notes/${noteId}`, { content });
    return response.data;
  },
  
  deleteAccountNote: async (accountId: string, noteId: string) => {
    const response = await api.delete(`/api/accounts/${accountId}/notes/${noteId}`);
    return response.data;
  },
  
  // Activities
  getAccountActivities: async (accountId: string) => {
    const response = await api.get(`/api/accounts/${accountId}/activities`);
    return response.data;
  },
  
  // Relationships
  getAccountContacts: async (accountId: string) => {
    const response = await api.get(`/api/accounts/${accountId}/contacts`);
    return response.data;
  },
  
  getAccountDeals: async (accountId: string) => {
    const response = await api.get(`/api/accounts/${accountId}/deals`);
    return response.data;
  }
};
