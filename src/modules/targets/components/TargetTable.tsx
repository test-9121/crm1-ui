
// // import React from "react";
// // import { PaginationMetadata, Target } from "@/modules/targets/types";
// // import { Badge } from "@/components/ui/badge";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardFooter } from "@/components/ui/card";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import { Edit, Trash2, MoreHorizontal } from "lucide-react";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import {
// //   Pagination,
// //   PaginationContent,
// //   PaginationItem,
// //   PaginationLink,
// //   PaginationNext,
// //   PaginationPrevious,
// // } from "@/components/ui/pagination";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// // interface TargetTableProps {
// //   targets: Target[];
// //   tableColor: string;
// //   onEditTarget: (target: Target) => void;
// //   onDeleteTarget: (targetId: string) => void;
// //   isLoading: boolean;
// //   onRowClick: (target: Target) => void;
// //   pagination: PaginationMetadata;
// //   onPageChange: (page: number) => void;
// //   onPageSizeChange: (size: number) => void;
// // }

// // const TargetTable = ({
// //   targets,
// //   tableColor,
// //   onEditTarget,
// //   onDeleteTarget,
// //   isLoading,
// //   onRowClick,
// //   pagination,
// //   onPageChange,
// //   onPageSizeChange
// // }: TargetTableProps) => {

// //   if (isLoading) {
// //     return (
// //       <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
// //         <CardContent className="p-0">
// //           <Table>
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>Account Name</TableHead>
// //                 <TableHead>Status</TableHead>
// //                 <TableHead>Connections</TableHead>
// //                 <TableHead>Leads</TableHead>
// //                 <TableHead>Meetings</TableHead>
// //                 <TableHead className="w-[80px]">Actions</TableHead>
// //               </TableRow>
// //             </TableHeader>
// //             <TableBody>
// //               {Array.from({ length: 5 }).map((_, rowIndex) => (
// //                 <TableRow key={rowIndex}>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   if (!Array.isArray(targets) || targets.length === 0) {
// //     return (
// //       <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
// //         <CardContent className="p-6 flex justify-center items-center">
// //           <p className="text-muted-foreground">No targets found.</p>
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   // Generate page numbers for pagination
// //   const generatePaginationItems = () => {
// //     const items = [];
// //     const maxDisplayPages = 5; // Max number of page numbers to show

// //     let startPage = Math.max(0, pagination.pageNumber - 2);
// //     let endPage = Math.min(pagination.totalPages - 1, startPage + maxDisplayPages - 1);

// //     // Adjust start page if end page is at max
// //     if (endPage === pagination.totalPages - 1) {
// //       startPage = Math.max(0, endPage - maxDisplayPages + 1);
// //     }

// //     // Add pages
// //     for (let i = startPage; i <= endPage; i++) {
// //       items.push(
// //         <PaginationItem key={i}>
// //           <PaginationLink 
// //             isActive={pagination.pageNumber === i}
// //             onClick={() => onPageChange(i)}
// //           >
// //             {i + 1}
// //           </PaginationLink>
// //         </PaginationItem>
// //       );
// //     }

// //     return items;
// //   };

// //   const getStatusColor = (status: string) => {
// //     const statusColorMap: Record<string, string> = {
// //       "Active": "bg-green-100 text-green-800 hover:bg-green-200",
// //       "Completed": "bg-blue-100 text-blue-800 hover:bg-blue-200",
// //       "InActive": "bg-orange-100 text-orange-800 hover:bg-orange-200",
// //       "OnHold": "bg-orange-100 text-orange-800 hover:bg-orange-200",
// //     };

// //     return statusColorMap[status] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
// //   };

// //   return (
// //     <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
// //       <CardContent className="p-0">
// //         <div className="overflow-x-auto">
// //           <Table>
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>Account Name</TableHead>
// //                 <TableHead>Status</TableHead>
// //                 <TableHead>Connections</TableHead>
// //                 <TableHead>Leads</TableHead>
// //                 <TableHead>Meetings</TableHead>
// //                 <TableHead className="w-[80px]">Actions</TableHead>
// //               </TableRow>
// //             </TableHeader>
// //             {targets.length !== 0 ? (
// //             <TableBody>
// //               {targets.map((target) => (
// //                 <TableRow key={target.id}>
// //                   <TableCell>
// //                     <div
// //                       className="cursor-pointer hover:text-primary transition-colors font-medium"
// //                       onClick={() => onRowClick(target)}
// //                     >
// //                       {target.accountName}
// //                     </div>
// //                   </TableCell>
// //                   <TableCell>
// //                     <Badge
// //                       className={`${getStatusColor(target.status)} font-medium rounded-md whitespace-nowrap`}
// //                       variant="outline"
// //                     >
// //                       {target.status}
// //                     </Badge>
// //                   </TableCell>
// //                   <TableCell>{target.connectionsCount}</TableCell>
// //                   <TableCell>{target.noOfLeadsIdentified}</TableCell>
// //                   <TableCell>{target.meetingsScheduled}</TableCell>
// //                   <TableCell>
// //                     <DropdownMenu>
// //                       <DropdownMenuTrigger asChild>
// //                         <Button variant="ghost" size="icon" className="h-8 w-8">
// //                           <MoreHorizontal className="h-4 w-4" />
// //                         </Button>
// //                       </DropdownMenuTrigger>
// //                       <DropdownMenuContent align="end" className="w-[160px]">
// //                         <DropdownMenuItem onClick={() => onEditTarget(target)}>
// //                           <Edit className="mr-2 h-4 w-4" />
// //                           Edit
// //                         </DropdownMenuItem>
// //                         <DropdownMenuItem
// //                           onClick={() => onDeleteTarget(target.id)}
// //                           className="text-red-600 focus:text-red-600"
// //                         >
// //                           <Trash2 className="mr-2 h-4 w-4" />
// //                           Delete
// //                         </DropdownMenuItem>
// //                       </DropdownMenuContent>
// //                     </DropdownMenu>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>) : (
// //               <TableBody>
// //                 <TableRow>
// //                   <TableCell colSpan={6} className="text-center">
// //                     No data available.
// //                   </TableCell>
// //                 </TableRow>
// //               </TableBody>
// //             )}
// //           </Table>
// //         </div>
// //       </CardContent>
// //       <CardFooter className="flex items-center justify-between px-6 py-4 border-t">
// //         <div className="flex items-center gap-2">
// //           <span className="text-sm text-muted-foreground">Rows per page</span>
// //           <Select
// //             value={pagination.pageSize.toString()}
// //             onValueChange={(value) => onPageSizeChange(parseInt(value, 10))}
// //           >
// //             <SelectTrigger className="h-8 w-[70px]">
// //               <SelectValue placeholder={pagination.pageSize} />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="5">5</SelectItem>
// //               <SelectItem value="10">10</SelectItem>
// //               <SelectItem value="25">25</SelectItem>
// //               <SelectItem value="50">50</SelectItem>
// //             </SelectContent>
// //           </Select>
// //           <span className="text-sm text-muted-foreground">
// //             {pagination.totalElements > 0 
// //               ? `${pagination.pageNumber * pagination.pageSize + 1}-${Math.min((pagination.pageNumber + 1) * pagination.pageSize, pagination.totalElements)} of ${pagination.totalElements}`
// //               : '0-0 of 0'}
// //           </span>
// //         </div>

// //         <Pagination>
// //           <PaginationContent>
// //             <PaginationItem>
// //               <PaginationPrevious 
// //                 onClick={() => onPageChange(pagination.pageNumber - 1)}
// //                 className={pagination.first ? "pointer-events-none opacity-50" : "cursor-pointer"}
// //               />
// //             </PaginationItem>

// //             {generatePaginationItems()}

// //             <PaginationItem>
// //               <PaginationNext 
// //                 onClick={() => onPageChange(pagination.pageNumber + 1)}
// //                 className={pagination.last ? "pointer-events-none opacity-50" : "cursor-pointer"}
// //               />
// //             </PaginationItem>
// //           </PaginationContent>
// //         </Pagination>
// //       </CardFooter>
// //     </Card>
// //   );
// // };

// // export default TargetTable;







// import React, { useState } from "react";
// import { PaginationMetadata, Target } from "@/modules/targets/types";
// import { Badge } from "@/components/ui/badge";
// import { format, parseISO } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Edit, Trash2, MoreHorizontal, MoreVertical, Building2, CalendarDays, Check, EditIcon, Mail, ShieldCheck, X, Target2 } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
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
// import { ColumnConfig, DataTable } from "@/components/shared/DataTable";
// import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";

// import TargetDetailsPanelContent from "./TargetDetailsPanelContent";

// interface TargetTableProps {
//   targets: Target[];
//   tableColor: string;
//   onEditTarget: (target: Target) => void;
//   onDeleteTarget: (targetId: string) => void;
//   isLoading: boolean;
//   onRowClick: (target: Target) => void;
//   pagination: PaginationMetadata;
//   onPageChange: (page: number) => void;
//   onPageSizeChange: (size: number) => void;
// }

// const TargetTable = ({
//   targets,
//   tableColor,
//   onEditTarget,
//   onDeleteTarget,
//   isLoading,
//   onRowClick,
//   pagination,
//   onPageChange,
//   onPageSizeChange
// }: TargetTableProps) => {

//   const [isDense, setIsDense] = useState(false);
//     const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
//     const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
//     const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);

//     const baseInitialTargetColumnConfig: Omit<ColumnConfig<Target>, 'id' | 'label' | 'accessor' | 'cell' | 'icon'>[] = [
//   { defaultVisible: true, canHide: false, isFixed: 'left', stickyOffset: '0px', width: '40px', thClassName: 'sticky left-0 top-0 z-30 bg-slate-50 dark:bg-slate-800', tdClassName: 'sticky left-0 z-20 bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted' },
//   { defaultVisible: true, canHide: false, isFixed: 'left', stickyOffset: '40px', minWidth: '200px', thClassName: 'sticky left-[40px] top-0 z-30 bg-slate-50 dark:bg-slate-800', tdClassName: 'sticky left-[40px] z-20 bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted' },
//   { defaultVisible: true, canHide: true, minWidth: '220px', thClassName: 'bg-slate-50 dark:bg-slate-800' }, // Account Name
//   { defaultVisible: true, canHide: true, minWidth: '150px', thClassName: 'bg-slate-50 dark:bg-slate-800' }, // Connections Count
//   { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' }, // Leads Identified
//   { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' }, // Connections Sent
//   { defaultVisible: true, canHide: true, minWidth: '120px', thClassName: 'bg-slate-50 dark:bg-slate-800 text-center' }, // Messages Sent
//   { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' }, // Follow Ups
//   { defaultVisible: true, canHide: true, minWidth: '120px', thClassName: 'bg-slate-50 dark:bg-slate-800 text-center' }, // Status
//   { defaultVisible: false, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' }, // Created Date
//   { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' }, // InMail Count
//   { defaultVisible: true, canHide: true, minWidth: '120px', thClassName: 'bg-slate-50 dark:bg-slate-800 text-center' }, // Postings
//   { defaultVisible: false, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' }, // Meetings Scheduled
//   { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' }, // Response Received
//   { defaultVisible: true, canHide: false, isFixed: 'right', stickyOffset: '0px', width: '50px', thClassName: 'sticky right-0 top-0 z-30 bg-slate-50 dark:bg-slate-800', tdClassName: 'sticky right-0 z-20 bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted' },
// ];

// const targetColumns: ColumnConfig<Target>[] = [
//   { ...baseInitialTargetColumnConfig[0], id: 'checkbox', label: '', accessor: 'id', cell: (target: Target) => <Checkbox checked={!!selectedRows[target.id]} onCheckedChange={(checked) => setSelectedRows(prev => ({ ...prev, [target.id]: Boolean(checked) }))} aria-labelledby={`target-name-${target.id}`} className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary" /> },
//   // { ...baseInitialTargetColumnConfig[1], id: 'accountName', label: 'Account Name', accessor: 'accountName', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.accountName}</span> },
//    { ...baseInitialTargetColumnConfig[1], id: 'accountName', label: 'Account Name', accessor: (target: Target) => `${target.accountName}`, 
//       cell: (target: Target) => (
//         <div className="flex items-center gap-2">
//           <div 
//             className="font-medium text-primary hover:underline whitespace-nowrap cursor-pointer"
//             onClick={() => handleTargetClick(target)}
//           >
//             {`${target.accountName}`}
//           </div>
//         </div>
//       ),
//       // icon: TargetCog, 
//     },
//   { ...baseInitialTargetColumnConfig[2], id: 'connectionsCount', label: 'Connections Count', accessor: 'connectionsCount', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.connectionsCount}</span> },
//   { ...baseInitialTargetColumnConfig[3], id: 'handledById', label: 'Handled By', accessor: (target: Target) => `${target.handledBy.firstName}`, cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.handledBy.firstName}</span>  },
//   { ...baseInitialTargetColumnConfig[4], id: 'noOfLeadsIdentified', label: 'Leads Identified', accessor: 'noOfLeadsIdentified', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.noOfLeadsIdentified}</span> },
//   { ...baseInitialTargetColumnConfig[5], id: 'connectionsSent', label: 'Connections Sent', accessor: 'connectionsSent', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.connectionsSent}</span> },
//   { ...baseInitialTargetColumnConfig[6], id: 'messagesSent', label: 'Messages Sent', accessor: 'messagesSent', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.messagesSent}</span> },
//   { ...baseInitialTargetColumnConfig[7], id: 'followUps', label: 'Follow Ups', accessor: 'followUps', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.followUps}</span> },
//   { ...baseInitialTargetColumnConfig[8], id: 'status', label: 'Status', accessor: 'status', cell: (target: Target) => <Badge variant={target.status === 'Active' ? 'default' : 'secondary'} className={target.status === 'Active' ? 'bg-green-600 text-primary-foreground' : 'bg-slate-500 text-primary-foreground'}>{target.status}</Badge> },
//   { ...baseInitialTargetColumnConfig[9], id: 'createdDate', label: 'Created Date', accessor: 'createdDate', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{format(parseISO(target.createdDate), 'MMM d, yyyy')}</span> },
//   { ...baseInitialTargetColumnConfig[10], id: 'inMailCount', label: 'InMail Count', accessor: 'inMailCount', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.inMailCount}</span> },
//   { ...baseInitialTargetColumnConfig[11], id: 'postings', label: 'Postings', accessor: 'postings', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.postings}</span> },
//   { ...baseInitialTargetColumnConfig[12], id: 'meetingsScheduled', label: 'Meetings Scheduled', accessor: 'meetingsScheduled', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.meetingsScheduled}</span> },
//   { ...baseInitialTargetColumnConfig[13], id: 'responseReceived', label: 'Response Received', accessor: 'responseReceived', cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.responseReceived ? 'Yes' : 'No'}</span> },
//   { ...baseInitialTargetColumnConfig[14], id: 'actions', label: '', accessor: 'id', cell: (target: Target) => (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="h-8 w-8">
//           <MoreVertical className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => onEditTarget(target)}>
//           <EditIcon className="mr-2 h-4 w-4" />
//           Edit
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={() => onDeleteTarget(target.id)} className="text-destructive focus:text-destructive">
//           <Trash2 className="mr-2 h-4 w-4" />
//           Delete
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )}
// ];


//     const handleTargetClick = (target: Target) => {
//       setSelectedTarget(target);
//       setDetailsPanelOpen(true);
//     };

//     // Checkbox component 
//     const Checkbox = ({ checked, onCheckedChange, className, disabled, ...props }: { 
//       checked?: boolean; 
//       onCheckedChange?: (checked: boolean) => void;
//       className?: string;
//       disabled?: boolean;
//       [key: string]: any;
//     }) => {
//       return (
//         <input
//           type="checkbox"
//           checked={checked}
//           onChange={(e) => onCheckedChange?.(e.target.checked)}
//           className={`h-4 w-4 rounded border-gray-300 ${className || ''}`}
//           disabled={disabled}
//           {...props}
//         />
//       );
//     };

//     const renderTargetDetails = (target: Target) => {
//       return <TargetDetailsPanelContent target={target} />;
//     };

//     return (
//       <>
//         <DataTable
//           data={targets}
//           columns={targetColumns}
//           keyField="id"
//           tableColor={tableColor}
//           isLoading={isLoading}
//           pagination={{
//             totalItems: pagination.totalElements,
//             pageSize: pagination.pageSize,
//             currentPage: pagination.pageNumber + 1, // Convert to 1-indexed for UI
//             onPageChange: (page) => onPageChange(page - 1), // Convert back to 0-indexed for API
//             onPageSizeChange: onPageSizeChange
//           }}
//           addAction={{
//             label: "Add target",
//             href: "#/targets/add"
//           }}
//           emptyMessage="No targets found."
//           isDense={isDense}
//           onDenseChange={setIsDense}
//         />

//         <DetailsSidePanel
//           data={selectedTarget}
//           open={detailsPanelOpen}
//           onClose={() => setDetailsPanelOpen(false)}
//           renderContent={renderTargetDetails}
//         />
//       </>
//     );
// };

// export default TargetTable;





// // import React, { useState } from "react";
// // import { Target } from "@/modules/targets/types";
// // import { Badge } from "@/components/ui/badge";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardFooter } from "@/components/ui/card";
// // import { Skeleton } from "@/components/ui/skeleton";
// // import { Edit, Trash2, MoreHorizontal } from "lucide-react";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import {
// //   Pagination,
// //   PaginationContent,
// //   PaginationItem,
// //   PaginationLink,
// //   PaginationNext,
// //   PaginationPrevious,
// // } from "@/components/ui/pagination";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
// // import TargetDetailsPanelContent from "./TargetDetailsPanelContent";
// // import { formatDate } from "@/lib/utils";
// // import { PaginationMetadata } from "@/modules/targets/types";

// // interface TargetTableProps {
// //   targets: Target[];
// //   tableColor: string;
// //   onEditTarget: (target: Target) => void;
// //   onDeleteTarget: (targetId: string) => void;
// //   isLoading?: boolean;
// //   accessedTarget: Target;
// //   pagination: PaginationMetadata;
// //   onPageChange: (page: number) => void;
// //   onPageSizeChange: (size: number) => void;
// // }

// // const TargetTable = ({
// //   accessedTarget,
// //   targets,
// //   tableColor,
// //   onEditTarget,
// //   onDeleteTarget,
// //   isLoading = false,
// //   pagination,
// //   onPageChange,
// //   onPageSizeChange
// // }: TargetTableProps) => {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [rowsPerPage, setRowsPerPage] = useState(5);
// //   const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
// //   const [showDetailsPanel, setShowDetailsPanel] = useState(false);

// //   const handleTargetClick = (target: Target) => {
// //     setSelectedTarget(target);
// //     setShowDetailsPanel(true);
// //   };

// //   if (isLoading) {
// //     return (
// //       <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
// //         <CardContent className="p-0">
// //           <Table>
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>Target</TableHead>
// //                 <TableHead>Role</TableHead>
// //                 <TableHead>Organization</TableHead>
// //                 <TableHead>Contact</TableHead>
// //                 <TableHead>Permission</TableHead>
// //                 <TableHead className="w-[80px]">Actions</TableHead>
// //               </TableRow>
// //             </TableHeader>
// //             <TableBody>
// //               {Array.from({ length: 5 }).map((_, rowIndex) => (
// //                 <TableRow key={rowIndex}>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                   <TableCell><Skeleton className="h-4 w-full" /></TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   if (!Array.isArray(targets) || targets.length === 0) {
// //     return (
// //       <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
// //         <CardContent className="p-6 flex justify-center items-center">
// //           <p className="text-muted-foreground">No targets found.</p>
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   // Calculate pagination values
// //   const totalPages = Math.ceil(targets.length / rowsPerPage);
// //   const startIndex = (currentPage - 1) * rowsPerPage;
// //   const endIndex = Math.min(startIndex + rowsPerPage, targets.length);
// //   const paginatedData = targets.slice(startIndex, endIndex);

// //   // Handle page changes
// //   const handlePreviousPage = () => {
// //     setCurrentPage((prev) => Math.max(prev - 1, 1));
// //   };

// //   const handleNextPage = () => {
// //     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
// //   };

// //   const handlePageSelect = (page: number) => {
// //     setCurrentPage(page);
// //   };

// //   // Handle rows per page change
// //   const handleRowsPerPageChange = (value: string) => {
// //     const newRowsPerPage = parseInt(value, 10);
// //     setRowsPerPage(newRowsPerPage);
// //     setCurrentPage(1); // Reset to first page when changing rows per page
// //   };

// //   // Generate page numbers for pagination
// //   const generatePaginationItems = () => {
// //     const items = [];
// //     const maxDisplayPages = 5; // Max number of page numbers to show

// //     let startPage = Math.max(0, pagination.pageNumber - 2);
// //     let endPage = Math.min(pagination.totalPages - 1, startPage + maxDisplayPages - 1);

// //     // Adjust start page if end page is at max
// //     if (endPage === pagination.totalPages - 1) {
// //       startPage = Math.max(0, endPage - maxDisplayPages + 1);
// //     }

// //     // Add pages
// //     for (let i = startPage; i <= endPage; i++) {
// //       items.push(
// //         <PaginationItem key={i}>
// //           <PaginationLink
// //             isActive={pagination.pageNumber === i}
// //             onClick={() => onPageChange(i)}
// //           >
// //             {i + 1}
// //           </PaginationLink>
// //         </PaginationItem>
// //       );
// //     }

// //     return items;
// //   };

// //   return (
// //     <>
// //       <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
// //         <CardContent className="p-0">
// //           <div className="overflow-x-auto">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow>
// //                   <TableHead>Target</TableHead>
// //                   <TableHead>Role</TableHead>
// //                   <TableHead>Organization</TableHead>
// //                   <TableHead>Contact</TableHead>
// //                   <TableHead>Permission</TableHead>
// //                   {accessedTarget.role.rolePermission === "ROLE_SUPER_ADMIN" &&
// //                     <TableHead className="w-[80px]">Actions</TableHead>
// //                   }
// //                 </TableRow>
// //               </TableHeader>
// //               {targets.length !== 0 ? (
// //                 <TableBody>
// //                   {targets.map((target) => (
// //                     <TableRow key={target.id}>
// //                       <TableCell>
// //                         <div
// //                           className="flex items-center gap-3 cursor-pointer"
// //                           onClick={() => handleTargetClick(target)}
// //                         >
// //                           <Avatar className="h-8 w-8">
// //                             {target.avatarUrl ? (
// //                               <AvatarImage src={target.avatarUrl} alt={`${target.firstName} ${target.lastName}`} />
// //                             ) : (
// //                               <AvatarFallback>{target.firstName.charAt(0)}</AvatarFallback>
// //                             )}
// //                           </Avatar>
// //                           <div className="flex flex-col">
// //                             <span className="font-medium text-sm">{`${target.firstName} ${target.lastName}`}</span>
// //                             <span className="text-xs text-muted-foreground">{target.email}</span>
// //                           </div>
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <span className="font-medium text-sm capitalize">{target.role.roleName}</span>
// //                       </TableCell>
// //                       <TableCell>
// //                         <span className="text-sm">{target.organization.name}</span>
// //                       </TableCell>
// //                       <TableCell>
// //                         <div className="flex flex-col">
// //                           <span className="text-sm">{target.phoneNumber || '-'}</span>
// //                           <span className="text-xs text-muted-foreground">{target.city && target.state ? `${target.city}, ${target.state}` : '-'}</span>
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         {(() => {
// //                           let color = "";
// //                           switch (target.status) {
// //                             case "InActive":
// //                               color = "bg-red-100 text-red-800 hover:bg-red-200";
// //                               break;
// //                             case "Active":
// //                               color = "bg-green-100 text-green-800 hover:bg-green-200";
// //                               break;
// //                             default:
// //                               color = "bg-gray-100 text-gray-800 hover:bg-gray-200";
// //                           }

// //                           return (
// //                             <Badge
// //                               className={`${color} font-medium rounded-md whitespace-nowrap`}
// //                               variant="outline"
// //                             >
// //                               {target.status}
// //                             </Badge>
// //                           );
// //                         })()}
// //                       </TableCell>
// //                       {accessedTarget.role.rolePermission === "ROLE_SUPER_ADMIN" &&
// //                         <TableCell>
// //                           <DropdownMenu>
// //                             <DropdownMenuTrigger asChild>
// //                               <Button variant="ghost" size="icon" className="h-8 w-8">
// //                                 <MoreHorizontal className="h-4 w-4" />
// //                               </Button>
// //                             </DropdownMenuTrigger>
// //                             <DropdownMenuContent align="end" className="w-[160px]">
// //                               <DropdownMenuItem onClick={() => onEditTarget(target)}>
// //                                 <Edit className="mr-2 h-4 w-4" />
// //                                 Edit
// //                               </DropdownMenuItem>
// //                               <DropdownMenuItem
// //                                 onClick={() => onDeleteTarget(target.id)}
// //                                 className="text-red-600 focus:text-red-600"
// //                               >
// //                                 <Trash2 className="mr-2 h-4 w-4" />
// //                                 Delete
// //                               </DropdownMenuItem>
// //                             </DropdownMenuContent>
// //                           </DropdownMenu>
// //                         </TableCell>
// //                       }
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>) : (
// //                 <TableBody>
// //                   <TableRow>
// //                     <TableCell colSpan={6} className="text-center">
// //                       No data available.
// //                     </TableCell>
// //                   </TableRow>
// //                 </TableBody>
// //               )}
// //             </Table>
// //           </div>
// //         </CardContent>
// //         {targets.length > 0 && (
// //           <CardFooter className="flex items-center justify-between px-6 py-4 border-t">
// //             <div className="flex items-center gap-2">
// //               <span className="text-sm text-muted-foreground">Rows per page</span>
// //               <Select
// //                 value={pagination.pageSize.toString()}
// //                 onValueChange={(value) => onPageSizeChange(parseInt(value, 10))}
// //               >
// //                 <SelectTrigger className="h-8 w-[70px]">
// //                   <SelectValue placeholder={pagination.pageSize} />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="5">5</SelectItem>
// //                   <SelectItem value="10">10</SelectItem>
// //                   <SelectItem value="25">25</SelectItem>
// //                   <SelectItem value="50">50</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //               <span className="text-sm text-muted-foreground">
// //                 {pagination.totalElements > 0
// //                   ? `${pagination.pageNumber * pagination.pageSize + 1}-${Math.min((pagination.pageNumber + 1) * pagination.pageSize, pagination.totalElements)} of ${pagination.totalElements}`
// //                   : '0-0 of 0'}
// //               </span>
// //             </div>

// //             <Pagination>
// //               <PaginationContent>
// //                 <PaginationItem>
// //                   <PaginationPrevious
// //                     onClick={() => onPageChange(pagination.pageNumber - 1)}
// //                     className={pagination.first ? "pointer-events-none opacity-50" : "cursor-pointer"}
// //                   />
// //                 </PaginationItem>

// //                 {generatePaginationItems()}

// //                 <PaginationItem>
// //                   <PaginationNext
// //                     onClick={() => onPageChange(pagination.pageNumber + 1)}
// //                     className={pagination.last ? "pointer-events-none opacity-50" : "cursor-pointer"}
// //                   />
// //                 </PaginationItem>
// //               </PaginationContent>
// //             </Pagination>
// //           </CardFooter>
// //         )}
// //       </Card>

// //       <DetailsSidePanel
// //         data={selectedTarget}
// //         open={showDetailsPanel}
// //         onClose={() => setShowDetailsPanel(false)}
// //         renderContent={(target) => <TargetDetailsPanelContent target={target} />}
// //       />
// //     </>
// //   );
// // };

// // export default TargetTable;






// import { useState, useEffect, useMemo, useRef } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Target } from "@/modules/targets/types";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
//   DropdownMenuCheckboxItem,
//   DropdownMenuLabel,
//   DropdownMenuSub,
//   DropdownMenuSubTrigger,
//   DropdownMenuSubContent,
//   DropdownMenuPortal,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { format, parseISO } from "date-fns";
// import { DataTable, ColumnConfig } from "@/components/shared/DataTable";
// import { Check, X, Edit2 as EditIcon, Trash2, MoreVertical, Mail, Building2, TargetCog, CalendarDays, ShieldCheck, Plus, PlusCircle, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Palette, Settings2, Loader2, Copy } from "lucide-react";
// import { PaginationMetadata } from "@/modules/targets/types";
// import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useToast } from "@/hooks/use-toast";
// import { cn } from "@/lib/utils";
// import TargetDetailsPanelContent from "../components/TargetDetailsPanelContent";
// import { Card, CardContent, Link } from "@mui/material";
// import { TablePagination } from "@/components/table-pagination";
// import { CardFooter } from "@/components/ui/card";

// const PREDEFINED_HEADER_COLORS = [
//   { name: 'Default', value: undefined },
//   { name: 'Teal', value: 'hsl(var(--chart-1))' },
//   { name: 'Orange', value: 'hsl(var(--chart-2))' },
//   { name: 'Gray', value: 'hsl(var(--muted))' },
// ];

// interface TargetTableProps {
//   targets: Target[];
//   tableColor: string;
//   onEditTarget: (target: Target) => void;
//   onDeleteTarget: (targetId: string) => void;
//   isLoading?: boolean;
//   accessedTarget: Target;
//   pagination: PaginationMetadata;
//   onPageChange: (page: number) => void;
//   onPageSizeChange: (size: number) => void;
// }

// const TargetTable = ({
//   accessedTarget,
//   targets,
//   tableColor,
//   onEditTarget,
//   onDeleteTarget,
//   isLoading = false,
//   pagination,
//   onPageChange,
//   onPageSizeChange
// }: TargetTableProps) => {
//   const { toast } = useToast();
//   const [currentSelectedRows, setCurrentSelectedRows] = useState<Record<string, boolean>>({});
//   const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
//   const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
//   const [isDense, setIsDense] = useState(false);
//   const [isTableCollapsed, setIsTableCollapsed] = useState(false);
//   const [pageTitle, setPageTitle] = useState("Active Targets");
//   const [isEditingPageTitle, setIsEditingPageTitle] = useState(false);
//   const [pageTitleColor, setPageTitleColor] = useState<string | undefined>(undefined);
//   const titleInputRef = useRef<HTMLInputElement>(null);
//   const [editingHeader, setEditingHeader] = useState<{ id: string; currentLabel: string } | null>(null);
//   const editInputRef = useRef<HTMLInputElement>(null);

//   const baseInitialTargetColumnConfig: Omit<ColumnConfig<Target>, 'id' | 'label' | 'accessor' | 'cell' | 'icon'>[] = [
//     { 
//       defaultVisible: true, 
//       canHide: false, 
//       isFixed: 'left', 
//       stickyOffset: '0px', 
//       width: '32px', 
//       thClassName: 'sticky left-0 top-0  bg-slate-50 dark:bg-slate-800 border-r-0', 
//       tdClassName: 'sticky left-0  bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted border-r-0' 
//     },
//     { 
//       defaultVisible: true, 
//       canHide: false, 
//       isFixed: 'left', 
//       stickyOffset: '22px', 
//       minWidth: '200px', 
//       thClassName: 'sticky left-[32px] top-0  bg-slate-50 dark:bg-slate-800', 
//       tdClassName: 'sticky left-[32px]  bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted' 
//     },
//     { defaultVisible: true, canHide: true, minWidth: '220px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
//     { defaultVisible: true, canHide: true, minWidth: '150px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
//     { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
//     { defaultVisible: true, canHide: true, minWidth: '120px', thClassName: 'bg-slate-50 dark:bg-slate-800 text-center' },
//     { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
//     { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
//     { defaultVisible: true, canHide: true, minWidth: '120px', thClassName: 'bg-slate-50 dark:bg-slate-800 text-center' },
//     { 
//       defaultVisible: true, 
//       canHide: false, 
//       isFixed: 'right', 
//       stickyOffset: '0px', 
//       width: '50px', 
//       thClassName: 'sticky right-0 top-0 z-30 bg-slate-50 dark:bg-slate-800', 
//       tdClassName: 'sticky right-0 z-20 bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted' 
//     },
//   ];

//   const initialColumnDefinitions: ColumnConfig<Target>[] = useMemo(() => [
//     { 
//       ...baseInitialTargetColumnConfig[0], 
//       id: 'checkbox', 
//       label: '', 
//       accessor: 'id', 
//       cell: (target: Target) => (
//         <Checkbox 
//           checked={!!currentSelectedRows[target.id]} 
//           onCheckedChange={(checked) => setCurrentSelectedRows(prev => ({ ...prev, [target.id]: Boolean(checked) }))} 
//           aria-labelledby={`target-name-${target.id}`} 
//           className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
//         />
//       ) 
//     },
//     { 
//       ...baseInitialTargetColumnConfig[1], 
//       id: 'name', 
//       label: 'Target', 
//       accessor: (target: Target) => `${target.firstName} ${target.lastName}`, 
//       cell: (target: Target) => (
//         <div className="flex items-center gap-2">
//           <Avatar className="h-8 w-8">
//             <AvatarImage src={target.avatarUrl || `https://picsum.photos/seed/${target.id}/100/100`} alt={`${target.firstName} ${target.lastName}`} />
//             <AvatarFallback>{target.firstName?.substring(0,1)}{target.lastName?.substring(0,1)}</AvatarFallback>
//           </Avatar>
//           <div 
//             className="font-medium text-primary hover:underline whitespace-nowrap cursor-pointer"
//             onClick={() => handleTargetClick(target)}
//           >
//             {`${target.firstName} ${target.lastName}`}
//           </div>
//         </div>
//       ),
//       icon: TargetCog, 
//     },
//     { 
//       ...baseInitialTargetColumnConfig[2], 
//       id: 'email', 
//       label: 'Email', 
//       icon: Mail, 
//       accessor: 'email', 
//       cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">{target.email}</span> 
//     },
//     { 
//       ...baseInitialTargetColumnConfig[3], 
//       id: 'role', 
//       label: 'Role', 
//       icon: TargetCog, 
//       accessor: (target: Target) => target.role.roleName, 
//       cell: (target: Target) => (
//         <Badge 
//           variant="outline" 
//           className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700 font-normal py-1 px-2 whitespace-nowrap"
//         >
//           {target.role.roleName}
//         </Badge>
//       ) 
//     },
//     { 
//       ...baseInitialTargetColumnConfig[4], 
//       id: 'organization', 
//       label: 'Organization', 
//       icon: Building2, 
//       accessor: (target: Target) => target.organization?.name || '', 
//       cell: (target: Target) => target.organization ? (
//         <Badge 
//           variant="outline" 
//           className="bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900 dark:text-sky-300 dark:border-sky-700 font-normal py-1 px-2 whitespace-nowrap"
//         >
//           {target.organization.name}
//         </Badge>
//       ) : <span className="text-gray-700 dark:text-gray-300">-</span> 
//     },
//     { 
//       ...baseInitialTargetColumnConfig[5], 
//       id: 'status', 
//       label: 'Status', 
//       accessor: 'status', 
//       cell: (target: Target) => (
//         <Badge 
//           variant={target.status === 'Active' ? 'default' : 'secondary'} 
//           className={target.status === 'Active' ? 'bg-green-600 text-primary-foreground hover:bg-green-600/90' : 'bg-slate-500 text-primary-foreground hover:bg-slate-500/90'}
//         >
//           {target.status}
//         </Badge>
//       ) 
//     },
//     { 
//       ...baseInitialTargetColumnConfig[6], 
//       id: 'lastLogin', 
//       label: 'Last Login', 
//       icon: CalendarDays, 
//       accessor: 'lastLoginDateTime', 
//       cell: (target: Target) => target.lastLoginDateTime ? (
//         <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
//           {format(parseISO(target.lastLoginDateTime), 'MMM d, yyyy HH:mm')}
//         </span>
//       ) : <span className="text-gray-700 dark:text-gray-300">-</span> 
//     },
//     { 
//       ...baseInitialTargetColumnConfig[7], 
//       id: 'createdAt', 
//       label: 'Created At', 
//       icon: CalendarDays, 
//       accessor: 'createdDateTime', 
//       cell: (target: Target) => (
//         <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
//           {format(parseISO(target.createdDateTime), 'MMM d, yyyy')}
//         </span>
//       ) 
//     },
//     { 
//       ...baseInitialTargetColumnConfig[8], 
//       id: 'verified', 
//       label: 'Verified', 
//       icon: ShieldCheck, 
//       accessor: 'verified', 
//       cell: (target: Target) => target.verified ? (
//         <Check className="h-5 w-5 text-green-500 mx-auto" />
//       ) : <X className="h-5 w-5 text-red-500 mx-auto" /> 
//     },
//     { 
//       ...baseInitialTargetColumnConfig[9], 
//       id: 'actions', 
//       label: '', 
//       accessor: 'id', 
//       cell: (target: Target) => (
//         accessedTarget.role.rolePermission === "ROLE_SUPER_ADMIN" ? (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <MoreVertical className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => onEditTarget(target)}>
//                 <EditIcon className="mr-2 h-4 w-4" />
//                 Edit
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => onDeleteTarget(target.id)} className="text-destructive focus:text-destructive">
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         ) : null
//       )
//     },
//   ], [currentSelectedRows, accessedTarget.role.rolePermission]);

//   const [columnConfigs, setColumnConfigs] = useState<ColumnConfig<Target>[]>(initialColumnDefinitions);

//   useEffect(() => {
//     setColumnConfigs(initialColumnDefinitions);
//   }, [initialColumnDefinitions]);

//   const initialVisibility = useMemo(() => {
//     const visibility: Record<string, boolean> = {};
//     columnConfigs.forEach(col => {
//       visibility[col.id] = col.defaultVisible;
//     });
//     return visibility;
//   }, [columnConfigs]);

//   const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(initialVisibility);

//   useEffect(() => {
//     setColumnVisibility(prevVisibility => {
//       const newCalculatedVisibility: Record<string, boolean> = {};
//       columnConfigs.forEach(col => {
//         newCalculatedVisibility[col.id] = prevVisibility[col.id] === undefined ? col.defaultVisible : prevVisibility[col.id];
//       });
//       if (JSON.stringify(newCalculatedVisibility) !== JSON.stringify(prevVisibility)) {
//         return newCalculatedVisibility;
//       }
//       return prevVisibility;
//     });
//   }, [columnConfigs]);

//   const handleTargetClick = (target: Target) => {
//     setSelectedTarget(target);
//     setDetailsPanelOpen(true);
//   };

//   const handleSelectAll = (checked: boolean) => {
//     const newSelectedRowsLocal: Record<string, boolean> = {};
//     if (checked) {
//       targets.forEach(target => newSelectedRowsLocal[target.id] = true);
//     }
//     setCurrentSelectedRows(newSelectedRowsLocal);
//   };

//   const allSelected = targets.length > 0 && targets.every(target => currentSelectedRows[target.id]);

//   const visibleColumns = useMemo(() => {
//     return columnConfigs.filter(col => columnVisibility[col.id]);
//   }, [columnConfigs, columnVisibility]);

//   const toggleMainColumnVisibility = (columnId: string) => {
//     setColumnVisibility(prev => ({
//       ...prev,
//       [columnId]: !prev[columnId],
//     }));
//   };

//   const handleEditHeader = (col: ColumnConfig<Target>) => {
//     setEditingHeader({ id: col.id, currentLabel: col.label });
//   };

//   const handleHeaderLabelChange = () => {
//     if (editingHeader && editInputRef.current) {
//       const newLabel = editInputRef.current.value;
//       setColumnConfigs(prev => prev.map(c => c.id === editingHeader.id ? { ...c, label: newLabel } : c));
//       setEditingHeader(null);
//       toast({ title: "Header Updated", description: `Header changed to "${newLabel}"`});
//     }
//   };

//   const handleRemoveColumn = (columnIdToRemove: string) => {
//     const column = columnConfigs.find(c => c.id === columnIdToRemove);
//     if (column && column.canHide) {
//       setColumnVisibility(prev => ({ ...prev, [columnIdToRemove]: false }));
//       toast({ title: "Column Hidden", description: `"${column.label}" hidden. You can re-enable it from column settings.` });
//     } else {
//       toast({ title: "Action Denied", description: `"${column?.label || 'Column'}" cannot be removed.`, variant: "destructive" });
//     }
//   };

//   const handleDuplicateColumn = (columnIdToDuplicate: string) => {
//     const colToDuplicate = columnConfigs.find(c => c.id === columnIdToDuplicate);
//     if (colToDuplicate) {
//       const newColId = `${colToDuplicate.id}_copy_${Date.now()}`;
//       const newColumn: ColumnConfig<Target> = {
//         ...colToDuplicate,
//         id: newColId,
//         label: `${colToDuplicate.label} (Copy)`,
//         isFixed: undefined, 
//         stickyOffset: undefined,
//         defaultVisible: true, 
//         canHide: true, 
//       };

//       const originalIndex = columnConfigs.findIndex(c => c.id === columnIdToDuplicate);
//       const newConfigs = [...columnConfigs];
//       newConfigs.splice(originalIndex + 1, 0, newColumn); 

//       setColumnConfigs(newConfigs);
//       setColumnVisibility(prev => ({...prev, [newColId]: true})); 
//       toast({ title: "Column Duplicated", description: `"${newColumn.label}" added.`});
//     }
//   };

//   const handleChangeHeaderColor = (columnId: string, color?: string) => {
//     setColumnConfigs(prev => prev.map(c => c.id === columnId ? { ...c, headerColor: color } : c));
//     toast({ title: "Header Color Updated" });
//   };

//   const handlePageTitleChange = () => {
//     if (titleInputRef.current) {
//       setPageTitle(titleInputRef.current.value);
//     }
//     setIsEditingPageTitle(false);
//   };

//   const handlePageTitleColorChange = (color?: string) => {
//     setPageTitleColor(color);
//   };

//   const cellPaddingClass = isDense ? 'px-2 py-1' : 'px-3 py-2';
//   const addTargetRowFirstCellStickyClasses = columnConfigs[0]?.isFixed === 'left' && columnVisibility[columnConfigs[0].id]
//     ? 'sticky left-0 z-20' 
//     : '';

//   const renderTargetDetails = (target: Target) => {
//     return <TargetDetailsPanelContent target={target} />;
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full flex flex-col h-full">
//         <div className="flex items-center justify-between text-xl font-semibold mb-4">
//           <div className="flex items-center">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-7 w-7 mr-1 text-primary hover:text-primary/80"
//               onClick={() => setIsTableCollapsed(!isTableCollapsed)}
//               aria-label={isTableCollapsed ? "Expand table" : "Collapse table"}
//             >
//               {isTableCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//             </Button>
//             <div className="cursor-pointer p-1 rounded hover:bg-muted/50" style={{ color: pageTitleColor || 'hsl(var(--primary))' }}>
//               {isTableCollapsed ? `${pageTitle} (${targets.length} targets)` : pageTitle}
//             </div>
//           </div>
//         </div>
//         <div className="flex-grow flex items-center justify-center text-muted-foreground">
//           <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
//           <p className="text-muted-foreground">Loading data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full flex flex-col h-full">
//       <div className="flex items-center justify-between text-xl font-semibold mb-4">
//         <div className="flex items-center">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-7 w-7 mr-1 text-primary hover:text-primary/80"
//             onClick={() => setIsTableCollapsed(!isTableCollapsed)}
//             aria-label={isTableCollapsed ? "Expand table" : "Collapse table"}
//           >
//             {isTableCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//           </Button>

//           {isEditingPageTitle ? (
//             <div className="flex items-center gap-1">
//               <Input
//                 ref={titleInputRef}
//                 defaultValue={pageTitle}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') handlePageTitleChange();
//                   if (e.key === 'Escape') {
//                     if (titleInputRef.current) {
//                       titleInputRef.current.value = pageTitle;
//                     }
//                     setIsEditingPageTitle(false);
//                   }
//                 }}
//                 className="h-8 text-xl font-semibold"
//                 style={{ color: pageTitleColor || 'hsl(var(--primary))' }}
//               />
//               <Button variant="ghost" size="icon" className="h-7 w-7 text-green-600 hover:text-green-700" onClick={handlePageTitleChange} title="Save title">
//                 <Check className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive/80" onClick={() => {
//                 if (titleInputRef.current) {
//                   titleInputRef.current.value = pageTitle;
//                 }
//                 setIsEditingPageTitle(false);
//               }} title="Cancel edit">
//                 <X className="h-5 w-5" />
//               </Button>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="icon" className="h-7 w-7" title="Change title color">
//                     <Palette className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="start">
//                   <DropdownMenuLabel>Title Color</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   {PREDEFINED_HEADER_COLORS.map(colorOpt => (
//                     <DropdownMenuItem key={colorOpt.name} onClick={() => handlePageTitleColorChange(colorOpt.value)}>
//                       {( (pageTitleColor === undefined && colorOpt.value === undefined) || pageTitleColor === colorOpt.value) ? <Check className="mr-2 h-4 w-4" /> : <span className="mr-2 h-4 w-4"/>}
//                       {colorOpt.name}
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           ) : (
//             <div
//               onDoubleClick={() => setIsEditingPageTitle(true)}
//               className="cursor-pointer p-1 rounded hover:bg-muted/50"
//               style={{ color: pageTitleColor || 'hsl(var(--primary))' }}
//               title="Double-click to edit title"
//             >
//               {isTableCollapsed ? `${pageTitle} (${targets.length} targets)` : pageTitle}
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-1">
//           <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
//             <ChevronDown size={18} className="mr-1"/> View: All Targets
//           </Button>
//           <div className="h-6 w-px bg-border mx-1"></div>
//           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
//             <ChevronUp size={18} />
//           </Button>
//         </div>
//       </div>

//       {!isTableCollapsed && (
//         <>
//            <Card className="shadow-md border border-gray-200 dark:border-gray-700 rounded-lg border-l-4 flex-grow overflow-hidden flex flex-col" style={{ borderLeftColor: tableColor }}>
//       {/* <CardContent className="p-0 flex-grow overflow-auto"> */}
//               <Table>
//                 <TableHeader className="sticky top-0 ">
//                   <TableRow>
//                     {visibleColumns.map((col) => (
//                       <TableHead
//                         key={col.id}
//                         className={cn(
//                           "border-r dark:border-r-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 group", 
//                           (col.id === 'checkbox') ? (isDense ? 'px-1 py-1' : 'px-1 py-2') : cellPaddingClass, 
//                           col.thClassName
//                         )}
//                         style={{
//                           minWidth: col.minWidth,
//                           width: col.width,
//                           position: col.isFixed ? 'sticky' : undefined,
//                           left: col.isFixed === 'left' ? col.stickyOffset : undefined,
//                           right: col.isFixed === 'right' ? col.stickyOffset : undefined,
//                           top: 0, 
//                           backgroundColor: col.headerColor || (col.thClassName?.includes('bg-slate-50') ? 'hsl(var(--muted))': 'hsl(var(--background))'), 
//                         }}
//                       >
//                         <div className={cn(
//                           "flex items-center",
//                           (col.id === 'checkbox' && !col.label) || (col.id === 'actions' && !col.label) || (col.icon && !col.label && !['name', 'email', 'role', 'organization', 'status', 'lastLogin', 'createdAt', 'verified'].includes(col.id))
//                             ? 'justify-center' 
//                             : 'justify-between'
//                         )}>
//                           {editingHeader?.id === col.id ? (
//                             <Input
//                               ref={editInputRef}
//                               defaultValue={editingHeader.currentLabel}
//                               onBlur={handleHeaderLabelChange}
//                               onKeyDown={(e) => e.key === 'Enter' && handleHeaderLabelChange()}
//                               className={cn("h-8 text-sm", isDense && "h-7")}
//                             />
//                           ) : (
//                             (col.id !== 'checkbox' || col.label) && ( 
//                               <div className="flex items-center gap-1.5 truncate" title={col.label}>
//                                 {col.icon && <col.icon className="h-4 w-4 flex-shrink-0" />}
//                                 <span className="truncate">{col.label}</span>
//                               </div>
//                             )
//                           )}

//                           {col.id === 'checkbox' ? (
//                             <Checkbox
//                               checked={allSelected}
//                               onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
//                               aria-label="Select all rows"
//                               className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
//                             />
//                           ) : col.id === 'actions' ? (
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="ghost" size="icon" className={cn("h-7 w-7 hover:bg-slate-200 dark:hover:bg-slate-700", isDense && "h-6 w-6")}>
//                                   <Plus className={cn("h-5 w-5 text-gray-500 dark:text-gray-400", isDense && "h-4 w-4")} />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
//                                 <DropdownMenuSeparator />
//                                 {columnConfigs.filter(c => c.canHide).map(c => (
//                                   <DropdownMenuCheckboxItem
//                                     key={c.id}
//                                     checked={columnVisibility[c.id]}
//                                     onCheckedChange={() => toggleMainColumnVisibility(c.id)}
//                                   >
//                                     {c.label}
//                                   </DropdownMenuCheckboxItem>
//                                 ))}
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           ) : col.canHide ? ( 
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="ghost" size="icon" className={cn("h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity", isDense && "h-5 w-5")}>
//                                   <MoreVertical className={cn("h-4 w-4", isDense && "h-3 w-3")} />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuItem onClick={() => handleEditHeader(col)}>
//                                   <EditIcon className="mr-2 h-4 w-4" /> Edit Name
//                                 </DropdownMenuItem>
//                                 <DropdownMenuSub>
//                                   <DropdownMenuSubTrigger>
//                                     <Palette className="mr-2 h-4 w-4" /> Change Color
//                                   </DropdownMenuSubTrigger>
//                                   <DropdownMenuPortal>
//                                     <DropdownMenuSubContent>
//                                       {PREDEFINED_HEADER_COLORS.map(colorOpt => (
//                                         <DropdownMenuItem key={colorOpt.name} onClick={() => handleChangeHeaderColor(col.id, colorOpt.value)}>
//                                           {( (col.headerColor === undefined && colorOpt.value === undefined) || col.headerColor === colorOpt.value) ? <Check className="mr-2 h-4 w-4" /> : <span className="mr-2 h-4 w-4"/>}
//                                           {colorOpt.name}
//                                         </DropdownMenuItem>
//                                       ))}
//                                     </DropdownMenuSubContent>
//                                   </DropdownMenuPortal>
//                                 </DropdownMenuSub>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem onClick={() => handleDuplicateColumn(col.id)}>
//                                   <Copy className="mr-2 h-4 w-4" /> Duplicate Column
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem onClick={() => handleRemoveColumn(col.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
//                                   <Trash2 className="mr-2 h-4 w-4" /> Remove Column
//                                 </DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           ) : null}
//                         </div>
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {targets.map((target) => (
//                     <TableRow key={target.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 group" data-state={currentSelectedRows[target.id] ? 'selected' : undefined}>
//                       {visibleColumns.map((col) => (
//                         <TableCell
//                           key={col.id}
//                           className={cn(
//                             "border-r dark:border-r-gray-700",
//                             (col.id === 'checkbox') ? (isDense ? 'px-1 py-1' : 'px-1 py-2') : cellPaddingClass, 
//                             col.id === 'checkbox' ? 'border-l-4 border-transparent' : '',
//                             col.tdClassName,
//                             (col.isFixed && col.id === 'checkbox') && 'bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted',
//                             (col.isFixed && col.id === 'name') && 'bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted'
//                           )}
//                           style={{
//                             minWidth: col.minWidth,
//                             width: col.width,
//                             position: col.isFixed ? 'sticky' : undefined,
//                             left: col.isFixed === 'left' ? col.stickyOffset : undefined,
//                             right: col.isFixed === 'right' ? col.stickyOffset : undefined,
//                             backgroundColor: (col.isFixed && (col.id === 'checkbox' || col.id === 'name')) ? 
//                                 (currentSelectedRows[target.id] ? 'hsl(var(--muted))' : (col.tdClassName?.includes('dark:group-hover:bg-slate-800') ? undefined :'hsl(var(--background))') ) : 
//                                 (col.isFixed ? 'hsl(var(--background))' : undefined),
//                           }}
//                         >
//                           {col.cell(target)}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                   <TableRow className={cn("bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 group", isDense && "h-auto")}>
//                     <TableCell
//                       className={cn(
//                         "border-r dark:border-r-gray-700 border-l-4 border-transparent",
//                         (isDense ? 'px-1 py-1' : 'px-1 py-2'),
//                         addTargetRowFirstCellStickyClasses, 
//                         "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700" 
//                       )}
//                       style={{
//                         left: columnConfigs[0]?.isFixed === 'left' && columnVisibility[columnConfigs[0].id] ? columnConfigs[0]?.stickyOffset : undefined,
//                         position: columnConfigs[0]?.isFixed && columnVisibility[columnConfigs[0].id] ? 'sticky' : undefined, 
//                         backgroundColor: 'hsl(var(--muted))'
//                       }}
//                     >
//                       <Checkbox disabled className="border-gray-300 dark:border-gray-600"/>
//                     </TableCell>
//                     <TableCell 
//                         colSpan={visibleColumns.filter(c => c.id !== 'checkbox').length > 0 ? visibleColumns.filter(c => c.id !== 'checkbox').length : 1} 
//                         className={cn(
//                           cellPaddingClass,
//                           "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700"
//                         )}
//                         style={{backgroundColor: 'hsl(var(--muted))'}}
//                     >
//                       {/* <Link href="#/targets/add" passHref>
//                         <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-primary p-0 h-auto font-normal text-sm">
//                           <PlusCircle className="h-4 w-4 mr-1.5" />
//                           Add target
//                         </Button>
//                       </Link> */}
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             {/* </CardContent> */}
//             <CardFooter className="border-t pt-4">
//               <TablePagination
//                 totalItems={pagination.totalElements}
//                 rowsPerPage={pagination.pageSize}
//                 currentPage={pagination.pageNumber + 1}
//                 onPageChange={(page) => onPageChange(page - 1)}
//                 onRowsPerPageChange={onPageSizeChange}
//                 isDense={isDense}
//                 onDenseChange={setIsDense}
//               />
//             </CardFooter>
//           </Card>

//           <DetailsSidePanel
//             data={selectedTarget}
//             open={detailsPanelOpen}
//             onClose={() => setDetailsPanelOpen(false)}
//             renderContent={renderTargetDetails}
//           />
//         </>
//       )}
//       {isTableCollapsed && (
//         <div className="flex-grow flex items-center justify-center text-muted-foreground">
//         </div>
//       )}
//     </div>
//   );
// };

// export default TargetTable;


import { useState, useEffect, useMemo, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Target } from "@/modules/targets/types";
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
import TargetDetailsPanelContent from "../components/TargetDetailsPanelContent";
import { Card, CardContent } from "@mui/material";
import { TablePagination } from "@/components/table-pagination";
import { CardFooter } from "@/components/ui/card";

const PREDEFINED_HEADER_COLORS = [
  { name: 'Default', value: undefined },
  { name: 'Teal', value: 'hsl(var(--chart-1))' },
  { name: 'Orange', value: 'hsl(var(--chart-2))' },
  { name: 'Gray', value: 'hsl(var(--muted))' },
];

interface TargetTableProps {
  targets: Target[];
  tableColor: string;
  onEditTarget: (target: Target) => void;
  onDeleteTarget: (targetId: string) => void;
  isLoading?: boolean;
  accessedTarget: Target;
  pagination: PaginationMetadata;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface ColumnConfig<T> {
  id: string;
  label: string;
  accessor: keyof T | ((item: T) => any);
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

const TargetTable = ({
  accessedTarget,
  targets,
  tableColor,
  onEditTarget,
  onDeleteTarget,
  isLoading = false,
  pagination,
  onPageChange,
  onPageSizeChange
}: TargetTableProps) => {
  const { toast } = useToast();
  const [currentSelectedRows, setCurrentSelectedRows] = useState<Record<string, boolean>>({});
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [isDense, setIsDense] = useState(false);
  const [editingHeader, setEditingHeader] = useState<{ id: string; currentLabel: string } | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);


  const baseInitialTargetColumnConfig: Omit<ColumnConfig<Target>, 'id' | 'label' | 'accessor' | 'cell' | 'icon'>[] = [
    {
      defaultVisible: true,
      canHide: false,
      isFixed: 'left',
      stickyOffset: '0px',
      width: '32px',
      thClassName: 'sticky left-0 top-0 bg-slate-50 dark:bg-slate-800 border-r-0',
      tdClassName: 'sticky left-0 bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted border-r-0'
    },
    { defaultVisible: true, canHide: false, isFixed: 'left', stickyOffset: '23px', minWidth: '200px', thClassName: 'sticky left-[40px] top-0 z-30 bg-slate-50 dark:bg-slate-800 border-r dark:border-r-gray-700', tdClassName: 'sticky left-[40px] z-20 bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted border-r dark:border-r-gray-700' },
    { defaultVisible: true, canHide: true, minWidth: '220px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    { defaultVisible: true, canHide: true, minWidth: '150px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    { defaultVisible: true, canHide: true, minWidth: '120px', thClassName: 'bg-slate-50 dark:bg-slate-800 text-center' },
    { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    { defaultVisible: true, canHide: true, minWidth: '180px', thClassName: 'bg-slate-50 dark:bg-slate-800' },
    { defaultVisible: true, canHide: true, minWidth: '120px', thClassName: 'bg-slate-50 dark:bg-slate-800 text-center' },
    {
      defaultVisible: true,
      canHide: false,
      isFixed: 'right',
      stickyOffset: '0px',
      width: '50px',
      thClassName: 'sticky right-0 top-0 z-30 bg-slate-50 dark:bg-slate-800',
      tdClassName: 'sticky right-0 z-20 bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800 group-data-[state=selected]:bg-muted'
    },
  ];

  const initialTargetColumnDefinitions: ColumnConfig<Target>[] = useMemo(() => [
    {
      ...baseInitialTargetColumnConfig[0],
      id: 'checkbox',
      label: '',
      accessor: 'id',
      cell: (target: Target) => (
        <Checkbox
          checked={!!currentSelectedRows[target.id]}
          onCheckedChange={(checked) => setCurrentSelectedRows(prev => ({ ...prev, [target.id]: Boolean(checked) }))}
          aria-labelledby={`target-name-${target.id}`}
          className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      )
    },
    {
      ...baseInitialTargetColumnConfig[1], id: 'name', label: 'Name', accessor: (target: Target) => `${target.accountName}`,
      cell: (target: Target) => (
        <div className="flex items-center gap-2">
          <div
            className="font-medium text-primary hover:underline whitespace-nowrap cursor-pointer"
            onClick={() => handleTargetClick(target)}
          >
            {`${target.accountName}`}
          </div>
        </div>
      ),
      icon: UserCog,
    },
    {
      ...baseInitialTargetColumnConfig[2],
      id: 'connectionsCount',
      label: 'Connections Count',
      accessor: 'connectionsCount',
      cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.connectionsCount}</span>
    },
    {
      ...baseInitialTargetColumnConfig[3],
      id: 'handledBy',
      label: 'Handled By',
      accessor: (target: Target) => target.handledBy.firstName + " " + target.handledBy.lastName,
      cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">{target.handledBy.firstName} {target.handledBy.lastName}</span>
    },
    {
      ...baseInitialTargetColumnConfig[4],
      id: 'noOfLeadsIdentified',
      label: 'Leads Identified',
      accessor: 'noOfLeadsIdentified',
      cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.noOfLeadsIdentified}</span>
    },
    {
      ...baseInitialTargetColumnConfig[5],
      id: 'status',
      label: 'Status',
      accessor: 'status',
      cell: (target: Target) => (
        <Badge
          variant={target.status === 'Active' ? 'default' : target.status === 'InActive' ? 'secondary' : 'outline'}
          className={target.status === 'Active' ? 'bg-green-600 text-primary-foreground hover:bg-green-600/90' : target.status === 'InActive' ? 'bg-slate-500 text-primary-foreground hover:bg-slate-500/90' : 'bg-orange-600 text-primary-foreground hover:bg-orange-600/90'}
        >
          {target.status}
        </Badge>
      )
    },
    {
      ...baseInitialTargetColumnConfig[6],
      id: 'createdDate',
      label: 'Created Date',
      accessor: 'createdDate',
      cell: (target: Target) => (
        <span className="text-gray-700 dark:text-gray-300">{format(parseISO(target.createdDate), 'MMM d, yyyy')}</span>
      )
    },
    {
      ...baseInitialTargetColumnConfig[7],
      id: 'meetingsScheduled',
      label: 'Meetings Scheduled',
      accessor: 'meetingsScheduled',
      cell: (target: Target) => <span className="text-gray-700 dark:text-gray-300">{target.meetingsScheduled}</span>
    },
    {
      ...baseInitialTargetColumnConfig[8],
      id: 'responseReceived',
      label: 'Response Received',
      accessor: 'responseReceived',
      cell: (target: Target) => (
        <span className="text-gray-700 dark:text-gray-300">{target.responseReceived ? 'Yes' : 'No'}</span>
      )
    },
    {
      ...baseInitialTargetColumnConfig[9],
      id: 'actions',
      label: '',
      accessor: 'id',
      cell: (target: Target) => (
        (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditTarget(target)}>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDeleteTarget(target.id)} className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      )
    },
  ], [currentSelectedRows]);



  const [columnConfigs, setColumnConfigs] = useState<ColumnConfig<Target>[]>(initialTargetColumnDefinitions);

  useEffect(() => {
    setColumnConfigs(initialTargetColumnDefinitions);
  }, [initialTargetColumnDefinitions]);

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

  const handleTargetClick = (target: Target) => {
    setSelectedTarget(target);
    setDetailsPanelOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRowsLocal: Record<string, boolean> = {};
    if (checked) {
      targets.forEach(target => newSelectedRowsLocal[target.id] = true);
    }
    setCurrentSelectedRows(newSelectedRowsLocal);
  };

  const allSelected = targets.length > 0 && targets.every(target => currentSelectedRows[target.id]);

  const visibleColumns = useMemo(() => {
    return columnConfigs.filter(col => columnVisibility[col.id]);
  }, [columnConfigs, columnVisibility]);

  const toggleMainColumnVisibility = (columnId: string) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleEditHeader = (col: ColumnConfig<Target>) => {
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
      const newColumn: ColumnConfig<Target> = {
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
  const addTargetRowFirstCellStickyClasses = columnConfigs[0]?.isFixed === 'left' && columnVisibility[columnConfigs[0].id]
    ? 'sticky left-0 z-20'
    : '';

  const renderTargetDetails = (target: Target) => {
    return <TargetDetailsPanelContent target={target} />;
  };

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
                    (col.id === 'checkbox' && !col.label) || (col.id === 'actions' && !col.label) || (col.icon && !col.label && !['name', 'email', 'role', 'organization', 'status', 'lastLogin', 'createdAt', 'verified'].includes(col.id))
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
            {targets.map((target) => (
              <TableRow key={target.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 group" data-state={currentSelectedRows[target.id] ? 'selected' : undefined}>
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
                        (currentSelectedRows[target.id] ? 'hsl(var(--muted))' : (col.tdClassName?.includes('dark:group-hover:bg-slate-800') ? undefined : 'hsl(var(--background))')) :
                        (col.isFixed ? 'hsl(var(--background))' : undefined),
                    }}
                  >
                    {col.cell(target)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow className={cn("bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 group", isDense && "h-auto")}>
              <TableCell
                className={cn(
                  "border-r dark:border-r-gray-700 border-l-4 border-transparent",
                  (isDense ? 'px-1 py-1' : 'px-1 py-2'),
                  addTargetRowFirstCellStickyClasses,
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
                {/* <Link href="#/targets/add" passHref>
                  <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-primary p-0 h-auto font-normal text-sm">
                    <PlusCircle className="h-4 w-4 mr-1.5" />
                    Add target
                  </Button>
                </Link> */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <CardFooter className="border-t pt-4">
          <TablePagination
            totalItems={pagination.totalElements}
            rowsPerPage={pagination.pageSize}
            currentPage={pagination.pageNumber + 1}
            onPageChange={(page) => onPageChange(page - 1)}
            onRowsPerPageChange={onPageSizeChange}
            isDense={isDense}
            onDenseChange={setIsDense}
          />
        </CardFooter>
      </Card>

      <DetailsSidePanel
        data={selectedTarget}
        open={detailsPanelOpen}
        onClose={() => setDetailsPanelOpen(false)}
        renderContent={renderTargetDetails}
      />
    </div>
  );
};

export default TargetTable;