
import React from 'react';
import { InfiniteScrollSelect } from '@/components/ui/infinite-scroll-select';
import { Organization } from '@/modules/users/types';
import { useUserFormData } from '@/modules/users/hooks/useUserFormData';

interface InfiniteScrollOrganizationSelectProps {
  selectedOrgId: string;
  onSelect: (orgId: string) => void;
  disabled?: boolean;
  className?: string;
}

const InfiniteScrollOrganizationSelect: React.FC<InfiniteScrollOrganizationSelectProps> = ({
  selectedOrgId,
  onSelect,
  disabled = false,
  className
}) => {
  const {
    organizations,
    isLoading,
    fetchNextOrganizations,
    fetchPreviousOrganizations,
    hasMoreOrganizations
  } = useUserFormData();

  // Map organizations to the format expected by InfiniteScrollSelect
  const organizationOptions = organizations.map(org => ({
    value: org.id,
    label: org.name
  }));

  return (
    <InfiniteScrollSelect
      options={organizationOptions}
      value={selectedOrgId}
      onValueChange={onSelect}
      placeholder="Select an organization"
      searchPlaceholder="Search organizations..."
      emptyMessage="No organizations found"
      disabled={disabled}
      className={className}
      isLoading={isLoading}
      hasMore={hasMoreOrganizations}
      fetchNextPage={fetchNextOrganizations}
      fetchPreviousPage={fetchPreviousOrganizations}
    />
  );
};

export default InfiniteScrollOrganizationSelect;
