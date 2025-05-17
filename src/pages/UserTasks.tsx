import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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

// Import from restructured modules
import { useUserTasks } from "@/modules/user-tasks/hooks/useUserTasks";
import { useUsers, useProjects } from "@/modules/common/hooks/useEntities";
import { userTaskService } from "@/modules/user-tasks/services/userTaskService";
import { UserTask } from "@/modules/user-tasks/types";
import { UserTaskForm } from "@/modules/user-tasks/components/UserTaskForm";
import UserTaskHeader from "@/modules/user-tasks/components/UserTaskHeader";
import UserTaskToolbar from "@/modules/user-tasks/components/UserTaskToolbar";
import UserTaskTable from "@/modules/user-tasks/components/UserTaskTable";

const UserTasks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("New UserTasks");
  const [tableColor, setTableColor] = useState("#3b82f6");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNewUserTaskForm, setShowNewUserTaskForm] = useState(false);
  const [userTaskToEdit, setUserTaskToEdit] = useState<UserTask | null>(null);
  const [userTaskToDelete, setUserTaskToDelete] = useState<string | null>(null);

  const { tasks, isLoading, isEmpty, getUserTaskById, pagination, 
    handlePageChange, 
    handlePageSizeChange,
    refetch } = useUserTasks();
    
  const { users, loading: usersLoading } = useUsers();
  const { projects, loading: projectsLoading } = useProjects();
  
  // Effect to handle URL-based userTask editing
  useEffect(() => {
    if (id) {
      const currentUserTask = getUserTaskById(id);
      if (currentUserTask) {
        setUserTaskToEdit(currentUserTask);
        setShowNewUserTaskForm(true);
      } else {
        toast.error("UserTask not found");
        navigate("/user-tasks");
      }
    } else {
      // If no ID in URL, reset the edit state
      setUserTaskToEdit(null);
    }
  }, [id, getUserTaskById, navigate]);

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

  const handleNewUserTask = async (data: any) => {
    try {
      if (id) {
        // If we have an ID in the URL, this is an edit operation
        const response = await userTaskService.updateUserTask(id, data);
        return { success: true, data: response };
      } else {
        // If no ID, this is a create operation
        const response = await userTaskService.createUserTask(data);
        return { success: true, data: response };
      }
    } catch (error: any) {
      console.error("Error saving userTask:", error);
      return { 
        success: false, 
        error: error.message || "Failed to save userTask. Please try again later." 
      };
    } finally {
      // Always invalidate the query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["user-tasks"] });
    }
  };

  const handleEditTask = (task: UserTask) => {
    // Update URL with userTask ID instead of directly setting state
    navigate(`/user-tasks/edit/${task.id}`);
  };

  const handleDeleteTask = (taskId: string) => {
    setUserTaskToDelete(taskId);
  };

  const confirmDelete = async () => {
    if (userTaskToDelete) {
      try {
        await userTaskService.deleteUserTask(userTaskToDelete);
        // Invalidate the userTasks query to refetch the updated data
        queryClient.invalidateQueries({ queryKey: ["user-tasks"] });
        toast.success("UserTask deleted successfully");
      } catch (error) {
        console.error("Error deleting userTask:", error);
        toast.error("Failed to delete userTask. Please try again later.");
      }
      setUserTaskToDelete(null);
    }
  };

  // Handler to close the form and navigate back to userTasks list
  const handleFormClose = () => {
    setShowNewUserTaskForm(false);
    setUserTaskToEdit(null);
    
    // If we're in edit mode, navigate back to the userTasks list
    if (id) {
      navigate("/user-tasks");
    }
  };

  const filteredTasks = tasks.filter(task => 
    `${task.taskName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.taskDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.assignedTo?.firstName && task.assignedTo.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pageIsLoading = usersLoading || projectsLoading || isLoading;

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <UserTaskToolbar 
          onSearchChange={handleSearchChange}
          onNewTask={() => {
            setUserTaskToEdit(null);
            setShowNewUserTaskForm(true);
          }}
          onRefresh={refetch}
        />
        
        <UserTaskHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          tasksCount={pagination.totalElements}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <>
          <div className="w-full overflow-x-auto">
            {pageIsLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading data...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No userTasks available. Click the "New UserTask" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <UserTaskTable 
                tasks={filteredTasks}
                tableColor={tableColor}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                isLoading={isLoading}
                accessedUserTask={tasks[0]}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                onTaskSelection={() => {}} // Add a dummy function for required props
              />
            )}
            </div>
          </>
        )}

        <UserTaskForm
          open={showNewUserTaskForm}
          onOpenChange={handleFormClose}
          onSubmit={handleNewUserTask}
          initialData={userTaskToEdit}
          users={users}
          projects={projects}
        />

        <AlertDialog open={userTaskToDelete !== null} onOpenChange={() => setUserTaskToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the userTask.
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
