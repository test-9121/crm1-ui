
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Account, AccountNote, Contact } from '@/modules/contacts/types';
import { User } from '@/modules/users/types';
import { Deal } from '@/modules/deals/types';
import { AccountInfo } from './AccountInfo';
import { AccountNotes } from './AccountNotes';
import { AccountContacts } from './AccountContacts';
import { AccountDeals } from './AccountDeals';
import { AccountActivity } from './AccountActivity';

interface AccountDetailsProps {
  account: Account | null;
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (content: string) => void;
  onUpdateNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
  contacts: Contact[];
  deals: Deal[];
  activities: any[];
  currentUser: User;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({
  account,
  isOpen,
  onClose,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  contacts,
  deals,
  activities,
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState('info');
  
  if (!account) return null;
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl flex items-center justify-between">
            <span>{account.name}</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </SheetTitle>
        </SheetHeader>
        
        <div className="py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="info" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="info">Overview</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="deals">Deals</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <AccountInfo account={account} />
            </TabsContent>
            
            <TabsContent value="contacts">
              <AccountContacts contacts={contacts || []} />
            </TabsContent>
            
            <TabsContent value="deals">
              <AccountDeals deals={deals || []} />
            </TabsContent>
            
            <TabsContent value="activity">
              <AccountActivity activities={activities || []} />
            </TabsContent>
            
            <TabsContent value="notes">
              <AccountNotes 
                notes={account.notes || []} 
                onAddNote={onAddNote}
                onUpdateNote={onUpdateNote}
                onDeleteNote={onDeleteNote}
                currentUser={currentUser}
              />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
