
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dealsService } from "../services/dealService";
import { Deal, DealFormValues, DealStats, DealStage } from "../types";
import { useToast } from "@/hooks/use-toast";
import { PaginationMetadata } from "@/types/pagination";

export const useDeals = (page = 1, size = 10, search = "", filters = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [allDeals, setAllDeals] = useState<Deal[]>([]);

  // Fetch paginated deals for the list view
  const {
    data: dealsData,
    isLoading: isPaginatedLoading,
    error: paginatedError,
    refetch: refetchPaginated
  } = useQuery({
    queryKey: ["paginatedDeals", page, size, search, filters],
    queryFn: () => dealsService.getDeals(page, size, search, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch all deals for the board view
  const {
    data: allDealsData,
    isLoading: isAllDealsLoading,
    error: allDealsError,
    refetch: refetchAllDeals
  } = useQuery({
    queryKey: ["allDeals"],
    queryFn: () => dealsService.getAllDeals(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Set all deals when data is fetched
  useEffect(() => {
    if (allDealsData) {
      setAllDeals(allDealsData);
    }
  }, [allDealsData]);

  const { data: dealStats = {
    totalPipelineValue: 0,
    weightedPipelineValue: 0,
    dealsWonThisMonth: { count: 0, value: 0 },
    avgDealSize: { value: 0, percentChange: 0 },
    totalDeals: 0
  }, isLoading: isStatsLoading } = useQuery({
    queryKey: ["dealStats"],
    queryFn: () => dealsService.getDealStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createDealMutation = useMutation({
    mutationFn: (dealData: DealFormValues) => dealsService.createDeal(dealData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paginatedDeals"] });
      queryClient.invalidateQueries({ queryKey: ["allDeals"] });
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
      queryClient.invalidateQueries({ queryKey: ["paginatedDeals"] });
      queryClient.invalidateQueries({ queryKey: ["allDeals"] });
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
      queryClient.invalidateQueries({ queryKey: ["paginatedDeals"] });
      queryClient.invalidateQueries({ queryKey: ["allDeals"] });
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
      queryClient.invalidateQueries({ queryKey: ["paginatedDeals"] });
      queryClient.invalidateQueries({ queryKey: ["allDeals"] });
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
      refetchAllDeals(); // Refetch to restore the previous state
    },
  });

  const refetch = () => {
    refetchPaginated();
    refetchAllDeals();
  };

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

  // Determine which deals array to use based on the loading states
  const isLoading = isPaginatedLoading || isAllDealsLoading;

  return {
    deals: dealsData?.data || [],
    allDeals: allDeals,
    pagination: dealsData?.pagination as PaginationMetadata,
    dealStats,
    selectedDeal,
    isDetailsPanelOpen,
    isFormDialogOpen,
    isEditMode,
    isLoading,
    isStatsLoading,
    error: paginatedError || allDealsError,
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
