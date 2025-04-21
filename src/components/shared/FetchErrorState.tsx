
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface FetchErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function FetchErrorState({ 
  message = "Failed to fetch data from the server", 
  onRetry 
}: FetchErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8">
      <div className="bg-red-50 text-red-800 p-4 rounded-full mb-4">
        <AlertTriangle size={40} className="text-red-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Unable to Load Data</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Retry
        </Button>
      )}
    </div>
  );
}
