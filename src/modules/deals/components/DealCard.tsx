
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Deal } from '../types';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/format-number';

interface DealCardProps {
  deal: Deal;
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
  onClick: (deal: Deal) => void;
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-100 text-red-600 border-red-200';
    case 'MEDIUM':
      return 'bg-orange-100 text-orange-600 border-orange-200';
    case 'LOW':
      return 'bg-green-100 text-green-600 border-green-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

export const getStageColor = (stage: string) => {
  switch (stage) {
    case 'LEAD':
      return 'border-l-4 border-l-slate-400';
    case 'DISCOVERY':
      return 'border-l-4 border-l-blue-400';
    case 'PROPOSAL':
      return 'border-l-4 border-l-amber-400';
    case 'NEGOTIATION':
      return 'border-l-4 border-l-purple-400';
    case 'CLOSED_WON':
      return 'border-l-4 border-l-green-400';
    case 'CLOSED_LOST':
      return 'border-l-4 border-l-red-400';
    default:
      return 'border-l-4 border-l-gray-300';
  }
};

const DealCard: React.FC<DealCardProps> = ({ deal, onEdit, onDelete, onClick }) => {
  const formattedValue = formatCurrency(deal.value);
  const formattedDate = deal.expectedCloseDate
    ? new Date(deal.expectedCloseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  return (
    <Card 
      className={cn(
        'mb-3 cursor-pointer hover:shadow-md transition-shadow',
        getStageColor(deal.stage)
      )}
      onClick={() => onClick(deal)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 truncate mb-1 pr-4">{deal.name}</h3>
            <div className="text-lg font-semibold text-gray-800">{formattedValue}</div>
            
            {deal.probability !== undefined && (
              <div className="mt-2 mb-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Probability: {deal.probability}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${deal.probability}%` }}
                  />
                </div>
              </div>
            )}
            
            {deal.email && (
              <div className="text-sm text-gray-500 mt-2 truncate">{deal.email}</div>
            )}
            
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className={cn(getPriorityColor(deal.priority))}>
                {deal.priority}
              </Badge>
              
              {formattedDate && (
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <Calendar size={12} />
                  {formattedDate}
                </div>
              )}
            </div>
          </div>
          
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(deal)}>Edit</DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(deal.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealCard;
