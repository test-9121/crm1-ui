
// import React, { useState } from "react";
// import { Organization } from "@/modules/organizations/types";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Edit, Trash2, MoreHorizontal } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface OrganizationTableProps {
//   organizations: Organization[];
//   tableColor: string;
//   onEditOrganization: (organization: Organization) => void;
//   onDeleteOrganization: (id: string) => void;
//   isLoading?: boolean;
// }

// const OrganizationTable = ({
//   organizations,
//   tableColor,
//   onEditOrganization,
//   onDeleteOrganization,
//   isLoading = false,
// }: OrganizationTableProps) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   if (isLoading) {
//     return (
//       <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Domain</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="w-[80px]">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {Array.from({ length: 5 }).map((_, rowIndex) => (
//                 <TableRow key={rowIndex}>
//                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
//                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
//                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
//                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
//                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!Array.isArray(organizations) || organizations.length === 0) {
//     return (
//       <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
//         <CardContent className="p-6 flex justify-center items-center">
//           <p className="text-muted-foreground">No organizations found.</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   // Calculate pagination values
//   const totalPages = Math.ceil(organizations.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const endIndex = Math.min(startIndex + rowsPerPage, organizations.length);
//   const paginatedData = organizations.slice(startIndex, endIndex);

//   // Handle page changes
//   const handlePreviousPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const handlePageSelect = (page: number) => {
//     setCurrentPage(page);
//   };

//   // Handle rows per page change
//   const handleRowsPerPageChange = (value: string) => {
//     const newRowsPerPage = parseInt(value, 10);
//     setRowsPerPage(newRowsPerPage);
//     setCurrentPage(1); // Reset to first page when changing rows per page
//   };

//   // Generate page numbers for pagination
//   const generatePaginationItems = () => {
//     const items = [];
//     const maxDisplayPages = 5; // Max number of page numbers to show
    
//     let startPage = Math.max(1, currentPage - 2);
//     let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);
    
//     // Adjust start page if end page is at max
//     if (endPage === totalPages) {
//       startPage = Math.max(1, endPage - maxDisplayPages + 1);
//     }

//     // Add pages
//     for (let i = startPage; i <= endPage; i++) {
//       items.push(
//         <PaginationItem key={i}>
//           <PaginationLink 
//             isActive={currentPage === i}
//             onClick={() => handlePageSelect(i)}
//           >
//             {i}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }

//     return items;
//   };

//   return (
//     <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
//       <CardContent className="p-0">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Domain</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="w-[80px]">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             {paginatedData.length !== 0 ? (
//             <TableBody>
//               {paginatedData.map((organization) => (
//                 <TableRow key={organization.id}>
//                   <TableCell>{organization.name}</TableCell>
//                   <TableCell>{organization.domain}</TableCell>
//                   <TableCell>{organization.description}</TableCell>
//                   <TableCell>
//                     <Badge variant={organization.disabled ? "destructive" : "default"}>
//                       {organization.disabled ? "Disabled" : "Active"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="h-8 w-8">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end" className="w-[160px]">
//                         <DropdownMenuItem onClick={() => onEditOrganization(organization)}>
//                           <Edit className="mr-2 h-4 w-4" />
//                           Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => onDeleteOrganization(organization.id)}
//                           className="text-red-600 focus:text-red-600"
//                         >
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>) : (
//               <TableBody>
//                 <TableRow>
//                   <TableCell colSpan={5} className="text-center">
//                     No data available.
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             )}
//           </Table>
//         </div>
//       </CardContent>
//       {organizations.length > 0 && (
//         <CardFooter className="flex items-center justify-between px-6 py-4 border-t">
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-muted-foreground">Rows per page</span>
//             <Select
//               value={rowsPerPage.toString()}
//               onValueChange={handleRowsPerPageChange}
//             >
//               <SelectTrigger className="h-8 w-[70px]">
//                 <SelectValue placeholder={rowsPerPage} />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="5">5</SelectItem>
//                 <SelectItem value="10">10</SelectItem>
//                 <SelectItem value="25">25</SelectItem>
//                 <SelectItem value="50">50</SelectItem>
//               </SelectContent>
//             </Select>
//             <span className="text-sm text-muted-foreground">
//               {startIndex + 1}-{endIndex} of {organizations.length}
//             </span>
//           </div>
          
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious 
//                   onClick={handlePreviousPage}
//                   className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                 />
//               </PaginationItem>
              
//               {generatePaginationItems()}
              
//               <PaginationItem>
//                 <PaginationNext 
//                   onClick={handleNextPage}
//                   className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </CardFooter>
//       )}
//     </Card>
//   );
// };

// export default OrganizationTable;



import { useState, useEffect, useMemo, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Organization } from "@/modules/organizations/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { Check, X, Edit2 as EditIcon, Trash2, MoreVertical, Mail, Building2, CalendarDays, ShieldCheck, Plus, Copy, Loader2, Palette, UserCog } from "lucide-react";
import { PaginationMetadata } from "@/modules/targets/types";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
// import OrganizationDetailsPanelContent from "../components/OrganizationDetailsPanelContent";
import { Card, CardContent } from "@mui/material";
import { TablePagination } from "@/components/table-pagination";
import { CardFooter } from "@/components/ui/card";

const PREDEFINED_HEADER_COLORS = [
  { name: 'Default', value: undefined },
  { name: 'Teal', value: 'hsl(var(--chart-1))' },
  { name: 'Orange', value: 'hsl(var(--chart-2))' },
  { name: 'Gray', value: 'hsl(var(--muted))' },
];

interface OrganizationTableProps {
  organizations: Organization[];
  tableColor: string;
  onEditOrganization: (organization: Organization) => void;
  onDeleteOrganization: (organizationId: string) => void;
  isLoading?: boolean;
  accessedOrganization?: Organization;
  pagination: PaginationMetadata;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface ColumnConfig<T> {
  id: string;
  label: string;
  accessor: keyof T | ((item: T) => unknown);
  cell: (item: T) => JSX.Element;
  icon?: React.ComponentType<{ className?: string }>;
  defaultVisible?: boolean;
  canHide?: boolean;
  isFixed?: 'left' | 'right';
  stickyOffset?: string;
  minWidth?: string;
  width?: string;
  thClassName?: string;
  tdClassName?: string;
  headerColor?: string;
}

const OrganizationTable = ({
  organizations,
  tableColor,
  onEditOrganization,
  onDeleteOrganization,
  isLoading = false,
  pagination,
  onPageChange,
  onPageSizeChange
}: OrganizationTableProps) => {
  const { toast } = useToast();
  const [currentSelectedRows, setCurrentSelectedRows] = useState<Record<string, boolean>>({});
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [isDense, setIsDense] = useState(false);
  const [editingHeader, setEditingHeader] = useState<{ id: string; currentLabel: string } | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const baseInitialOrganizationColumnConfig: Omit<ColumnConfig<Organization>, 'id' | 'label' | 'accessor' | 'cell' | 'icon'>[] = useMemo(() => [
    {
      defaultVisible: true,
      canHide: false,
      isFixed: 'left',
      stickyOffset: '0px',
      width: '32px',
      thClassName: 'sticky left-0 top-0 bg-slate-50 dark:bg-slate-800 border-r-0',
      tdClassName: 'sticky left-0 bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted border-r-0'
    },
    {
      defaultVisible: true,
      canHide: false,
      isFixed: 'left',
      stickyOffset: '23px',
      minWidth: '200px',
      thClassName: 'sticky left-[32px] top-0 bg-slate-50 dark:bg-slate-800',
      tdClassName: 'sticky left-[32px] bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted'
    },
    { defaultVisible: true, canHide: true, minWidth: '220px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    { defaultVisible: true, canHide: true, minWidth: '150px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    { defaultVisible: true, canHide: true, minWidth: '120px', thClassName: 'bg-slate-50 dark:bg-slate-800 text-center' },
    { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    {
      defaultVisible: true,
      canHide: false,
      isFixed: 'right',
      stickyOffset: '0px',
      // width: '50px', 
      thClassName: 'sticky right-0 top-0 z-30 bg-slate-50 dark:bg-slate-800',
      tdClassName: 'sticky right-0 z-20 bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted'
    },
  ], []);

const initialOrganizationColumnDefinitions: ColumnConfig<Organization>[] = useMemo(() => [
  { 
    ...baseInitialOrganizationColumnConfig[0], 
    id: 'checkbox', 
    label: '', 
    accessor: 'id', 
    cell: (organization: Organization) => (
      <Checkbox 
        checked={!!currentSelectedRows[organization.id]} 
        onCheckedChange={(checked) => setCurrentSelectedRows(prev => ({ ...prev, [organization.id]: Boolean(checked) }))} 
        aria-labelledby={`organization-name-${organization.id}`} 
        className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
      />
    ) 
  },
  { 
    ...baseInitialOrganizationColumnConfig[1], 
    id: 'name', 
    label: 'Organization Name', 
    accessor: 'name', 
    cell: (organization: Organization) => (
      <div className="font-medium text-primary hover:underline whitespace-nowrap cursor-pointer">
        {organization.name}
      </div>
    )
  },
  { 
    ...baseInitialOrganizationColumnConfig[2], 
    id: 'description', 
    label: 'Description', 
    accessor: 'description', 
    cell: (organization: Organization) => <span className="text-gray-700 dark:text-gray-300">{organization.description}</span> 
  },
  { 
    ...baseInitialOrganizationColumnConfig[3], 
    id: 'domain', 
    label: 'Domain', 
    accessor: 'domain', 
    cell: (organization: Organization) => <span className="text-gray-700 dark:text-gray-300">{organization.domain}</span> 
  },
  { 
    ...baseInitialOrganizationColumnConfig[4], 
    id: 'disabled', 
    label: 'Disabled', 
    accessor: 'disabled', 
    cell: (organization: Organization) => (
      <Badge 
        variant={organization.disabled ? 'outline' : 'default'} 
        className={organization.disabled ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700' : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700'}
      >
        {organization.disabled ? 'Yes' : 'No'}
      </Badge>
    ) 
  },
  { 
    ...baseInitialOrganizationColumnConfig[5], 
    id: 'createdDateTime', 
    label: 'Created Date', 
    accessor: 'createdDateTime', 
    cell: (organization: Organization) => (
      <span className="text-gray-700 dark:text-gray-300">{organization.createdDateTime ? format(parseISO(organization.createdDateTime), 'MMM d, yyyy') : '-'}</span>
    )
  },
  { 
    ...baseInitialOrganizationColumnConfig[6], 
    id: 'lastUpdatedDateTime', 
    label: 'Last Updated Date', 
    accessor: 'lastUpdatedDateTime', 
    cell: (organization: Organization) => (
      <span className="text-gray-700 dark:text-gray-300">{organization.lastUpdatedDateTime ? format(parseISO(organization.lastUpdatedDateTime), 'MMM d, yyyy') : '-'}</span>
    )
  },
  { 
    ...baseInitialOrganizationColumnConfig[7], 
    id: 'logoImgSrc', 
    label: 'Logo', 
    accessor: 'logoImgSrc', 
    cell: (organization: Organization) => (
      organization.logoImgSrc ? (
        <img src={organization.logoImgSrc} alt="Organization Logo" className="h-8 w-8 rounded-full" />
      ) : (
        <span className="text-gray-700 dark:text-gray-300">-</span>
      )
    ) 
  },
  { 
    ...baseInitialOrganizationColumnConfig[8], 
    id: 'actions', 
    label: '', 
    accessor: 'id', 
    cell: (organization: Organization) => (
      (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditOrganization(organization)}>
              <EditIcon className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDeleteOrganization(organization.id)} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) 
    )
  },
], [baseInitialOrganizationColumnConfig, currentSelectedRows, onDeleteOrganization, onEditOrganization]);






  const [columnConfigs, setColumnConfigs] = useState<ColumnConfig<Organization>[]>(initialOrganizationColumnDefinitions);

  useEffect(() => {
    setColumnConfigs(initialOrganizationColumnDefinitions);
  }, [initialOrganizationColumnDefinitions]);

  const initialVisibility = useMemo(() => {
    const visibility: Record<string, boolean> = {};
    columnConfigs.forEach(col => {
      visibility[col.id] = col.defaultVisible;
    });
    return visibility;
  }, [columnConfigs]);

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(initialVisibility);

  useEffect(() => {
    setColumnVisibility(prevVisibility => {
      const newCalculatedVisibility: Record<string, boolean> = {};
      columnConfigs.forEach(col => {
        newCalculatedVisibility[col.id] = prevVisibility[col.id] === undefined ? col.defaultVisible : prevVisibility[col.id];
      });
      if (JSON.stringify(newCalculatedVisibility) !== JSON.stringify(prevVisibility)) {
        return newCalculatedVisibility;
      }
      return prevVisibility;
    });
  }, [columnConfigs]);

  const handleOrganizationClick = (organization: Organization) => {
    setSelectedOrganization(organization);
    setDetailsPanelOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRowsLocal: Record<string, boolean> = {};
    if (checked) {
      organizations.forEach(organization => newSelectedRowsLocal[organization.id] = true);
    }
    setCurrentSelectedRows(newSelectedRowsLocal);
  };

  const allSelected = organizations.length > 0 && organizations.every(organization => currentSelectedRows[organization.id]);

  const visibleColumns = useMemo(() => {
    return columnConfigs.filter(col => columnVisibility[col.id]);
  }, [columnConfigs, columnVisibility]);

  const toggleMainColumnVisibility = (columnId: string) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleEditHeader = (col: ColumnConfig<Organization>) => {
    setEditingHeader({ id: col.id, currentLabel: col.label });
  };

  const handleHeaderLabelChange = () => {
    if (editingHeader && editInputRef.current) {
      const newLabel = editInputRef.current.value;
      setColumnConfigs(prev => prev.map(c => c.id === editingHeader.id ? { ...c, label: newLabel } : c));
      setEditingHeader(null);
      toast({ title: "Header Updated", description: `Header changed to "${newLabel}"` });
    }
  };

  const handleRemoveColumn = (columnIdToRemove: string) => {
    const column = columnConfigs.find(c => c.id === columnIdToRemove);
    if (column && column.canHide) {
      setColumnVisibility(prev => ({ ...prev, [columnIdToRemove]: false }));
      toast({ title: "Column Hidden", description: `"${column.label}" hidden. You can re-enable it from column settings.` });
    } else {
      toast({ title: "Action Denied", description: `"${column?.label || 'Column'}" cannot be removed.`, variant: "destructive" });
    }
  };

  const handleDuplicateColumn = (columnIdToDuplicate: string) => {
    const colToDuplicate = columnConfigs.find(c => c.id === columnIdToDuplicate);
    if (colToDuplicate) {
      const newColId = `${colToDuplicate.id}_copy_${Date.now()}`;
      const newColumn: ColumnConfig<Organization> = {
        ...colToDuplicate,
        id: newColId,
        label: `${colToDuplicate.label} (Copy)`,
        isFixed: undefined,
        stickyOffset: undefined,
        defaultVisible: true,
        canHide: true,
      };

      const originalIndex = columnConfigs.findIndex(c => c.id === columnIdToDuplicate);
      const newConfigs = [...columnConfigs];
      newConfigs.splice(originalIndex + 1, 0, newColumn);

      setColumnConfigs(newConfigs);
      setColumnVisibility(prev => ({ ...prev, [newColId]: true }));
      toast({ title: "Column Duplicated", description: `"${newColumn.label}" added.` });
    }
  };

  const handleChangeHeaderColor = (columnId: string, color?: string) => {
    setColumnConfigs(prev => prev.map(c => c.id === columnId ? { ...c, headerColor: color } : c));
    toast({ title: "Header Color Updated" });
  };

  const cellPaddingClass = isDense ? 'px-2 py-1' : 'px-3 py-2';
  const addOrganizationRowFirstCellStickyClasses = columnConfigs[0]?.isFixed === 'left' && columnVisibility[columnConfigs[0].id]
    ? 'sticky left-0 z-20'
    : '';

  // const renderOrganizationDetails = (organization: Organization) => {
  //   return <OrganizationDetailsPanelContent organization={organization} />;
  // };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col h-full items-center justify-center text-muted-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full">
      <Card className="shadow-md border border-gray-200 dark:border-gray-700 rounded-lg border-l-4 flex-grow overflow-hidden flex flex-col" style={{ borderLeftColor: tableColor }}>
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow>
              {visibleColumns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    "border-r dark:border-r-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 group",
                    (col.id === 'checkbox') ? (isDense ? 'px-1 py-1' : 'px-1 py-2') : cellPaddingClass,
                    col.thClassName
                  )}
                  style={{
                    minWidth: col.minWidth,
                    width: col.width,
                    position: col.isFixed ? 'sticky' : undefined,
                    left: col.isFixed === 'left' ? col.stickyOffset : undefined,
                    right: col.isFixed === 'right' ? col.stickyOffset : undefined,
                    top: 0,
                    backgroundColor: col.headerColor || (col.thClassName?.includes('bg-slate-50') ? 'hsl(var(--muted))' : 'hsl(var(--background))'),
                  }}
                >
                  <div className={cn(
                    "flex items-center",
                    (col.id === 'checkbox' && !col.label) || (col.id === 'actions' && !col.label) || (col.icon && !col.label && !['name', 'email', 'organization', 'organization', 'status', 'lastLogin', 'createdAt', 'verified'].includes(col.id))
                      ? 'justify-center'
                      : 'justify-between'
                  )}>
                    {editingHeader?.id === col.id ? (
                      <Input
                        ref={editInputRef}
                        defaultValue={editingHeader.currentLabel}
                        onBlur={handleHeaderLabelChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleHeaderLabelChange()}
                        className={cn("h-8 text-sm", isDense && "h-7")}
                      />
                    ) : (
                      (col.id !== 'checkbox' || col.label) && (
                        <div className="flex items-center gap-1.5 truncate" title={col.label}>
                          {col.icon && <col.icon className="h-4 w-4 flex-shrink-0" />}
                          <span className="truncate">{col.label}</span>
                        </div>
                      )
                    )}

                    {col.id === 'checkbox' ? (
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                        aria-label="Select all rows"
                        className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    ) : col.id === 'actions' ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className={cn("h-7 w-7 hover:bg-slate-200 dark:hover:bg-slate-700", isDense && "h-6 w-6")}>
                            <Plus className={cn("h-5 w-5 text-gray-500 dark:text-gray-400", isDense && "h-4 w-4")} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {columnConfigs.filter(c => c.canHide).map(c => (
                            <DropdownMenuCheckboxItem
                              key={c.id}
                              checked={columnVisibility[c.id]}
                              onCheckedChange={() => toggleMainColumnVisibility(c.id)}
                            >
                              {c.label}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : col.canHide ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className={cn("h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity", isDense && "h-5 w-5")}>
                            <MoreVertical className={cn("h-4 w-4", isDense && "h-3 w-3")} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditHeader(col)}>
                            <EditIcon className="mr-2 h-4 w-4" /> Edit Name
                          </DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Palette className="mr-2 h-4 w-4" /> Change Color
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {PREDEFINED_HEADER_COLORS.map(colorOpt => (
                                  <DropdownMenuItem key={colorOpt.name} onClick={() => handleChangeHeaderColor(col.id, colorOpt.value)}>
                                    {(col.headerColor === undefined && colorOpt.value === undefined) || col.headerColor === colorOpt.value ? <Check className="mr-2 h-4 w-4" /> : <span className="mr-2 h-4 w-4" />}
                                    {colorOpt.name}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDuplicateColumn(col.id)}>
                            <Copy className="mr-2 h-4 w-4" /> Duplicate Column
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRemoveColumn(col.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" /> Remove Column
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : null}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((organization) => (
              <TableRow key={organization.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 group" data-state={currentSelectedRows[organization.id] ? 'selected' : undefined}>
                {visibleColumns.map((col) => (
                  <TableCell
                    key={col.id}
                    className={cn(
                      "border-r dark:border-r-gray-700",
                      (col.id === 'checkbox') ? (isDense ? 'px-1 py-1' : 'px-1 py-2') : cellPaddingClass,
                      col.id === 'checkbox' ? 'border-l-4 border-transparent' : '',
                      col.tdClassName,
                      (col.isFixed && col.id === 'checkbox') && 'bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted',
                      (col.isFixed && col.id === 'name') && 'bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted'
                    )}
                    style={{
                      minWidth: col.minWidth,
                      width: col.width,
                      position: col.isFixed ? 'sticky' : undefined,
                      left: col.isFixed === 'left' ? col.stickyOffset : undefined,
                      right: col.isFixed === 'right' ? col.stickyOffset : undefined,
                      backgroundColor: (col.isFixed && (col.id === 'checkbox' || col.id === 'name')) ?
                        (currentSelectedRows[organization.id] ? 'hsl(var(--muted))' : (col.tdClassName?.includes('dark:group-hover:bg-slate-800') ? undefined : 'hsl(var(--background))')) :
                        (col.isFixed ? 'hsl(var(--background))' : undefined),
                    }}
                  >
                    {col.cell(organization)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow className={cn("bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 group", isDense && "h-auto")}>
              <TableCell
                className={cn(
                  "border-r dark:border-r-gray-700 border-l-4 border-transparent",
                  (isDense ? 'px-1 py-1' : 'px-1 py-2'),
                  addOrganizationRowFirstCellStickyClasses,
                  "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700"
                )}
                style={{
                  left: columnConfigs[0]?.isFixed === 'left' && columnVisibility[columnConfigs[0].id] ? columnConfigs[0]?.stickyOffset : undefined,
                  position: columnConfigs[0]?.isFixed && columnVisibility[columnConfigs[0].id] ? 'sticky' : undefined,
                  backgroundColor: 'hsl(var(--muted))'
                }}
              >
                <Checkbox disabled className="border-gray-300 dark:border-gray-600" />
              </TableCell>
              <TableCell
                colSpan={visibleColumns.filter(c => c.id !== 'checkbox').length > 0 ? visibleColumns.filter(c => c.id !== 'checkbox').length : 1}
                className={cn(
                  cellPaddingClass,
                  "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700"
                )}
                style={{ backgroundColor: 'hsl(var(--muted))' }}
              >
                {/* <Link href="#/organizations/add" passHref>
                  <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-primary p-0 h-auto font-normal text-sm">
                    <PlusCircle className="h-4 w-4 mr-1.5" />
                    Add organization
                  </Button>
                </Link> */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <CardFooter className="border-t pt-4">
          <TablePagination
            totalItems={pagination?.totalElements || organizations.length}
            rowsPerPage={pagination?.pageSize || 5}
            currentPage={pagination?.pageNumber + 1}
            onPageChange={(page) => onPageChange(page - 1)}
            onRowsPerPageChange={onPageSizeChange}
            isDense={isDense}
            onDenseChange={setIsDense}
          />
        </CardFooter>
      </Card>

      {/* <DetailsSidePanel
        data={selectedOrganization}
        open={detailsPanelOpen}
        onClose={() => setDetailsPanelOpen(false)}
        renderContent={renderOrganizationDetails}
      /> */}
    </div>
  );
};

export default OrganizationTable;