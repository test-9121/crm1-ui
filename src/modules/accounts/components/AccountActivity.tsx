
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow, format } from 'date-fns';
import { Mail, Phone, Users, FileText, CalendarIcon, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  type: 'Email' | 'Call' | 'Meeting' | 'Note' | 'Task' | 'Deal';
  title: string;
  description?: string;
  date: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdDateTime: string;
}

interface AccountActivityProps {
  activities: Activity[];
}

export const AccountActivity: React.FC<AccountActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'Email': return <Mail className="h-5 w-5" />;
      case 'Call': return <Phone className="h-5 w-5" />;
      case 'Meeting': return <Users className="h-5 w-5" />;
      case 'Note': return <FileText className="h-5 w-5" />;
      case 'Task': return <CalendarIcon className="h-5 w-5" />;
      case 'Deal': return <MessageSquare className="h-5 w-5" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };
  
  const getActivityColor = (type: string) => {
    switch(type) {
      case 'Email': return 'bg-blue-500';
      case 'Call': return 'bg-green-500';
      case 'Meeting': return 'bg-purple-500';
      case 'Note': return 'bg-yellow-500';
      case 'Task': return 'bg-red-500';
      case 'Deal': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Activity Timeline</h3>
      
      {activities.length === 0 ? (
        <p className="text-muted-foreground text-sm">No activity recorded yet.</p>
      ) : (
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-border">
          {activities.map((activity) => (
            <div key={activity.id} className="relative pl-10">
              <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full text-white bg-background">
                <div className={`p-1 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-muted">
                        {activity.type}
                      </Badge>
                      <time className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                      </time>
                    </div>
                    
                    <h4 className="font-semibold text-sm">{activity.title}</h4>
                    
                    {activity.description && (
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    )}
                    
                    <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                      <span>
                        {activity.createdBy.firstName} {activity.createdBy.lastName}
                      </span>
                      <span>
                        {format(new Date(activity.date), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
