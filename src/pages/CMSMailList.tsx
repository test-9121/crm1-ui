import { CMSMailHeader } from "@/modules/cms/components/CMSMailHeader";
import { useCMSMail } from "@/modules/cms/hooks/useCMSMail";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Eye, FileEdit, Trash2, MoreHorizontal } from "lucide-react";
import { CMSMail } from "@/modules/cms/types";
import { format } from "date-fns";
import { DetailsSidePanel } from "@/components/shared/DetailsSidePanel/DetailsSidePanel";
import { Card, CardContent } from "@/components/ui/card";

export default function CMSMailList() {
  const { allMails, deleteMail } = useCMSMail();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest" | "alphabetical">("latest");
  const [isViewPanelOpen, setIsViewPanelOpen] = useState(false);
  const [selectedMail, setSelectedMail] = useState<CMSMail | null>(null);

  const handleDelete = (mail: CMSMail) => {
    setDeleteId(mail.id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteMail.mutateAsync(deleteId);
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleEdit = (mail: CMSMail) => {
    window.location.href = `/cms-mail/edit/${mail.id}`;
  };

  const handleView = (mail: CMSMail) => {
    setSelectedMail(mail);
    setIsViewPanelOpen(true);
  };

  const filteredMails = allMails.data?.filter(mail => 
    mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mail.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedMails = [...filteredMails].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime();
    }
    if (sortOrder === "oldest") {
      return new Date(a.createdDateTime).getTime() - new Date(b.createdDateTime).getTime();
    }
    // alphabetical
    return a.subject.localeCompare(b.subject);
  });

  // Panel content renderer
  const renderMailPanel = (mail: CMSMail) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{mail.subject}</h2>
      <div className="text-sm text-muted-foreground">{format(new Date(mail.createdDateTime), "PPpp")}</div>
      <div>
        <h3 className="font-semibold mb-1">Content</h3>
        <div className="p-3 bg-muted rounded text-foreground whitespace-pre-line">{mail.content}</div>
      </div>
      <div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span><span className="font-semibold">Created:</span> {format(new Date(mail.createdDateTime), "PP")}</span>
          <span>
            <span className="font-semibold">Updated:</span> {mail.lastUpdatedDateTime ? format(new Date(mail.lastUpdatedDateTime), "PP") : "-"}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setIsViewPanelOpen(false)}>Close</Button>
        <Button onClick={() => handleEdit(mail)}><FileEdit className="mr-2 h-4 w-4" /> Edit</Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        <CMSMailHeader title="Mail List" />

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>CMS Mail</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>List</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex justify-between items-center">
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by subject..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort By:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {sortOrder === "latest" ? "Latest" : sortOrder === "oldest" ? "Oldest" : "Name"}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOrder("latest")}>Latest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("oldest")}>Oldest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("alphabetical")}>Name</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {allMails.isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : sortedMails.length === 0 ? (
            <div className="text-center py-8 col-span-2">
              {searchQuery ? "No mails found matching your search." : "No mails available."}
            </div>
          ) : (
            sortedMails.map((mail) => (
              <Card 
                key={mail.id} 
                className="rounded-2xl drop-shadow-sm transition hover:shadow-xl border border-transparent hover:border-muted cursor-pointer"
              >
                <CardContent className="p-8 pb-4 flex flex-col gap-2 relative">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-green-700">{mail.subject}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex items-center justify-center">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 z-50 shadow-lg">
                        <DropdownMenuItem onClick={() => handleView(mail)}>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(mail)}>
                          <FileEdit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(mail)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="pt-2 text-muted-foreground">
                    <p className="line-clamp-2">{mail.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the mail.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DetailsSidePanel 
          data={selectedMail}
          open={isViewPanelOpen}
          onClose={() => setIsViewPanelOpen(false)}
          renderContent={renderMailPanel}
        />

      </div>
    </>
  );
}
