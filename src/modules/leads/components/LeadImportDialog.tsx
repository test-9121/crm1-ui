
import { useState, useRef } from "react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { FileText, Upload, X, Loader2, Check, Download, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LeadImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (file: File) => Promise<{ duplicates: number, inserted: number }>;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export function LeadImportDialog({
  open,
  onOpenChange,
  onImport
}: LeadImportDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ duplicates: number, inserted: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the 10MB limit");
      e.target.value = '';
      return;
    }
    
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      toast.error("Only Excel files (.xlsx, .xls) or CSV files are allowed");
      e.target.value = '';
      return;
    }
    
    setSelectedFile(file);
    // Reset any previous import result when a new file is selected
    setImportResult(null);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Also clear any import result
    setImportResult(null);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to import");
      return;
    }

    setIsImporting(true);
    try {
      const result = await onImport(selectedFile);
      setImportResult(result);
      toast.success("Leads imported successfully");
    } catch (error) {
      console.error("Error importing leads:", error);
      toast.error("Failed to import leads");
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    if (!isImporting) {
      clearSelectedFile();
      onOpenChange(false);
    }
  };

  const handleNewImport = () => {
    clearSelectedFile();
    setImportResult(null);
  };

  // Sample excel download link - to be updated with actual path
  const sampleExcelLink = "/sample-leads-import.xlsx";

  const downloadSampleFile = () => {
    const link = document.createElement('a');
    link.href = sampleExcelLink;
    link.download = "sample-leads-import.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => {
      if (!isImporting) {
        onOpenChange(value);
        if (!value) clearSelectedFile();
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Leads</DialogTitle>
          <DialogDescription>
            Upload an Excel (.xlsx, .xls) or CSV file to import leads. 
            Maximum file size is 10MB.
          </DialogDescription>
        </DialogHeader>
        
        <Alert variant="destructive" className="mt-2 border-red-300 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex flex-col">
            <span className="text-red-600 font-medium">Use below sample excel structure for proper import</span>
            <Button 
              variant="link" 
              className="text-red-600 p-0 h-auto text-sm font-medium flex items-center justify-start underline" 
              onClick={downloadSampleFile}
            >
              <Download className="h-4 w-4 mr-1" />
              Download sample Excel template
            </Button>
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col gap-4 py-4">
          {importResult ? (
            <Card className="border-green-100 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <div className="rounded-full bg-green-100 p-2 text-green-600">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium">Import Completed</h3>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-green-600">{importResult.inserted}</span> leads inserted successfully
                    </p>
                    <p>
                      <span className="font-medium text-amber-600">{importResult.duplicates}</span> duplicate leads skipped
                    </p>
                  </div>
                  <Button onClick={handleNewImport} className="mt-2">
                    Import Another File
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : selectedFile ? (
            <div className="flex items-center gap-2 p-3 border rounded-md">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 truncate">{selectedFile.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={clearSelectedFile}
                disabled={isImporting}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ) : (
            <div className="grid gap-2">
              <label 
                htmlFor="file-upload" 
                className={cn(
                  "flex flex-col items-center justify-center h-32 border border-dashed rounded-md cursor-pointer",
                  "hover:border-primary hover:bg-primary/5"
                )}
              >
                <div className="flex flex-col items-center justify-center gap-1 py-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to select file or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Excel (.xlsx, .xls) or CSV files only, max 10MB
                  </span>
                </div>
                <input
                  id="file-upload"
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={isImporting}
                />
              </label>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex gap-2 sm:justify-between">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isImporting}
          >
            Close
          </Button>
          {!importResult && (
            <Button 
              onClick={handleImport} 
              disabled={!selectedFile || isImporting}
              className="min-w-[96px]"
            >
              {isImporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                'Import'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
