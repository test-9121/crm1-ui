
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface LeadToolbarProps {
  onCreate: () => void;
}

export function LeadToolbar({ onCreate }: LeadToolbarProps) {
  return (
    <div className="flex justify-end mb-4">
      <Button
        onClick={onCreate}
        className="bg-gradient-to-r from-blue-500 to-white/80 text-white font-bold shadow hover:from-blue-600 hover:to-blue-100 hover:scale-105 transition-all duration-200"
      >
        <Plus className="mr-2" />
        Create New Lead
      </Button>
    </div>
  );
}
