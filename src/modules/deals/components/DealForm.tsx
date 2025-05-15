
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Deal, DealFormValues } from '../types';

interface DealFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DealFormValues) => void;
  deal?: Deal | null;
  isEditMode: boolean;
}

const dealSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }).optional().or(z.literal('')),
  stage: z.enum(['PROSPECTING', 'LEAD', 'DISCOVERY', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']),
  value: z.number().min(0, { message: 'Value must be positive' }),
  expectedCloseDate: z.date().nullable().optional(),
  actualCloseDate: z.date().nullable().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_HOLD']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  source: z.enum(['WEBSITE', 'REFERRAL', 'COLD_CALL', 'EMAIL', 'SOCIAL_MEDIA', 'EVENT', 'OTHER']),
  nextStep: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
  probability: z.number().min(0).max(100).optional(),
});

export default function DealForm({ isOpen, onClose, onSubmit, deal, isEditMode }: DealFormProps) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      name: '',
      email: '',
      stage: 'LEAD',
      value: 0,
      expectedCloseDate: null,
      actualCloseDate: null,
      status: 'ACTIVE',
      priority: 'MEDIUM',
      source: 'WEBSITE',
      nextStep: '',
      notes: '',
      probability: 0,
    }
  });

  useEffect(() => {
    if (isEditMode && deal) {
      reset({
        name: deal.name,
        email: deal.email || '',
        stage: deal.stage,
        value: deal.value,
        expectedCloseDate: deal.expectedCloseDate ? new Date(deal.expectedCloseDate) : null,
        actualCloseDate: deal.actualCloseDate ? new Date(deal.actualCloseDate) : null,
        status: deal.status,
        priority: deal.priority,
        source: deal.source,
        nextStep: deal.nextStep || '',
        notes: deal.notes || '',
        probability: deal.probability || 0,
      });
    } else {
      reset({
        name: '',
        email: '',
        stage: 'LEAD',
        value: 0,
        expectedCloseDate: null,
        actualCloseDate: null,
        status: 'ACTIVE',
        priority: 'MEDIUM',
        source: 'WEBSITE',
        nextStep: '',
        notes: '',
        probability: 0,
      });
    }
  }, [isEditMode, deal, reset]);

  const handleFormSubmit = (data: DealFormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Deal' : 'Create New Deal'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Deal Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter deal name"
                className={cn(errors.name && "border-red-500")}
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name.message}</span>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                {...register('email')}
                placeholder="Enter contact email"
                className={cn(errors.email && "border-red-500")}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="value">Deal Value</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  {...register('value', { valueAsNumber: true })}
                  placeholder="0.00"
                  className={cn(errors.value && "border-red-500")}
                />
                {errors.value && (
                  <span className="text-sm text-red-500">{errors.value.message}</span>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="probability">Probability (%)</Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  {...register('probability', { valueAsNumber: true })}
                  placeholder="0"
                  className={cn(errors.probability && "border-red-500")}
                />
                {errors.probability && (
                  <span className="text-sm text-red-500">{errors.probability.message}</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stage">Stage</Label>
                <Controller
                  control={control}
                  name="stage"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={cn(errors.stage && "border-red-500")}>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PROSPECTING">Prospecting</SelectItem>
                        <SelectItem value="LEAD">New Lead</SelectItem>
                        <SelectItem value="DISCOVERY">Discovery</SelectItem>
                        <SelectItem value="PROPOSAL">Proposal</SelectItem>
                        <SelectItem value="NEGOTIATION">Negotiation</SelectItem>
                        <SelectItem value="CLOSED_WON">Closed Won</SelectItem>
                        <SelectItem value="CLOSED_LOST">Closed Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={cn(errors.status && "border-red-500")}>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                        <SelectItem value="ON_HOLD">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Controller
                  control={control}
                  name="priority"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={cn(errors.priority && "border-red-500")}>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="source">Lead Source</Label>
                <Controller
                  control={control}
                  name="source"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={cn(errors.source && "border-red-500")}>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WEBSITE">Website</SelectItem>
                        <SelectItem value="REFERRAL">Referral</SelectItem>
                        <SelectItem value="COLD_CALL">Cold Call</SelectItem>
                        <SelectItem value="EMAIL">Email</SelectItem>
                        <SelectItem value="SOCIAL_MEDIA">Social Media</SelectItem>
                        <SelectItem value="EVENT">Event</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Expected Close Date</Label>
                <Controller
                  control={control}
                  name="expectedCloseDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                            errors.expectedCloseDate && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value as Date}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Actual Close Date</Label>
                <Controller
                  control={control}
                  name="actualCloseDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                            errors.actualCloseDate && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value as Date}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="nextStep">Next Step</Label>
              <Input
                id="nextStep"
                {...register('nextStep')}
                placeholder="Next action to take"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Additional notes about this deal"
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? 'Update Deal' : 'Create Deal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
