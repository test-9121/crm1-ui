
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import PaginatedAutocomplete from '@/components/shared/foreign-key';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Dialog, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from 'react-hook-form';
import { Form } from '@/components/hook-form/form-provider';
import { Field } from '@/components/hook-form';
import dayjs from 'dayjs';

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
  expectedCloseDate: z.string().nullable().optional(),
  actualCloseDate: z.string().nullable().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_HOLD']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  source: z.enum(['WEBSITE', 'REFERRAL', 'COLD_CALL', 'EMAIL', 'SOCIAL_MEDIA', 'EVENT', 'OTHER']),
  nextStep: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
  probability: z.number().min(0).max(100).optional(),
  leadId: z.string().optional().or(z.literal('')),
  organizationId: z.string().optional().or(z.literal('')),
});

export default function DealForm({ isOpen, onClose, onSubmit, deal, isEditMode }: DealFormProps) {
  const methods = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      name: '',
      email: '',
      stage: 'NEW',
      value: 0,
      expectedCloseDate: null,
      actualCloseDate: null,
      status: 'ACTIVE',
      priority: 'MEDIUM',
      source: 'WEBSITE',
      nextStep: '',
      notes: '',
      probability: 0,
      leadId: '',
      organizationId: '',
    }
  });

  const { register, handleSubmit, control, reset, watch, setValue, formState: { errors } } = methods;

  useEffect(() => {
    if (isEditMode && deal) {
      reset({
        name: deal.name,
        email: deal.email || '',
        stage: deal.stage,
        value: deal.value,
        expectedCloseDate: deal.expectedCloseDate,
        actualCloseDate: deal.actualCloseDate,
        status: deal.status,
        priority: deal.priority,
        source: deal.source,
        nextStep: deal.nextStep || '',
        notes: deal.notes || '',
        probability: deal.probability || 0,
        leadId: deal.leads?.id || '',
        organizationId: deal.organization?.id || '',
      });
    } else {
      reset({
        name: '',
        email: '',
        stage: 'NEW',
        value: 0,
        expectedCloseDate: null,
        actualCloseDate: null,
        status: 'ACTIVE',
        priority: 'MEDIUM',
        source: 'WEBSITE',
        nextStep: '',
        notes: '',
        probability: 0,
        leadId: '',
        organizationId: '',
      });
    }
  }, [isEditMode, deal, reset]);

  const handleFormSubmit = (data: DealFormValues) => {
    onSubmit(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{isEditMode ? 'Edit Deal' : 'Create New Deal'}</DialogTitle>
          </DialogHeader>

          <Form methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="space-y-4 py-2">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="font-medium">Deal Name *</Label>
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
                  <Label htmlFor="email" className="font-medium">Contact Email</Label>
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
                    <Label htmlFor="value" className="font-medium">Deal Value *</Label>
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
                    <Label htmlFor="leadId" className="font-medium">Lead</Label>
                    <PaginatedAutocomplete
                      value={watch("leadId")}
                      onChange={(val) => setValue("leadId", val)}
                      endpoint="/api/leads/"
                      placeholder="Select lead"
                      dataField="leads"
                      getLabel={(lead) => `${lead.firstname} ${lead.lastname}`}
                      getValue={(lead) => lead.id}
                    />
                    {errors.leadId && (
                      <span className="text-sm text-red-500">{errors.leadId.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormItem>
                      <FormLabel>Stage </FormLabel>
                      <Field.Select name="stage" >
                        <MenuItem value="PROSPECTING">Prospecting</MenuItem>
                        <MenuItem value="NEW">New Lead</MenuItem>
                        <MenuItem value="PROPOSAL">Proposal</MenuItem>
                        <MenuItem value="NEGOTIATION">Negotiation</MenuItem>
                        <MenuItem value="CLOSED_WON">Closed Won</MenuItem>
                        <MenuItem value="CLOSED_LOST">Closed Lost</MenuItem>
                      </Field.Select>
                    </FormItem>

                  </div>

                  <div className="grid gap-2">
                    <FormItem>
                      <FormLabel>Status </FormLabel>
                      <Field.Select name="status" >
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                        <MenuItem value="ON_HOLD">On Hold</MenuItem>
                      </Field.Select>
                    </FormItem>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormItem>
                      <FormLabel>Priority *</FormLabel>
                      <Field.Select name="priority" >
                        <MenuItem value="LOW">Low</MenuItem>
                        <MenuItem value="MEDIUM">Medium</MenuItem>
                        <MenuItem value="HIGH">High</MenuItem>
                      </Field.Select>
                    </FormItem>
                  </div>

                  <div className="grid gap-2">
                    <FormItem>
                      <FormLabel>Source </FormLabel>
                      <Field.Select name="source" >
                        <MenuItem value="WEBSITE">Website</MenuItem>
                        <MenuItem value="REFERRAL">Referral</MenuItem>
                        <MenuItem value="COLD_CALL">Cold Call</MenuItem>
                        <MenuItem value="EMAIL">Email</MenuItem>
                        <MenuItem value="SOCIAL_MEDIA">Social Media</MenuItem>
                        <MenuItem value="EVENT">Event</MenuItem>
                        <MenuItem value="OTHER">Other</MenuItem>
                      </Field.Select>
                    </FormItem>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormItem>
                      <FormLabel>Expected Close Date</FormLabel>
                      <Controller
                        name="expectedCloseDate"
                        control={methods.control}
                        render={({ field }) => (
                          <DatePicker
                            sx={{ maxWidth: "210px" }}
                            // label={<>Created Date <span style={{ color: 'red' }}>*</span></>}
                            value={field.value ? dayjs(field.value, 'YYYY/DD/MM').toDate() : null}  // Convert dayjs to Date
                            onChange={(newValue) => field.onChange(newValue ? newValue.toISOString() : '')}  // Handle the change and store in ISO format
                            slotProps={{
                              textField: {
                                size: "small",
                                // fullWidth: true,
                                error: !!methods.formState.errors.expectedCloseDate,
                                helperText: methods.formState.errors.expectedCloseDate?.message,
                              },
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </div>

                  <div className="grid gap-2">
                    <FormItem>
                      <FormLabel>Actual Close Date</FormLabel>
                      <Controller
                        name="actualCloseDate"
                        control={methods.control}
                        render={({ field }) => (
                          <DatePicker
                            sx={{ maxWidth: "210px" }}
                            // label={<>Created Date <span style={{ color: 'red' }}>*</span></>}
                            value={field.value ? dayjs(field.value, 'YYYY/DD/MM').toDate() : null}  // Convert dayjs to Date
                            onChange={(newValue) => field.onChange(newValue ? newValue.toISOString() : '')}  // Handle the change and store in ISO format
                            slotProps={{
                              textField: {
                                size: "small",
                                // fullWidth: true,
                                error: !!methods.formState.errors.actualCloseDate,
                                helperText: methods.formState.errors.actualCloseDate?.message,
                              },
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="nextStep" className="font-medium">Next Step</Label>
                  <Input
                    id="nextStep"
                    {...register('nextStep')}
                    placeholder="Next action to take"
                  />
                  {errors.nextStep && (
                    <span className="text-sm text-red-500">{errors.nextStep.message}</span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes" className="font-medium">Notes</Label>
                  <Textarea
                    id="notes"
                    {...register('notes')}
                    placeholder="Additional notes about this deal"
                    className="min-h-[100px]"
                  />
                  {errors.notes && (
                    <span className="text-sm text-red-500">{errors.notes.message}</span>
                  )}
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditMode ? 'Update Deal' : 'Create Deal'}
                </Button>
              </DialogFooter>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}
