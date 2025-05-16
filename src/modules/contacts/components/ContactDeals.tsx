
import React from 'react';
import { Deal } from '@/modules/deals/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface ContactDealsProps {
  deals: Deal[];
}

export const ContactDeals: React.FC<ContactDealsProps> = ({ deals }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'PROSPECTING': return 'bg-gray-200 text-gray-800';
      case 'LEAD': return 'bg-blue-200 text-blue-800';
      case 'DISCOVERY': return 'bg-purple-200 text-purple-800';
      case 'PROPOSAL': return 'bg-indigo-200 text-indigo-800';
      case 'NEGOTIATION': return 'bg-yellow-200 text-yellow-800';
      case 'CLOSED_WON': return 'bg-green-200 text-green-800';
      case 'CLOSED_LOST': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getStageLabel = (stage: string) => {
    switch(stage) {
      case 'PROSPECTING': return 'Prospecting';
      case 'LEAD': return 'Lead';
      case 'DISCOVERY': return 'Discovery';
      case 'PROPOSAL': return 'Proposal';
      case 'NEGOTIATION': return 'Negotiation';
      case 'CLOSED_WON': return 'Closed Won';
      case 'CLOSED_LOST': return 'Closed Lost';
      default: return stage;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Associated Deals</h3>
      </div>

      {deals.length === 0 ? (
        <p className="text-muted-foreground text-sm">No deals associated with this contact.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Expected Close</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.name}</TableCell>
                  <TableCell>
                    <Badge className={getStageColor(deal.stage)}>
                      {getStageLabel(deal.stage)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(deal.value)}</TableCell>
                  <TableCell>
                    {deal.expectedCloseDate 
                      ? format(new Date(deal.expectedCloseDate), 'MMM d, yyyy')
                      : 'Not set'}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
