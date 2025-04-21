
import { useQuery } from "@tanstack/react-query";
import { leadService } from "@/modules/leads/services/leadService";
import { ILead } from "@/modules/leads/types";
import { toast } from "@/components/ui/sonner";

export function useLeads() {
  const {
    data: leads = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: leadService.getLeads,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to fetch leads. Please try again later.");
        console.error("Error fetching leads:", error);
      }
    }
  });

  // Function to find a specific lead by ID
  const getLeadById = (id: string): ILead | undefined => {
    return leads.find(lead => lead.id === id);
  };

  return {
    leads,
    isLoading,
    isError,
    error,
    isEmpty: !isLoading && leads.length === 0,
    getLeadById,
  };
}
