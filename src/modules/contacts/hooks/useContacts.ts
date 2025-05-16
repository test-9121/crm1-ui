
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../services/contactService";
import { Contact, ContactFormValues } from "../types";
import { useState } from "react";
import { PaginationMetadata } from "@/types/pagination";

export const useContacts = (params?: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  
  const {
    data: result = { data: [], pagination: { page: 1, pageSize: 10, totalElements: 0, totalPages: 0 } },
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contacts", params],
    queryFn: () => contactService.getContacts(params),
  });
  
  const contacts: Contact[] = result.data || [];
  const pagination: PaginationMetadata = result.pagination || { 
    page: 1, 
    pageSize: 10, 
    totalElements: 0, 
    totalPages: 0 
  };
  
  const handlePageChange = (page: number) => {
    return contactService.getContacts({ ...params, page });
  };
  
  const handlePageSizeChange = (pageSize: number) => {
    return contactService.getContacts({ ...params, pageSize });
  };
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    return contactService.getContacts({ ...params, search: term });
  };

  const isEmpty = contacts.length === 0;
  
  const getContactById = (id: string) => {
    return contacts.find((contact) => contact.id === id) || null;
  };
  
  const createMutation = useMutation({
    mutationFn: (data: ContactFormValues) => contactService.createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ContactFormValues }) => 
      contactService.updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactService.deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return {
    contacts,
    isLoading,
    error,
    isEmpty,
    searchTerm,
    pagination,
    refetch,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    getContactById,
    createContact: createMutation.mutate,
    updateContact: updateMutation.mutate,
    deleteContact: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
