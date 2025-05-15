
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
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
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// import { useOrganizations } from "@/modules/organizations/hooks/useOrganizations";
// import { useIndustries } from "@/modules/common/hooks/useEntities";
// import { Organization } from "@/modules/organizations/types";
// import { OrganizationForm } from "@/modules/organizations/components/OrganizationForm";
// import OrganizationHeader from "@/modules/organizations/components/OrganizationHeader";
// import OrganizationToolbar from "@/modules/organizations/components/OrganizationToolbar";
// import OrganizationTable from "@/modules/organizations/components/OrganizationTable";

// const Organizations = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
  
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [tableName, setTableName] = useState("Organizations");
//   const [tableColor, setTableColor] = useState("#4f46e5");
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showOrganizationForm, setShowOrganizationForm] = useState(false);
//   const [organizationToEdit, setOrganizationToEdit] = useState<Organization | null>(null);
//   const [organizationToDelete, setOrganizationToDelete] = useState<string | null>(null);

//   const { 
//     organizations, 
//     isLoading, 
//     isEmpty, 
//     getOrganizationById,
//     deleteOrganization,
//     pagination,
//     handlePageChange,
//     handlePageSizeChange
//   } = useOrganizations();
  
//   // We're still importing useIndustries but not using it anymore
//   // Keeping it for now in case we need it in the future
//   const { industries, loading: industriesLoading } = useIndustries();

//   // Effect to handle URL-based organization editing
//   useEffect(() => {
//     if (id) {
//       const currentOrganization = getOrganizationById(id);
//       if (currentOrganization) {
//         setOrganizationToEdit(currentOrganization);
//         setShowOrganizationForm(true);
//       } else {
//         toast.error("Organization not found");
//         navigate("/organizations");
//       }
//     } else {
//       setOrganizationToEdit(null);
//     }
//   }, [id, getOrganizationById, navigate]);

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

//   const handleEditOrganization = (organization: Organization) => {
//     navigate(`/organizations/edit/${organization.id}`);
//   };

//   const handleDeleteOrganization = (organizationId: string) => {
//     setOrganizationToDelete(organizationId);
//   };

//   const confirmDelete = async () => {
//     if (organizationToDelete) {
//       try {
//         await deleteOrganization.mutate(organizationToDelete);
//         setOrganizationToDelete(null);
//         toast.success("Organization deleted successfully");
//       } catch (error) {
//         console.error("Error deleting organization:", error);
//         toast.error("An error occurred. Please try again.");
//       }
//     }
//   };

//   const handleFormClose = () => {
//     setShowOrganizationForm(false);
//     setOrganizationToEdit(null);
    
//     if (id) {
//       navigate("/organizations");
//     }
//   };

//   const filteredOrganizations = organizations.filter(org => 
//     org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     org.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (org.description && org.description.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const pageIsLoading = isLoading || industriesLoading;

//   return (
//     <>
//       <div className="flex flex-col gap-6">
//         <OrganizationToolbar 
//           onSearchChange={handleSearchChange}
//           onNewOrganization={() => {
//             setOrganizationToEdit(null);
//             setShowOrganizationForm(true);
//           }}
//         />
        
//         <OrganizationHeader 
//           tableName={tableName}
//           tableColor={tableColor}
//           isEditing={isEditing}
//           isCollapsed={isCollapsed}
//           organizationsCount={pagination.totalElements}
//           onTableUpdate={handleTableUpdate}
//           onCollapse={toggleCollapse}
//           onEditingChange={setIsEditing}
//         />

//         {!isCollapsed && (
//           <>
//             {pageIsLoading ? (
//               <div className="flex justify-center items-center h-32">
//                 <p className="text-gray-500">Loading data...</p>
//               </div>
//             ) : isEmpty ? (
//               <Alert>
//                 <AlertDescription className="text-center py-8">
//                   No organizations available. Click the "New Organization" button to add one.
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <OrganizationTable 
//                 organizations={filteredOrganizations}
//                 tableColor={tableColor}
//                 onEditOrganization={handleEditOrganization}
//                 onDeleteOrganization={handleDeleteOrganization}
//                 isLoading={pageIsLoading}
//               />
//             )}
//           </>
//         )}

//         {/* Pagination Controls */}
//         {!isLoading && !isEmpty && (
//           <Pagination className="mt-4">
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious 
//                   onClick={() => handlePageChange(Math.max(0, pagination.number - 1))}
//                   className={pagination.first ? "pointer-events-none opacity-50" : ""}
//                 />
//               </PaginationItem>
              
//               {Array.from({length: Math.min(5, pagination.totalPages)}).map((_, i) => {
//                 const pageNumber = i;
//                 return (
//                   <PaginationItem key={i}>
//                     <PaginationLink
//                       isActive={pagination.number === pageNumber}
//                       onClick={() => handlePageChange(pageNumber)}
//                     >
//                       {pageNumber + 1}
//                     </PaginationLink>
//                   </PaginationItem>
//                 );
//               })}
              
//               <PaginationItem>
//                 <PaginationNext 
//                   onClick={() => handlePageChange(Math.min(pagination.totalPages - 1, pagination.number + 1))}
//                   className={pagination.last ? "pointer-events-none opacity-50" : ""}
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         )}

//         <OrganizationForm
//           open={showOrganizationForm}
//           onOpenChange={handleFormClose}
//           initialData={organizationToEdit}
//         />

//         <AlertDialog open={organizationToDelete !== null} onOpenChange={() => setOrganizationToDelete(null)}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action cannot be undone. This will permanently delete the organization.
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

// export default Organizations;



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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useOrganizations } from "@/modules/organizations/hooks/useOrganizations";
import { useIndustries } from "@/modules/common/hooks/useEntities";
import { Organization } from "@/modules/organizations/types";
import { OrganizationForm } from "@/modules/organizations/components/OrganizationForm";
import OrganizationHeader from "@/modules/organizations/components/OrganizationHeader";
import OrganizationToolbar from "@/modules/organizations/components/OrganizationToolbar";
import OrganizationTable from "@/modules/organizations/components/OrganizationTable";

const Organizations = () => {
  // Removed useNavigate, useParams, useEffect
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tableName, setTableName] = useState("Organizations");
  const [tableColor, setTableColor] = useState("#4f46e5");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);
  const [organizationToEdit, setOrganizationToEdit] = useState<Organization | null>(null);
  const [organizationToDelete, setOrganizationToDelete] = useState<string | null>(null);

  const { 
    organizations, 
    isLoading, 
    isEmpty, 
    deleteOrganization,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useOrganizations();
  
  // We're still importing useIndustries but not using it anymore
  // Keeping it for now in case we need it in the future
  const { industries, loading: industriesLoading } = useIndustries();

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

  const handleEditOrganization = (organization: Organization) => {
    // Direct edit without navigation or API call
    setOrganizationToEdit(organization);
    setShowOrganizationForm(true);
  };

  const handleDeleteOrganization = (organizationId: string) => {
    setOrganizationToDelete(organizationId);
  };

  const confirmDelete = async () => {
    if (organizationToDelete) {
      try {
        await deleteOrganization.mutate(organizationToDelete);
        setOrganizationToDelete(null);
        toast.success("Organization deleted successfully");
      } catch (error) {
        console.error("Error deleting organization:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleFormClose = () => {
    setShowOrganizationForm(false);
    setOrganizationToEdit(null);
  };

  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (org.description && org.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pageIsLoading = isLoading || industriesLoading;

  return (
    <>
      <div className="flex flex-col gap-6">
        <OrganizationToolbar 
          onSearchChange={handleSearchChange}
          onNewOrganization={() => {
            setOrganizationToEdit(null);
            setShowOrganizationForm(true);
          }}
        />
        
        <OrganizationHeader 
          tableName={tableName}
          tableColor={tableColor}
          isEditing={isEditing}
          isCollapsed={isCollapsed}
          organizationsCount={pagination.totalElements}
          onTableUpdate={handleTableUpdate}
          onCollapse={toggleCollapse}
          onEditingChange={setIsEditing}
        />

        {!isCollapsed && (
          <>
            {pageIsLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading data...</p>
              </div>
            ) : isEmpty ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No organizations available. Click the "New Organization" button to add one.
                </AlertDescription>
              </Alert>
            ) : (
              <OrganizationTable 
                organizations={filteredOrganizations}
                tableColor={tableColor}
                onEditOrganization={handleEditOrganization}
                onDeleteOrganization={handleDeleteOrganization}
                isLoading={pageIsLoading}
              />
            )}
          </>
        )}

        {/* Pagination Controls */}
        {!isLoading && !isEmpty && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(0, pagination.number - 1))}
                  className={pagination.first ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({length: Math.min(5, pagination.totalPages)}).map((_, i) => {
                const pageNumber = i;
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={pagination.number === pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(pagination.totalPages - 1, pagination.number + 1))}
                  className={pagination.last ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        <OrganizationForm
          open={showOrganizationForm}
          onOpenChange={handleFormClose}
          initialData={organizationToEdit}
        />

        <AlertDialog open={organizationToDelete !== null} onOpenChange={() => setOrganizationToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the organization.
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

export default Organizations;
