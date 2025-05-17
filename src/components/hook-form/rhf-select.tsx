
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

interface RHFSelectProps {
  name: string;
  label?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  [x: string]: any;
}

export function RHFSelect({ name, label, options = [], placeholder = "Select...", ...other }: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              {...other}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

interface RHFMultiSelectProps {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  [x: string]: any;
}

export function RHFMultiSelect({ name, label, options, placeholder, ...other }: RHFMultiSelectProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="border rounded-md px-3 py-2">
              {field.value?.length > 0 ? (
                field.value.map((value: string) => {
                  const option = options.find((opt) => opt.value === value);
                  return (
                    <div key={value} className="bg-muted rounded-full px-2 py-1 text-xs inline-flex items-center mr-1 mb-1">
                      {option?.label || value}
                    </div>
                  );
                })
              ) : (
                <span className="text-muted-foreground">{placeholder || "No items selected"}</span>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
