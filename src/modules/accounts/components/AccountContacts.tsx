
import React from 'react';
import { Contact } from '@/modules/contacts/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, User, Briefcase } from 'lucide-react';

interface AccountContactsProps {
  contacts: Contact[];
}

export const AccountContacts: React.FC<AccountContactsProps> = ({ contacts }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Contacts</h3>
        <Button size="sm">Add Contact</Button>
      </div>
      
      {contacts.length === 0 ? (
        <p className="text-muted-foreground text-sm">No contacts associated with this account.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">{contact.firstName} {contact.lastName}</div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
                
                <div className="space-y-2 text-sm">
                  {contact.jobTitle && (
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{contact.jobTitle}</span>
                    </div>
                  )}
                  
                  {contact.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  
                  {contact.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${contact.phone}`} className="hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
