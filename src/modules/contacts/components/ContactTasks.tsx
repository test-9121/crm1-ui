
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ContactTask } from '../types';
import { User } from '@/modules/users/types';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Check, Clock, Edit, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ContactTasksProps {
  tasks: ContactTask[];
  onAddTask: (task: Omit<ContactTask, 'id'|'createdDateTime'|'createdBy'>) => void;
  onUpdateTask: (taskId: string, task: Partial<ContactTask>) => void;
  onDeleteTask: (taskId: string) => void;
  currentUser: User;
}

export const ContactTasks: React.FC<ContactTasksProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  currentUser
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<string>('Not Started');
  const [priority, setPriority] = useState<string>('Medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('Not Started');
    setPriority('Medium');
    setDueDate(undefined);
  };
  
  const handleAddTask = () => {
    if (!title.trim() || !dueDate) return;
    
    onAddTask({
      title,
      description,
      status: status as 'Not Started' | 'In Progress' | 'Completed' | 'Deferred',
      priority: priority as 'Low' | 'Medium' | 'High',
      dueDate: dueDate.toISOString(),
    });
    
    setIsAddingTask(false);
    resetForm();
  };
  
  const handleStartEdit = (task: ContactTask) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description || '');
    setStatus(task.status);
    setPriority(task.priority);
    setDueDate(new Date(task.dueDate));
  };
  
  const handleUpdateTask = () => {
    if (!editingTaskId || !title.trim() || !dueDate) return;
    
    onUpdateTask(editingTaskId, {
      title,
      description,
      status: status as 'Not Started' | 'In Progress' | 'Completed' | 'Deferred',
      priority: priority as 'Low' | 'Medium' | 'High',
      dueDate: dueDate.toISOString(),
    });
    
    setEditingTaskId(null);
    resetForm();
  };
  
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    resetForm();
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Not Started': return 'bg-gray-200 text-gray-800';
      case 'In Progress': return 'bg-blue-200 text-blue-800';
      case 'Completed': return 'bg-green-200 text-green-800';
      case 'Deferred': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Low': return 'bg-green-200 text-green-800';
      case 'Medium': return 'bg-yellow-200 text-yellow-800';
      case 'High': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      {!isAddingTask && !editingTaskId && (
        <div>
          <Button onClick={() => setIsAddingTask(true)}>Add New Task</Button>
        </div>
      )}
      
      {(isAddingTask || editingTaskId) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              {editingTaskId ? 'Edit Task' : 'New Task'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Task description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Due Date*</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Deferred">Deferred</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={editingTaskId ? handleUpdateTask : handleAddTask}
                disabled={!title.trim() || !dueDate}
              >
                {editingTaskId ? 'Update Task' : 'Add Task'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  if (editingTaskId) {
                    handleCancelEdit();
                  } else {
                    setIsAddingTask(false);
                    resetForm();
                  }
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tasks</h3>
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tasks yet.</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className={cn(
                "border-l-4",
                task.status === 'Completed' ? "border-l-green-500" : 
                task.priority === 'High' ? "border-l-red-500" :
                task.priority === 'Medium' ? "border-l-yellow-500" : "border-l-blue-500"
              )}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <div className="flex flex-wrap gap-2 mt-1 mb-2">
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-200 text-gray-800 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(task.dueDate), 'MMM d, yyyy')}
                        </Badge>
                      </div>
                      {task.description && (
                        <p className="text-sm text-muted-foreground mt-2">{task.description}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      {task.status !== 'Completed' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onUpdateTask(task.id, { status: 'Completed' })}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStartEdit(task)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
