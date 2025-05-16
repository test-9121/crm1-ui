
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../services/contactService";
import { Contact, ContactNote, ContactTask, ContactInteraction } from "../types";

export const useContactDetails = (contactId: string) => {
  const queryClient = useQueryClient();

  // Fetch contact details
  const {
    data: contact,
    isLoading: isLoadingContact,
    error: contactError,
  } = useQuery({
    queryKey: ["contact", contactId],
    queryFn: () => contactService.getContactById(contactId),
    enabled: !!contactId,
  });

  // Fetch contact notes
  const {
    data: notes = [],
    isLoading: isLoadingNotes,
    refetch: refetchNotes,
  } = useQuery({
    queryKey: ["contact-notes", contactId],
    queryFn: () => contactService.getContactNotes(contactId),
    enabled: !!contactId,
  });

  // Fetch contact tasks
  const {
    data: tasks = [],
    isLoading: isLoadingTasks,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["contact-tasks", contactId],
    queryFn: () => contactService.getContactTasks(contactId),
    enabled: !!contactId,
  });

  // Fetch contact interactions
  const {
    data: interactions = [],
    isLoading: isLoadingInteractions,
    refetch: refetchInteractions,
  } = useQuery({
    queryKey: ["contact-interactions", contactId],
    queryFn: () => contactService.getContactInteractions(contactId),
    enabled: !!contactId,
  });

  // Note mutations
  const addNoteMutation = useMutation({
    mutationFn: (content: string) => contactService.createContactNote(contactId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-notes", contactId] });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: ({ noteId, content }: { noteId: string; content: string }) => 
      contactService.updateContactNote(contactId, noteId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-notes", contactId] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => contactService.deleteContactNote(contactId, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-notes", contactId] });
    },
  });

  // Task mutations
  const addTaskMutation = useMutation({
    mutationFn: (task: Omit<ContactTask, 'id'|'createdDateTime'|'createdBy'>) => 
      contactService.createContactTask(contactId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-tasks", contactId] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, task }: { taskId: string; task: Partial<ContactTask> }) => 
      contactService.updateContactTask(contactId, taskId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-tasks", contactId] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => contactService.deleteContactTask(contactId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-tasks", contactId] });
    },
  });

  // Interaction mutations
  const addInteractionMutation = useMutation({
    mutationFn: (interaction: Omit<ContactInteraction, 'id'|'createdDateTime'|'createdBy'>) => 
      contactService.createContactInteraction(contactId, interaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-interactions", contactId] });
    },
  });

  const updateInteractionMutation = useMutation({
    mutationFn: ({ interactionId, interaction }: { interactionId: string; interaction: Partial<ContactInteraction> }) => 
      contactService.updateContactInteraction(contactId, interactionId, interaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-interactions", contactId] });
    },
  });

  const deleteInteractionMutation = useMutation({
    mutationFn: (interactionId: string) => contactService.deleteContactInteraction(contactId, interactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-interactions", contactId] });
    },
  });

  return {
    contact,
    notes,
    tasks,
    interactions,
    isLoading: isLoadingContact || isLoadingNotes || isLoadingTasks || isLoadingInteractions,
    isLoadingContact,
    isLoadingNotes,
    isLoadingTasks,
    isLoadingInteractions,
    error: contactError,
    
    // Notes methods
    addNote: addNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    refetchNotes,
    
    // Tasks methods
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    refetchTasks,
    
    // Interaction methods
    addInteraction: addInteractionMutation.mutate,
    updateInteraction: updateInteractionMutation.mutate,
    deleteInteraction: deleteInteractionMutation.mutate,
    refetchInteractions,
  };
};
