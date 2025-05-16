
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../services/accountService";
import { Account, AccountFormValues } from "@/modules/contacts/types";
import { useState } from "react";
import { PaginationMetadata } from "@/types/pagination";

export const useAccounts = (params?: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  
  const {
    data: result = { data: [], pagination: { page: 1, pageSize: 10, totalElements: 0, totalPages: 0 } },
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["accounts", params],
    queryFn: () => accountService.getAccounts(params),
  });
  
  const accounts: Account[] = result.data || [];
  const pagination: PaginationMetadata = result.pagination || { 
    page: 1, 
    pageSize: 10, 
    totalElements: 0, 
    totalPages: 0 
  };
  
  const handlePageChange = (page: number) => {
    return accountService.getAccounts({ ...params, page });
  };
  
  const handlePageSizeChange = (pageSize: number) => {
    return accountService.getAccounts({ ...params, pageSize });
  };
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    return accountService.getAccounts({ ...params, search: term });
  };

  const isEmpty = accounts.length === 0;
  
  const getAccountById = (id: string) => {
    return accounts.find((account) => account.id === id) || null;
  };
  
  const createMutation = useMutation({
    mutationFn: (data: AccountFormValues) => accountService.createAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AccountFormValues }) => 
      accountService.updateAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => accountService.deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  return {
    accounts,
    isLoading,
    error,
    isEmpty,
    searchTerm,
    pagination,
    refetch,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    getAccountById,
    createAccount: createMutation.mutate,
    updateAccount: updateMutation.mutate,
    deleteAccount: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
