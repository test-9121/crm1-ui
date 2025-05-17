import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
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

import { useTargets } from "@/modules/targets/hooks/useTargets";
import { targetService } from "@/modules/targets/services/targetService";
import { Target } from "@/modules/targets/types";
import TargetHeader from "@/modules/targets/components/TargetHeader";
import TargetToolbar from "@/modules/targets/components/TargetToolbar";
import TargetTable from "@/modules/targets/components/TargetTable";
import TargetForm from "@/modules/targets/components/TargetForm";

const Targets = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("New Targets");
  const [tableColor, setTableColor] = useState("#16a38a"); // Emerald color
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNewTargetForm, setShowNewTargetForm] = useState(false);
  const [targetToEdit, setTargetToEdit] = useState<Target | null>(null);
  const [targetToDelete, setTargetToDelete] = useState<string | null>(null);

  const {
    targets,
    isLoading,
    isEmpty,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    refetch
  } = useTargets();

  useEffect(() => {
    if (targetToEdit) {
      setShowNewTargetForm(true);
    }
  }, [targetToEdit]);

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

  const handleNewTarget = async (data: any) => {
    try {
      if (targetToEdit) {
        // If we have a target to edit, this is an update operation
        await targetService.update(targetToEdit.id, data);
        toast.success("Target updated successfully");
      } else {
        // If no target to edit, this is a create operation
        await targetService.create(data);
        toast.success("Target created successfully");
      }
      // Invalidate the targets query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["targets"] });
      return { success: true };
    } catch (error: any) {
      console.error("Error saving target:", error);
      toast.error(error.message || "Failed to save target. Please try again later.");
      return { success: false };
    } finally {
      setShowNewTargetForm(false);
      setTargetToEdit(null);
    }
  };

  const handleEditTarget = (target: Target) => {
    setTargetToEdit(target);
    setShowNewTargetForm(true);
  };

  const handleDeleteTarget = (targetId: string) => {
    setTargetToDelete(targetId);
  };

  const handleTargetClick = (target: Target) => {
    // This function would show the target details
    console.log("Target clicked:", target);
  };

  const confirmDelete = async () => {
    if (targetToDelete) {
      try {
        await targetService.delete(targetToDelete);
        // Invalidate the targets query to refetch the updated data
        queryClient.invalidateQueries({ queryKey: ["targets"] });
        toast.success("Target deleted successfully");
      } catch (error) {
        console.error("Error deleting target:", error);
        toast.error("Failed to delete target. Please try again later.");
      }
      setTargetToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowNewTargetForm(false);
    setTargetToEdit(null);
  };

  const filteredTargets = targets.filter(target => 
    (target.targetName || target.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (target.targetDescription || target.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <TargetToolbar 
          onSearchChange={handleSearchChange}
          onNewTarget={() => {
            setTargetToEdit(null);
            setShowNewTargetForm(true);
          }}
          onRefresh={refetch}
        />
        
        <TargetHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          targetsCount={targets.length}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <div className="w-full overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading targets...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No targets available. Click the "New Target" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <TargetTable 
                targets={filteredTargets}
                tableColor={tableColor}
                onEditTarget={handleEditTarget}
                onDeleteTarget={handleDeleteTarget}
                isLoading={isLoading}
                accessedTarget={targets[0]}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                onTargetClick={handleTargetClick}  // Changed from onTargetSelection to onTargetClick
              />
            )}
          </div>
        )}

        <TargetForm
          open={showNewTargetForm}
          onOpenChange={handleFormClose}
          initialData={targetToEdit}
        />

        <AlertDialog open={targetToDelete !== null} onOpenChange={() => setTargetToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the target.
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

export default Targets;
