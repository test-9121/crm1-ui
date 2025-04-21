
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface CMSContentHeaderProps {
  title: string;
}

export function CMSContentHeader({ title }: CMSContentHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <Link to="/cms/create">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>New Content</span>
        </Button>
      </Link>
    </div>
  );
}
