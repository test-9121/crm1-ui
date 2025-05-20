import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Filter,
  Grid,
  List,
  PieChart,
  Plus,
  Search,
} from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useDeals } from '@/modules/deals/hooks/useDeals';
import DealPipelineBoard from '@/modules/deals/components/DealPipelineBoard';
import DealList from '@/modules/deals/components/DealList';
import DealAnalytics from '@/modules/deals/components/DealAnalytics';
import DealForm from '@/modules/deals/components/DealForm';
import DealDetailsSidePanel from '@/modules/deals/components/DealDetailsSidePanel';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { DealFilters } from '@/modules/deals/types';

interface FiltersState {
  stage: string[];
  status: string[];
  priority: string[];
  minValue: string;
  maxValue: string;
}

export default function Deals() {
  const [view, setView] = useState('board');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<FiltersState>({
    stage: [],
    status: [],
    priority: [],
    minValue: '',
    maxValue: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dealToDelete, setDealToDelete] = useState<string | null>(null);

  const {
    deals,
    allDeals,
    pagination,
    dealStats,
    selectedDeal,
    isDetailsPanelOpen,
    isFormDialogOpen,
    isEditMode,
    isLoading,
    isStatsLoading,
    openDetailsSidePanel,
    closeDetailsSidePanel,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
    createDeal,
    updateDeal,
    deleteDeal,
    updateDealStage,
  } = useDeals(page, pageSize, search, filters as DealFilters);

  // Apply filters to all deals for board view
  const filteredAllDeals = React.useMemo(() => {
    if (!allDeals.length) return [];
    
    return allDeals.filter(deal => {
      // Filter by stage
      if (filters.stage.length > 0 && !filters.stage.includes(deal.stage)) {
        return false;
      }
      
      // Filter by status
      if (filters.status.length > 0 && !filters.status.includes(deal.status)) {
        return false;
      }
      
      // Filter by priority
      if (filters.priority.length > 0 && !filters.priority.includes(deal.priority)) {
        return false;
      }
      
      // Filter by value range
      const minValue = filters.minValue ? Number(filters.minValue) : 0;
      const maxValue = filters.maxValue ? Number(filters.maxValue) : Infinity;
      
      if (deal.value < minValue || deal.value > maxValue) {
        return false;
      }
      
      // Filter by search term
      if (search && !deal.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [allDeals, filters, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (key: keyof FiltersState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleDeleteClick = (id: string) => {
    setDealToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (dealToDelete) {
      deleteDeal(dealToDelete);
      setDeleteDialogOpen(false);
      setDealToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDealToDelete(null);
  };

  const clearFilters = () => {
    setFilters({
      stage: [],
      status: [],
      priority: [],
      minValue: '',
      maxValue: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Deals Pipeline</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Pipeline Value</div>
            <div className="text-2xl font-bold">${(dealStats.totalPipelineValue).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Across {allDeals.filter(d => d.status === 'ACTIVE').length} active deals
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Weighted Pipeline</div>
            <div className="text-2xl font-bold">${(dealStats.weightedPipelineValue).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Based on probability</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Deals Won This Month</div>
            <div className="text-2xl font-bold">${(dealStats.dealsWonThisMonth.value).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{dealStats.dealsWonThisMonth.count} deals closed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Avg Deal Size</div>
            <div className="text-2xl font-bold">${(dealStats.avgDealSize.value).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              <span className={cn(
                "font-medium",
                dealStats.avgDealSize.percentChange >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {dealStats.avgDealSize.percentChange > 0 ? "+" : ""}
                {dealStats.avgDealSize.percentChange}%
              </span>{" "}
              from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals..."
            className="pl-8"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="flex gap-2">
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {(filters.stage.length > 0 ||
                  filters.status.length > 0 ||
                  filters.priority.length > 0 ||
                  filters.minValue ||
                  filters.maxValue) && (
                  <span className="ml-1 rounded-full bg-primary w-2 h-2" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-auto p-0 text-sm"
                  >
                    Clear all
                  </Button>
                </div>
                <Separator />

                {/* Deal Stage Filter */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Deal Stage</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {['NEW', 'DISCOVERY', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'].map((stage) => (
                      <div key={stage} className="flex items-center space-x-2">
                        <Checkbox
                          id={`stage-${stage}`}
                          checked={filters.stage.includes(stage)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange('stage', [...filters.stage, stage]);
                            } else {
                              handleFilterChange(
                                'stage',
                                filters.stage.filter((s) => s !== stage)
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`stage-${stage}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {stage.replace('_', ' ')}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Status</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {['ACTIVE', 'INACTIVE', 'ON_HOLD'].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={filters.status.includes(status)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange('status', [...filters.status, status]);
                            } else {
                              handleFilterChange(
                                'status',
                                filters.status.filter((s) => s !== status)
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`status-${status}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Filter */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Priority</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {['HIGH', 'MEDIUM', 'LOW'].map((priority) => (
                      <div key={priority} className="flex items-center space-x-2">
                        <Checkbox
                          id={`priority-${priority}`}
                          checked={filters.priority.includes(priority)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange('priority', [...filters.priority, priority]);
                            } else {
                              handleFilterChange(
                                'priority',
                                filters.priority.filter((p) => p !== priority)
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`priority-${priority}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {priority}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deal Value Filter */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Deal Value</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="min-value"
                        className="text-sm text-muted-foreground"
                      >
                        Min Value
                      </label>
                      <Input
                        id="min-value"
                        type="number"
                        placeholder="0"
                        value={filters.minValue}
                        onChange={(e) =>
                          handleFilterChange('minValue', e.target.value)
                        }
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="max-value"
                        className="text-sm text-muted-foreground"
                      >
                        Max Value
                      </label>
                      <Input
                        id="max-value"
                        type="number"
                        placeholder="999999"
                        value={filters.maxValue}
                        onChange={(e) =>
                          handleFilterChange('maxValue', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Tabs value={view} onValueChange={setView} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="board">
                <Grid className="h-4 w-4 mr-2" /> Board
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" /> List
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <PieChart className="h-4 w-4 mr-2" /> Analytics
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div>
        {view === 'board' && (
          <div className="mt-6">
            <DealPipelineBoard
              deals={filteredAllDeals}
              onOpenDetail={openDetailsSidePanel}
              onEditDeal={openEditDialog}
              onDeleteDeal={handleDeleteClick}
              onAddDeal={openCreateDialog}
              onUpdateStage={updateDealStage}
              isLoading={isLoading}
            />
          </div>
        )}

        {view === 'list' && (
          <div className="mt-6">
            <DealList
              deals={filteredAllDeals}
              pagination={pagination}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              onEditDeal={openEditDialog}
              onDeleteDeal={handleDeleteClick}
              onOpenDetail={openDetailsSidePanel}
              isLoading={isLoading}
            />
          </div>
        )}

        {view === 'analytics' && (
          <div className="mt-6">
            <DealAnalytics
              stats={dealStats}
              isLoading={isStatsLoading}
              deals={filteredAllDeals}
            />
          </div>
        )}
      </div>

      <DealForm
        isOpen={isFormDialogOpen}
        onClose={closeFormDialog}
        onSubmit={isEditMode ? updateDeal : createDeal}
        deal={selectedDeal}
        isEditMode={isEditMode}
      />

      <DealDetailsSidePanel
        isOpen={isDetailsPanelOpen}
        onClose={closeDetailsSidePanel}
        deal={selectedDeal}
        onEdit={openEditDialog}
        onDelete={handleDeleteClick}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the deal and related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
