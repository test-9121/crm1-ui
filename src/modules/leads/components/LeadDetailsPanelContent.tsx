
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadReplies } from "./LeadReplies";
import { Badge } from "@/components/ui/badge"; // Add this import
import { Button } from "@mui/material";
import { Mail, Phone } from "lucide-react";
import { ILead } from "../types";

export function LeadDetailsPanelContent({ lead }: { lead: ILead }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
        <TabsTrigger value="replies" className="flex-1">Replies</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{`${lead.firstname} ${lead.lastname}`}</h2>
          <div className=" py-2 flex space-x-2">
            <Button size="small" variant="outlined">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button size="small" variant="outlined">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>
          <div className="flex items-start gap-4">
            <p className="text-muted-foreground">{lead.designation?.name}</p>
          </div>
          <Badge variant="secondary" className={
            lead.status === "New" ? "bg-orange-100 text-orange-800" :
              lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                lead.status === "Qualified" ? "bg-green-100 text-green-800" :
                  "bg-gray-100 text-gray-800"
          }>
            {lead.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
              <p className="mt-1">{lead.organization?.name || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
              <p className="mt-1">{lead.industry?.name || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Company Size</h3>
              <p className="mt-1">{lead.empcount || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Region</h3>
              <p className="mt-1">{lead.region}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
            <div className="grid gap-2">
              <div className="flex items-center">
                <span className="text-sm">{lead.email}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm">{lead.phonenumber}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Links</h3>
            <div className="grid gap-2">
              <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                LinkedIn Profile
              </a>
              {lead.website && (
                <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  Company Website
                </a>
              )}
            </div>
          </div>

          {lead.comments && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Comments</h3>
              <p className="text-sm">{lead.comments}</p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
            <p className="text-sm">{`${lead.sentby?.firstName || ''} ${lead.sentby?.lastName || ''}`}</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="replies" className="mt-4">
        <LeadReplies leadId={lead.id} />
      </TabsContent>
    </Tabs>
  );
}
