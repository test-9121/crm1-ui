
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dealService } from "../services/dealService";
import { Deal, DealFormValues } from "../types";

export const useDeals = () => {
  const queryClient = useQueryClient();

  const { data: deals = [], isLoading, isError } = useQuery({
    queryKey: ['deals'],
    queryFn: dealService.getAll,
  });

  const { data: dealStats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['dealStats'],
    queryFn: dealService.getStats,
    enabled: !!deals.length, // Only fetch stats if we have deals
  });

  const createDeal = useMutation({
    mutationFn: (deal: Omit<Deal, 'id' | 'createdDateTime' | 'lastUpdatedDateTime'>) => 
      dealService.create(deal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      toast.success("Deal created successfully");
    },
    onError: () => {
      toast.error("Failed to create deal");
    },
  });

  const updateDeal = useMutation({
    mutationFn: ({ id, deal }: { id: string; deal: Partial<Deal> }) => 
      dealService.update(id, deal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      toast.success("Deal updated successfully");
    },
    onError: () => {
      toast.error("Failed to update deal");
    },
  });

  const deleteDeal = useMutation({
    mutationFn: dealService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      toast.success("Deal deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete deal");
    },
  });

  return {
    deals,
    dealStats,
    isLoading,
    isStatsLoading,
    isError,
    createDeal,
    updateDeal,
    deleteDeal,
  };
};
