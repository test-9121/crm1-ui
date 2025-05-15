
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dealsService } from "../services/dealService";
import { Deal, DealFormValues, DealStats } from "../types";
import { useToast } from "@/hooks/use-toast";
import { PaginationMetadata } from "@/types/pagination";

export const useDeals = (page = 1, size = 10, search = "", filters = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    data: dealsData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["deals", page, size, search, filters],
    queryFn: () => dealsService.getDeals(page, size, search, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: dealStats = {
    totalPipelineValue: 0,
    weightedPipelineValue: 0,
    dealsWonThisMonth: { count: 0, value: 0 },
    avgDealSize: { value: 0, percentChange: 0 }
  }, isLoading: isStatsLoading } = useQuery({
    queryKey: ["dealStats"],
    queryFn: () => dealsService.getDealStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createDealMutation = useMutation({
    mutationFn: (dealData: DealFormValues) => dealsService.createDeal(dealData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["dealStats"] });
      toast({
        title: "Deal created",
        description: "Deal has been created successfully",
      });
      setIsFormDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create deal: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    },
  });

  const updateDealMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: DealFormValues }) => 
      dealsService.updateDeal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["dealStats"] });
      toast({
        title: "Deal updated",
        description: "Deal has been updated successfully",
      });
      setIsFormDialogOpen(false);
      setSelectedDeal(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update deal: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    },
  });

  const deleteDealMutation = useMutation({
    mutationFn: (id: string) => dealsService.deleteDeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["dealStats"] });
      toast({
        title: "Deal deleted",
        description: "Deal has been deleted successfully",
      });
      setSelectedDeal(null);
      setIsDetailsPanelOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete deal: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    },
  });

  const updateDealStageMutation = useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: string }) => 
      dealsService.updateDealStage(id, stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["dealStats"] });
      toast({
        title: "Deal stage updated",
        description: "Deal stage has been updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update deal stage: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
      refetch(); // Refetch to restore the previous state
    },
  });

  const openDetailsSidePanel = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDetailsPanelOpen(true);
  };

  const closeDetailsSidePanel = () => {
    setIsDetailsPanelOpen(false);
    setSelectedDeal(null);
  };

  const openCreateDialog = () => {
    setIsEditMode(false);
    setSelectedDeal(null);
    setIsFormDialogOpen(true);
  };

  const openEditDialog = (deal: Deal) => {
    setIsEditMode(true);
    setSelectedDeal(deal);
    setIsFormDialogOpen(true);
  };

  const closeFormDialog = () => {
    setIsFormDialogOpen(false);
    if (!isDetailsPanelOpen) {
      setSelectedDeal(null);
    }
  };

  const createDeal = (dealData: DealFormValues) => {
    createDealMutation.mutate(dealData);
  };

  const updateDeal = (dealData: DealFormValues) => {
    if (selectedDeal) {
      updateDealMutation.mutate({ id: selectedDeal.id, data: dealData });
    }
  };

  const deleteDeal = (id: string) => {
    deleteDealMutation.mutate(id);
  };

  const updateDealStage = (id: string, newStage: string) => {
    updateDealStageMutation.mutate({ id, stage: newStage });
  };

  return {
    deals: dealsData?.data || [],
    pagination: dealsData?.pagination as PaginationMetadata,
    dealStats,
    selectedDeal,
    isDetailsPanelOpen,
    isFormDialogOpen,
    isEditMode,
    isLoading,
    isStatsLoading,
    error,
    openDetailsSidePanel,
    closeDetailsSidePanel,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
    createDeal,
    updateDeal,
    deleteDeal,
    updateDealStage,
    refetch,
  };
};
