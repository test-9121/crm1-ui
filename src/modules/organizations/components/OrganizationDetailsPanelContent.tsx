
import React from 'react';
import { Organization } from '@/modules/organizations/types';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface OrganizationDetailsPanelContentProps {
  organization: Organization;
}

const OrganizationDetailsPanelContent: React.FC<OrganizationDetailsPanelContentProps> = ({ 
  organization 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Organization Details</h3>
        <p className="text-sm text-muted-foreground">
          View detailed information about this organization.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Organization Name</h4>
          <p className="text-sm">{organization.name}</p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-medium">Domain</h4>
          <p className="text-sm">{organization.domain || 'N/A'}</p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-medium">Description</h4>
          <p className="text-sm whitespace-pre-wrap">{organization.description || 'No description available.'}</p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-medium">Status</h4>
          <Badge 
            variant={organization.disabled ? "destructive" : "outline"}
            className={organization.disabled ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
          >
            {organization.disabled ? 'Disabled' : 'Active'}
          </Badge>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-medium">Created On</h4>
          <p className="text-sm">
            {organization.createdDateTime ? formatDate(new Date(organization.createdDateTime)) : 'N/A'}
          </p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-medium">Last Updated</h4>
          <p className="text-sm">
            {organization.lastUpdatedDateTime ? formatDate(new Date(organization.lastUpdatedDateTime)) : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetailsPanelContent;
