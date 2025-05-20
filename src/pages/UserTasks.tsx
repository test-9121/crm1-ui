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
// import { useUserTasks } from "@/modules/user-tasks/hooks/useUserTasks";
// import { UserTask } from "@/modules/user-tasks/types";
// import UserTaskForm from "@/modules/user-tasks/components/UserTaskForm";
// import UserTaskHeader from "@/modules/user-tasks/components/UserTaskHeader";
// import UserTaskToolbar from "@/modules/user-tasks/components/UserTaskToolbar";
// import UserTaskTable from "@/modules/user-tasks/components/UserTaskTable";
// import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
// import UserTaskDetailsPanelContent from "@/modules/user-tasks/components/UserTaskDetailsPanelContent";

// const UserTasks = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [tableName, setTableName] = useState("User Tasks");
//   const [tableColor, setTableColor] = useState("#D946EF");
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showUserTaskForm, setShowUserTaskForm] = useState(false);
//   const [userTaskToEdit, setUserTaskToEdit] = useState<UserTask | null>(null);
//   const [userTaskToDelete, setUserTaskToDelete] = useState<string | null>(null);
//   const [selectedUserTask, setSelectedUserTask] = useState<UserTask | null>(null);
//   const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const {
//     userTasks = [],
//     isLoading,
//     isEmpty,
//     getUserTaskById,
//     deleteUserTask,
//     pagination
//   } = useUserTasks(currentPage, rowsPerPage);

//   useEffect(() => {
//     if (id) {
//       const currentUserTask = getUserTaskById(id);
//       if (currentUserTask) {
//         setUserTaskToEdit(currentUserTask);
//         setShowUserTaskForm(true);
//       } else {
//         toast.error("User task not found");
//         navigate("/user-tasks", { replace: true });
//       }
//     } else {
//       if (!location.pathname.includes("/edit/")) {
//         setUserTaskToEdit(null);
//       }
//     }
//   }, [id, getUserTaskById, navigate, location.pathname]);

//   const handleTableUpdate = (name: string, color: string) => {
//     setTableName(name);
//     setTableColor(color);
//     setIsEditing(false);
//   };

//   const toggleCollapse = () => setIsCollapsed(!isCollapsed);
//   const handleSearchChange = (term: string) => setSearchTerm(term);

//   const handleEditUserTask = (task: UserTask) => {
//     setUserTaskToEdit(task);
//     setShowUserTaskForm(true);
//     navigate(`/user-tasks/edit/${task.id}`, { replace: false });
//   };

//   const handleDeleteUserTask = (taskId: string) => {
//     setUserTaskToDelete(taskId);
//   };

//   const confirmDelete = () => {
//     if (userTaskToDelete) {
//       deleteUserTask.mutate(userTaskToDelete);
//       setUserTaskToDelete(null);
//     }
//   };

//   const handleFormClose = () => {
//     setShowUserTaskForm(false);
//     navigate("/user-tasks", { replace: true });
//     setTimeout(() => setUserTaskToEdit(null), 100);
//   };

//   const handleRowClick = (task: UserTask) => {
//     setSelectedUserTask(task);
//     setIsDetailsPanelOpen(true);
//   };

//   const filteredUserTasks = Array.isArray(userTasks)
//     ? userTasks.filter(userTask =>
//         userTask.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         userTask.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         userTask.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         userTask.priority?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (userTask.user && `${userTask.user.firstName} ${userTask.user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
//       )
//     : [];

//   return (
//     <>
//       <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
//         <UserTaskToolbar
//           onSearchChange={handleSearchChange}
//           onNewUserTask={() => {
//             setUserTaskToEdit(null);
//             setShowUserTaskForm(true);
//           }}
//         />

//         <UserTaskHeader
//           tableName={tableName}
//           tableColor={tableColor}
//           isEditing={isEditing}
//           isCollapsed={isCollapsed}
//           userTasksCount={pagination.totalElements}
//           onTableUpdate={handleTableUpdate}
//           onCollapse={toggleCollapse}
//           onEditingChange={setIsEditing}
//         />

//         {!isCollapsed && (
//           <div className="w-full overflow-x-auto">
//             {isLoading ? (
//               <div className="flex justify-center items-center h-32">
//                 <p className="text-gray-500">Loading user tasks...</p>
//               </div>
//             ) : isEmpty ? (
//               <Alert>
//                 <AlertDescription className="text-center py-8">
//                   No user tasks available. Click the "New Task" button to add one.
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <UserTaskTable
//                 tasks={filteredUserTasks}
//                 tableColor={tableColor}
//                 onEditTask={handleEditUserTask}
//                 onDeleteTask={handleDeleteUserTask}
//                 isLoading={isLoading}
//                 onRowClick={handleRowClick}
//                 pagination={pagination}
//                 onPageChange={setCurrentPage}
//                 onPageSizeChange={(size) => {
//                   setRowsPerPage(size);
//                   setCurrentPage(0);
//                 }}
//               />
//             )}
//           </div>
//         )}

//         <DetailsSidePanel
//           data={selectedUserTask}
//           open={isDetailsPanelOpen}
//           onClose={() => setIsDetailsPanelOpen(false)}
//           renderContent={(userTask) => <UserTaskDetailsPanelContent userTask={userTask} />}
//         />

//         {showUserTaskForm && (
//           <UserTaskForm
//             open={showUserTaskForm}
//             onOpenChange={handleFormClose}
//             initialData={userTaskToEdit}
//           />
//         )}

//         <AlertDialog open={userTaskToDelete !== null} onOpenChange={() => setUserTaskToDelete(null)}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action cannot be undone. This will permanently delete the task.
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

// export default UserTasks;




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

// UserTask-related imports

import { UserTask } from "@/modules/user-tasks/types";
import UserTaskForm from "@/modules/user-tasks/components/UserTaskForm";
import UserTaskHeader from "@/modules/user-tasks/components/UserTaskHeader";
import UserTaskToolbar from "@/modules/user-tasks/components/UserTaskToolbar";
import UserTaskTable from "@/modules/user-tasks/components/UserTaskTable";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import UserTaskDetailsPanelContent from "@/modules/user-tasks/components/UserTaskDetailsPanelContent";
import { useUserTasks } from "@/modules/user-tasks/hooks/useUserTasks";

const UserTasks = () => {
  // Removed useNavigate, useParams, useLocation, useEffect
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("User Tasks");
  const [tableColor, setTableColor] = useState("#D946EF");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserTaskForm, setShowUserTaskForm] = useState(false);
  const [userTaskToEdit, setUserTaskToEdit] = useState<UserTask | null>(null);
  const [userTaskToDelete, setUserTaskToDelete] = useState<string | null>(null);
  const [selectedUserTask, setSelectedUserTask] = useState<UserTask | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  const {
    userTasks = [],
    isLoading,
    isEmpty,
    deleteUserTask,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useUserTasks();

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

  const handleEditUserTask = (userTask: UserTask) => {
    // Direct edit without navigation or API call
    setUserTaskToEdit(userTask);
    setShowUserTaskForm(true);
  };

  const handleDeleteUserTask = (userTaskId: string) => {
    setUserTaskToDelete(userTaskId);
  };

  const confirmDelete = () => {
    if (userTaskToDelete) {
      deleteUserTask.mutate(userTaskToDelete);
      setUserTaskToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowUserTaskForm(false);
    setUserTaskToEdit(null);
  };

  const handleRowClick = (userTask: UserTask) => {
    setSelectedUserTask(userTask);
    setIsDetailsPanelOpen(true);
  };

  // Filter userTasks based on search term
  const filteredUserTasks = Array.isArray(userTasks)
    ? userTasks.filter(userTask => 
        userTask.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userTask.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userTask.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userTask.priority?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (userTask.user && `${userTask.user.firstName} ${userTask.user.lastName}`?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <UserTaskToolbar 
          onSearchChange={handleSearchChange}
          onNewUserTask={() => {
            setUserTaskToEdit(null);
            setShowUserTaskForm(true);
          }}
        />
        
        <UserTaskHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          userTasksCount={pagination.totalElements}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading user tasks...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No user tasks available. Click the "New Task" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <UserTaskTable 
                tasks={filteredUserTasks}
                tableColor={tableColor}
                onEditTask={handleEditUserTask}
                onDeleteTask={handleDeleteUserTask}
                isLoading={isLoading}
                onRowClick={handleRowClick}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </div>
        )}

        {/* Side panel for displaying user task details */}
        <DetailsSidePanel
          data={selectedUserTask}
          open={isDetailsPanelOpen}
          onClose={() => setIsDetailsPanelOpen(false)}
          renderContent={(userTask) => <UserTaskDetailsPanelContent userTask={userTask} />}
        />

        {/* User Task Form */}
        {showUserTaskForm && (
          <UserTaskForm
            open={showUserTaskForm}
            onOpenChange={handleFormClose}
            initialData={userTaskToEdit}
          />
        )}

        {/* Delete Confirmation */}
        <AlertDialog open={userTaskToDelete !== null} onOpenChange={() => setUserTaskToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the task.
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

export default UserTasks;
