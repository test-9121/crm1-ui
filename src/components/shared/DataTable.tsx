import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Check,
  Edit2 as EditIcon,
  Trash2,
  Copy,
  Palette,
  Plus,
  PlusCircle,
  MoreVertical,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TablePagination } from "@/components/table-pagination";

// Predefined header colors for dropdown
const PREDEFINED_HEADER_COLORS = [
  { name: 'Default', value: undefined },
  { name: 'Teal', value: 'hsl(var(--chart-1))' },
  { name: 'Orange', value: 'hsl(var(--chart-2))' },
  { name: 'Gray', value: 'hsl(var(--muted))' },
];

export interface ColumnConfig<T> {
  id: string;
  label: string;
  accessor: ((item: T) => string) | keyof T;
  cell: (item: T) => React.ReactNode;
  icon?: React.ElementType;
  defaultVisible?: boolean;
  canHide?: boolean;
  isFixed?: 'left' | 'right';
  stickyOffset?: string;
  width?: string;
  minWidth?: string;
  thClassName?: string;
  tdClassName?: string;
  headerColor?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  keyField: keyof T;
  tableColor?: string;
  isLoading?: boolean;
  pagination?: {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  addAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  emptyMessage?: string;
  onRowSelectionChange?: (selectedRows: Record<string, boolean>) => void;
  isDense?: boolean;
  onDenseChange?: (isDense: boolean) => void;
}

export function DataTable<T>({
  data,
  columns: initialColumns,
  keyField,
  tableColor = "#3b82f6",
  isLoading = false,
  pagination,
  addAction,
  emptyMessage = "No data available",
  onRowSelectionChange,
  isDense = false,
  onDenseChange
}: DataTableProps<T>) {
  const { toast } = useToast();
  const [columnConfigs, setColumnConfigs] = useState<ColumnConfig<T>[]>(initialColumns);
  
  // Calculate initial visibility based on column defaults
  const initialVisibility = useMemo(() => {
    const visibility: Record<string, boolean> = {};
    columnConfigs.forEach(col => {
      visibility[col.id] = col.defaultVisible !== false;
    });
    return visibility;
  }, [columnConfigs]);
  
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(initialVisibility);
  const [currentSelectedRows, setCurrentSelectedRows] = useState<Record<string, boolean>>({});
  const [editingHeader, setEditingHeader] = useState<{ id: string; currentLabel: string } | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Update visibility when columns change
  useEffect(() => {
    setColumnVisibility(prevVisibility => {
      const newCalculatedVisibility: Record<string, boolean> = {};
      columnConfigs.forEach(col => {
        newCalculatedVisibility[col.id] = prevVisibility[col.id] === undefined 
          ? col.defaultVisible !== false
          : prevVisibility[col.id];
      });
      if (JSON.stringify(newCalculatedVisibility) !== JSON.stringify(prevVisibility)) {
        return newCalculatedVisibility;
      }
      return prevVisibility;
    });
  }, [columnConfigs]);

  // Focus edit input when editing a header
  useEffect(() => {
    if (editingHeader && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.value = editingHeader.currentLabel;
    }
  }, [editingHeader]);

  // Notify parent component about row selection changes
  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(currentSelectedRows);
    }
  }, [currentSelectedRows, onRowSelectionChange]);

  const localHandleSelectRow = (itemId: string, checked: boolean) => {
    setCurrentSelectedRows(prev => ({ ...prev, [itemId]: checked }));
  };
  
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRowsLocal: Record<string, boolean> = {};
    if (checked) {
      data.forEach(item => {
        const itemId = String(item[keyField]);
        newSelectedRowsLocal[itemId] = true;
      });
    }
    setCurrentSelectedRows(newSelectedRowsLocal);
  };

  const allSelected = data.length > 0 && data.every(item => {
    const itemId = String(item[keyField]);
    return currentSelectedRows[itemId];
  });

  const visibleColumns = useMemo(() => {
    return columnConfigs.filter(col => columnVisibility[col.id]);
  }, [columnConfigs, columnVisibility]);
  
  const toggleMainColumnVisibility = (columnId: string) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleEditHeader = (col: ColumnConfig<T>) => {
    setEditingHeader({ id: col.id, currentLabel: col.label });
  };

  const handleHeaderLabelChange = () => {
    if (editingHeader && editInputRef.current) {
      const newLabel = editInputRef.current.value;
      setColumnConfigs(prev => prev.map(c => c.id === editingHeader.id ? { ...c, label: newLabel } : c));
      setEditingHeader(null);
      toast({title: "Header Updated", description: `Header changed to "${newLabel}"`});
    }
  };
  
  const handleRemoveColumn = (columnIdToRemove: string) => {
    const column = columnConfigs.find(c => c.id === columnIdToRemove);
    if (column && column.canHide) {
      setColumnVisibility(prev => ({ ...prev, [columnIdToRemove]: false }));
      toast({title: "Column Hidden", description: `"${column.label}" hidden. You can re-enable it from column settings.`});
    } else {
      toast({title: "Action Denied", description: `"${column?.label || 'Column'}" cannot be removed.`, variant: "destructive"});
    }
  };

  const handleDuplicateColumn = (columnIdToDuplicate: string) => {
    const colToDuplicate = columnConfigs.find(c => c.id === columnIdToDuplicate);
    if (colToDuplicate) {
      const newColId = `${colToDuplicate.id}_copy_${Date.now()}`;
      const newColumn: ColumnConfig<T> = {
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
      toast({title: "Column Duplicated", description: `"${newColumn.label}" added.`});
    }
  };

  const handleChangeHeaderColor = (columnId: string, color?: string) => {
    setColumnConfigs(prev => prev.map(c => c.id === columnId ? { ...c, headerColor: color } : c));
    toast({title: "Header Color Updated"});
  };

  const cellPaddingClass = isDense ? 'px-2 py-1' : 'px-3 py-2';

  if (isLoading) {
    return (
      <Card className="relative shadow-md border border-gray-200 dark:border-gray-700 rounded-lg border-l-4 flex-grow overflow-hidden flex flex-col" style={{ borderLeftColor: tableColor }}>
        <CardContent className="p-0 flex-grow">
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border border-gray-200 dark:border-gray-700 rounded-lg border-l-4 flex-grow overflow-hidden flex flex-col" style={{ borderLeftColor: tableColor }}>
      <CardContent className="p-0 flex-grow overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow>
              {visibleColumns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    // "border-r dark:border-r-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 group", 
                    // cellPaddingClass,
                    // col.thClassName
                  )}
                  style={{
                    minWidth: col.minWidth,
                    width: col.width,
                    position: col.isFixed ? 'sticky' : undefined,
                    left: col.isFixed === 'left' ? col.stickyOffset : undefined,
                    right: col.isFixed === 'right' ? col.stickyOffset : undefined,
                    top: 0, 
                    backgroundColor: col.headerColor || (col.thClassName?.includes('bg-slate-50') ? 'hsl(var(--muted))': 'hsl(var(--background))'), 
                  }}
                >
                  <div className="flex items-center justify-between">
                    {editingHeader?.id === col.id ? (
                      <Input
                        ref={editInputRef}
                        defaultValue={editingHeader.currentLabel}
                        onBlur={handleHeaderLabelChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleHeaderLabelChange()}
                        className={cn("h-8 text-sm", isDense && "h-7")}
                      />
                    ) : (
                      <div className="flex items-center gap-1.5 truncate" title={col.label}>
                        {col.icon && <col.icon className="h-4 w-4 flex-shrink-0" />}
                        <span className="truncate">{col.label}</span>
                      </div>
                    )}

                    {col.id === 'checkbox' ? (
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                        aria-label="Select all rows"
                        className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    ) : col.id === 'actions' && columnConfigs.filter(c => c.canHide).length > 0 ? ( 
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
                                    {( (col.headerColor === undefined && colorOpt.value === undefined) || col.headerColor === colorOpt.value) ? <Check className="mr-2 h-4 w-4" /> : <span className="mr-2 h-4 w-4"/>}
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
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow 
                  key={String(item[keyField])} 
                  data-state={currentSelectedRows[String(item[keyField])] ? 'selected' : ''}
                >
                  {visibleColumns.map((col) => (
                    <TableCell
                      key={col.id}
                      className={cn(
                        "border-r dark:border-r-gray-700", cellPaddingClass,
                        col.id === 'checkbox' ? 'border-l-4 border-transparent group-data-[state=selected]:border-primary group-hover:border-l-primary transition-colors' : '',
                        col.tdClassName,
                        (col.isFixed && (col.id === 'checkbox' || col.id === 'name')) ? 
                          (currentSelectedRows[String(item[keyField])] ? 'bg-muted group-hover:bg-muted' : 'bg-background group-hover:bg-slate-50 dark:group-hover:bg-slate-800') : 
                          (col.isFixed ? 'bg-background' : undefined)
                      )}
                      style={{
                        minWidth: col.minWidth, 
                        width: col.width, 
                        position: col.isFixed ? 'sticky' : undefined,
                        left: col.isFixed === 'left' ? col.stickyOffset : undefined,
                        right: col.isFixed === 'right' ? col.stickyOffset : undefined,
                      }}
                    >
                      {col.cell(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
            
            {/* Add row */}
            {addAction && (
              <TableRow className={cn("bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 group", isDense && "h-auto")}>
                {visibleColumns[0] && visibleColumns[0].id === 'checkbox' && (
                  <TableCell
                    className={cn(
                      "border-r dark:border-r-gray-700 border-l-4 border-transparent",
                      cellPaddingClass,
                      visibleColumns[0].isFixed === 'left' ? 'sticky left-0 z-20 bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700' : '',
                    )}
                    style={{
                      left: visibleColumns[0].isFixed === 'left' ? visibleColumns[0].stickyOffset : undefined,
                      position: visibleColumns[0].isFixed ? 'sticky' : undefined, 
                      backgroundColor: 'hsl(var(--muted))'
                    }}
                  >
                    <Checkbox disabled className="border-gray-300 dark:border-gray-600"/>
                  </TableCell>
                )}
                <TableCell 
                  colSpan={visibleColumns.length - (visibleColumns[0] && visibleColumns[0].id === 'checkbox' ? 1 : 0)} 
                  className={cn(
                    cellPaddingClass,
                    "bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700"
                  )}
                  style={{backgroundColor: 'hsl(var(--muted))'}}
                >
                  {addAction.href ? (
                    <a href={addAction.href} className="inline-block">
                      <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-primary p-0 h-auto font-normal text-sm">
                        <PlusCircle className="h-4 w-4 mr-1.5" />
                        {addAction.label}
                      </Button>
                    </a>
                  ) : (
                    <Button 
                      variant="ghost" 
                      className="text-gray-500 dark:text-gray-400 hover:text-primary p-0 h-auto font-normal text-sm"
                      onClick={addAction.onClick}
                    >
                      <PlusCircle className="h-4 w-4 mr-1.5" />
                      {addAction.label}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      {pagination && (
        <CardFooter className="border-t pt-4">
          <TablePagination 
            totalItems={pagination.totalItems}
            pageSize={pagination.pageSize}
            currentPage={pagination.currentPage}
            totalPages={Math.ceil(pagination.totalItems / pagination.pageSize)}
            onPageChange={pagination.onPageChange}
            onPageSizeChange={pagination.onPageSizeChange}
            isDense={isDense}
            onDenseChange={onDenseChange}
            // For backward compatibility
            rowsPerPage={pagination.pageSize}
            onRowsPerPageChange={pagination.onPageSizeChange}
          />
        </CardFooter>
      )}
    </Card>
  );
}
