
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
import { ContactInteraction } from '../types';
import { User } from '@/modules/users/types';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Edit, Phone, Mail, Users, MoreHorizontal, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface ContactInteractionsProps {
  interactions: ContactInteraction[];
  onAddInteraction: (interaction: Omit<ContactInteraction, 'id'|'createdDateTime'|'createdBy'>) => void;
  onUpdateInteraction: (interactionId: string, interaction: Partial<ContactInteraction>) => void;
  onDeleteInteraction: (interactionId: string) => void;
  currentUser: User;
}

export const ContactInteractions: React.FC<ContactInteractionsProps> = ({
  interactions,
  onAddInteraction,
  onUpdateInteraction,
  onDeleteInteraction,
  currentUser
}) => {
  const [isAddingInteraction, setIsAddingInteraction] = useState(false);
  const [editingInteractionId, setEditingInteractionId] = useState<string | null>(null);
  
  const [type, setType] = useState<string>('Email');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState('');
  const [outcome, setOutcome] = useState('');
  const [followUpRequired, setFollowUpRequired] = useState(false);
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(undefined);
  
  const resetForm = () => {
    setType('Email');
    setSubject('');
    setDescription('');
    setDate(new Date());
    setDuration('');
    setOutcome('');
    setFollowUpRequired(false);
    setFollowUpDate(undefined);
  };
  
  const handleAddInteraction = () => {
    if (!subject.trim() || !date) return;
    
    onAddInteraction({
      type: type as 'Email' | 'Call' | 'Meeting' | 'Other',
      subject,
      description,
      date: date.toISOString(),
      duration: duration ? parseInt(duration) : undefined,
      outcome,
      followUpRequired,
      followUpDate: followUpDate ? followUpDate.toISOString() : undefined,
    });
    
    setIsAddingInteraction(false);
    resetForm();
  };
  
  const handleStartEdit = (interaction: ContactInteraction) => {
    setEditingInteractionId(interaction.id);
    setType(interaction.type);
    setSubject(interaction.subject);
    setDescription(interaction.description);
    setDate(new Date(interaction.date));
    setDuration(interaction.duration ? interaction.duration.toString() : '');
    setOutcome(interaction.outcome || '');
    setFollowUpRequired(interaction.followUpRequired);
    setFollowUpDate(interaction.followUpDate ? new Date(interaction.followUpDate) : undefined);
  };
  
  const handleUpdateInteraction = () => {
    if (!editingInteractionId || !subject.trim() || !date) return;
    
    onUpdateInteraction(editingInteractionId, {
      type: type as 'Email' | 'Call' | 'Meeting' | 'Other',
      subject,
      description,
      date: date.toISOString(),
      duration: duration ? parseInt(duration) : undefined,
      outcome,
      followUpRequired,
      followUpDate: followUpDate ? followUpDate.toISOString() : undefined,
    });
    
    setEditingInteractionId(null);
    resetForm();
  };
  
  const handleCancelEdit = () => {
    setEditingInteractionId(null);
    resetForm();
  };
  
  const getInteractionIcon = (type: string) => {
    switch(type) {
      case 'Email': return <Mail className="h-4 w-4" />;
      case 'Call': return <Phone className="h-4 w-4" />;
      case 'Meeting': return <Users className="h-4 w-4" />;
      default: return <MoreHorizontal className="h-4 w-4" />;
    }
  };
  
  const getInteractionColor = (type: string) => {
    switch(type) {
      case 'Email': return 'bg-blue-200 text-blue-800';
      case 'Call': return 'bg-green-200 text-green-800';
      case 'Meeting': return 'bg-purple-200 text-purple-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      {!isAddingInteraction && !editingInteractionId && (
        <div>
          <Button onClick={() => setIsAddingInteraction(true)}>Log Interaction</Button>
        </div>
      )}
      
      {(isAddingInteraction || editingInteractionId) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              {editingInteractionId ? 'Edit Interaction' : 'Log New Interaction'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Call">Call</SelectItem>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject">Subject*</Label>
              <Input
                id="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the interaction..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Duration in minutes"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="outcome">Outcome</Label>
                <Input
                  id="outcome"
                  placeholder="Outcome"
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="followUpRequired">Follow-up Required</Label>
                <Switch
                  id="followUpRequired"
                  checked={followUpRequired}
                  onCheckedChange={setFollowUpRequired}
                />
              </div>
              
              {followUpRequired && (
                <div>
                  <Label>Follow-up Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !followUpDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {followUpDate ? format(followUpDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={followUpDate}
                        onSelect={setFollowUpDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={editingInteractionId ? handleUpdateInteraction : handleAddInteraction}
                disabled={!subject.trim() || !date}
              >
                {editingInteractionId ? 'Update Interaction' : 'Log Interaction'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  if (editingInteractionId) {
                    handleCancelEdit();
                  } else {
                    setIsAddingInteraction(false);
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
        <h3 className="text-lg font-medium">Interaction History</h3>
        {interactions.length === 0 ? (
          <p className="text-muted-foreground text-sm">No interactions recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {interactions.map((interaction) => (
              <Card key={interaction.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge className={getInteractionColor(interaction.type)}>
                          <span className="flex items-center gap-1">
                            {getInteractionIcon(interaction.type)}
                            {interaction.type}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="bg-gray-200 text-gray-800">
                          {format(new Date(interaction.date), 'MMM d, yyyy')}
                        </Badge>
                        {interaction.duration && (
                          <Badge variant="outline" className="bg-gray-200 text-gray-800">
                            {interaction.duration} min
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium">{interaction.subject}</p>
                      {interaction.description && (
                        <p className="text-sm text-muted-foreground mt-2">{interaction.description}</p>
                      )}
                      {interaction.outcome && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Outcome:</p>
                          <p className="text-sm text-muted-foreground">{interaction.outcome}</p>
                        </div>
                      )}
                      {interaction.followUpRequired && interaction.followUpDate && (
                        <div className="mt-2 flex items-center gap-1">
                          <p className="text-sm font-medium">Follow-up:</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(interaction.followUpDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStartEdit(interaction)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteInteraction(interaction.id)}
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
