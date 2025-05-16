
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

import { useAccounts } from "@/modules/accounts/hooks/useAccounts";
import { useAccountDetails } from "@/modules/accounts/hooks/useAccountDetails";
import { useUsers } from "@/modules/common/hooks/useEntities";
import { Account, AccountFormValues } from "@/modules/contacts/types";
import AccountForm from "@/modules/accounts/components/AccountForm";
import { AccountDetails } from "@/modules/accounts/components/AccountDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TablePagination } from "@/components/table-pagination";
import { formatDistanceToNow } from "date-fns";
import { Search, Plus, Building, Globe, Phone, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Accounts = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  
  const { 
    accounts, 
    isLoading, 
    pagination, 
    handlePageChange, 
    handlePageSizeChange,
    refetch,
    createAccount,
    updateAccount,
    deleteAccount
  } = useAccounts();
  
  const { users, loading: usersLoading } = useUsers();
  
  const {
    account: selectedAccount,
    notes,
    contacts,
    deals,
    activities,
    addNote,
    updateNote,
    deleteNote
  } = useAccountDetails(selectedAccountId || '');
  
  // Effect to handle URL-based account editing
  useEffect(() => {
    if (id) {
      setSelectedAccountId(id);
    }
  }, [id]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCreateAccount = async (data: AccountFormValues) => {
    try {
      await createAccount(data);
      toast.success("Account created successfully");
      setShowAccountForm(false);
    } catch (error) {
      toast.error("Failed to create account");
      console.error(error);
    }
  };
  
  const handleEditAccount = (account: Account) => {
    setAccountToEdit(account);
    setShowAccountForm(true);
  };
  
  const handleUpdateAccount = async (data: AccountFormValues) => {
    if (accountToEdit) {
      try {
        await updateAccount({ id: accountToEdit.id, data });
        toast.success("Account updated successfully");
        setShowAccountForm(false);
        setAccountToEdit(null);
      } catch (error) {
        toast.error("Failed to update account");
        console.error(error);
      }
    }
  };
  
  const handleDeleteClick = (accountId: string) => {
    setAccountToDelete(accountId);
  };
  
  const confirmDelete = async () => {
    if (accountToDelete) {
      try {
        await deleteAccount(accountToDelete);
        toast.success("Account deleted successfully");
      } catch (error) {
        toast.error("Failed to delete account");
        console.error(error);
      }
      setAccountToDelete(null);
    }
  };
  
  const handleViewDetails = (accountId: string) => {
    setSelectedAccountId(accountId);
  };
  
  const handleCloseDetails = () => {
    setSelectedAccountId(null);
  };
  
  const formatCurrency = (value?: number) => {
    if (!value) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const pageIsLoading = isLoading || usersLoading;
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <Button onClick={() => {
          setAccountToEdit(null);
          setShowAccountForm(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          New Account
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search accounts..."
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
              <TableHead>Industry</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Annual Revenue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageIsLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : accounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  No accounts found. Add your first account to get started.
                </TableCell>
              </TableRow>
            ) : (
              accounts
                .filter(account => 
                  account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (account.industry && account.industry.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (account.website && account.website.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">
                      <button 
                        onClick={() => handleViewDetails(account.id)}
                        className="text-left hover:text-primary hover:underline flex items-center"
                      >
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        {account.name}
                      </button>
                    </TableCell>
                    <TableCell>{account.industry || '-'}</TableCell>
                    <TableCell>
                      {account.website ? (
                        <a 
                          href={account.website.startsWith('http') ? account.website : `https://${account.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:underline"
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          Website
                        </a>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {account.phone ? (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                          {account.phone}
                        </div>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {account.employeeCount ? (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          {account.employeeCount.toLocaleString()}
                        </div>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {account.annualRevenue ? (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          {formatCurrency(account.annualRevenue)}
                        </div>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        account.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : account.status === 'Inactive'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {account.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDistanceToNow(new Date(account.createdDateTime), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditAccount(account)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteClick(account.id)}>
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
      
      <AccountForm
        isOpen={showAccountForm}
        onClose={() => {
          setShowAccountForm(false);
          setAccountToEdit(null);
        }}
        onSubmit={accountToEdit ? handleUpdateAccount : handleCreateAccount}
        account={accountToEdit}
        isEditMode={!!accountToEdit}
        users={users}
        organizations={[]} // Pass actual organizations when available
      />
      
      {selectedAccount && (
        <AccountDetails
          account={selectedAccount}
          isOpen={!!selectedAccountId}
          onClose={handleCloseDetails}
          onAddNote={addNote}
          onUpdateNote={(noteId, content) => updateNote({ noteId, content })}
          onDeleteNote={deleteNote}
          contacts={contacts || []}
          deals={deals || []}
          activities={activities || []}
          currentUser={users[0]} // Assuming the first user is the current user
        />
      )}
      
      <AlertDialog open={!!accountToDelete} onOpenChange={() => setAccountToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the account and all associated data. This action cannot be undone.
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

export default Accounts;
