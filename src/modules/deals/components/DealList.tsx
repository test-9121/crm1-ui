
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Deal } from '../types';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getPriorityColor } from './DealCard';
import { formatCurrency } from '@/utils/format-number';
import { TablePagination } from '@/components/table-pagination';
import { PaginationMetadata } from '@/types/pagination';

interface DealListProps {
  deals: Deal[];
  pagination: PaginationMetadata;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (id: string) => void;
  onOpenDetail: (deal: Deal) => void;
  isLoading?: boolean;
}

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">Active</Badge>;
    case 'INACTIVE':
      return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-100">Inactive</Badge>;
    case 'ON_HOLD':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-100">On Hold</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const getStageBadge = (stage: string) => {
  switch (stage) {
    case 'LEAD':
      return <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-100">Lead</Badge>;
    case 'DISCOVERY':
      return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">Discovery</Badge>;
    case 'PROPOSAL':
      return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100">Proposal</Badge>;
    case 'NEGOTIATION':
      return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-100">Negotiation</Badge>;
    case 'CLOSED_WON':
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">Closed Won</Badge>;
    case 'CLOSED_LOST':
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100">Closed Lost</Badge>;
    default:
      return <Badge variant="outline">{stage}</Badge>;
  }
};

export const DealList: React.FC<DealListProps> = ({
  deals,
  pagination,
  onPageChange,
  onPageSizeChange,
  onEditDeal,
  onDeleteDeal,
  onOpenDetail,
  isLoading = false,
}) => {
  return (
    <div className="rounded-md border">
      <Table className="overflow-auto custom-scrollbar h-1/2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Deal</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Expected Close</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                Loading deals...
              </TableCell>
            </TableRow>
          )}
          {!isLoading && deals.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No deals found
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            deals.map((deal) => (
              <TableRow key={deal.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onOpenDetail(deal)}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{deal.name}</div>
                    {deal.email && (
                      <div className="text-sm text-muted-foreground">{deal.email}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getStageBadge(deal.stage)}</TableCell>
                <TableCell className="font-medium">{formatCurrency(deal.value)}</TableCell>
                <TableCell>{getStatusBadge(deal.status)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(deal.priority)}>
                    {deal.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  {deal.expectedCloseDate
                    ? new Date(deal.expectedCloseDate).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditDeal(deal)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDeleteDeal(deal.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      
      {/* <TablePagination
        pagination={pagination}
        onPageChange={onPageChange}
        onRowsPerPageChange={onPageSizeChange}
      /> */}
    </div>
  );
};

export default DealList;
