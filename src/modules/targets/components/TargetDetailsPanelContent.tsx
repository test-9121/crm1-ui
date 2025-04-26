
import { Target } from "@/modules/targets/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle } from "lucide-react";

interface TargetDetailsPanelContentProps {
  target: Target;
}

const TargetDetailsPanelContent = ({ target }: TargetDetailsPanelContentProps) => {
  let statusColor = "";
  switch (target.status) {
    case "Active":
      statusColor = "bg-green-100 text-green-800";
      break;
    case "InActive":
      statusColor = "bg-blue-100 text-blue-800";
      break;
    case "OnHold":
      statusColor = "bg-orange-100 text-orange-800";
      break;
    default:
      statusColor = "bg-gray-100 text-gray-800";
  }
  
  // Get the handler name from either a User object or handle the ID-only case
  const getHandlerName = () => {
    if (typeof target.handledById === 'object' && target.handledById) {
      return `${target.handledById.firstName} ${target.handledById.lastName || ''}`;
    }
    return 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{target.accountName}</h2>
        <Badge className={`${statusColor} font-medium mt-2`} variant="outline">
          {target.status}
        </Badge>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-2">Target Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Created Date</p>
            <p className="font-medium">
              {target.createdDate ? new Date(target.createdDate).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Handler</p>
            <p className="font-medium">{getHandlerName()}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Connections</p>
              <p className="text-xl font-semibold">{target.connectionsCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Leads</p>
              <p className="text-xl font-semibold">{target.noOfLeadsIdentified}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Messages Sent</p>
              <p className="text-xl font-semibold">{target.messagesSent}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Connections Sent</p>
              <p className="text-xl font-semibold">{target.connectionsSent}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Follow Ups</p>
              <p className="text-xl font-semibold">{target.followUps}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Meetings Scheduled</p>
              <p className="text-xl font-semibold">{target.meetingsScheduled}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">InMail Count</p>
              <p className="text-xl font-semibold">{target.inMailCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Postings</p>
              <p className="text-xl font-semibold">{target.postings}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Response Received:</p>
            {target.responseReceived === "YES" || target.responseReceived === true ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetDetailsPanelContent;
