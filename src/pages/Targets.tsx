
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

// // Target-related imports
// import { useTargets } from "@/modules/targets/hooks/useTargets";
// import { Target } from "@/modules/targets/types";
// import TargetForm from "@/modules/targets/components/TargetForm";
// import TargetHeader from "@/modules/targets/components/TargetHeader";
// import TargetToolbar from "@/modules/targets/components/TargetToolbar";
// import TargetTable from "@/modules/targets/components/TargetTable";
// import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
// import TargetDetailsPanelContent from "@/modules/targets/components/TargetDetailsPanelContent";

// const Targets = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
  
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [tableName, setTableName] = useState("Account Targets");
//   const [tableColor, setTableColor] = useState("#0EA5E9");
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showTargetForm, setShowTargetForm] = useState(false);
//   const [targetToEdit, setTargetToEdit] = useState<Target | null>(null);
//   const [targetToDelete, setTargetToDelete] = useState<string | null>(null);
//   const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
//   const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

//   const {
//     targets = [],
//     isLoading,
//     isEmpty,
//     getTargetById,
//     deleteTarget,
//     pagination,
//     handlePageChange,
//     handlePageSizeChange
//   } = useTargets();

//   // Effect to handle URL-based target editing
//   useEffect(() => {
//     if (id) {
//       const currentTarget = getTargetById(id);
//       if (currentTarget) {
//         setTargetToEdit(currentTarget);
//         setShowTargetForm(true);
//       } else {
//         toast.error("Target not found");
//         navigate("/targets", { replace: true });
//       }
//     } else {
//       // Only reset if we're not coming from the edit route
//       if (!location.pathname.includes("/edit/")) {
//         setTargetToEdit(null);
//       }
//     }
//   }, [id, getTargetById, navigate, location.pathname]);

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

//   const handleEditTarget = (target: Target) => {
//     // setTargetToEdit(target);
//     // setShowTargetForm(true);
    
//     // Update URL to reflect editing state without creating a browser history entry
//     navigate(`/targets/edit/${target.id}`);
//   };

//   const handleDeleteTarget = (targetId: string) => {
//     setTargetToDelete(targetId);
//   };

//   const confirmDelete = () => {
//     if (targetToDelete) {
//       deleteTarget.mutate(targetToDelete);
//       setTargetToDelete(null);
//     }
//   };

//   const handleFormClose = () => {
//     setShowTargetForm(false);
    
//     // Navigate back to targets page with replace to avoid history stacking
//     navigate("/targets", { replace: true });
    
//     // Reset the edit state after a short delay to prevent UI issues
//     setTimeout(() => {
//       setTargetToEdit(null);
//     }, 100);
//   };

//   const handleRowClick = (target: Target) => {
//     setSelectedTarget(target);
//     setIsDetailsPanelOpen(true);
//   };

//   // Filter targets based on search term
//   const filteredTargets = Array.isArray(targets)
//     ? targets.filter(target => 
//         target.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         target.status.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

//   return (
//     <>
//       <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
//         <TargetToolbar 
//           onSearchChange={handleSearchChange}
//           onNewTarget={() => {
//             setTargetToEdit(null);
//             setShowTargetForm(true);
//           }}
//         />
        
//         <TargetHeader 
//           tableName={tableName}
//           tableColor={tableColor}
//           isEditing={isEditing}
//           isCollapsed={isCollapsed}
//           targetsCount={pagination.totalElements}
//           onTableUpdate={handleTableUpdate}
//           onCollapse={toggleCollapse}
//           onEditingChange={setIsEditing}
//         />

//         {!isCollapsed && (
//           <div className="w-full overflow-x-auto">
//             {isLoading ? (
//               <div className="flex justify-center items-center h-32">
//                 <p className="text-gray-500">Loading targets...</p>
//               </div>
//             ) : isEmpty ? (
//               <Alert>
//                 <AlertDescription className="text-center py-8">
//                   No targets available. Click the "New Target" button to add one.
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <TargetTable 
//                 targets={filteredTargets}
//                 tableColor={tableColor}
//                 onEditTarget={handleEditTarget}
//                 onDeleteTarget={handleDeleteTarget}
//                 isLoading={isLoading}
//                 onRowClick={handleRowClick}
//                 pagination={pagination}
//                 onPageChange={handlePageChange}
//                 onPageSizeChange={handlePageSizeChange}
//               />
//             )}
//           </div>
//         )}

//         {/* Side panel for displaying target details */}
//         <DetailsSidePanel
//           data={selectedTarget}
//           open={isDetailsPanelOpen}
//           onClose={() => setIsDetailsPanelOpen(false)}
//           renderContent={(target) => <TargetDetailsPanelContent target={target} />}
//         />

//         {/* Target Form */}
//         {showTargetForm && (
//           <TargetForm
//             open={showTargetForm}
//             onOpenChange={handleFormClose}
//             initialData={targetToEdit}
//           />
//         )}

//         {/* Delete Confirmation */}
//         <AlertDialog open={targetToDelete !== null} onOpenChange={() => setTargetToDelete(null)}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action cannot be undone. This will permanently delete the target.
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

// export default Targets;



import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

// Target-related imports
import { useTargets } from "@/modules/targets/hooks/useTargets";
import { Target } from "@/modules/targets/types";
import TargetForm from "@/modules/targets/components/TargetForm";
import TargetHeader from "@/modules/targets/components/TargetHeader";
import TargetToolbar from "@/modules/targets/components/TargetToolbar";
import TargetTable from "@/modules/targets/components/TargetTable";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import TargetDetailsPanelContent from "@/modules/targets/components/TargetDetailsPanelContent";

const Targets = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("Account Targets");
  const [tableColor, setTableColor] = useState("#0EA5E9");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTargetForm, setShowTargetForm] = useState(false);
  const [targetToEdit, setTargetToEdit] = useState<Target | null>(null);
  const [targetToDelete, setTargetToDelete] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  const {
    targets = [],
    isLoading,
    isEmpty,
    getTargetById,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    deleteTarget
  } = useTargets();

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

  const handleEditTarget = (target: Target) => {
    // Already using the target data directly from the table, perfect!
    // No need to fetch it again from the API
    setTargetToEdit(target);
    setShowTargetForm(true);
  };

  const handleDeleteTarget = (targetId: string) => {
    setTargetToDelete(targetId);
  };

  const confirmDelete = () => {
    if (targetToDelete) {
      deleteTarget.mutate(targetToDelete);
      setTargetToDelete(null);
    }
  };

  const handleFormClose = () => {
    setShowTargetForm(false);
    setTargetToEdit(null);
  };

  const handleRowClick = (target: Target) => {
    setSelectedTarget(target);
    setIsDetailsPanelOpen(true);
  };

  // Filter targets based on search term
  const filteredTargets = Array.isArray(targets)
    ? targets.filter(target => 
        target.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        target.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
        <TargetToolbar 
          onSearchChange={handleSearchChange}
          onNewTarget={() => {
            setTargetToEdit(null);
            setShowTargetForm(true);
          }}
        />
        
        <TargetHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          targetsCount={pagination.totalElements}
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
                onRowClick={handleRowClick}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </div>
        )}

        {/* Side panel for displaying target details */}
        <DetailsSidePanel
          data={selectedTarget}
          open={isDetailsPanelOpen}
          onClose={() => setIsDetailsPanelOpen(false)}
          renderContent={(target) => <TargetDetailsPanelContent target={target} />}
        />

        {/* Target Form */}
        {showTargetForm && (
          <TargetForm
            open={showTargetForm}
            onOpenChange={handleFormClose}
            initialData={targetToEdit}
          />
        )}

        {/* Delete Confirmation */}
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
