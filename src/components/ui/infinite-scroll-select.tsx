
import React, { useEffect, useRef } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Option = {
  value: string;
  label: string;
};

interface InfiniteScrollSelectProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  hasMore?: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
}

export function InfiniteScrollSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  className,
  isLoading = false,
  hasMore = false,
  fetchNextPage,
  fetchPreviousPage
}: InfiniteScrollSelectProps) {
  const [open, setOpen] = React.useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousScrollTop = useRef<number>(0);

  // Handle scroll events
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // Check if scrolled to the bottom (within 20px)
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 20) {
      fetchNextPage();
    }

    // Check if scrolled to the top (within 20px)
    if (el.scrollTop < 20) {
      fetchPreviousPage();
    }

    // Store the current scroll position
    previousScrollTop.current = el.scrollTop;
  };

  // Reset scroll position when opening the dropdown
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          {value ? options.find((option) => option.value === value)?.label || placeholder : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            style={{ maxHeight: "300px", overflow: "auto" }}
          >
            <CommandEmpty>{isLoading ? "Loading..." : emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
              {isLoading && (
                <div className="py-2 px-2 text-center text-sm text-muted-foreground">
                  Loading...
                </div>
              )}
            </CommandGroup>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
