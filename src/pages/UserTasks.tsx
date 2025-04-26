
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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
import { useUserTasks } from "@/modules/user-tasks/hooks/useUserTasks";
import { UserTask } from "@/modules/user-tasks/types";
import UserTaskForm from "@/modules/user-tasks/components/UserTaskForm";
import UserTaskHeader from "@/modules/user-tasks/components/UserTaskHeader";
import UserTaskToolbar from "@/modules/user-tasks/components/UserTaskToolbar";
import UserTaskTable from "@/modules/user-tasks/components/UserTaskTable";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import UserTaskDetailsPanelContent from "@/modules/user-tasks/components/UserTaskDetailsPanelContent";

const UserTasks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
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
    getUserTaskById,
    deleteUserTask
  } = useUserTasks();

  // Effect to handle URL-based userTask editing
  useEffect(() => {
    if (id) {
      const currentUserTask = getUserTaskById(id);
      if (currentUserTask) {
        setUserTaskToEdit(currentUserTask);
        setShowUserTaskForm(true);
      } else {
        toast.error("User task not found");
        navigate("/user-tasks", { replace: true });
      }
    } else {
      // Only reset if we're not coming from the edit route
      if (!location.pathname.includes("/edit/")) {
        setUserTaskToEdit(null);
      }
    }
  }, [id, getUserTaskById, navigate, location.pathname]);

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
    setUserTaskToEdit(userTask);
    setShowUserTaskForm(true);
    
    // Update URL to reflect editing state without creating a browser history entry
    navigate(`/user-tasks/edit/${userTask.id}`, { replace: false });
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
    
    // Navigate back to user tasks page with replace to avoid history stacking
    navigate("/user-tasks", { replace: true });
    
    // Reset the edit state after a short delay to prevent UI issues
    setTimeout(() => {
      setUserTaskToEdit(null);
    }, 100);
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
    <DashboardLayout>
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
          userTasksCount={filteredUserTasks.length}
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
    </DashboardLayout>
  );
};

export default UserTasks;
