
import React from 'react';
import { Contact } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Users, 
  Link as LinkIcon, 
  Twitter, 
  User 
} from 'lucide-react';

interface ContactInfoProps {
  contact: Contact;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-sm">{contact.email}</p>
              </div>
            </div>
            
            {contact.phone && (
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="text-sm">{contact.phone}</p>
                </div>
              </div>
            )}
            
            {(contact.jobTitle || contact.department) && (
              <div className="flex items-start space-x-3">
                <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Position</h4>
                  <p className="text-sm">
                    {contact.jobTitle && contact.department 
                      ? `${contact.jobTitle}, ${contact.department}` 
                      : contact.jobTitle || contact.department}
                  </p>
                </div>
              </div>
            )}
            
            {contact.account && (
              <div className="flex items-start space-x-3">
                <Building className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Account</h4>
                  <p className="text-sm">{contact.account.name}</p>
                </div>
              </div>
            )}

            {contact.assignedTo && (
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Assigned To</h4>
                  <p className="text-sm">{contact.assignedTo.firstName} {contact.assignedTo.lastName}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {(contact.address || contact.city || contact.state || contact.postalCode || contact.country) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Address Information</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Address</h4>
                <p className="text-sm">
                  {contact.address && <span className="block">{contact.address}</span>}
                  {(contact.city || contact.state || contact.postalCode) && (
                    <span className="block">
                      {contact.city}{contact.city && contact.state ? ', ' : ''}
                      {contact.state} {contact.postalCode}
                    </span>
                  )}
                  {contact.country && <span className="block">{contact.country}</span>}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {(contact.linkedin || contact.twitter) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Social Profiles</h3>
            <div className="space-y-4">
              {contact.linkedin && (
                <div className="flex items-start space-x-3">
                  <LinkIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">LinkedIn</h4>
                    <a 
                      href={contact.linkedin.startsWith('http') ? contact.linkedin : `https://${contact.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {contact.linkedin}
                    </a>
                  </div>
                </div>
              )}
              
              {contact.twitter && (
                <div className="flex items-start space-x-3">
                  <Twitter className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Twitter</h4>
                    <a 
                      href={`https://twitter.com/${contact.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {contact.twitter}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {contact.source && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Additional Information</h3>
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Source</h4>
                <p className="text-sm">{contact.source}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
