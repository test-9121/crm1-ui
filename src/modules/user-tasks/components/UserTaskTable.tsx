
import { useState, useEffect, useMemo, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserTask } from "@/modules/user-tasks/types";
import { Badge } from "@/components/ui/badge";
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
import { Check, Edit2 as EditIcon, Trash2, MoreVertical, Copy, Loader2, Palette, UserCog, Plus } from "lucide-react";
import { PaginationMetadata } from "@/modules/targets/types";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import UserTaskDetailsPanelContent from "../components/UserTaskDetailsPanelContent";
import { Card } from "@mui/material";
import { TablePagination } from "@/components/table-pagination";
import { CardFooter } from "@/components/ui/card";
;

const PREDEFINED_HEADER_COLORS = [
  { name: 'Default', value: undefined },
  { name: 'Teal', value: 'hsl(var(--chart-1))' },
  { name: 'Orange', value: 'hsl(var(--chart-2))' },
  { name: 'Gray', value: 'hsl(var(--muted))' },
];

interface UserTaskTableProps {
  tasks: UserTask[];
  tableColor: string;
  onEditTask: (task: UserTask) => void;
  onDeleteTask: (taskId: string) => void;
  isLoading?: boolean;
  accessedUserTask: UserTask;
  pagination: PaginationMetadata;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface ColumnConfig<T> {
  id: string;
  label: string;
  accessor: keyof T | ((item: T) => string);
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

const UserTaskTable = ({
  tasks,
  tableColor,
  onEditTask,
  onDeleteTask,
  isLoading = false,
  pagination,
  onPageChange,
  onPageSizeChange
}: UserTaskTableProps) => {
  const { toast } = useToast();
  const [currentSelectedRows, setCurrentSelectedRows] = useState<Record<string, boolean>>({});
  const [selectedUserTask, setSelectedUserTask] = useState<UserTask | null>(null);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [isDense, setIsDense] = useState(false);
  const [editingHeader, setEditingHeader] = useState<{ id: string; currentLabel: string } | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const baseInitialUserTaskColumnConfig: Omit<ColumnConfig<UserTask>, 'id' | 'label' | 'accessor' | 'cell' | 'icon'>[] = [
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

const initialUserTaskColumnDefinitions: ColumnConfig<UserTask>[] = useMemo(() => [
  { 
    ...baseInitialUserTaskColumnConfig[0], 
    id: 'checkbox', 
    label: '', 
    accessor: 'id', 
    cell: (task: UserTask) => (
      <Checkbox 
        checked={!!currentSelectedRows[task.id]} 
        onCheckedChange={(checked) => setCurrentSelectedRows(prev => ({ ...prev, [task.id]: Boolean(checked) }))} 
        aria-labelledby={`task-name-${task.id}`} 
        className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
      />
    ) 
  },
  { 
    ...baseInitialUserTaskColumnConfig[1], 
    id: 'name', 
    label: 'Task Name', 
    accessor: 'name', 
    cell: (task: UserTask) => (
      <div 
      onClick={()=> handleUserTaskClick(task)}
      className="font-medium text-primary hover:underline whitespace-nowrap cursor-pointer">
        {task.name}
      </div>
    )
  },
  { 
    ...baseInitialUserTaskColumnConfig[2], 
    id: 'description', 
    label: 'Description', 
    accessor: 'description', 
    cell: (task: UserTask) => <span className="text-gray-700 dark:text-gray-300">{task.description}</span> 
  },
  { 
    ...baseInitialUserTaskColumnConfig[3], 
    id: 'user', 
    label: 'Assigned User', 
    accessor: (task: UserTask) => `${task.user.firstName} ${task.user.lastName}`, 
    cell: (task: UserTask) => (
      <div className="font-medium text-primary hover:underline whitespace-nowrap cursor-pointer">
        {task.user.firstName} {task.user.lastName}
      </div>
    )
  },
  { 
    ...baseInitialUserTaskColumnConfig[4], 
    id: 'priority', 
    label: 'Priority', 
    accessor: 'priority', 
    cell: (task: UserTask) => (
      <Badge
        variant={task.priority === 'Low' ? 'outline' : 
                task.priority === 'Medium' ? 'default' : 'destructive'}
        className={task.priority === 'Low' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700' :
                  task.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700' :
                  'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700'}
      >
        {task.priority}
      </Badge>
    )
  },
  { 
    ...baseInitialUserTaskColumnConfig[5], 
    id: 'status', 
    label: 'Status', 
    accessor: 'status', 
    cell: (task: UserTask) => (
      <Badge
        variant={task.status === 'Pending' ? 'outline' : 
                task.status === 'InProgress' ? 'default' : 'destructive'}
        className={task.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700' :
                  task.status === 'InProgress' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700' :
                  'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700'}
      >
        {task.status}
      </Badge>
    ) 
  },
  { 
    ...baseInitialUserTaskColumnConfig[6], 
    id: 'startDate', 
    label: 'Start Date', 
    accessor: 'startDate', 
    cell: (task: UserTask) => (
      <span className="text-gray-700 dark:text-gray-300">{task.startDate ? format(parseISO(task.startDate), 'MMM d, yyyy') : '-'}</span>
    )
  },
  { 
    ...baseInitialUserTaskColumnConfig[7], 
    id: 'endDate', 
    label: 'End Date', 
    accessor: 'endDate', 
    cell: (task: UserTask) => (
      <span className="text-gray-700 dark:text-gray-300">{task.endDate ? format(parseISO(task.endDate), 'MMM d, yyyy') : '-'}</span>
    )
  },
  { 
    ...baseInitialUserTaskColumnConfig[8], 
    id: 'createdDateTime', 
    label: 'Created Date', 
    accessor: 'createdDateTime', 
    cell: (task: UserTask) => (
      <span className="text-gray-700 dark:text-gray-300">{task.createdDateTime ? format(parseISO(task.createdDateTime), 'MMM d, yyyy') : '-'}</span>
    )
  },
  { 
    ...baseInitialUserTaskColumnConfig[9], 
    id: 'lastUpdatedDateTime', 
    label: 'Last Updated Date', 
    accessor: 'lastUpdatedDateTime', 
    cell: (task: UserTask) => (
      <span className="text-gray-700 dark:text-gray-300">{task.lastUpdatedDateTime ? format(parseISO(task.lastUpdatedDateTime), 'MMM d, yyyy') : '-'}</span>
    )
  },
  { 
    ...baseInitialUserTaskColumnConfig[10], 
    id: 'actions', 
    label: '', 
    accessor: 'id', 
    cell: (task: UserTask) => (
      (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditTask(task)}>
              <EditIcon className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDeleteTask(task.id)} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) 
    )
  },
], [currentSelectedRows]);






  const [columnConfigs, setColumnConfigs] = useState<ColumnConfig<UserTask>[]>(initialUserTaskColumnDefinitions);

  useEffect(() => {
    setColumnConfigs(initialUserTaskColumnDefinitions);
  }, [initialUserTaskColumnDefinitions]);

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

  const handleUserTaskClick = (userTask: UserTask) => {
    setSelectedUserTask(userTask);
    setDetailsPanelOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRowsLocal: Record<string, boolean> = {};
    if (checked) {
      tasks.forEach(userTask => newSelectedRowsLocal[userTask.id] = true);
    }
    setCurrentSelectedRows(newSelectedRowsLocal);
  };

  const allSelected = tasks.length > 0 && tasks.every(userTask => currentSelectedRows[userTask.id]);

  const visibleColumns = useMemo(() => {
    return columnConfigs.filter(col => columnVisibility[col.id]);
  }, [columnConfigs, columnVisibility]);

  const toggleMainColumnVisibility = (columnId: string) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleEditHeader = (col: ColumnConfig<UserTask>) => {
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
      const newColumn: ColumnConfig<UserTask> = {
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
  const addUserTaskRowFirstCellStickyClasses = columnConfigs[0]?.isFixed === 'left' && columnVisibility[columnConfigs[0].id]
    ? 'sticky left-0 z-20'
    : '';

  const renderUserTaskDetails = (userTask: UserTask) => {
    return <UserTaskDetailsPanelContent userTask={userTask} />;
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
                    (col.id === 'checkbox' && !col.label) || (col.id === 'actions' && !col.label) || (col.icon && !col.label && !['name', 'email', 'userTask', 'organization', 'status', 'lastLogin', 'createdAt', 'verified'].includes(col.id))
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
            {tasks.map((userTask) => (
              <TableRow key={userTask.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 group" data-state={currentSelectedRows[userTask.id] ? 'selected' : undefined}>
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
                        (currentSelectedRows[userTask.id] ? 'hsl(var(--muted))' : (col.tdClassName?.includes('dark:group-hover:bg-slate-800') ? undefined : 'hsl(var(--background))')) :
                        (col.isFixed ? 'hsl(var(--background))' : undefined),
                    }}
                  >
                    {col.cell(userTask)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow className={cn("bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 group", isDense && "h-auto")}>
              <TableCell
                className={cn(
                  "border-r dark:border-r-gray-700 border-l-4 border-transparent",
                  (isDense ? 'px-1 py-1' : 'px-1 py-2'),
                  addUserTaskRowFirstCellStickyClasses,
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
                {/* <Link href="#/userTasks/add" passHref>
                  <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-primary p-0 h-auto font-normal text-sm">
                    <PlusCircle className="h-4 w-4 mr-1.5" />
                    Add userTask
                  </Button>
                </Link> */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <CardFooter className="border-t pt-4">
          <TablePagination
            totalItems={pagination?.totalElements || tasks.length}
            rowsPerPage={pagination?.pageSize }
            currentPage={pagination?.pageNumber + 1}
            onPageChange={(page) => onPageChange(page - 1)}
            onRowsPerPageChange={onPageSizeChange}
            isDense={isDense}
            onDenseChange={setIsDense}
          />
        </CardFooter>
      </Card>

      <DetailsSidePanel
        data={selectedUserTask}
        open={detailsPanelOpen}
        onClose={() => setDetailsPanelOpen(false)}
        renderContent={renderUserTaskDetails}
      />
    </div>
  );
};

export default UserTaskTable;