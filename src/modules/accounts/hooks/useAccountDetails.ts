import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../services/accountService";
import { Account, AccountNote, Contact } from "@/modules/contacts/types";
import { Deal } from "@/modules/deals/types";

export const useAccountDetails = (accountId: string) => {
  const queryClient = useQueryClient();

  // Fetch account details
  const {
    data: account,
    isLoading: isLoadingAccount,
    error: accountError,
  } = useQuery({
    queryKey: ["account", accountId],
    queryFn: () => accountService.getAccountById(accountId),
    enabled: !!accountId,
  });

  // Fetch account notes
  const {
    data: notes = [],
    isLoading: isLoadingNotes,
    refetch: refetchNotes,
  } = useQuery({
    queryKey: ["account-notes", accountId],
    queryFn: () => accountService.getAccountNotes(accountId),
    enabled: !!accountId,
  });

  // Fetch account activities
  const {
    data: activities = [],
    isLoading: isLoadingActivities,
    refetch: refetchActivities,
  } = useQuery({
    queryKey: ["account-activities", accountId],
    queryFn: () => accountService.getAccountActivities(accountId),
    enabled: !!accountId,
  });

  // Fetch account contacts
  const {
    data: contacts = [],
    isLoading: isLoadingContacts,
    refetch: refetchContacts,
  } = useQuery({
    queryKey: ["account-contacts", accountId],
    queryFn: () => accountService.getAccountContacts(accountId),
    enabled: !!accountId,
  });

  // Fetch account deals
  const {
    data: deals = [],
    isLoading: isLoadingDeals,
    refetch: refetchDeals,
  } = useQuery({
    queryKey: ["account-deals", accountId],
    queryFn: () => accountService.getAccountDeals(accountId),
    enabled: !!accountId,
  });

  // Note mutations
  const addNoteMutation = useMutation({
    mutationFn: (content: string) => accountService.createAccountNote(accountId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-notes", accountId] });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: ({ noteId, content }: { noteId: string; content: string }) => 
      accountService.updateAccountNote(accountId, noteId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-notes", accountId] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => accountService.deleteAccountNote(accountId, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-notes", accountId] });
    },
  });

  return {
    account,
    notes,
    activities,
    contacts,
    deals,
    isLoading: isLoadingAccount || isLoadingNotes || isLoadingActivities || isLoadingContacts || isLoadingDeals,
    isLoadingAccount,
    isLoadingNotes,
    isLoadingActivities,
    isLoadingContacts,
    isLoadingDeals,
    error: accountError,
    
    // Notes methods
    addNote: addNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    refetchNotes,
    
    // Other methods to refresh data
    refetchActivities,
    refetchContacts,
    refetchDeals,
  };
};
