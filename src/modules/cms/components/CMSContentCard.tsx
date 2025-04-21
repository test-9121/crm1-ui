
import { Card } from "@/components/ui/card";
import { CMSContent } from "../types";
import { MoreHorizontal, FileEdit, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CMSContentCardProps {
  content: CMSContent;
  onDelete: (id: string) => void;
}

export function CMSContentCard({ content, onDelete }: CMSContentCardProps) {
  const formattedDate = format(new Date(content.createdDateTime), "dd MMM yyyy");

  return (
    <Card className="overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="h-48 md:w-64 overflow-hidden">
          <img 
            src={content.coverUrl} 
            alt={content.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
            }} 
          />
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg mb-1">{content.title}</h3>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem>
                    <Link to={`/cms/view/${content.id}`} className="flex items-center w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={`/cms/edit/${content.id}`} className="flex items-center w-full">
                      <FileEdit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(content.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="mt-2">{content.description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
