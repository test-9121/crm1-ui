
// import { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { toast } from "@/components/ui/sonner";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// // User-related imports
// import { useUsers } from "@/modules/users/hooks/useUsers";
// import { User } from "@/modules/users/types";
// import UserForm from "@/modules/users/components/UserForm";
// import UserHeader from "@/modules/users/components/UserHeader";
// import UserToolbar from "@/modules/users/components/UserToolbar";
// import UserTable from "@/modules/users/components/UserTable";
// import { useAuth } from "@/contexts/AuthContext";

// const Users = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
//   const { user } = useAuth();
  
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [tableName, setTableName] = useState("System Users");
//   const [tableColor, setTableColor] = useState("#0ea5e9");
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [userToEdit, setUserToEdit] = useState<User | null>(null);
//   const [userToDelete, setUserToDelete] = useState<string | null>(null);

//   const {
//     users,
//     isLoading,
//     isEmpty,
//     getUserById,
//     deleteUser,
//     pagination,
//     handlePageChange,
//     handlePageSizeChange
//   } = useUsers();

//   // Effect to handle URL-based user editing
//   useEffect(() => {
//     if (id) {
//       const currentUser = getUserById(id);
//       if (currentUser) {
//         setUserToEdit(currentUser);
//         setShowUserForm(true);
//       } else {
//         toast.error("User not found");
//         navigate("/users", { replace: true });
//       }
//     } else {
//       // Only reset if we're not coming from the edit route
//       if (!location.pathname.includes("/edit/")) {
//         setUserToEdit(null);
//       }
//     }
//   }, [id, getUserById, navigate, location.pathname]);

//   const handleTableUpdate = (name: string, color: string) => {
//     setTableName(name);
//     setTableColor(color);
//     setIsEditing(false);
//   };

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const handleSearchChange = (term: string) => {
//     setSearchTerm(term);
//   };

//   const handleEditUser = (user: User) => {
//     setUserToEdit(user);
//     setShowUserForm(true);
    
//     // Update URL to reflect editing state without creating a browser history entry
//     navigate(`/users/edit/${user.id}`, { replace: false });
//   };

//   const handleDeleteUser = (userId: string) => {
//     setUserToDelete(userId);
//   };

//   const confirmDelete = () => {
//     if (userToDelete) {
//       deleteUser.mutate(userToDelete);
//       setUserToDelete(null);
//     }
//   };

//   const handleFormClose = () => {
//     setShowUserForm(false);
    
//     // Navigate back to users page with replace to avoid history stacking
//     navigate("/users", { replace: true });
    
//     // Reset the edit state after a short delay to prevent UI issues
//     setTimeout(() => {
//       setUserToEdit(null);
//     }, 100);
//   };

//   // Ensure users is always an array before filtering
//   const usersArray = Array.isArray(users) ? users : [];
  
//   const filteredUsers = usersArray.filter(user => 
//     `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
//         <UserToolbar 
//           onSearchChange={handleSearchChange}
//           onNewUser={() => {
//             setUserToEdit(null);
//             setShowUserForm(true);
//           }}
//           user={user}
//         />
        
//         <UserHeader 
//           tableName={tableName}
//           tableColor={tableColor}
//           isEditing={isEditing}
//           isCollapsed={isCollapsed}
//           usersCount={pagination.totalElements}
//           onTableUpdate={handleTableUpdate}
//           onCollapse={toggleCollapse}
//           onEditingChange={setIsEditing}
//         />

//         {!isCollapsed && (
//           <div className="w-full overflow-x-auto">
//             {isLoading ? (
//               <div className="flex justify-center items-center h-32">
//                 <p className="text-gray-500">Loading users...</p>
//               </div>
//             ) : isEmpty ? (
//               <Alert>
//                 <AlertDescription className="text-center py-8">
//                   No users available. Click the "New User" button to add one.
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <UserTable 
//                 users={filteredUsers}
//                 tableColor={tableColor}
//                 onEditUser={handleEditUser}
//                 onDeleteUser={handleDeleteUser}
//                 isLoading={isLoading}
//                 accessedUser={user}
//                 pagination={pagination}
//                 onPageChange={handlePageChange}
//                 onPageSizeChange={handlePageSizeChange}
//               />
//             )}
//           </div>
//         )}

//         {/* Only render the UserForm when showUserForm is true */}
//         {showUserForm && (
//           <UserForm
//             open={showUserForm}
//             onOpenChange={handleFormClose}
//             initialData={userToEdit}
//           />
//         )}

//         <AlertDialog open={userToDelete !== null} onOpenChange={() => setUserToDelete(null)}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action cannot be undone. This will permanently delete the user.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction 
//                 onClick={confirmDelete}
//                 className="bg-red-600 hover:bg-red-700"
//               >
//                 Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </>
//   );
// };

// export default Users;




import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";
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

// User-related imports
import { useUsers } from "@/modules/users/hooks/useUsers";
import { User } from "@/modules/users/types";
import UserForm from "@/modules/users/components/UserForm";
import UserHeader from "@/modules/users/components/UserHeader";
import UserToolbar from "@/modules/users/components/UserToolbar";
import UserTable from "@/modules/users/components/UserTable";
import { useAuth } from "@/contexts/AuthContext";

const Users = () => {
  // Removed useNavigate, useParams, useLocation, useEffect
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("System Users");
  const [tableColor, setTableColor] = useState("#0ea5e9");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const {
    users,
    isLoading,
    isEmpty,
    deleteUser,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useUsers();

  const handleTableUpdate = (name: string, color: string) => {
    setTableName(name);
    setTableColor(color);
    setIsEditing(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleEditUser = (user: User) => {
    // Direct edit without navigation or API call
    setUserToEdit(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser.mutate(userToDelete);
      setUserToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowUserForm(false);
    setUserToEdit(null);
  };

  // Ensure users is always an array before filtering
  const usersArray = Array.isArray(users) ? users : [];
  
  const filteredUsers = usersArray.filter(user => 
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <UserToolbar 
          onSearchChange={handleSearchChange}
          onNewUser={() => {
            setUserToEdit(null);
            setShowUserForm(true);
          }}
          user={user}
        />
        
        <UserHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          usersCount={pagination.totalElements}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading users...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No users available. Click the "New User" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <UserTable 
                users={filteredUsers}
                tableColor={tableColor}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
                isLoading={isLoading}
                accessedUser={user}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </div>
        )}

        {/* Only render the UserForm when showUserForm is true */}
        {showUserForm && (
          <UserForm
            open={showUserForm}
            onOpenChange={handleFormClose}
            initialData={userToEdit}
          />
        )}

        <AlertDialog open={userToDelete !== null} onOpenChange={() => setUserToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the user.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Users;
