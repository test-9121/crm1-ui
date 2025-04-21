
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CMSContentHeader } from "@/modules/cms/components/CMSContentHeader";
import { useCMSContent } from "@/modules/cms/hooks/useCMSContent";
import { CMSContentCard } from "@/modules/cms/components/CMSContentCard";
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
import { ChevronDown, Search } from "lucide-react";
import { FetchErrorState } from "@/components/shared/FetchErrorState";

export default function CMSContentList() {
  const { allContents, deleteContent } = useCMSContent();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest" | "alphabetical">("latest");

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await deleteContent.mutateAsync(deleteId);
      } finally {
        setDeleteId(null);
      }
    }
  };

  const filteredContents = allContents.data?.filter(content => 
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedContents = [...filteredContents].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime();
    }
    if (sortOrder === "oldest") {
      return new Date(a.createdDateTime).getTime() - new Date(b.createdDateTime).getTime();
    }
    // alphabetical
    return a.title.localeCompare(b.title);
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <CMSContentHeader title="Content List" />

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>CMS Content</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>List</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {allContents.isError ? (
          <FetchErrorState 
            message="We couldn't load the content list. Please try again later." 
            onRetry={() => allContents.refetch()} 
          />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="relative w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title..."
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

            <div className="grid grid-cols-2 gap-6">
              {allContents.isLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : sortedContents.length === 0 ? (
                <div className="text-center py-8">
                  {searchQuery ? "No contents found matching your search." : "No contents available."}
                </div>
              ) : (
                sortedContents.map((content) => (
                  <CMSContentCard key={content.id} content={content} onDelete={handleDelete} />
                ))
              )}
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the content.
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
