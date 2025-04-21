
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cmsMailService } from "../services/cmsMailService";
import { CMSMailFormValues } from "../types";
import { toast } from "@/hooks/use-toast";

export const useCMSMail = () => {
  const queryClient = useQueryClient();

  const allMails = useQuery({
    queryKey: ["cms-mails"],
    queryFn: cmsMailService.getAll,
  });

  const getMailById = (id: string) => {
    return useQuery({
      queryKey: ["cms-mail", id],
      queryFn: () => cmsMailService.getById(id),
      enabled: !!id && id !== "create" && id !== "new",
    });
  };

  const createMail = useMutation({
    mutationFn: (mailData: CMSMailFormValues) => {
      return cmsMailService.create(mailData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-mails"] });
      toast({
        title: "Mail created",
        description: "Mail has been created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to create mail",
        description: "There was an error creating the mail.",
        variant: "destructive",
      });
    },
  });

  const updateMail = useMutation({
    mutationFn: ({id, mailData}: {id: string, mailData: CMSMailFormValues}) => {
      return cmsMailService.update(id, mailData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cms-mails"] });
      queryClient.invalidateQueries({ queryKey: ["cms-mail", variables.id] });
      toast({
        title: "Mail updated",
        description: "Mail has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to update mail",
        description: "There was an error updating the mail.",
        variant: "destructive",
      });
    },
  });

  const deleteMail = useMutation({
    mutationFn: (id: string) => {
      return cmsMailService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-mails"] });
      toast({
        title: "Mail deleted",
        description: "Mail has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete mail",
        description: "There was an error deleting the mail.",
        variant: "destructive",
      });
    },
  });

  return {
    allMails,
    getMailById,
    createMail,
    updateMail,
    deleteMail,
  };
};
