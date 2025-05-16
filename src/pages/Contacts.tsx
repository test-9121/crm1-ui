
import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useContacts } from "@/modules/contacts/hooks/useContacts";
import { useContactDetails } from "@/modules/contacts/hooks/useContactDetails";
import { useUsers } from "@/modules/common/hooks/useEntities";
import { useAccounts } from "@/modules/accounts/hooks/useAccounts";
import { Contact, ContactFormValues, ContactNote, ContactTask, ContactInteraction } from "@/modules/contacts/types";
import ContactForm from "@/modules/contacts/components/ContactForm";
import { ContactDetails } from "@/modules/contacts/components/ContactDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TablePagination } from "@/components/table-pagination";
import { formatDistanceToNow } from "date-fns";
import { Search, Plus, Mail, Phone, Building } from "lucide-react";

const Contacts = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  
  const { 
    contacts, 
    isLoading, 
    pagination, 
    handlePageChange, 
    handlePageSizeChange,
    refetch,
    createContact,
    updateContact,
    deleteContact
  } = useContacts();
  
  const { users, loading: usersLoading } = useUsers();
  const { accounts, loading: accountsLoading } = useAccounts();
  
  const {
    contact: selectedContact,
    notes,
    tasks,
    interactions,
    addNote,
    updateNote,
    deleteNote,
    addTask,
    updateTask,
    deleteTask,
    addInteraction,
    updateInteraction,
    deleteInteraction
  } = useContactDetails(selectedContactId || '');
  
  // Effect to handle URL-based contact editing
  useEffect(() => {
    if (id) {
      setSelectedContactId(id);
    }
  }, [id]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCreateContact = async (data: ContactFormValues) => {
    try {
      await createContact(data);
      toast.success("Contact created successfully");
      setShowContactForm(false);
    } catch (error) {
      toast.error("Failed to create contact");
      console.error(error);
    }
  };
  
  const handleEditContact = (contact: Contact) => {
    setContactToEdit(contact);
    setShowContactForm(true);
  };
  
  const handleUpdateContact = async (data: ContactFormValues) => {
    if (contactToEdit) {
      try {
        await updateContact({ id: contactToEdit.id, data });
        toast.success("Contact updated successfully");
        setShowContactForm(false);
        setContactToEdit(null);
      } catch (error) {
        toast.error("Failed to update contact");
        console.error(error);
      }
    }
  };
  
  const handleDeleteClick = (contactId: string) => {
    setContactToDelete(contactId);
  };
  
  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        await deleteContact(contactToDelete);
        toast.success("Contact deleted successfully");
      } catch (error) {
        toast.error("Failed to delete contact");
        console.error(error);
      }
      setContactToDelete(null);
    }
  };
  
  const handleViewDetails = (contactId: string) => {
    setSelectedContactId(contactId);
  };
  
  const handleCloseDetails = () => {
    setSelectedContactId(null);
  };
  
  const pageIsLoading = isLoading || usersLoading || accountsLoading;
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Button onClick={() => {
          setContactToEdit(null);
          setShowContactForm(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          New Contact
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageIsLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No contacts found. Add your first contact to get started.
                </TableCell>
              </TableRow>
            ) : (
              contacts
                .filter(contact => 
                  `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (contact.phone && contact.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (contact.account?.name && contact.account.name.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      <button 
                        onClick={() => handleViewDetails(contact.id)}
                        className="text-left hover:text-primary hover:underline"
                      >
                        {contact.firstName} {contact.lastName}
                      </button>
                    </TableCell>
                    <TableCell>
                      {contact.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                          {contact.email}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {contact.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                          {contact.phone}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {contact.account && (
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                          {contact.account.name}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{contact.jobTitle || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        contact.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : contact.status === 'Inactive'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {contact.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDistanceToNow(new Date(contact.createdDateTime), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditContact(contact)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteClick(contact.id)}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        
        <div className="p-2 border-t">
          <TablePagination
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
      
      <ContactForm
        isOpen={showContactForm}
        onClose={() => {
          setShowContactForm(false);
          setContactToEdit(null);
        }}
        onSubmit={contactToEdit ? handleUpdateContact : handleCreateContact}
        contact={contactToEdit}
        isEditMode={!!contactToEdit}
        users={users}
        accounts={accounts}
      />
      
      {selectedContact && (
        <ContactDetails
          contact={selectedContact}
          isOpen={!!selectedContactId}
          onClose={handleCloseDetails}
          onAddNote={addNote}
          onUpdateNote={(noteId, content) => updateNote({ noteId, content })}
          onDeleteNote={deleteNote}
          onAddTask={addTask}
          onUpdateTask={(taskId, task) => updateTask({ taskId, task })}
          onDeleteTask={deleteTask}
          onAddInteraction={addInteraction}
          onUpdateInteraction={(interactionId, interaction) => updateInteraction({ interactionId, interaction })}
          onDeleteInteraction={deleteInteraction}
          currentUser={users[0]} // Assuming the first user is the current user
        />
      )}
      
      <AlertDialog open={!!contactToDelete} onOpenChange={() => setContactToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the contact and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Contacts;
