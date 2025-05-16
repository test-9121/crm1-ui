
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Contact, ContactNote, ContactTask, ContactInteraction } from '../types';
import { User } from '@/modules/users/types';
import { ContactInfo } from './ContactInfo';
import { ContactNotes } from './ContactNotes';
import { ContactTasks } from './ContactTasks';
import { ContactInteractions } from './ContactInteractions';
import { ContactDeals } from './ContactDeals';

interface ContactDetailsProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (content: string) => void;
  onUpdateNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
  onAddTask: (task: Omit<ContactTask, 'id'|'createdDateTime'|'createdBy'>) => void;
  onUpdateTask: (taskId: string, task: Partial<ContactTask>) => void;
  onDeleteTask: (taskId: string) => void;
  onAddInteraction: (interaction: Omit<ContactInteraction, 'id'|'createdDateTime'|'createdBy'>) => void;
  onUpdateInteraction: (interactionId: string, interaction: Partial<ContactInteraction>) => void;
  onDeleteInteraction: (interactionId: string) => void;
  currentUser: User;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  isOpen,
  onClose,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onAddInteraction,
  onUpdateInteraction,
  onDeleteInteraction,
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState('info');
  
  if (!contact) return null;
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl flex items-center justify-between">
            <span>{contact.firstName} {contact.lastName}</span>
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
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="deals">Deals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <ContactInfo contact={contact} />
            </TabsContent>
            
            <TabsContent value="notes">
              <ContactNotes 
                notes={contact.notes || []} 
                onAddNote={onAddNote}
                onUpdateNote={onUpdateNote}
                onDeleteNote={onDeleteNote}
                currentUser={currentUser}
              />
            </TabsContent>
            
            <TabsContent value="tasks">
              <ContactTasks 
                tasks={contact.tasks || []}
                onAddTask={onAddTask}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                currentUser={currentUser}
              />
            </TabsContent>
            
            <TabsContent value="interactions">
              <ContactInteractions 
                interactions={contact.interactions || []}
                onAddInteraction={onAddInteraction}
                onUpdateInteraction={onUpdateInteraction}
                onDeleteInteraction={onDeleteInteraction}
                currentUser={currentUser}
              />
            </TabsContent>
            
            <TabsContent value="deals">
              <ContactDeals deals={contact.deals || []} />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
