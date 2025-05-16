
import React from 'react';
import { Account } from '@/modules/contacts/types';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  Link as LinkIcon, 
  Twitter, 
  User,
  DollarSign,
  Info
} from 'lucide-react';

interface AccountInfoProps {
  account: Account;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ account }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Account Information</h3>
          <div className="space-y-4">
            {account.industry && (
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Industry</h4>
                  <p className="text-sm">{account.industry}</p>
                </div>
              </div>
            )}
            
            {account.type && (
              <div className="flex items-start space-x-3">
                <Building className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Account Type</h4>
                  <p className="text-sm">{account.type}</p>
                </div>
              </div>
            )}
            
            {account.website && (
              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Website</h4>
                  <a 
                    href={account.website.startsWith('http') ? account.website : `https://${account.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {account.website}
                  </a>
                </div>
              </div>
            )}
            
            {account.phone && (
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-sm">{account.phone}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <p className="text-sm">{account.status}</p>
              </div>
            </div>
            
            {account.employeeCount && (
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Employees</h4>
                  <p className="text-sm">{account.employeeCount.toLocaleString()}</p>
                </div>
              </div>
            )}
            
            {account.annualRevenue && (
              <div className="flex items-start space-x-3">
                <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Annual Revenue</h4>
                  <p className="text-sm">
                    {new Intl.NumberFormat('en-US', { 
                      style: 'currency', 
                      currency: 'USD',
                      maximumFractionDigits: 0
                    }).format(account.annualRevenue)}
                  </p>
                </div>
              </div>
            )}
            
            {account.assignedTo && (
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Account Owner</h4>
                  <p className="text-sm">{account.assignedTo.firstName} {account.assignedTo.lastName}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {(account.address || account.city || account.state || account.postalCode || account.country) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Address Information</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Address</h4>
                <p className="text-sm">
                  {account.address && <span className="block">{account.address}</span>}
                  {(account.city || account.state || account.postalCode) && (
                    <span className="block">
                      {account.city}{account.city && account.state ? ', ' : ''}
                      {account.state} {account.postalCode}
                    </span>
                  )}
                  {account.country && <span className="block">{account.country}</span>}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {(account.linkedin || account.twitter) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Social Profiles</h3>
            <div className="space-y-4">
              {account.linkedin && (
                <div className="flex items-start space-x-3">
                  <LinkIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">LinkedIn</h4>
                    <a 
                      href={account.linkedin.startsWith('http') ? account.linkedin : `https://${account.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {account.linkedin}
                    </a>
                  </div>
                </div>
              )}
              
              {account.twitter && (
                <div className="flex items-start space-x-3">
                  <Twitter className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Twitter</h4>
                    <a 
                      href={`https://twitter.com/${account.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {account.twitter}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {account.description && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Description</h3>
            <p className="text-sm whitespace-pre-wrap">{account.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
