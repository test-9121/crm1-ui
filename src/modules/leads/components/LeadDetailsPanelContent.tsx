
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadReplies } from "./LeadReplies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

export function LeadDetailsPanelContent({ lead }: { lead: any }) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
        <TabsTrigger value="replies" className="flex-1">Replies</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{`${lead.firstname} ${lead.lastname}`}</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className={
                lead.status === "New" ? "bg-orange-100 text-orange-800" :
                lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                lead.status === "Qualified" ? "bg-green-100 text-green-800" :
                "bg-gray-100 text-gray-800"
              }>
                {lead.status}
              </Badge>
              {lead.designation?.name && (
                <Badge variant="outline">{lead.designation?.name}</Badge>
              )}
            </div>
            <div className="flex space-x-2 py-2">
              <Button size="sm" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
              <p className="mt-1 font-medium">{lead.organization?.name || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
              <p className="mt-1 font-medium">{lead.industry?.name || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Company Size</h3>
              <p className="mt-1 font-medium">{lead.empcount || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Region</h3>
              <p className="mt-1 font-medium">{lead.region || "Not specified"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium">{lead.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium">{lead.phonenumber}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Links</h3>
            <div className="grid gap-2">
              {lead.linkedin && (
                <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn Profile
                </a>
              )}
              {lead.website && (
                <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  Company Website
                </a>
              )}
            </div>
          </div>

          {lead.comments && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Comments</h3>
              <p className="text-sm bg-muted p-3 rounded-md">{lead.comments}</p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
            <p className="font-medium">{`${lead.sentby?.firstName || ''} ${lead.sentby?.lastName || ''}`}</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="replies" className="mt-4">
        <LeadReplies leadId={lead.id} />
      </TabsContent>
    </Tabs>
  );
}
