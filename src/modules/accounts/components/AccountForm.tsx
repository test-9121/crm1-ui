
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
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Controller } from 'react-hook-form';
import { Form } from '@/components/hook-form/form-provider';
import { Account, AccountFormValues } from '@/modules/contacts/types';
import PaginatedAutocomplete from '@/components/shared/foreign-key';
import { User } from '@/modules/users/types';
import { Organization } from '@/modules/organizations/types';

interface AccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AccountFormValues) => void;
  account?: Account | null;
  isEditMode: boolean;
  users: User[];
  organizations: Organization[];
}

const accountSchema = z.object({
  name: z.string().min(1, { message: 'Account name is required' }),
  industry: z.string().optional().or(z.literal('')),
  annualRevenue: z.number().optional().or(z.nan()),
  employeeCount: z.number().optional().or(z.nan()),
  website: z.string().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  type: z.string().optional().or(z.literal('')),
  status: z.enum(['Active', 'Inactive', 'On Hold']),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  postalCode: z.string().optional().or(z.literal('')),
  country: z.string().optional().or(z.literal('')),
  linkedin: z.string().optional().or(z.literal('')),
  twitter: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  assignedToId: z.string().optional().or(z.literal('')),
  organizationId: z.string().optional().or(z.literal('')),
});

export default function AccountForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  account, 
  isEditMode,
  users,
  organizations
}: AccountFormProps) {
  
  const methods = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: '',
      industry: '',
      annualRevenue: undefined,
      employeeCount: undefined,
      website: '',
      phone: '',
      type: '',
      status: 'Active',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      linkedin: '',
      twitter: '',
      description: '',
      assignedToId: '',
      organizationId: '',
    }
  });

  const { register, handleSubmit, control, reset, watch, setValue, formState: { errors } } = methods;

  useEffect(() => {
    if (isEditMode && account) {
      reset({
        name: account.name,
        industry: account.industry || '',
        annualRevenue: account.annualRevenue || undefined,
        employeeCount: account.employeeCount || undefined,
        website: account.website || '',
        phone: account.phone || '',
        type: account.type || '',
        status: account.status,
        address: account.address || '',
        city: account.city || '',
        state: account.state || '',
        postalCode: account.postalCode || '',
        country: account.country || '',
        linkedin: account.linkedin || '',
        twitter: account.twitter || '',
        description: account.description || '',
        assignedToId: account.assignedToId || '',
        organizationId: account.organizationId || '',
      });
    } else {
      reset({
        name: '',
        industry: '',
        annualRevenue: undefined,
        employeeCount: undefined,
        website: '',
        phone: '',
        type: '',
        status: 'Active',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        linkedin: '',
        twitter: '',
        description: '',
        assignedToId: '',
        organizationId: '',
      });
    }
  }, [isEditMode, account, reset]);

  const handleFormSubmit = (data: AccountFormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{isEditMode ? 'Edit Account' : 'Create New Account'}</DialogTitle>
        </DialogHeader>
        
        <Form methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-medium">Account Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter account name"
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="industry" className="font-medium">Industry</Label>
                <Input
                  id="industry"
                  {...register('industry')}
                  placeholder="Enter industry"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type" className="font-medium">Account Type</Label>
                <Input
                  id="type"
                  {...register('type')}
                  placeholder="Enter account type"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="annualRevenue" className="font-medium">Annual Revenue</Label>
                <Input
                  id="annualRevenue"
                  type="number"
                  {...register('annualRevenue', { valueAsNumber: true })}
                  placeholder="Enter annual revenue"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="employeeCount" className="font-medium">Number of Employees</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  {...register('employeeCount', { valueAsNumber: true })}
                  placeholder="Enter number of employees"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="website" className="font-medium">Website</Label>
                <Input
                  id="website"
                  {...register('website')}
                  placeholder="Enter company website"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone" className="font-medium">Phone</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="Enter company phone"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status" className="font-medium">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="organizationId" className="font-medium">Organization</Label>
                <PaginatedAutocomplete
                  value={watch("organizationId")}
                  onChange={(val) => setValue("organizationId", val)}
                  endpoint="/api/organizations/"
                  placeholder="Select organization"
                  dataField="organizations"
                  getLabel={(org) => org.name}
                  getValue={(org) => org.id}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="font-medium">Address Information</Label>
              <div className="grid gap-2">
                <Input
                  {...register('address')}
                  placeholder="Street Address"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Input
                  {...register('city')}
                  placeholder="City"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  {...register('state')}
                  placeholder="State/Province"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Input
                  {...register('postalCode')}
                  placeholder="Postal Code"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  {...register('country')}
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="linkedin" className="font-medium">LinkedIn</Label>
                <Input
                  id="linkedin"
                  {...register('linkedin')}
                  placeholder="LinkedIn company page URL"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="twitter" className="font-medium">Twitter</Label>
                <Input
                  id="twitter"
                  {...register('twitter')}
                  placeholder="Twitter handle"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="font-medium">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Enter account description"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assignedToId" className="font-medium">Assigned To</Label>
              <PaginatedAutocomplete
                value={watch("assignedToId")}
                onChange={(val) => setValue("assignedToId", val)}
                endpoint="/api/users/"
                placeholder="Select user"
                dataField="users"
                getLabel={(user) => `${user.firstName} ${user.lastName}`}
                getValue={(user) => user.id}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? 'Update Account' : 'Create Account'}
              </Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
