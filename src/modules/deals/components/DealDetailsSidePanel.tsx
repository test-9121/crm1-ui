
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Deal } from '../types';
import { formatCurrency } from '@/utils/format-number';
import { Badge } from '@/components/ui/badge';
import {
  CalendarIcon,
  ClockIcon,
  DollarSign,
  Edit,
  Trash2,
  Mail,
  BarChart,
  Tag,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getStageBadge, getStatusBadge } from './DealList';
import { getPriorityColor } from './DealCard';

interface DealDetailsSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
}

export const DealDetailsSidePanel: React.FC<DealDetailsSidePanelProps> = ({
  isOpen,
  onClose,
  deal,
  onEdit,
  onDelete,
}) => {
  if (!deal) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEdit = () => {
    onEdit(deal);
  };

  const handleDelete = () => {
    onDelete(deal.id);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Deal Details</SheetTitle>
          <SheetDescription>View deal information</SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{deal.name}</h2>
            {deal.email && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Mail className="h-4 w-4 mr-1" />
                {deal.email}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Deal Value</p>
                    <p className="text-lg font-semibold">{formatCurrency(deal.value)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <BarChart className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Probability</p>
                    <p className="text-lg font-semibold">{deal.probability || 0}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="mr-2">
                <span className="text-sm text-muted-foreground block mb-1">Stage</span>
                {getStageBadge(deal.stage)}
              </div>
              
              <div className="mr-2">
                <span className="text-sm text-muted-foreground block mb-1">Status</span>
                {getStatusBadge(deal.status)}
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Priority</span>
                <Badge variant="outline" className={getPriorityColor(deal.priority)}>
                  {deal.priority}
                </Badge>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="text-sm text-muted-foreground mb-1">Source</div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1 text-muted-foreground" />
                {deal.source ? deal.source.replace('_', ' ') : 'N/A'}
              </div>
            </div>
            
            <div className="pt-2">
              <div className="text-sm text-muted-foreground mb-1">Expected Close Date</div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                {formatDate(deal.expectedCloseDate)}
              </div>
            </div>
            
            {deal.actualCloseDate && (
              <div className="pt-2">
                <div className="text-sm text-muted-foreground mb-1">Actual Close Date</div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                  {formatDate(deal.actualCloseDate)}
                </div>
              </div>
            )}
            
            {deal.nextStep && (
              <div className="pt-2">
                <div className="text-sm text-muted-foreground mb-1">Next Step</div>
                <div className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1 text-muted-foreground" />
                  {deal.nextStep}
                </div>
              </div>
            )}
            
            {deal.notes && (
              <div className="pt-2">
                <div className="text-sm text-muted-foreground mb-1">Notes</div>
                <div className="flex items-start">
                  <FileText className="h-4 w-4 mr-1 text-muted-foreground mt-1" />
                  <p className="text-sm whitespace-pre-wrap">{deal.notes}</p>
                </div>
              </div>
            )}
            
            <div className="pt-2">
              <div className="text-sm text-muted-foreground mb-1">Created</div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                {formatDate(deal.createdDateTime)}
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="sm:justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleEdit} className="px-3">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="px-3">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DealDetailsSidePanel;
