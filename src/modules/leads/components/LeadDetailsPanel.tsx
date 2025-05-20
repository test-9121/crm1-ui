
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ILead } from "@/modules/leads/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LeadDetailsPanelProps {
  lead: ILead | null;
  open: boolean;
  onClose: () => void;
}

export function LeadDetailsPanel({ lead, open, onClose }: LeadDetailsPanelProps) {
  if (!lead) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <div className="space-y-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{`${lead.firstname} ${lead.lastname}`}</h2>
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
