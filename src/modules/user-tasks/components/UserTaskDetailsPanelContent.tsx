
import React from "react";
import { format } from "date-fns";
import { UserTask } from "@/modules/user-tasks/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface UserTaskDetailsPanelContentProps {
  userTask: UserTask;
}

const UserTaskDetailsPanelContent = ({ userTask }: UserTaskDetailsPanelContentProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Canceled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{userTask.name}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge className={`${getPriorityColor(userTask.priority)} font-medium`} variant="outline">
            {userTask.priority} Priority
          </Badge>
          <Badge className={`${getStatusColor(userTask.status)} font-medium`} variant="outline">
            {userTask.status}
          </Badge>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-2">Task Description</h3>
        <p>{userTask.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">
                  {format(new Date(userTask.startDate), "PPP")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">
                  {format(new Date(userTask.endDate), "PPP")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Time Frame</p>
                <p className="font-medium">
                  {format(new Date(userTask.startDate), "h:mm a")} - {format(new Date(userTask.endDate), "h:mm a")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">
                  {Math.floor((new Date(userTask.endDate).getTime() - new Date(userTask.startDate).getTime()) / (1000 * 60 * 60))} hours
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assigned To</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <p className="font-medium">
              {userTask.user?.firstName} {userTask.user?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              {userTask.user?.email}
            </p>
          </div>
        </CardContent>
      </Card>

      {userTask.lead && (
        <Card>
          <CardHeader>
            <CardTitle>Related Lead</CardTitle>
            <CardDescription>Lead this task is connected to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <p className="font-medium">
                {userTask.lead.firstname} {userTask.lead.lastname}
              </p>
              <p className="text-sm text-muted-foreground">{userTask.lead.email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {userTask.lead.designation?.name} | {userTask.lead.industry?.name}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserTaskDetailsPanelContent;
