
// // import React, { useState } from "react";
// // import { User } from "@/modules/users/types";
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
// // import UserDetailsPanelContent from "./UserDetailsPanelContent";
// // import { formatDate } from "@/lib/utils";
// // import { PaginationMetadata } from "@/modules/targets/types";

// // interface UserTableProps {
// //   users: User[];
// //   tableColor: string;
// //   onEditUser: (user: User) => void;
// //   onDeleteUser: (userId: string) => void;
// //   isLoading?: boolean;
// //   accessedUser: User;
// //   pagination: PaginationMetadata;
// //   onPageChange: (page: number) => void;
// //   onPageSizeChange: (size: number) => void;
// // }

// // const UserTable = ({
// //   accessedUser,
// //   users,
// //   tableColor,
// //   onEditUser,
// //   onDeleteUser,
// //   isLoading = false,
// //   pagination,
// //   onPageChange,
// //   onPageSizeChange
// // }: UserTableProps) => {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [rowsPerPage, setRowsPerPage] = useState(5);
// //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
// //   const [showDetailsPanel, setShowDetailsPanel] = useState(false);

// //   const handleUserClick = (user: User) => {
// //     setSelectedUser(user);
// //     setShowDetailsPanel(true);
// //   };

// //   if (isLoading) {
// //     return (
// //       <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
// //         <CardContent className="p-0">
// //           <Table>
// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>User</TableHead>
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

// //   if (!Array.isArray(users) || users.length === 0) {
// //     return (
// //       <Card className="relative" style={{ borderLeft: `4px solid ${tableColor}` }}>
// //         <CardContent className="p-6 flex justify-center items-center">
// //           <p className="text-muted-foreground">No users found.</p>
// //         </CardContent>
// //       </Card>
// //     );
// //   }

// //   // Calculate pagination values
// //   const totalPages = Math.ceil(users.length / rowsPerPage);
// //   const startIndex = (currentPage - 1) * rowsPerPage;
// //   const endIndex = Math.min(startIndex + rowsPerPage, users.length);
// //   const paginatedData = users.slice(startIndex, endIndex);

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
// //                   <TableHead>User</TableHead>
// //                   <TableHead>Role</TableHead>
// //                   <TableHead>Organization</TableHead>
// //                   <TableHead>Contact</TableHead>
// //                   <TableHead>Permission</TableHead>
// //                   {accessedUser.role.rolePermission === "ROLE_SUPER_ADMIN" &&
// //                     <TableHead className="w-[80px]">Actions</TableHead>
// //                   }
// //                 </TableRow>
// //               </TableHeader>
// //               {users.length !== 0 ? (
// //                 <TableBody>
// //                   {users.map((user) => (
// //                     <TableRow key={user.id}>
// //                       <TableCell>
// //                         <div
// //                           className="flex items-center gap-3 cursor-pointer"
// //                           onClick={() => handleUserClick(user)}
// //                         >
// //                           <Avatar className="h-8 w-8">
// //                             {user.avatarUrl ? (
// //                               <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
// //                             ) : (
// //                               <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
// //                             )}
// //                           </Avatar>
// //                           <div className="flex flex-col">
// //                             <span className="font-medium text-sm">{`${user.firstName} ${user.lastName}`}</span>
// //                             <span className="text-xs text-muted-foreground">{user.email}</span>
// //                           </div>
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <span className="font-medium text-sm capitalize">{user.role.roleName}</span>
// //                       </TableCell>
// //                       <TableCell>
// //                         <span className="text-sm">{user.organization.name}</span>
// //                       </TableCell>
// //                       <TableCell>
// //                         <div className="flex flex-col">
// //                           <span className="text-sm">{user.phoneNumber || '-'}</span>
// //                           <span className="text-xs text-muted-foreground">{user.city && user.state ? `${user.city}, ${user.state}` : '-'}</span>
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         {(() => {
// //                           let color = "";
// //                           switch (user.status) {
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
// //                               {user.status}
// //                             </Badge>
// //                           );
// //                         })()}
// //                       </TableCell>
// //                       {accessedUser.role.rolePermission === "ROLE_SUPER_ADMIN" &&
// //                         <TableCell>
// //                           <DropdownMenu>
// //                             <DropdownMenuTrigger asChild>
// //                               <Button variant="ghost" size="icon" className="h-8 w-8">
// //                                 <MoreHorizontal className="h-4 w-4" />
// //                               </Button>
// //                             </DropdownMenuTrigger>
// //                             <DropdownMenuContent align="end" className="w-[160px]">
// //                               <DropdownMenuItem onClick={() => onEditUser(user)}>
// //                                 <Edit className="mr-2 h-4 w-4" />
// //                                 Edit
// //                               </DropdownMenuItem>
// //                               <DropdownMenuItem
// //                                 onClick={() => onDeleteUser(user.id)}
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
// //         {users.length > 0 && (
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
// //         data={selectedUser}
// //         open={showDetailsPanel}
// //         onClose={() => setShowDetailsPanel(false)}
// //         renderContent={(user) => <UserDetailsPanelContent user={user} />}
// //       />
// //     </>
// //   );
// // };

// // export default UserTable;






// import { useState, useEffect, useMemo, useRef } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { User } from "@/modules/users/types";
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
// import { Check, X, Edit2 as EditIcon, Trash2, MoreVertical, Mail, Building2, UserCog, CalendarDays, ShieldCheck, Plus, PlusCircle, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Palette, Settings2, Loader2, Copy } from "lucide-react";
// import { PaginationMetadata } from "@/modules/targets/types";
// import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useToast } from "@/hooks/use-toast";
// import { cn } from "@/lib/utils";
// import UserDetailsPanelContent from "../components/UserDetailsPanelContent";
// import { Card, CardContent, Link } from "@mui/material";
// import { TablePagination } from "@/components/table-pagination";
// import { CardFooter } from "@/components/ui/card";

// const PREDEFINED_HEADER_COLORS = [
//   { name: 'Default', value: undefined },
//   { name: 'Teal', value: 'hsl(var(--chart-1))' },
//   { name: 'Orange', value: 'hsl(var(--chart-2))' },
//   { name: 'Gray', value: 'hsl(var(--muted))' },
// ];

// interface UserTableProps {
//   users: User[];
//   tableColor: string;
//   onEditUser: (user: User) => void;
//   onDeleteUser: (userId: string) => void;
//   isLoading?: boolean;
//   accessedUser: User;
//   pagination: PaginationMetadata;
//   onPageChange: (page: number) => void;
//   onPageSizeChange: (size: number) => void;
// }

// const UserTable = ({
//   accessedUser,
//   users,
//   tableColor,
//   onEditUser,
//   onDeleteUser,
//   isLoading = false,
//   pagination,
//   onPageChange,
//   onPageSizeChange
// }: UserTableProps) => {
//   const { toast } = useToast();
//   const [currentSelectedRows, setCurrentSelectedRows] = useState<Record<string, boolean>>({});
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
//   const [isDense, setIsDense] = useState(false);
//   const [isTableCollapsed, setIsTableCollapsed] = useState(false);
//   const [pageTitle, setPageTitle] = useState("Active Users");
//   const [isEditingPageTitle, setIsEditingPageTitle] = useState(false);
//   const [pageTitleColor, setPageTitleColor] = useState<string | undefined>(undefined);
//   const titleInputRef = useRef<HTMLInputElement>(null);
//   const [editingHeader, setEditingHeader] = useState<{ id: string; currentLabel: string } | null>(null);
//   const editInputRef = useRef<HTMLInputElement>(null);

//   const baseInitialUserColumnConfig: Omit<ColumnConfig<User>, 'id' | 'label' | 'accessor' | 'cell' | 'icon'>[] = [
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

//   const initialColumnDefinitions: ColumnConfig<User>[] = useMemo(() => [
//     { 
//       ...baseInitialUserColumnConfig[0], 
//       id: 'checkbox', 
//       label: '', 
//       accessor: 'id', 
//       cell: (user: User) => (
//         <Checkbox 
//           checked={!!currentSelectedRows[user.id]} 
//           onCheckedChange={(checked) => setCurrentSelectedRows(prev => ({ ...prev, [user.id]: Boolean(checked) }))} 
//           aria-labelledby={`user-name-${user.id}`} 
//           className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
//         />
//       ) 
//     },
//     { 
//       ...baseInitialUserColumnConfig[1], 
//       id: 'name', 
//       label: 'User', 
//       accessor: (user: User) => `${user.firstName} ${user.lastName}`, 
//       cell: (user: User) => (
//         <div className="flex items-center gap-2">
//           <Avatar className="h-8 w-8">
//             <AvatarImage src={user.avatarUrl || `https://picsum.photos/seed/${user.id}/100/100`} alt={`${user.firstName} ${user.lastName}`} />
//             <AvatarFallback>{user.firstName?.substring(0,1)}{user.lastName?.substring(0,1)}</AvatarFallback>
//           </Avatar>
//           <div 
//             className="font-medium text-primary hover:underline whitespace-nowrap cursor-pointer"
//             onClick={() => handleUserClick(user)}
//           >
//             {`${user.firstName} ${user.lastName}`}
//           </div>
//         </div>
//       ),
//       icon: UserCog, 
//     },
//     { 
//       ...baseInitialUserColumnConfig[2], 
//       id: 'email', 
//       label: 'Email', 
//       icon: Mail, 
//       accessor: 'email', 
//       cell: (user: User) => <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">{user.email}</span> 
//     },
//     { 
//       ...baseInitialUserColumnConfig[3], 
//       id: 'role', 
//       label: 'Role', 
//       icon: UserCog, 
//       accessor: (user: User) => user.role.roleName, 
//       cell: (user: User) => (
//         <Badge 
//           variant="outline" 
//           className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700 font-normal py-1 px-2 whitespace-nowrap"
//         >
//           {user.role.roleName}
//         </Badge>
//       ) 
//     },
//     { 
//       ...baseInitialUserColumnConfig[4], 
//       id: 'organization', 
//       label: 'Organization', 
//       icon: Building2, 
//       accessor: (user: User) => user.organization?.name || '', 
//       cell: (user: User) => user.organization ? (
//         <Badge 
//           variant="outline" 
//           className="bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900 dark:text-sky-300 dark:border-sky-700 font-normal py-1 px-2 whitespace-nowrap"
//         >
//           {user.organization.name}
//         </Badge>
//       ) : <span className="text-gray-700 dark:text-gray-300">-</span> 
//     },
//     { 
//       ...baseInitialUserColumnConfig[5], 
//       id: 'status', 
//       label: 'Status', 
//       accessor: 'status', 
//       cell: (user: User) => (
//         <Badge 
//           variant={user.status === 'Active' ? 'default' : 'secondary'} 
//           className={user.status === 'Active' ? 'bg-green-600 text-primary-foreground hover:bg-green-600/90' : 'bg-slate-500 text-primary-foreground hover:bg-slate-500/90'}
//         >
//           {user.status}
//         </Badge>
//       ) 
//     },
//     { 
//       ...baseInitialUserColumnConfig[6], 
//       id: 'lastLogin', 
//       label: 'Last Login', 
//       icon: CalendarDays, 
//       accessor: 'lastLoginDateTime', 
//       cell: (user: User) => user.lastLoginDateTime ? (
//         <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
//           {format(parseISO(user.lastLoginDateTime), 'MMM d, yyyy HH:mm')}
//         </span>
//       ) : <span className="text-gray-700 dark:text-gray-300">-</span> 
//     },
//     { 
//       ...baseInitialUserColumnConfig[7], 
//       id: 'createdAt', 
//       label: 'Created At', 
//       icon: CalendarDays, 
//       accessor: 'createdDateTime', 
//       cell: (user: User) => (
//         <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
//           {format(parseISO(user.createdDateTime), 'MMM d, yyyy')}
//         </span>
//       ) 
//     },
//     { 
//       ...baseInitialUserColumnConfig[8], 
//       id: 'verified', 
//       label: 'Verified', 
//       icon: ShieldCheck, 
//       accessor: 'verified', 
//       cell: (user: User) => user.verified ? (
//         <Check className="h-5 w-5 text-green-500 mx-auto" />
//       ) : <X className="h-5 w-5 text-red-500 mx-auto" /> 
//     },
//     { 
//       ...baseInitialUserColumnConfig[9], 
//       id: 'actions', 
//       label: '', 
//       accessor: 'id', 
//       cell: (user: User) => (
//         accessedUser.role.rolePermission === "ROLE_SUPER_ADMIN" ? (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <MoreVertical className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => onEditUser(user)}>
//                 <EditIcon className="mr-2 h-4 w-4" />
//                 Edit
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => onDeleteUser(user.id)} className="text-destructive focus:text-destructive">
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         ) : null
//       )
//     },
//   ], [currentSelectedRows, accessedUser.role.rolePermission]);

//   const [columnConfigs, setColumnConfigs] = useState<ColumnConfig<User>[]>(initialColumnDefinitions);
  
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

//   const handleUserClick = (user: User) => {
//     setSelectedUser(user);
//     setDetailsPanelOpen(true);
//   };

//   const handleSelectAll = (checked: boolean) => {
//     const newSelectedRowsLocal: Record<string, boolean> = {};
//     if (checked) {
//       users.forEach(user => newSelectedRowsLocal[user.id] = true);
//     }
//     setCurrentSelectedRows(newSelectedRowsLocal);
//   };

//   const allSelected = users.length > 0 && users.every(user => currentSelectedRows[user.id]);

//   const visibleColumns = useMemo(() => {
//     return columnConfigs.filter(col => columnVisibility[col.id]);
//   }, [columnConfigs, columnVisibility]);
  
//   const toggleMainColumnVisibility = (columnId: string) => {
//     setColumnVisibility(prev => ({
//       ...prev,
//       [columnId]: !prev[columnId],
//     }));
//   };

//   const handleEditHeader = (col: ColumnConfig<User>) => {
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
//       const newColumn: ColumnConfig<User> = {
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
//   const addUserRowFirstCellStickyClasses = columnConfigs[0]?.isFixed === 'left' && columnVisibility[columnConfigs[0].id]
//     ? 'sticky left-0 z-20' 
//     : '';

//   const renderUserDetails = (user: User) => {
//     return <UserDetailsPanelContent user={user} />;
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
//               {isTableCollapsed ? `${pageTitle} (${users.length} users)` : pageTitle}
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
//               {isTableCollapsed ? `${pageTitle} (${users.length} users)` : pageTitle}
//             </div>
//           )}
//         </div>
        
//         <div className="flex items-center gap-1">
//           <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
//             <ChevronDown size={18} className="mr-1"/> View: All Users
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
//                   {users.map((user) => (
//                     <TableRow key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 group" data-state={currentSelectedRows[user.id] ? 'selected' : undefined}>
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
//                                 (currentSelectedRows[user.id] ? 'hsl(var(--muted))' : (col.tdClassName?.includes('dark:group-hover:bg-slate-800') ? undefined :'hsl(var(--background))') ) : 
//                                 (col.isFixed ? 'hsl(var(--background))' : undefined),
//                           }}
//                         >
//                           {col.cell(user)}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                   <TableRow className={cn("bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 group", isDense && "h-auto")}>
//                     <TableCell
//                       className={cn(
//                         "border-r dark:border-r-gray-700 border-l-4 border-transparent",
//                         (isDense ? 'px-1 py-1' : 'px-1 py-2'),
//                         addUserRowFirstCellStickyClasses, 
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
//                       {/* <Link href="#/users/add" passHref>
//                         <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-primary p-0 h-auto font-normal text-sm">
//                           <PlusCircle className="h-4 w-4 mr-1.5" />
//                           Add user
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
//             data={selectedUser}
//             open={detailsPanelOpen}
//             onClose={() => setDetailsPanelOpen(false)}
//             renderContent={renderUserDetails}
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

// export default UserTable;


import { useState, useEffect, useMemo, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/modules/users/types";
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
import { Check, X, Edit2 as EditIcon, Trash2, MoreVertical, Mail, Building2, UserCog, CalendarDays, ShieldCheck, Plus, Copy, Loader2, Palette } from "lucide-react";
import { PaginationMetadata } from "@/modules/targets/types";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import UserDetailsPanelContent from "../components/UserDetailsPanelContent";
import { Card, CardContent } from "@mui/material";
import { TablePagination } from "@/components/table-pagination";
import { CardFooter } from "@/components/ui/card";

const PREDEFINED_HEADER_COLORS = [
  { name: 'Default', value: undefined },
  { name: 'Teal', value: 'hsl(var(--chart-1))' },
  { name: 'Orange', value: 'hsl(var(--chart-2))' },
  { name: 'Gray', value: 'hsl(var(--muted))' },
];

interface UserTableProps {
  users: User[];
  tableColor: string;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  isLoading?: boolean;
  accessedUser: User;
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

const UserTable = ({
  accessedUser,
  users,
  tableColor,
  onEditUser,
  onDeleteUser,
  isLoading = false,
  pagination,
  onPageChange,
  onPageSizeChange
}: UserTableProps) => {
  const { toast } = useToast();
  const [currentSelectedRows, setCurrentSelectedRows] = useState<Record<string, boolean>>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [isDense, setIsDense] = useState(false);
  const [editingHeader, setEditingHeader] = useState<{ id: string; currentLabel: string } | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const baseInitialUserColumnConfig: Omit<ColumnConfig<User>, 'id' | 'label' | 'accessor' | 'cell' | 'icon'>[] = [
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

  const initialColumnDefinitions: ColumnConfig<User>[] = useMemo(() => [
    { 
      ...baseInitialUserColumnConfig[0], 
      id: 'checkbox', 
      label: '', 
      accessor: 'id', 
      cell: (user: User) => (
        <Checkbox 
          checked={!!currentSelectedRows[user.id]} 
          onCheckedChange={(checked) => setCurrentSelectedRows(prev => ({ ...prev, [user.id]: Boolean(checked) }))} 
          aria-labelledby={`user-name-${user.id}`} 
          className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
        />
      ) 
    },
    { 
      ...baseInitialUserColumnConfig[1], 
      id: 'name', 
      label: 'User', 
      accessor: (user: User) => `${user.firstName} ${user.lastName}`, 
      cell: (user: User) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl || `https://picsum.photos/seed/${user.id}/100/100`} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback>{user.firstName?.substring(0,1)}{user.lastName?.substring(0,1)}</AvatarFallback>
          </Avatar>
          <div 
            className="font-medium text-primary hover:underline whitespace-nowrap cursor-pointer"
            onClick={() => handleUserClick(user)}
          >
            {`${user.firstName} ${user.lastName}`}
          </div>
        </div>
      ),
      icon: UserCog, 
    },
    { 
      ...baseInitialUserColumnConfig[2], 
      id: 'email', 
      label: 'Email', 
      icon: Mail, 
      accessor: 'email', 
      cell: (user: User) => <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">{user.email}</span> 
    },
    { 
      ...baseInitialUserColumnConfig[3], 
      id: 'role', 
      label: 'Role', 
      icon: UserCog, 
      accessor: (user: User) => user.role.roleName, 
      cell: (user: User) => (
        <Badge 
          variant="outline" 
          className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700 font-normal py-1 px-2 whitespace-nowrap"
        >
          {user.role.roleName}
        </Badge>
      ) 
    },
    { 
      ...baseInitialUserColumnConfig[4], 
      id: 'organization', 
      label: 'Organization', 
      icon: Building2, 
      accessor: (user: User) => user.organization?.name || '', 
      cell: (user: User) => user.organization ? (
        <Badge 
          variant="outline" 
          className="bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900 dark:text-sky-300 dark:border-sky-700 font-normal py-1 px-2 whitespace-nowrap"
        >
          {user.organization.name}
        </Badge>
      ) : <span className="text-gray-700 dark:text-gray-300">-</span> 
    },
    { 
      ...baseInitialUserColumnConfig[5], 
      id: 'status', 
      label: 'Status', 
      accessor: 'status', 
      cell: (user: User) => (
        <Badge 
          variant={user.status === 'Active' ? 'default' : 'secondary'} 
          className={user.status === 'Active' ? 'bg-green-600 text-primary-foreground hover:bg-green-600/90' : 'bg-slate-500 text-primary-foreground hover:bg-slate-500/90'}
        >
          {user.status}
        </Badge>
      ) 
    },
    { 
      ...baseInitialUserColumnConfig[6], 
      id: 'lastLogin', 
      label: 'Last Login', 
      icon: CalendarDays, 
      accessor: 'lastLoginDateTime', 
      cell: (user: User) => user.lastLoginDateTime ? (
        <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {format(parseISO(user.lastLoginDateTime), 'MMM d, yyyy HH:mm')}
        </span>
      ) : <span className="text-gray-700 dark:text-gray-300">-</span> 
    },
    { 
      ...baseInitialUserColumnConfig[7], 
      id: 'createdAt', 
      label: 'Created At', 
      icon: CalendarDays, 
      accessor: 'createdDateTime', 
      cell: (user: User) => (
        <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {format(parseISO(user.createdDateTime), 'MMM d, yyyy')}
        </span>
      ) 
    },
    { 
      ...baseInitialUserColumnConfig[8], 
      id: 'verified', 
      label: 'Verified', 
      icon: ShieldCheck, 
      accessor: 'verified', 
      cell: (user: User) => user.verified ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : <X className="h-5 w-5 text-red-500 mx-auto" /> 
    },
    { 
      ...baseInitialUserColumnConfig[9], 
      id: 'actions', 
      label: '', 
      accessor: 'id', 
      cell: (user: User) => (
        accessedUser.role.rolePermission === "ROLE_SUPER_ADMIN" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditUser(user)}>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDeleteUser(user.id)} className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null
      )
    },
  ], [currentSelectedRows, accessedUser.role.rolePermission]);

  const [columnConfigs, setColumnConfigs] = useState<ColumnConfig<User>[]>(initialColumnDefinitions);
  
  useEffect(() => {
    setColumnConfigs(initialColumnDefinitions);
  }, [initialColumnDefinitions]);

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

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setDetailsPanelOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRowsLocal: Record<string, boolean> = {};
    if (checked) {
      users.forEach(user => newSelectedRowsLocal[user.id] = true);
    }
    setCurrentSelectedRows(newSelectedRowsLocal);
  };

  const allSelected = users.length > 0 && users.every(user => currentSelectedRows[user.id]);

  const visibleColumns = useMemo(() => {
    return columnConfigs.filter(col => columnVisibility[col.id]);
  }, [columnConfigs, columnVisibility]);
  
  const toggleMainColumnVisibility = (columnId: string) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleEditHeader = (col: ColumnConfig<User>) => {
    setEditingHeader({ id: col.id, currentLabel: col.label });
  };

  const handleHeaderLabelChange = () => {
    if (editingHeader && editInputRef.current) {
      const newLabel = editInputRef.current.value;
      setColumnConfigs(prev => prev.map(c => c.id === editingHeader.id ? { ...c, label: newLabel } : c));
      setEditingHeader(null);
      toast({ title: "Header Updated", description: `Header changed to "${newLabel}"`});
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
      const newColumn: ColumnConfig<User> = {
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
      setColumnVisibility(prev => ({...prev, [newColId]: true})); 
      toast({ title: "Column Duplicated", description: `"${newColumn.label}" added.`});
    }
  };

  const handleChangeHeaderColor = (columnId: string, color?: string) => {
    setColumnConfigs(prev => prev.map(c => c.id === columnId ? { ...c, headerColor: color } : c));
    toast({ title: "Header Color Updated" });
  };

  const cellPaddingClass = isDense ? 'px-2 py-1' : 'px-3 py-2';
  const addUserRowFirstCellStickyClasses = columnConfigs[0]?.isFixed === 'left' && columnVisibility[columnConfigs[0].id]
    ? 'sticky left-0 z-20' 
    : '';

  const renderUserDetails = (user: User) => {
    return <UserDetailsPanelContent user={user} />;
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
                                    {(col.headerColor === undefined && colorOpt.value === undefined) || col.headerColor === colorOpt.value ? <Check className="mr-2 h-4 w-4" /> : <span className="mr-2 h-4 w-4"/>}
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
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 group" data-state={currentSelectedRows[user.id] ? 'selected' : undefined}>
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
                        (currentSelectedRows[user.id] ? 'hsl(var(--muted))' : (col.tdClassName?.includes('dark:group-hover:bg-slate-800') ? undefined : 'hsl(var(--background))')) : 
                        (col.isFixed ? 'hsl(var(--background))' : undefined),
                    }}
                  >
                    {col.cell(user)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow className={cn("bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 group", isDense && "h-auto")}>
              <TableCell
                className={cn(
                  "border-r dark:border-r-gray-700 border-l-4 border-transparent",
                  (isDense ? 'px-1 py-1' : 'px-1 py-2'),
                  addUserRowFirstCellStickyClasses, 
                  "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700" 
                )}
                style={{
                  left: columnConfigs[0]?.isFixed === 'left' && columnVisibility[columnConfigs[0].id] ? columnConfigs[0]?.stickyOffset : undefined,
                  position: columnConfigs[0]?.isFixed && columnVisibility[columnConfigs[0].id] ? 'sticky' : undefined, 
                  backgroundColor: 'hsl(var(--muted))'
                }}
              >
                <Checkbox disabled className="border-gray-300 dark:border-gray-600"/>
              </TableCell>
              <TableCell 
                colSpan={visibleColumns.filter(c => c.id !== 'checkbox').length > 0 ? visibleColumns.filter(c => c.id !== 'checkbox').length : 1} 
                className={cn(
                  cellPaddingClass,
                  "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700"
                )}
                style={{backgroundColor: 'hsl(var(--muted))'}}
              >
                {/* <Link href="#/users/add" passHref>
                  <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-primary p-0 h-auto font-normal text-sm">
                    <PlusCircle className="h-4 w-4 mr-1.5" />
                    Add user
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
        data={selectedUser}
        open={detailsPanelOpen}
        onClose={() => setDetailsPanelOpen(false)}
        renderContent={renderUserDetails}
      />
    </div>
  );
};

export default UserTable;