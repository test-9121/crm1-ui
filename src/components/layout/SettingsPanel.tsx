
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsPanel = ({ open, onClose }: SettingsPanelProps) => {
  const [fontSize, setFontSize] = useState("16");
  const [selectedFont, setSelectedFont] = useState("public-sans");
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="space-y-6 py-6">
            {/* Display Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="dark-mode" className="flex items-center gap-2">
                    {theme === 'dark' ? (
                      <Moon size={16} className="text-blue-400" />
                    ) : (
                      <Sun size={16} className="text-yellow-500" />
                    )}
                    {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                  </Label>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="contrast">Contrast</Label>
                <Switch id="contrast" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="rtl">Right to left</Label>
                <Switch id="rtl" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="compact">Compact</Label>
                <Switch id="compact" />
              </div>
            </div>
            
            <Separator />
            
            {/* Layout Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Layout</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((layout) => (
                  <div
                    key={layout}
                    className="aspect-[4/3] rounded-lg border-2 border-muted bg-muted/50 p-2 hover:bg-muted/80 cursor-pointer"
                  />
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Color Theme */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Color</h3>
              <ToggleGroup type="single" className="justify-start">
                <ToggleGroupItem value="integrate">Integrate</ToggleGroupItem>
                <ToggleGroupItem value="apparent">Apparent</ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <Separator />
            
            {/* Font Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Font</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Public Sans", "Inter", "DM Sans", "Nunito Sans"].map((font) => (
                  <button
                    key={font}
                    className={`p-4 rounded-lg border-2 text-left hover:bg-muted/50 ${
                      selectedFont === font.toLowerCase().replace(" ", "-")
                        ? "border-primary"
                        : "border-muted"
                    }`}
                    onClick={() => setSelectedFont(font.toLowerCase().replace(" ", "-"))}
                  >
                    <span className="text-lg">{font.charAt(0)}</span>
                    <p className="text-sm text-muted-foreground">{font}</p>
                  </button>
                ))}
              </div>
              
              <div className="space-y-2">
                <Label>Font Size</Label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground text-right">
                  {fontSize}px
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
