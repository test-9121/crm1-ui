
import React, { useState } from "react";
import { format } from "date-fns";
import { 
  Calendar, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2 
} from "lucide-react";
import { useDeals } from "@/modules/deals/hooks/useDeals";
import { Deal, DealStage } from "@/modules/deals/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DealForm } from "@/modules/deals/components/DealForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

// Pipeline Columns
const PIPELINE_STAGES: { [key in DealStage]: { label: string; color: string } } = {
  "LEAD": { label: "Lead", color: "bg-blue-500" },
  "DISCOVERY": { label: "Discovery", color: "bg-indigo-500" },
  "PROPOSAL": { label: "Proposal", color: "bg-violet-500" },
  "NEGOTIATION": { label: "Negotiation", color: "bg-purple-500" },
  "CLOSED_WON": { label: "Closed Won", color: "bg-green-500" },
  "CLOSED_LOST": { label: "Closed Lost", color: "bg-red-500" },
  "PROSPECTING": { label: "Prospecting", color: "bg-orange-500" },
};

const getProbabilityByStage = (stage: DealStage): number => {
  switch(stage) {
    case "LEAD": return 20;
    case "DISCOVERY": return 40;
    case "PROPOSAL": return 60;
    case "NEGOTIATION": return 80;
    case "CLOSED_WON": return 100;
    case "CLOSED_LOST": return 0;
    case "PROSPECTING": return 10;
    default: return 0;
  }
};

const DealsPage = () => {
  const { deals, dealStats, isLoading, createDeal, updateDeal, deleteDeal } = useDeals();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"board" | "list" | "analytics">("board");
  
  const [dateRange, setDateRange] = useState({
    start: new Date(2025, 4, 15),
    end: new Date(2025, 5, 14)
  });
  
  // Group deals by stage
  const dealsByStage = deals.reduce((acc, deal) => {
    if (!acc[deal.stage]) {
      acc[deal.stage] = [];
    }
    acc[deal.stage].push(deal);
    return acc;
  }, {} as Record<DealStage, Deal[]>);
  
  const handleCreateDeal = () => {
    setSelectedDeal(null);
    setIsFormOpen(true);
  };
  
  const handleEditDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsFormOpen(true);
  };
  
  const handleDeleteDeal = (id: string) => {
    if (confirm("Are you sure you want to delete this deal?")) {
      deleteDeal.mutate(id);
    }
  };
  
  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData("dealId", dealId);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, stage: DealStage) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("dealId");
    const deal = deals.find(d => d.id === dealId);
    
    if (deal && deal.stage !== stage) {
      updateDeal.mutate({ 
        id: dealId, 
        deal: { 
          stage,
          probability: getProbabilityByStage(stage)
        } 
      });
    }
  };

  const totalValue = dealStats?.totalPipelineValue || 
    deals.reduce((sum, deal) => sum + deal.value, 0);
    
  const weightedValue = dealStats?.weightedPipelineValue ||
    deals.reduce((sum, deal) => {
      const probability = deal.probability || getProbabilityByStage(deal.stage);
      return sum + (deal.value * (probability / 100));
    }, 0);
    
  const closedDeals = deals.filter(deal => deal.stage === "CLOSED_WON");
  const wonValue = dealStats?.dealsWonValue ||
    closedDeals.reduce((sum, deal) => sum + deal.value, 0);
    
  const avgDealSize = dealStats?.avgDealSize ||
    (closedDeals.length > 0 ? wonValue / closedDeals.length : 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Deals Pipeline</h1>
        <Button onClick={handleCreateDeal} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Pipeline Value</p>
            <h2 className="text-3xl font-bold">{formatCurrency(totalValue)}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Across {deals.length} active deals
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Weighted Pipeline</p>
            <h2 className="text-3xl font-bold">{formatCurrency(weightedValue)}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Based on probability
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Deals Won This Month</p>
            <h2 className="text-3xl font-bold">{formatCurrency(wonValue)}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              {closedDeals.length} deals closed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Avg Deal Size</p>
            <h2 className="text-3xl font-bold">{formatCurrency(avgDealSize)}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Tabs 
          value={activeTab} 
          onValueChange={(val) => setActiveTab(val as any)} 
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="board">Board View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <div className="flex justify-end items-center mt-4 gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded-md px-2 py-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {format(dateRange.start, 'MMM d, yyyy')} - {format(dateRange.end, 'MMM d, yyyy')}
              </span>
            </div>
          </div>
          
          <TabsContent value="board" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(PIPELINE_STAGES).map(([stageKey, { label, color }]) => {
                const stage = stageKey as DealStage;
                const stageDeals = dealsByStage[stage] || [];
                const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
                
                return (
                  <div 
                    key={stage}
                    className="bg-background rounded-lg border p-4 h-full"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, stage)}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 ${color} rounded-full mr-2`}></div>
                        <h3 className="font-medium">{label}</h3>
                        <span className="ml-1 text-xs text-gray-500">({stageDeals.length})</span>
                      </div>
                      <span className="text-sm font-medium">{formatCurrency(stageValue)}</span>
                    </div>

                    <div className="space-y-3 min-h-[200px]">
                      {isLoading ? (
                        Array(3).fill(0).map((_, idx) => (
                          <Card key={idx} className="p-3">
                            <Skeleton className="h-5 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                          </Card>
                        ))
                      ) : (
                        stageDeals.map(deal => {
                          const probability = deal.probability || getProbabilityByStage(deal.stage);
                          
                          return (
                            <Card 
                              key={deal.id}
                              className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                              draggable
                              onDragStart={(e) => handleDragStart(e, deal.id)}
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium line-clamp-1">{deal.name}</h4>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditDeal(deal)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteDeal(deal.id)}>
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              
                              <div className="text-sm text-muted-foreground mt-1">
                                {deal.leads.company || deal.leads.firstname + ' ' + deal.leads.lastname}
                              </div>
                              
                              <div className="flex justify-between text-sm mt-1">
                                <span className="font-medium">{formatCurrency(deal.value)}</span>
                                <span className="text-xs text-muted-foreground">
                                  {format(new Date(deal.expectedCloseDate), 'MMM d')}
                                </span>
                              </div>
                              
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                  <span>Probability:</span>
                                  <span>{probability}%</span>
                                </div>
                                <Progress 
                                  value={probability} 
                                  className="h-1.5" 
                                  indicatorClassName={color} 
                                />
                              </div>
                            </Card>
                          );
                        })
                      )}
                      
                      <Button 
                        variant="ghost" 
                        className="w-full border border-dashed h-10 text-muted-foreground"
                        onClick={() => {
                          setSelectedDeal(null);
                          setIsFormOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Deal
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="bg-white dark:bg-gray-800 rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-4 border-b font-medium text-sm">
                <div className="col-span-4">Deal Name</div>
                <div className="col-span-2">Company</div>
                <div className="col-span-2">Value</div>
                <div className="col-span-1">Stage</div>
                <div className="col-span-2">Expected Close</div>
                <div className="col-span-1">Actions</div>
              </div>
              
              {isLoading ? (
                Array(5).fill(0).map((_, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 p-4 border-b">
                    {Array(6).fill(0).map((_, i) => (
                      <div key={i} className={`col-span-${i === 0 ? 4 : i === 5 ? 1 : 2}`}>
                        <Skeleton className="h-5 w-full" />
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                deals.map(deal => (
                  <div key={deal.id} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="col-span-4 font-medium">{deal.name}</div>
                    <div className="col-span-2">{deal.leads.company || deal.leads.firstname + ' ' + deal.leads.lastname}</div>
                    <div className="col-span-2">{formatCurrency(deal.value)}</div>
                    <div className="col-span-1">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 ${PIPELINE_STAGES[deal.stage].color} rounded-full mr-1`}></div>
                        <span className="text-xs">{PIPELINE_STAGES[deal.stage].label}</span>
                      </div>
                    </div>
                    <div className="col-span-2">{format(new Date(deal.expectedCloseDate), 'MMM d, yyyy')}</div>
                    <div className="col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditDeal(deal)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteDeal(deal.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Pipeline by Stage</h3>
                {/* In a real app, you'd insert a chart here */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-6 h-64 flex items-center justify-center">
                  <span className="text-muted-foreground">Pipeline Chart Placeholder</span>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Deals by Source</h3>
                {/* In a real app, you'd insert a chart here */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-6 h-64 flex items-center justify-center">
                  <span className="text-muted-foreground">Source Chart Placeholder</span>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedDeal ? "Edit Deal" : "Create New Deal"}</DialogTitle>
          </DialogHeader>
          <DealForm 
            deal={selectedDeal} 
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealsPage;
