
import { Card, CardContent } from "@/components/ui/card";
import { CMSMail } from "../types";
import { MoreHorizontal, FileEdit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CMSMailCardProps {
  mail: CMSMail;
  onDelete: (id: string) => void;
}

export function CMSMailCard({ mail, onDelete }: CMSMailCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        <div className="flex justify-between items-start p-4">
          <h3 className="font-medium text-lg">{mail.subject}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <Link to={`/cms-mail/view/${mail.id}`} className="flex items-center w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`/cms-mail/edit/${mail.id}`} className="flex items-center w-full">
                  <FileEdit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(mail.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="px-4 pb-4 text-muted-foreground">
          <p className="line-clamp-2">{mail.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
