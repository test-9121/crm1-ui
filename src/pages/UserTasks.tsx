
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
import UserTaskTable from "@/modules/user-tasks/components/UserTaskTable";
import { useUserTasks } from "@/modules/user-tasks/hooks/useUserTasks";
import { UserTask } from "@/modules/user-tasks/types";
import UserTaskForm from "@/modules/user-tasks/components/UserTaskForm";
import UserTaskHeader from "@/modules/user-tasks/components/UserTaskHeader";
import UserTaskToolbar from "@/modules/user-tasks/components/UserTaskToolbar";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import UserTaskDetailsPanelContent from "@/modules/user-tasks/components/UserTaskDetailsPanelContent";

const UserTasks = () => {
  // State declarations
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("User Tasks");
  const [tableColor, setTableColor] = useState("#9b87f5");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<UserTask | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<UserTask | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  // Fetch tasks
  const {
    userTasks = [],
    isLoading,
    isEmpty,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    deleteUserTask
  } = useUserTasks();

  // Handler functions
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

  const handleEditTask = (task: UserTask) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteUserTask.mutate(taskToDelete);
      setTaskToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowTaskForm(false);
    setTaskToEdit(null);
  };

  const handleOpenTaskDetails = (task: UserTask) => {
    setSelectedTask(task);
    setIsDetailsPanelOpen(true);
  };

  // Filter tasks based on search term
  const filteredTasks = Array.isArray(userTasks) 
    ? userTasks.filter(task => 
        task.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <UserTaskToolbar 
          onSearchChange={handleSearchChange}
          onNewUserTask={() => {
            setTaskToEdit(null);
            setShowTaskForm(true);
          }}
        />
        
        <UserTaskHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          userTasksCount={filteredTasks.length}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading tasks...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No tasks available. Click the "New Task" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <UserTaskTable 
                tasks={filteredTasks}
                tableColor={tableColor}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                isLoading={isLoading}
                onUserTaskClick={handleOpenTaskDetails}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                accessedUserTask={userTasks[0] || null}
              />
            )}
          </div>
        )}

        {/* Side panel for displaying task details */}
        <DetailsSidePanel
          data={selectedTask}
          open={isDetailsPanelOpen}
          onClose={() => setIsDetailsPanelOpen(false)}
          renderContent={(task) => <UserTaskDetailsPanelContent userTask={task} />}
        />

        {/* Task Form */}
        {showTaskForm && (
          <UserTaskForm
            open={showTaskForm}
            onOpenChange={handleFormClose}
            initialData={taskToEdit}
          />
        )}

        {/* Delete Confirmation */}
        <AlertDialog open={taskToDelete !== null} onOpenChange={() => setTaskToDelete(null)}>
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
