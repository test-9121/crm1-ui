
import DataTable from "@/components/shared/DataTable/DataTable";
import { UserTask } from "@/modules/user-tasks/types";
import { Badge } from "@/components/ui/badge";

interface UserTaskTableProps {
  tasks: UserTask[];
  tableColor: string;
  onEditTask: (task: UserTask) => void;
  onDeleteTask: (taskId: string) => void;
  isLoading: boolean;
  onRowClick: (task: UserTask) => void;
}

const UserTaskTable = ({
  tasks,
  tableColor,
  onEditTask,
  onDeleteTask,
  isLoading,
  onRowClick
}: UserTaskTableProps) => {
  const columns = [
    {
      header: "Task Name",
      accessorKey: "name",
      cell: (task: UserTask) => (
        <div
          className="cursor-pointer hover:text-primary transition-colors font-medium"
          onClick={() => onRowClick(task)}
        >
          {task.name}
        </div>
      )
    },
    {
      header: "Assigned To",
      accessorKey: "user.firstName",
      cell: (task: UserTask) => 
        task.user ? `${task.user.firstName} ${task.user.lastName}` : 'Unassigned'
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (task: UserTask) => <div className="truncate max-w-[400px]">{task.description}</div>
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (task: UserTask) => {
        const statusColorMap = {
          "Pending": "bg-amber-100 text-amber-800 hover:bg-amber-200",
          "In Progress": "bg-blue-100 text-blue-800 hover:bg-blue-200",
          "Completed": "bg-green-100 text-green-800 hover:bg-green-200",
          "Canceled": "bg-red-100 text-red-800 hover:bg-red-200",
        };
        
        const statusColor = statusColorMap[task.status] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
        
        return (
          <Badge
            className={`${statusColor} font-medium rounded-md whitespace-nowrap`}
            variant="outline"
          >
            {task.status}
          </Badge>
        );
      }
    },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: (task: UserTask) => {
        const priorityColorMap = {
          "Low": "bg-green-100 text-green-800 hover:bg-green-200",
          "Medium": "bg-amber-100 text-amber-800 hover:bg-amber-200",
          "High": "bg-red-100 text-red-800 hover:bg-red-200",
        };
        
        const priorityColor = priorityColorMap[task.priority] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
        
        return (
          <Badge
            className={`${priorityColor} font-medium rounded-md whitespace-nowrap`}
            variant="outline"
          >
            {task.priority}
          </Badge>
        );
      }
    },
    {
      header: "Start Date",
      accessorKey: "startDate",
      cell: (task: UserTask) => new Date(task.startDate).toLocaleDateString()
    },
    {
      header: "Due Date",
      accessorKey: "endDate",
      cell: (task: UserTask) => new Date(task.endDate).toLocaleDateString()
    }
  ];

  return (
    <DataTable
      data={tasks}
      columns={columns}
      tableColor={tableColor}
      isLoading={isLoading}
      onEdit={onEditTask}
      onDelete={(task: UserTask) => onDeleteTask(task.id)}
    />
  );
};

export default UserTaskTable;
