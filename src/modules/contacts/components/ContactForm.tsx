
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
import { Contact, ContactFormValues } from '../types';
import PaginatedAutocomplete from '@/components/shared/foreign-key';
import { User } from '@/modules/users/types';
import { Account } from '@/modules/contacts/types';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContactFormValues) => void;
  contact?: Contact | null;
  isEditMode: boolean;
  users: User[];
  accounts: Account[];
}

const contactSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z.string().optional().or(z.literal('')),
  jobTitle: z.string().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
  accountId: z.string().optional().or(z.literal('')),
  status: z.enum(['Active', 'Inactive', 'On Hold']),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  postalCode: z.string().optional().or(z.literal('')),
  country: z.string().optional().or(z.literal('')),
  linkedin: z.string().optional().or(z.literal('')),
  twitter: z.string().optional().or(z.literal('')),
  source: z.string().optional().or(z.literal('')),
  assignedToId: z.string().optional().or(z.literal('')),
  isLead: z.boolean().optional(),
  leadId: z.string().optional().or(z.literal('')),
});

export default function ContactForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  contact, 
  isEditMode,
  users,
  accounts
}: ContactFormProps) {
  
  const methods = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      jobTitle: '',
      department: '',
      accountId: '',
      status: 'Active',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      linkedin: '',
      twitter: '',
      source: '',
      assignedToId: '',
      isLead: false,
      leadId: '',
    }
  });

  const { register, handleSubmit, control, reset, watch, setValue, formState: { errors } } = methods;

  useEffect(() => {
    if (isEditMode && contact) {
      reset({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone || '',
        jobTitle: contact.jobTitle || '',
        department: contact.department || '',
        accountId: contact.accountId || '',
        status: contact.status,
        address: contact.address || '',
        city: contact.city || '',
        state: contact.state || '',
        postalCode: contact.postalCode || '',
        country: contact.country || '',
        linkedin: contact.linkedin || '',
        twitter: contact.twitter || '',
        source: contact.source || '',
        assignedToId: contact.assignedToId || '',
        isLead: contact.isLead || false,
        leadId: contact.leadId || '',
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        jobTitle: '',
        department: '',
        accountId: '',
        status: 'Active',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        linkedin: '',
        twitter: '',
        source: '',
        assignedToId: '',
        isLead: false,
        leadId: '',
      });
    }
  }, [isEditMode, contact, reset]);

  const handleFormSubmit = (data: ContactFormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{isEditMode ? 'Edit Contact' : 'Create New Contact'}</DialogTitle>
        </DialogHeader>
        
        <Form methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName" className="font-medium">First Name *</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <span className="text-sm text-red-500">{errors.firstName.message}</span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName" className="font-medium">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <span className="text-sm text-red-500">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-medium">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone" className="font-medium">Phone</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <span className="text-sm text-red-500">{errors.phone.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="jobTitle" className="font-medium">Job Title</Label>
                <Input
                  id="jobTitle"
                  {...register('jobTitle')}
                  placeholder="Enter job title"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="department" className="font-medium">Department</Label>
                <Input
                  id="department"
                  {...register('department')}
                  placeholder="Enter department"
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
                <Label htmlFor="accountId" className="font-medium">Account</Label>
                <PaginatedAutocomplete
                  value={watch("accountId")}
                  onChange={(val) => setValue("accountId", val)}
                  endpoint="/api/accounts/"
                  placeholder="Select account"
                  dataField="accounts"
                  getLabel={(account) => account.name}
                  getValue={(account) => account.id}
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
                  placeholder="LinkedIn profile URL"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="source" className="font-medium">Source</Label>
                <Input
                  id="source"
                  {...register('source')}
                  placeholder="Where did this contact come from?"
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
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? 'Update Contact' : 'Create Contact'}
              </Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
