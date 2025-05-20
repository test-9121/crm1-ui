
import { useEffect, useState, useRef } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { api } from "@/lib/api";

interface PaginatedAutocompleteProps {
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  endpoint: string; // API endpoint
  getLabel: (item: unknown) => string;
  getValue: (item: unknown) => string;
  pageSize?: number;
  dataField?: string; // dynamic field name for data
  contentField?: string; // dynamic field name for content
}

const PaginatedAutocomplete = ({
  value,
  onChange,
  placeholder = "Select an option",
  endpoint,
  getLabel,
  getValue,
  pageSize = 50,
  dataField = "data", // default value for data field
  contentField = "content", // default value for content field
}: PaginatedAutocompleteProps) => {
  const [options, setOptions] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const fetchOptions = async (pageIndex: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await api.get(`${endpoint}?page=${pageIndex}&size=${pageSize}`);
      const data = response.data?.[dataField]?.[contentField || "content"] || response.data?.[dataField] || [];
      
      setOptions((prev) => {
        const merged = [...prev, ...data];
        // Remove duplicates by ID
        const unique = Array.from(new Map(merged.map(item => [getValue(item), item])).values());
        return unique;
      });

      setHasMore(data.length === pageSize);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOptions([]);
    setPage(0);
    setHasMore(true);
    fetchOptions(0);
  }, [endpoint, dataField, contentField]);

  const handleScroll = (event: React.SyntheticEvent) => {
    const listboxNode = listRef.current;
    if (!listboxNode || !hasMore || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = listboxNode;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchOptions(page);
    }
  };

  return (
    <Autocomplete
      size="small"
      value={options.find((opt) => getValue(opt) === value) || null}
      onChange={(_, newValue) => onChange(newValue ? getValue(newValue) : null)}
      options={options}
      getOptionLabel={getLabel}
      loading={loading}
      filterOptions={(x) => x} // prevent local filtering
      ListboxProps={{
        ref: listRef,
        onScroll: handleScroll,
      }}
      renderOption={(props, option) => (
        <li {...props} key={getValue(option)}>
          {getLabel(option)}
        </li>
      )}
      renderInput={(params) => (
        <TextField
        
          {...params}
          // label={placeholder}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default PaginatedAutocomplete;