
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Deal, DealStage } from '../types';
import DealCard from './DealCard';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format-number';
import { Plus } from 'lucide-react';

interface DealColumn {
  id: DealStage;
  title: string;
  dealIds: string[];
}

interface BoardProps {
  deals: Deal[];
  onOpenDetail: (deal: Deal) => void;
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (id: string) => void;
  onAddDeal: () => void;
  onUpdateStage: (dealId: string, stage: string) => void;
  isLoading?: boolean;
}

export const DealPipelineBoard: React.FC<BoardProps> = ({
  deals,
  onOpenDetail,
  onEditDeal,
  onDeleteDeal,
  onAddDeal,
  onUpdateStage,
  isLoading = false,
}) => {
  const stageColumns: DealColumn[] = [
    { id: 'NEW', title: 'New', dealIds: [] },
    { id: 'PROSPECTING', title: 'Prospecting', dealIds: [] },
    // { id: 'DISCOVERY', title: 'Discovery', dealIds: [] },
    { id: 'PROPOSAL', title: 'Proposal', dealIds: [] },
    { id: 'NEGOTIATION', title: 'Negotiation', dealIds: [] },
    { id: 'CLOSED_WON', title: 'Closed Won', dealIds: [] },
    { id: 'CLOSED_LOST', title: 'Closed Lost', dealIds: [] },
  ];

  // Initialize columns with deals
  deals.forEach((deal) => {
    const column = stageColumns.find((col) => col.id === deal.stage);
    if (column) {
      column.dealIds.push(deal.id);
    }
  });

  const getColumnTotal = (columnId: DealStage) => {
    return deals
      .filter((deal) => deal.stage === columnId)
      .reduce((total, deal) => total + deal.value, 0);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or it's the same as source, do nothing
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const newStage = destination.droppableId as DealStage;
    onUpdateStage(draggableId, newStage);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading deals...</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="overflow-x-auto">
        <div className="flex gap-4 p-2 min-w-max">
          {stageColumns.map((column) => (
            <div key={column.id} className="w-[300px] flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{column.title}</h3>
                    <div className="text-xs text-gray-500 mt-1">
                      {column.dealIds.length} deal{column.dealIds.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">
                      {formatCurrency(getColumnTotal(column.id))}
                    </div>
                  </div>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[200px] rounded-md transition-colors ${
                        snapshot.isDraggingOver ? 'bg-gray-100' : ''
                      }`}
                    >
                      {column.dealIds.map((dealId, index) => {
                        const deal = deals.find((d) => d.id === dealId);
                        if (!deal) return null;

                        return (
                          <Draggable key={deal.id} draggableId={deal.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <DealCard
                                  deal={deal}
                                  onEdit={onEditDeal}
                                  onDelete={onDeleteDeal}
                                  onClick={onOpenDetail}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}

                      {column.id === 'NEW' && (
                        <Button
                          variant="ghost"
                          className="w-full flex items-center justify-center mt-2 border border-dashed border-gray-300"
                          onClick={onAddDeal}
                        >
                          <Plus size={16} className="mr-1" />
                          Add Deal
                        </Button>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default DealPipelineBoard;
