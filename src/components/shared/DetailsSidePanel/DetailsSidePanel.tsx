
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface DetailsSidePanelProps<T> {
  data: T | null;
  open: boolean;
  onClose: () => void;
  renderContent: (data: T) => React.ReactNode;
}

export function DetailsSidePanel<T>({ 
  data, 
  open, 
  onClose,
  renderContent 
}: DetailsSidePanelProps<T>) {
  if (!data) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <div className="space-y-6 py-6">
          {renderContent(data)}
        </div>
      </SheetContent>
    </Sheet>
  );
}
